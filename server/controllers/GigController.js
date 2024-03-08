const Gig = require("../models/Gig.js");
const Order = require("../models/Order.js");
const Package = require("../models/Package.js");
const Requirement = require("../models/Requirements.js");
const User = require("../models/User.js");
const cloudinary = require("../utils/cloudinaryConfig.js");
const OrderActivity = require("../models/OrderActivity.js");
const Stripe = require("stripe");
const Delivery = require("../models/Delivery.js");
const Review = require("../models/Review.js");
const GigView = require("../models/GigView.js");
const OrderCancel = require("../models/OrderCancellation.js");
const Conflict = require("../models/Conflict.js");
const Chat = require("../models/Chat.js");
const Message = require("../models/Message.js");
const Invoice = require("../models/Invoice.js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "nfluencer-gigs",
  });
  return res.url;
}

const uploadDeliveryZiptoCloudinary = async (req, res) => {
  const file = req.file.buffer;
  const type = req.file.mimetype;

  // Upload file to Cloudinary
  cloudinary.v2.uploader
    .upload_stream({ resource_type: "auto" }, (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: true, message: "Error uploading file to Cloudinary" });
      }

      // Remove the temporary file = require( the server (if needed)
      // fs.unlinkSync(req.file.path);

      // Return Cloudinary URL
      res.json(result);
    })
    .end(file);
};

const uploadImagetoCloudinary = async (req, res) => {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ");base64," + b64;
  // const image = await handleUpload(dataURI);

  const response = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
    folder: "nfluencer-gigs",
  });

  res.status(200).json({ response });
};

const uploadVideoToCloudinary = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "video",
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading video to Cloudinary:", error);
            res.status(500).json({ error: "Failed to upload video" });
          } else {
            console.log("Video uploaded to Cloudinary:", result);
            res.status(200).json({ result });
          }
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error("Error processing video upload:", error);
    res.status(500).json({ error: "Failed to process video upload" });
  }
};

