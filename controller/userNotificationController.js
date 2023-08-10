const userNotificationModel = require("../models/userNotificationModel");

// Get list of all notification belong to userId
const getListOfNotifications = async (req, res) => {
    const userId = req.userId;
    const notifications = await userNotificationModel.find({ userId: userId });
    res.status(200).send(notifications);
};

const getListOfUnreadNotifications = async (req, res) => {
    const userId = req.userId;
    const notifications = await userNotificationModel.find({ userId: userId, isRead: false });
    res.status(200).send(notifications);
};


module.exports = {
    getListOfNotifications,
    getListOfUnreadNotifications
};
