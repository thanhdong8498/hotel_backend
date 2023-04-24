const cuisineModel = require("../models/cuisineModel");
const roomModel = require("../models/roomModel");

const getSearch = async (req, res) => {
    const searchQuery = req.query.query;
    let results = [];
    const rooms = await roomModel.find({ title: { $regex: searchQuery, $options: "i" } }).exec();
    const cuisines = await cuisineModel.find({ title: { $regex: searchQuery, $options: "i" } }).exec();
    if (rooms.length > 0) {
        results = rooms;
        res.send(results);
    } else if (cuisines.length > 0) {
        results = cuisines;
        res.send(results);
    } else res.send(null);
};

module.exports = {
    getSearch,
};
