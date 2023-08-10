const express = require("express");
const router = express.Router();
const userNotificationController = require("../controller/userNotificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/list", [authMiddleware.isAuthentication], userNotificationController.getListOfNotifications);
router.get("/unread", [authMiddleware.isAuthentication], userNotificationController.getListOfUnreadNotifications);

module.exports = router;
