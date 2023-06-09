const roomModel = require("../models/roomModel");
const fs = require("fs");
const createRoom = (req, res) => {
    const reqFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push("/upload/room/" + req.files[i].filename);
    }

    const reqRoomStatus = [];

    if (typeof req.body.roomStatus === "object") {
        for (let i = 0; i < req.body.roomStatus.length; i++) {
            reqRoomStatus.push({
                roomNo: req.body.roomStatus[i],
                isBooked: false,
                _id: req.body.roomStatus[i],
            });
        }
    } else
        reqRoomStatus.push({
            roomNo: req.body.roomStatus,
            isBooked: false,
            _id: req.body.roomStatus,
        });

    const newRoomModel = new roomModel({
        roomStatus: reqRoomStatus,
        roomType: req.body.roomType,
        title: req.body.title,
        services: req.body.services,
        adults: req.body.adults,
        children: req.body.children,
        area: req.body.area,
        price: req.body.price,
        cover: reqFiles[0],
        images: reqFiles,
        description: req.body.description,
        bookingCount: 0,
    });
    newRoomModel
        .save()
        .then(() => {
            res.json("new room added!");
        })
        .catch((err) => {
            res.status(201).json(`Error:${err}`);
            req.files.map((file) => {
                fs.unlinkSync(file.path);
            });
        });
};

const editRoom = async (req, res, next) => {
    const oldImage = req.body.oldImage;
    let oldFile;

    const roomId = req.params.id;
    const reqFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push("/upload/room/" + req.files[i].filename);
    }
    const reqRoomStatus = [];

    if (typeof req.body.roomStatus === "object") {
        for (let i = 0; i < req.body.roomStatus.length; i++) {
            reqRoomStatus.push({
                roomNo: req.body.roomStatus[i],
                isBooked: false,
                _id: req.body.roomStatus[i],
            });
        }
    } else
        reqRoomStatus.push({
            roomNo: req.body.roomStatus,
            isBooked: false,
            _id: req.body.roomStatus,
        });

    if (reqFiles.length > 0 && oldImage) {
        oldFile = oldImage.map((image) => "." + image);
        oldFile.map((file) => {
            fs.unlinkSync(file);
        });
    }
    if (reqFiles.length > 0) {
        const response = await roomModel.findByIdAndUpdate(
            roomId,
            {
                roomStatus: reqRoomStatus,
                roomType: req.body.roomType,
                title: req.body.title,
                services: req.body.services,
                adults: req.body.adults,
                children: req.body.children,
                area: req.body.area,
                price: req.body.price,
                cover: reqFiles[0],
                images: reqFiles,
                description: req.body.description,
            },
            { new: true }
        );
        res.send("cap nhat phong thanh cong");
    }

    if (oldImage && reqFiles.length === 0) {
        const response = await roomModel.findByIdAndUpdate(
            roomId,
            {
                roomStatus: reqRoomStatus,
                roomType: req.body.roomType,
                title: req.body.title,
                services: req.body.services,
                adults: req.body.adults,
                children: req.body.children,
                area: req.body.area,
                price: req.body.price,
                cover: oldImage[0],
                images: oldImage,
                description: req.body.description,
            },
            { new: true }
        );
        res.send("cap nhat phong thanh cong");
    }
};

const getRoomList = async (req, res) => {
    let sort = req.query.sort ? req.query.sort : "bookingCount";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "desc";
    }
    console.log(sortBy);
    try {
        const rooms = await roomModel.find().sort(sortBy);
        return res.status(200).send(rooms);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};

const getRoomSingle = async (req, res) => {
    let sort = req.query.sort || "title";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }
    try {
        const singleRoom = await roomModel.find({ roomType: "single" }).sort(sortBy).exec();
        return res.status(200).send(singleRoom);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};
const getRoomDouble = async (req, res) => {
    let sort = req.query.sort || "title";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }
    try {
        const doubleRoom = await roomModel.find({ roomType: "double" }).sort(sortBy).exec();
        return res.status(200).send(doubleRoom);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};
const getRoomVip = async (req, res) => {
    let sort = req.query.sort || "title";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }
    try {
        const vipRoom = await roomModel.find({ roomType: "vip" }).sort(sortBy).exec();
        return res.status(200).send(vipRoom);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};

const getRoomDetail = async (req, res) => {
    const id = req.params.id;
    const room = await roomModel.findById(id);
    res.send(room);
};

const deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    const response = await roomModel.findByIdAndRemove(roomId);
    const images = response.images.map((image) => "." + image);
    images.map((file) => {
        fs.unlinkSync(file);
    });
    return res.status(200).send("Xóa phòng thành công!");
};

module.exports = {
    createRoom,
    getRoomList,
    getRoomDetail,
    editRoom,
    deleteRoom,
    getRoomSingle,
    getRoomDouble,
    getRoomVip,
};