const createGig = async (req, res) => {
  var {
    title,
    keywords,
    category,
    subcategory,
    description,
    packages,
    requirements,
    faqs,
    username,
    offer3Packages,
    images,
    video,
    hasVideo,
    offerReward,
    rewardNFT,
  } = req.body;

  try {
    // faqs = JSON.parse(faqs);
    // requirements = JSON.parse(requirements);
    // keywords = JSON.parse(keywords);
    // packages = JSON.parse(packages);
    // images = JSON.parse(images);

    const user = await User.findOne({ username: username }).exec();

    let basicPackage = null;
    let standardPackage = null;
    let premiumPackage = null;

    if (packages.basic) {
      basicPackage = new Package({
        name: packages.basic.name,
        description: packages.basic.description,
        price: packages.basic.price,
        deliveryTime: packages.basic.deliveryTime,
        revisions: packages.basic.revisions,
        support: packages.basic.support,
        extraDeliveryTime: packages.extras.extraFastDelivery.basic.deliveryTime,
        extraDeliveryPrice: packages.extras.extraFastDelivery.basic.price,
        extraRevisions: packages.extras.extraRevision.basic.revisions,
        extraRevisionPrice: packages.extras.extraRevision.basic.price,
      });

      await basicPackage.save();
    }

    if (packages.standard) {
      standardPackage = new Package({
        name: packages.standard.name,
        description: packages.standard.description,
        price: packages.standard.price,
        deliveryTime: packages.standard.deliveryTime,
        revisions: packages.standard.revisions,
        support: packages.standard.support,
      });

      if (packages.extras.extraFastDelivery.offer) {
        (standardPackage.extraDeliveryTime =
          packages.extras.extraFastDelivery.standard.deliveryTime),
          (standardPackage.extraDeliveryPrice =
            packages.extras.extraFastDelivery.standard.price),
          (standardPackage.extraRevisions =
            packages.extras.extraRevision.standard.revisions),
          (standardPackage.extraRevisionPrice =
            packages.extras.extraRevision.standard.price);
      }

      await standardPackage.save();
    }

    if (packages.premium) {
      premiumPackage = new Package({
        name: packages.premium.name,
        description: packages.premium.description,
        price: packages.premium.price,
        deliveryTime: packages.premium.deliveryTime,
        revisions: packages.premium.revisions,
        support: packages.premium.support,
      });

      if (packages.extras.extraFastDelivery.offer) {
        (premiumPackage.extraDeliveryTime =
          packages.extras.extraFastDelivery.premium.deliveryTime),
          (premiumPackage.extraDeliveryPrice =
            packages.extras.extraFastDelivery.premium.price),
          (premiumPackage.extraRevisions =
            packages.extras.extraRevision.premium.revisions),
          (premiumPackage.extraRevisionPrice =
            packages.extras.extraRevision.premium.price);
      }

      await premiumPackage.save();
    }

    const newGig = new Gig({
      title: title,
      category: category,
      subcategory: subcategory,
      keywords: keywords,
      user: user._id,
      description: description,
      packages: {
        basic: basicPackage,
        standard: standardPackage,
        premium: premiumPackage,
      },
      requirements: requirements,
      faqs: faqs,
      images: images,
      video: video,
      hasVideo: hasVideo,
      offer3Packages: offer3Packages,
      offerReward: offerReward,
      rewardNFT: rewardNFT,
    });

    await newGig.save();

    if (newGig) {
      res.status(201).json(newGig);
    } else {
      res.status(500).json({ error: true, message: "Error creating gig" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const fetchUserGigs = async (req, res) => {
  const gigs = await Gig.find({ user: req.body.userId }).exec();
  res.status(200).json(gigs);
};

const getAllGigs = async (req, res) => {
  const gigs = await Gig.find({})
    .populate("user", "-password")
    .populate("packages.basic packages.standard packages.premium")
    .exec();

  const averageRatings = await Review.aggregate([
    {
      $group: {
        _id: "$gig",
        rating: { $avg: "$rating" },
        total: { $sum: 1 },
      },
    },
  ]).exec();

  const result = averageRatings.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});

  res.status(200).json({ gigs, averageRatings: result });
};

const gigDetails = async (req, res) => {
  const { gigId } = req.body;
  const gig = await Gig.find({
    _id: gigId,
  })
    .populate("user", "-password")
    .populate("packages.basic packages.standard packages.premium")
    .exec();

  res.status(200).json(gig);
};

const fetchGig = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId)
    .populate("user", "-password")
    .exec();
  res.status(200).json(gig);
};

const deleteUserGigs = async (req, res) => {
  const { gigId, userId } = req.body;
  try {
    const gig = await Gig.findById(gigId).exec();
    if (gig.user.toString() === userId.toString()) {
      await Gig.findByIdAndDelete(gigId).exec();
      res.status(200).json({ error: false, message: "Gig has been deleted" });
    } else {
      res.status(403).json({ error: true, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const createPaymentIntent = async (req, res) => {
  const { items, gigDetails } = req.body;

  console.log(gigDetails);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(gigDetails.price + gigDetails.platformFee) * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      title: gigDetails.title,
      gigId: gigDetails.gigId,
      image: gigDetails.image,
      package: gigDetails.package.packageId,
      revisions: gigDetails.package.revisions,
      deliveryTime: gigDetails.package.deliveryTime,
      price: gigDetails.price,
      buyer: gigDetails.buyer,
      seller: gigDetails.seller,
      platformFee: gigDetails.platformFee,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

const createOrder = async (req, res) => {
  var {
    seller,
    buyer,
    gigId,
    packageId,
    totalPrice,
    status,
    paymentIntent,
    paymentIntentClientSecret,
    paymentStatus,
    deliveryDays,
    user,
  } = req.body;

  try {
    const currentDate = new Date();
    deliveryDays = deliveryDays || 0;
    let orderEndDate = new Date(
      currentDate.setDate(currentDate.getDate() + deliveryDays)
    );

    const newOrder = new Order({
      seller: seller,
      buyer: buyer,
      gig: gigId,
      package: packageId,
      totalPrice: totalPrice,
      status: status,
      paymentIntent: paymentIntent,
      paymentIntentClientSecret: paymentIntentClientSecret,
      paymentStatus: paymentStatus,
      deliveryDays: deliveryDays,
      orderEndDate: orderEndDate,
    });

    await newOrder.save();

    // save invoice
    const newInvoice = new Invoice({
      order: newOrder._id,
      gig: gigId,
      seller: seller,
      buyer: buyer,
      package: packageId,
      totalPrice: totalPrice,
      platformFee: totalPrice * 0.1,
      user: user,
    });
    await newInvoice.save();

    // create order activity
    const orderActivities = [{ text: "Order Placed", date: new Date() }];

    const newOrderActivity = new OrderActivity({
      order: newOrder._id,
      activity: orderActivities,
      gig: gigId,
    });

    await newOrderActivity.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const fetchOrderDetails = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.find({
    _id: orderId,
  })
    .populate("seller", "-password")
    .populate("buyer", "-password")
    .populate("gig")
    .populate("package")
    .exec();

  const orderActivity = await OrderActivity.find({
    order: orderId,
  })
    .populate("order")
    .exec();

  // get the requirements
  const requirements = await Requirement.find({
    order: orderId,
  }).exec();

  // get the delivery details
  const delivery = await Delivery.find({
    order: orderId,
  }).exec();

  // fetch order review
  const review = await Review.find({
    order: orderId,
  }).exec();

  const cancelRequests = await OrderCancel.find({
    order: orderId,
  })
    .populate("buyer")
    .populate("seller")
    .populate("requestInitiator")
    .sort({ createdAt: -1 })
    .exec();

  const dispute = await Conflict.find({
    order: orderId,
  })
    .populate("buyer")
    .populate("seller")
    .populate("disputeInitiator")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({
    order,
    orderActivity,
    requirements,
    delivery,
    review,
    cancelRequests,
    dispute,
  });
};

const submitRequirements = async (req, res) => {
  const { orderId, buyerId, sellerId, gigId, requirements } = req.body;

  try {
    const requirement = new Requirement({
      order: orderId,
      buyer: buyerId,
      seller: sellerId,
      gig: gigId,
      requirements: requirements,
    });

    await requirement.save();

    // update the order status to requirements submitted
    const order = await Order.findById(orderId).exec();
    order.isRequirementSent = true;
    await order.save();

    // Create order activity for requirements submission
    const orderActivity1 = new OrderActivity({
      order: orderId,
      activity: [
        {
          text: "Requirements Submitted",
          date: new Date(),
        },
      ],
      gig: gigId,
    });
    await orderActivity1.save();

    const orderActivity2 = new OrderActivity({
      order: orderId,
      activity: [
        {
          text: "Order Started",
          date: new Date(),
        },
      ],
      gig: gigId,
    });
    await orderActivity2.save();

    res.status(201).json(requirement);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getOrderActivity = async (req, res) => {
  const { orderId } = req.body;
  const orderActivity = await OrderActivity.find({
    order: orderId,
  })
    .populate("order")
    .exec();
  res.status(200).json(orderActivity);
};

const submitDelivery = async (req, res) => {
  const {
    orderId,
    buyerId,
    sellerId,
    deliveryDescription,
    deliveryFile,
    gigId,
  } = req.body;

  try {
    const delivery = new Delivery({
      order: orderId,
      buyer: buyerId,
      seller: sellerId,
      gig: gigId,
      deliveryDescription: deliveryDescription,
      deliveryFile: deliveryFile,
    });

    await delivery.save();

    // update the order status to requirements submitted
    const order = await Order.findById(orderId).exec();
    order.isDeliverySubmitted = true;
    await order.save();

    // Create order activity for requirements submission
    const orderActivity = new OrderActivity({
      order: orderId,
      activity: [
        {
          text: "Order Delivery Submitted",
          date: new Date(),
        },
      ],
      gig: gigId,
    });
    await orderActivity.save();

    res.status(201).json(delivery);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const submitReview = async (req, res) => {
  const { orderId, gigId, sellerId, buyerId, reviewText, rating } = req.body;

  try {
    const review = new Review({
      order: orderId,
      buyer: buyerId,
      seller: sellerId,
      gig: gigId,
      reviewText: reviewText,
      rating: rating,
    });

    await review.save();

    // update the order status to requirements submitted
    const order = await Order.findById(orderId).exec();
    order.isDeliveryAccepted = true;
    await order.save();

    // Create order activity for requirements submission
    const orderActivity = new OrderActivity({
      order: orderId,
      activity: [
        {
          text: "Order Reviewed by Buyer",
          date: new Date(),
        },
      ],
      gig: gigId,
    });
    await orderActivity.save();

    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getGigReviews = async (req, res) => {
  const { gigId } = req.params;
  const reviews = await Review.find({
    gig: gigId,
  })
    .populate("order")
    .populate("buyer")
    .populate("seller")
    .populate("gig")
    .exec();
  res.status(200).json(reviews);
};

const getUserOrdersAsSeller = async (req, res) => {
  const { userId } = req.body;
  const orders = await Order.find({
    seller: userId,
  })
    .populate("seller")
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();
  res.status(200).json(orders);
};

const getUserOrdersAsBuyer = async (req, res) => {
  const { userId } = req.body;
  const orders = await Order.find({
    buyer: userId,
  })
    .populate("seller")
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();
  res.status(200).json(orders);
};

const countViews = async (req, res) => {
  try {
    const { gigId } = req.body;
    await GigView.findOneAndUpdate(
      { gigId: gigId },
      { $inc: { totalViews: 1 } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

const getUserGigsViews = async (req, res) => {
  try {
    const { userId } = req.body;

    const gigs = await Gig.find({ user: userId }).exec();
    const gigIds = gigs.map((gig) => gig._id);
    const gigViews = await GigView.find({ gigId: { $in: gigIds } }).exec();

    // extract the total views and sum them
    const totalViews = gigViews.reduce((acc, item) => {
      acc += item.totalViews;
      return acc;
    }, 0);

    res.status(200).json(totalViews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

const getAllSellerOrders = async (req, res) => {
  const { userId } = req.body;
  const sellerId = userId;

  const activeOrders = await Order.find({
    seller: sellerId,
    isRequirementSent: true,
    isDeliveryAccepted: false,
    isOrderCancelled: false,
  })
    .populate("seller")
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const currentDate = new Date();
  const lateOrders = await Order.find({
    seller: sellerId,
    isDeliveryAccepted: false, // Assuming you only want late orders that are not delivered
    orderEndDate: { $lt: currentDate },
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const deliveredOrders = await Order.find({
    seller: sellerId,
    isDeliveryAccepted: false,
    isDeliverySubmitted: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const completedOrders = await Order.find({
    seller: sellerId,
    isDeliveryAccepted: true,
    isDeliverySubmitted: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const cancelledOrders = await Order.find({
    seller: sellerId,
    isOrderCancelled: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  res.status(200).json({
    activeOrders,
    lateOrders,
    deliveredOrders,
    completedOrders,
    cancelledOrders,
  });
};

const getAllBuyerOrders = async (req, res) => {
  const { userId } = req.body;
  const sellerId = userId;

  const activeOrders = await Order.find({
    buyer: sellerId,
    isRequirementSent: true,
    isDeliveryAccepted: false,
    isOrderCancelled: false,
  })
    .populate("seller")
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const currentDate = new Date();
  const lateOrders = await Order.find({
    buyer: sellerId,
    isDeliveryAccepted: false, // Assuming you only want late orders that are not delivered
    orderEndDate: { $lt: currentDate },
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const deliveredOrders = await Order.find({
    buyer: sellerId,
    isDeliveryAccepted: false,
    isDeliverySubmitted: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const completedOrders = await Order.find({
    buyer: sellerId,
    isDeliveryAccepted: true,
    isDeliverySubmitted: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  const cancelledOrders = await Order.find({
    buyer: sellerId,
    isOrderCancelled: true,
  })
    .populate("seller") // If you need to populate any references (e.g., seller, buyer, gig, package)
    .populate("buyer")
    .populate("gig")
    .populate("package")
    .exec();

  res.status(200).json({
    activeOrders,
    lateOrders,
    deliveredOrders,
    completedOrders,
    cancelledOrders,
  });
};

const cancelOrder = async (req, res) => {
  const {
    order,
    gig,
    seller,
    buyer,
    package: packageId,
    requestInitiator,
    cancelReason,
  } = req.body;

  const newCancelOrder = new OrderCancel({
    order,
    gig,
    seller,
    buyer,
    requestInitiator,
    package: packageId,
    cancelReason,
  });

  await newCancelOrder.save();
  return res.status(201).json({ error: false, message: "Order Cancelled" });
};

const updateCancelRequestStatus = async (req, res) => {
  const { requestId, type } = req.body;

  const cancelRequest = await OrderCancel.findOne({
    _id: requestId,
  }).exec();

  if (type === "approved") {
    cancelRequest.cancelStatus = "approved"

    const order = await Order.findById(cancelRequest.order).exec();
    order.isOrderCancelled = true;
    await order.save();

    const orderActivity = new OrderActivity({
      order: order._id,
      activity: [
        {
          text: "Order Cancelled",
          date: new Date(),
        },
      ],
      gig: order.gig,
    });
    await orderActivity.save();
  } else if (type === "rejected") {
    cancelRequest.cancelStatus = "rejected"
  }
  await cancelRequest.save();
  return res.status(201).json({ error: false, message: "Request Updated" });
};

const submitDispute = async (req, res) => {
  const {
    orderId,
    gigId,
    sellerId,
    buyerId,
    disputeInitiator,
    packageId,
    disputeSubject,
    disputeDescription,
  } = req.body;

  const newConflict = new Conflict({
    order: orderId,
    gig: gigId,
    seller: sellerId,
    buyer: buyerId,
    disputeInitiator,
    package: packageId,
    disputeSubject,
    disputeDescription,
  });
  await newConflict.save();

  const order = await Order.findById(newConflict.order).exec();
  order.isDisputeOpened = true;
  await order.save();

  const orderActivity = new OrderActivity({
    order: orderId,
    activity: [
      {
        text: "Dispute Opened",
        date: new Date(),
      },
    ],
    gig: gigId,
  });

  orderActivity.save();

  return res.status(201).json({ error: false, message: "Dispute Submitted" });
};

const submitDisputeResponse = async (req, res) => {
  const { disputeId, responseSubject, responseDescription } = req.body;

  const dispute = await Conflict.findById(disputeId).exec();
  dispute.disputeResponseSubject = responseSubject;
  dispute.disputeResponseDescription = responseDescription;
  dispute.disputeStatus = "pending"
  await dispute.save();

  const orderActivity = new OrderActivity({
    order: dispute.order,
    activity: [
      {
        text: "Dispute Responded",
        date: new Date(),
      },
    ],
    gig: dispute.gig,
  });

  orderActivity.save();

  return res
    .status(201)
    .json({ error: false, message: "Dispute Response Submitted" });
};

const getDispute = async (req, res) => {
  const { disputeId } = req.body;
  const dispute = await Conflict.findById(disputeId)
    .populate("order")
    .populate("gig")
    .populate("seller")
    .populate("buyer")
    .populate("package")
    .populate("disputeInitiator")
    .exec();

  // get chat messags

  const chatId = await Chat.findOne({
    order: dispute.order._id,
  }).exec();

  const chatMessages = await Message.find({
    chat: chatId._id,
  })
    .populate("sender")
    .populate("receiver")
    .exec();

  return res.status(200).json({ dispute, chatMessages });
};

const adminCancelOrder = async (req, res) => {
  const { disputeId, orderId, buyerId, sellerId, gigId, packageId } = req.body;

  const conflict = await Conflict.findById(disputeId).exec();
  conflict.disputeStatus = "resolved"
  conflict.disputeResolution = "cancelled"
  await conflict.save();

  // update order status
  const order = await Order.findById(orderId).exec();
  order.isOrderCancelled = true;
  await order.save();

  // create order activity
  const orderActivity = new OrderActivity({
    order: orderId,
    activity: [
      {
        text: "Admin Cancelled Order",
        date: new Date(),
      },
    ],
    gig: gigId,
  });
  await orderActivity.save();

  return res.status(201).json({ error: false, message: "Order Cancelled" });
};

const adminRestartOrder = async (req, res) => {
  const { disputeId, orderId, buyerId, sellerId, gigId, packageId } = req.body;

  // update dispute status
  const conflict = await Conflict.findById(disputeId).exec();
  conflict.disputeStatus = "resolved"
  conflict.disputeResolution = "restarted"
  await conflict.save();

  // update order status
  const currentDate = new Date();
  const order = await Order.findById(orderId).exec();
  order.isOrderCancelled = false;
  order.isDisputeOpened = false;
  order.isDeliverySubmitted = false;
  order.isDeliveryAccepted = false;
  order.orderEndDate = new Date(
    currentDate.setDate(currentDate.getDate() + order.deliveryDays)
  );
  await order.save();

  // create order activity
  const orderActivity = new OrderActivity({
    order: orderId,
    activity: [
      {
        text: "Admin Restarted Order",
        date: new Date(),
      },
    ],
    gig: gigId,
  });

  await orderActivity.save();

  return res.status(201).json({ error: false, message: "Order Restarted" });
};

const getAllUserDisputes = async (req, res) => {
  const { userId } = req.body;

  // get all disputes where user is buyer or seller
  const disputes = await Conflict.find({
    $or: [{ buyer: userId }, { seller: userId }],
  })
    .populate("order")
    .populate("gig")
    .populate("seller")
    .populate("buyer")
    .populate("package")
    .populate("disputeInitiator")
    .exec();

  return res.status(200).json({ disputes });
};

const getAllUserInvoices = async (req, res) => {
  const { userId } = req.body;

  const invoices = await Invoice.find({
    user: userId,
  })
    .populate("order")
    .populate("gig")
    .populate("seller")
    .populate("buyer")
    .populate("package")
    .exec();

  return res.status(200).json({ invoices });
};

module.exports = {
  createGig,
  fetchGig,
  fetchUserGigs,
  deleteUserGigs,
  getAllGigs,
  gigDetails,
  uploadImagetoCloudinary,
  uploadVideoToCloudinary,
  createPaymentIntent,
  createOrder,
  fetchOrderDetails,
  submitRequirements,
  getOrderActivity,
  uploadDeliveryZiptoCloudinary,
  submitDelivery,
  submitReview,
  getGigReviews,
  getUserOrdersAsSeller,
  getUserOrdersAsBuyer,
  countViews,
  getUserGigsViews,
  getAllSellerOrders,
  cancelOrder,
  updateCancelRequestStatus,
  submitDispute,
  getDispute,
  submitDisputeResponse,
  adminCancelOrder,
  adminRestartOrder,
  getAllBuyerOrders,
  getAllUserDisputes,
  getAllUserInvoices,
};
