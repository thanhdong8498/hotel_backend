const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const getListUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        // delete user
        const userId = req.params.userId;
        await userModel.findByIdAndRemove(userId);
        return res.status(200).send("delete user successfully");
    } catch (error) {
        // log error
    }
};
const updateUser = async (req, res) => {
    try {
        // update user
        const userId = req.params.userId;
        await userModel.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(200).send("Update user successfully");
    } catch (error) {}
};

module.exports = {
    getListUsers,
    deleteUser,
    updateUser,
};
