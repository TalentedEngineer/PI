const { Router } = require("express");
const {
  loginUser,
  registerUser,
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
} = require("../controllers/UserController.js");
const authenticate = require("../middleware/authenticate.js");
const router = Router();

// Define your routes and middleware
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyemail", verifyEmail);
router.post("/userdetails", userDetails);

router.delete("/admin-delete-user", deleteUser);
router.delete("/admin-delete-gig", deleteGig);

router.get("/admin-users", fetchAllUsers);
router.get("/admin-users", fetchAllUsers);
router.get("/getAdminStats", getAdminStats);
router.get("/admin-gigs", fetchAllGigs);
router.get("/admin-disputes", fetchAllDisputes);
router.post("/get-admin-notifications", getAdminNotifications);

router.use(authenticate);
router.post("/getuser", getUser);
router.post("/wallet", storeWallet);
router.delete("/wallet", removeWallet);
router.post("/chatUsers", getUsers);
router.post("/get-notifications", getNotifications);

module.exports = router;
