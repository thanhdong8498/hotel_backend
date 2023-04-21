const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userName: String,
        phone: String,
        cuisineName: String,
        promotionalPrice: Number,
        quantity: Number,
        totalPrice: Number,
        cuisineId: { type: mongoose.Schema.Types.ObjectId, ref: "cuisine" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        isAccept: Boolean,
        isDelivery: Boolean,
        cover: String,
    },
    { timestamps: true }
);
const orderModel = new mongoose.model("order", orderSchema);
module.exports = orderModel;
