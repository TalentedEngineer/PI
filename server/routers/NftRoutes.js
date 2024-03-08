const { Router } = require("express");
const {
  createNft,
  fetchUserNFTs,
  getAllNFTs,
  nftDetails,
  addCollection,
  getCollections,
  getCollection,
  likeNFT,
  getAllNFTLikes,
  deleteLikeNFT,
  getNFTLikes,
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
} = require("../controllers/NftController.js");
const authenticate = require("../middleware/authenticate.js");

const router = Router();

router.post("/getallnfts", getAllNFTs);
router.post("/details", nftDetails);
router.post("/getLikes", getAllNFTLikes);
router.get("/getNFTLikes/:id", getNFTLikes);
router.get("/getCollectionItemsCount", getCollectionItemsCount);
router.post("/countViews", countViews);
router.post("/countCollectionViews", countCollectionViews);
router.post("/getCollection", getCollection);
router.get("/getAllCollections", getAllCollections);
router.get("/getcreatorSales/:walletAddress", getcreatorSales);
router.post("/getAllCreatorsSales", getAllCreatorsSales);

router.use(authenticate);

router.post("/getWalletSales", getWalletSales);
router.post("/user-nfts", fetchUserNFTs);
router.post("/", createNft);
router.post("/addCollection", addCollection);
router.post("/getCollections", getCollections);
router.post("/like", likeNFT);
router.delete("/like/:id", deleteLikeNFT);
router.post("/checkSaveItem", checkSaveItem);
router.delete("/saveItem/:id", deleteSavedItem);
router.post("/saveItem", saveItem);
router.put("/updateCollectionDetails/:collectionId", updateCollectionDetails);

module.exports = router;
