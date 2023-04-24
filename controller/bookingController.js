const bookingModel = require("../models/bookingModel");
const roomModel = require("../models/roomModel");

const createBooking = async (req, res) => {
    const roomId = req.body.roomId;
    room = await roomModel.findById(roomId);
    try {
        bookingModel.create({
            fullname: req.body.fullname,
            phone: req.body.phone,
            receiveDate: req.body.receiveDate,
            checkoutDate: req.body.checkoutDate,
            roomNo: req.body.roomNo,
            roomPrice: req.body.roomPrice,
            roomCoverImage: room.cover,
            summaryPrice: req.body.summaryPrice,
            roomId: roomId,
            roomTitle: room.title,
            userId: req.userId,
            isCheckedOut: false,
            isCancelled: false,
            isReceived: false,
        });
        const reqRoomStatus = [];
        for (let i = 0; i < req.body.roomNo.length; i++) {
            reqRoomStatus.push({
                roomNo: req.body.roomNo[i],
                isBooked: true,
                _id: req.body.roomNo[i],
            });
        }

        const oldRoom = await roomModel.findById(roomId);
        let oldRoomStatus = oldRoom.roomStatus;

        let arr;

        for (let i = 0; i < reqRoomStatus.length; i++) {
            arr = oldRoomStatus.filter((room) => {
                return room.roomNo !== reqRoomStatus[i].roomNo;
            });
            oldRoomStatus = arr;
        }
        const newRoomStatus = [...arr, ...reqRoomStatus];
        await roomModel.findByIdAndUpdate(roomId, { roomStatus: newRoomStatus }, { new: true });
        return res.status(200).send("booking successfully!");
    } catch (error) {
        console.log(error);
    }
};

const getListBookings = async (req, res) => {
    try {
        const response = await bookingModel.find();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};
const checkOutBookings = async (req, res) => {
    const bookingId = req.params.id;
    const booking = await bookingModel.findById(bookingId);
    await bookingModel.findByIdAndUpdate(bookingId, { isCheckedOut: true });
    const roomId = booking.roomId;
    const roomNo = booking.roomNo;
    const reqRoomStatus = [];
    for (let i = 0; i < roomNo.length; i++) {
        reqRoomStatus.push({
            roomNo: roomNo[i],
            isBooked: false,
            _id: roomNo[i],
        });
    }

    const oldRoom = await roomModel.findById(roomId);
    let oldRoomStatus = oldRoom.roomStatus;

    let arr;

    for (let i = 0; i < reqRoomStatus.length; i++) {
        arr = oldRoomStatus.filter((room) => {
            return room.roomNo !== reqRoomStatus[i].roomNo;
        });
        oldRoomStatus = arr;
    }
    const newRoomStatus = [...arr, ...reqRoomStatus];
    await roomModel.findByIdAndUpdate(roomId, { roomStatus: newRoomStatus }, { new: true });
    res.send("Trả phòng thành công!");
};
const getUserListBooking = async (req, res) => {
    const userId = req.userId;
    const userBooking = await bookingModel.find({ userId: userId });
    res.send(userBooking);
};
const cancelledBooking = async (req, res) => {
    const bookingId = req.params.id;
    const booking = await bookingModel.findById(bookingId);
    await bookingModel.findByIdAndUpdate(bookingId, { isCancelled: true });
    const roomId = booking.roomId;
    const roomNo = booking.roomNo;
    const reqRoomStatus = [];
    for (let i = 0; i < roomNo.length; i++) {
        reqRoomStatus.push({
            roomNo: roomNo[i],
            isBooked: false,
            _id: roomNo[i],
        });
    }

    const oldRoom = await roomModel.findById(roomId);
    let oldRoomStatus = oldRoom.roomStatus;

    let arr;

    for (let i = 0; i < reqRoomStatus.length; i++) {
        arr = oldRoomStatus.filter((room) => {
            return room.roomNo !== reqRoomStatus[i].roomNo;
        });
        oldRoomStatus = arr;
    }
    const newRoomStatus = [...arr, ...reqRoomStatus];
    await roomModel.findByIdAndUpdate(roomId, { roomStatus: newRoomStatus }, { new: true });
    res.send("Hủy đặt phòng thành công!");
};
const roomDelivery = async (req, res) => {
    const bookingId = req.params.id;
    await bookingModel.findByIdAndUpdate(bookingId, { isReceived: true });
    res.send("Giao phòng thành công!");
};
const getBookingDetail = async (req, res) => {
    const id = req.params.id;
    const response = await bookingModel.findById(id);
    res.send(response);
};
module.exports = {
    createBooking,
    getListBookings,
    checkOutBookings,
    getListBookings,
    getUserListBooking,
    cancelledBooking,
    roomDelivery,
    getBookingDetail,
};
