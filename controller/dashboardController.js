const bookingModel = require("../models/bookingModel");
const orderModel = require("../models/orderModel");

const getRevenue = async (req, res) => {
    const booking = await bookingModel.find({
        isCheckedOut: true,
    });
    const order = await orderModel.find({
        isDelivery: true,
    });
    console.log(booking);
    const bookingRevenue = booking.map((item) => item.summaryPrice).reduce((prev, current) => prev + current);
    const orderRevenue = order.map((item) => item.totalPrice).reduce((prev, current) => prev + current);
    const totalRevenue = bookingRevenue + orderRevenue;
    const todayOrder = order.filter((item) => {
        return (
            item.updatedAt.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).split(",")[0] ===
            new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).split(",")[0]
        );
    });
    const todayBooking = booking.filter((item) => {
        return (
            item.updatedAt.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).split(",")[0] ===
            new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }).split(",")[0]
        );
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
