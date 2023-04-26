const bookingModel = require("../models/bookingModel");
const orderModel = require("../models/orderModel");
const moment = require("moment");
const getRevenue = async (req, res) => {
    const booking = await bookingModel.find({
        isCheckedOut: true,
    });
    const order = await orderModel.find({
        isDelivery: true,
    });
    console.log(moment(new Date()).format("DD/MM/YYYY"));
    const bookingRevenue = booking.map((item) => item.summaryPrice).reduce((prev, current) => prev + current);
    const orderRevenue = order.map((item) => item.totalPrice).reduce((prev, current) => prev + current);
    const totalRevenue = bookingRevenue + orderRevenue;
    const todayOrder = order.filter((item) => {
        return moment(item.updatedAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY");
    });
    const todayBooking = booking.filter((item) => {
        return moment(item.updatedAt).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY");
    });
    const todayBookingRevenue =
        todayBooking.length > 0
            ? todayBooking.map((item) => item.summaryPrice).reduce((prev, current) => prev + current)
            : 0;
    const todayOrderRevenue =
        todayOrder.length > 0 ? todayOrder.map((item) => item.totalPrice).reduce((prev, current) => prev + current) : 0;
    const todayOrderCount = todayOrder.length;
    const todayBookingCount = todayBooking.length;
    const totalBookingCount = booking.length;
    const totalOrderCount = order.length;
    const todayRevenue = todayOrderRevenue + todayBookingRevenue;

    const response = [
        {
            orderRevenue,
            bookingRevenue,
            totalRevenue,
            todayOrderCount,
            todayBookingCount,
            todayBookingRevenue,
            todayOrderRevenue,
            totalBookingCount,
            totalOrderCount,
            todayRevenue,
        },
    ];
    res.status(200).send(response);
};

module.exports = { getRevenue };
