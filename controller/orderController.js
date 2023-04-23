const cuisineModel = require("../models/cuisineModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const createOrder = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        const cuisine = await cuisineModel.findById(req.body.cuisineId);
        orderModel.create({
            userName: user.lastName + " " + user.firstName,
            phone: user.phone,
            cuisineName: req.body.cuisineName,
            totalPrice: req.body.totalPrice,
            promotionalPrice: req.body.promotionalPrice,
            quantity: req.body.quantity,
            cuisineId: req.body.cuisineId,
            userId: req.userId,
            isAccept: false,
            isDelivery: false,
            isCancelled: false,
            cover: cuisine.images[0],
        });
        res.send("order success");
    } catch (error) {
        console.log(error);
    }
};
const getListOrder = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.send(orders);
    } catch (error) {
        console.log(error);
    }
};
const getUserOrder = async (req, res) => {
    console.log(req.userId);
    const userOrder = await orderModel.find({ userId: req.userId });
    res.send(userOrder);
};
const acceptOrder = async (req, res) => {
    const orderId = req.params.id;
    await orderModel.findByIdAndUpdate(orderId, { isAccept: true }, { new: true });
    res.send("chấp nhận thành công");
};
const deliveriedOrder = async (req, res) => {
    const orderId = req.params.id;
    await orderModel.findByIdAndUpdate(orderId, { isDelivery: true }, { new: true });
    res.send("xác nhận đã giao thành công");
};
const cancelOrder = async (req, res) => {
    const orderId = req.params.id;
    await orderModel.findByIdAndUpdate(orderId, { isCancelled: true }, { new: true });
    res.send("xác nhận hủy thành công");
};
module.exports = { createOrder, getListOrder, getUserOrder, acceptOrder, deliveriedOrder,cancelOrder };
