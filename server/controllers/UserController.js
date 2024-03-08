const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/tokenGenerator.js");
const transporter = require("../utils/emailConfig.js");
const cloudinary = require("../utils/cloudinaryConfig.js");
const Gig = require("../models/Gig.js");
const Invoice = require("../models/Invoice.js");
const Order = require("../models/Order.js");
const Conflict = require("../models/Conflict.js");
const Notification = require("../models/Notification.js");
const Chat = require("../models/Chat.js");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
function jwtToken(username) {
  const payload = {
    sub: username,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey);

  return token;
}

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "nfluencer-users",
  });
  return res.url;
}
const sendRegistrationEmail = async (email, token) => {
  const emailLink = `${process.env.CLIENT_URL}/user-details/${token}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head></head>
    <body style="background:#6B46C1;height:100%;width:100%">
    <div style="margin-top:50px;background: #6b46c1;height:100%;width:100%">
      <div style="width:100%;max-width:500px;margin:auto;height:100%;width:100%;border-radius:10px;overflow:hidden;padding: 20px;">
      <table style="text-align:center;background:#fff;width:100%;padding:20px;border-radius: 30px;font-family:sans-serif,Arial;margin-top: 30px;margin-bottom: 30px;box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);">
            <tbody>
              <tr style="width:100%;">
                <td style="width:100%;font-size:25px; font-weight:900;padding:20px;">Thanks for signing up for Nfluencer!</td>
              </tr>
              <tr style="width:100%">
                <td style="width:100%">
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/miscellaneous-31/60/envelope-256.png"
                    style="width:80px;height:80px"
                    alt=""
                  />
                </td>
              </tr>
              <tr style="width:100%">
                <td style="width:100%;padding-top:30px">
                  <a href="${emailLink}" style="padding:15px 10px; background:#6B46C1;color:#fff;font-weight:600;border-radius:10px;text-decoration:none;display:inline-block">Click to Verify Email Address</a>
                </td>
              </tr>
              <tr style="width:100%">
                <td style="width:100%;padding:20px">
                  <p style="font-size:12px">
                    If you’re having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser:
                  <a href="${emailLink}">${emailLink}</a>
                  </p>
                </td>
              </tr>
              
            </tbody>
          </table>
    </div>
    </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: "joharkhan2001@gmail.com",
    to: email,
    subject: "Verify your email",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    return res
      .status(409)
      .json({ error: true, message: "User with this email already exists" });
  }
  const hashPassword = encryptPassword(password);
  const token = generateToken();
  await sendRegistrationEmail(email, token);

  const newUser = new User({
    email,
    password: hashPassword,
    validationToken: token,
    emailValidated: false,
  });
  await newUser.save();
  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    error: false,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;

  const findUser = await User.findOne({ validationToken: verificationToken });
  if (!findUser) {
    return res.status(409).json({ error: true });
  }

  if (findUser.emailValidated) {
    return res.status(409).json({ error: false, emailValidated: true });
  }

  return res.status(200).json({
    error: false,
    user: {
      email: findUser.email,
      userId: findUser._id,
    },
  });
};

const userDetails = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    const { name, username, languages, location, bio, userId, email } =
      req.body;

    // check if username exists
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(409).json({
        error: true,
        usernameExist: true,
        message: "Username exists. Try again.",
      });
    }

    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        name,
        username,
        languages,
        location,
        bio,
        avatar: cldRes,
        emailValidated: true,
        validationToken: "",
      }
    );

    const jwttoken = jwtToken(username);

    return res.status(200).json({
      error: false,
      message: "User updated",
      user: {
        name,
        username,
        languages,
        location,
        bio,
        avatar: cldRes,
        jwtToken: jwttoken,
        email: email,
        _id: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User email not found",
        emailNotFound: true,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Incorrect password",
        incorrectPassword: true,
      });
    }

    const token = jwtToken(user.username);

    res.json({
      error: false,
      message: "Login successful",
      token,
      user: {
        name: user.name,
        username: user.username,
        languages: user.languages,
        location: user.location,
        bio: user.bio,
        avatar: user.avatar,
        jwtToken: token,
        email: user.email,
        _id: user._id,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ error: true, message: "Failed to log in" });
  }
};

const getUser = async (req, res) => {
  const { jwtToken } = req.body;

  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const user = await User.findOne({ username: decoded.sub });

  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  return res.status(200).json({
    error: false,
    message: "User found",
    user: {
      name: user.name,
      username: user.username,
      languages: user.languages,
      location: user.location,
      bio: user.bio,
      avatar: user.avatar,
      jwtToken: jwtToken,
      email: user.email,
      walletAddress: user.walletAddress,
      _id: user._id,
    },
  });
};

const storeWallet = async (req, res) => {
  const { walletAddress, username } = req.body;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    user.walletAddress = walletAddress;
    await user.save();
    console.log(user);
    res.status(200).json({
      message: "Wallet address saved",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const removeWallet = async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      error: true,
      message: "User not found",
    });
  }

  user.walletAddress = "";
  await user.save();
  res.status(200).json({
    error: false,
    message: "Wallet address removed",
  });
};

const getUsers = async (req, res) => {
  const { userid } = req.body;

  // get all users from Chat schema if userid is in the users aray. populate the users array. exclude the user details of the userid
  var users = await Chat.find({ users: { $elemMatch: { $eq: userid } } })
    .populate("users", "-password")
    .exec();

  var filteredUsers = [];
  for (let i = 0; i < users.length; i++) {
    const usersArray = users[i].users;
    // filteredUsers.push(usersArray);
    let fu = usersArray.filter((user) => user._id.toString() !== userid);
    if (fu.length > 0) filteredUsers.push(fu[0]);
  }

  // remove duplocates from filteredUsers array
  filteredUsers = filteredUsers.filter(
    (user, index, self) =>
      index === self.findIndex((u) => u._id.toString() === user._id.toString())
  );

  users = filteredUsers;

  if (!users) {
    return res.status(404).json({
      error: true,
      message: "Users not found",
    });
  }

  return res.status(200).json({
    error: false,
    message: "Users found",
    users,
  });
};

const fetchAllUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });

  if (!users) {
    return res.status(404).json({
      error: true,
      message: "Users not found",
    });
  }

  return res.status(200).json({
    error: false,
    message: "Users found",
    users,
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "User deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const fetchAllGigs = async (req, res) => {
  const gigs = await Gig.find({})
    .populate("user", "-password")
    .populate("packages.basic packages.standard packages.premium")
    .exec();
  res.status(200).json(gigs);
};

const deleteGig = async (req, res) => {
  const { gigId } = req.body;

  try {
    const gig = await Gig.findByIdAndDelete(gigId);
    if (!gig) {
      return res.status(404).json({
        error: true,
        message: "Gig not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Gig deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const getAdminStats = async (req, res) => {
  const users = await User.find({});
  const gigs = await Gig.find({});
  const invoices = await Invoice.find({});
  const orders = await Order.find({});
  const disputes = await Conflict.find({});

  res.status(200).json({
    stats: {
      users: users.length,
      gigs: gigs.length,
      invoices: invoices.length,
      orders: orders.length,
      disputes: disputes.length,
    },
  });
};

const fetchAllDisputes = async (req, res) => {
  const disputes = await Conflict.find({})
    .populate("order")
    .populate("gig")
    .populate("seller")
    .populate("buyer")
    .populate("package")
    .populate("disputeInitiator")
    .exec();

  return res.status(200).json({ disputes });
};

const getNotifications = async (req, res) => {
  const { userId } = req.body;

  const notifications = await Notification.find({ receiver: userId })
    .populate("sender")
    .populate("receiver")
    .sort({ createdAt: -1 })
    .exec();

  return res.status(200).json({ notifications });
};

const getAdminNotifications = async (req, res) => {
  const notifications = await Notification.find({})
    .populate("sender")
    .populate("receiver")
    .sort({ createdAt: -1 })
    .exec();

  return res.status(200).json({ notifications });
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  userDetails,
  getUser,
  storeWallet,
  removeWallet,
  getUsers,
  fetchAllUsers,
  deleteUser,
  fetchAllGigs,
  deleteGig,
  getAdminStats,
  fetchAllDisputes,
  getNotifications,
  getAdminNotifications,
};
