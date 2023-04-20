const cuisineModel = require("../models/cuisineModel");
const roomModel = require("../models/roomModel");

const getSearch = async (req, res) => {
    const searchQuery = req.query.query;
    let results;
    const rooms = await roomModel.find({ title: { $regex: searchQuery, $options: "i" } }).exec();
    const cuisines = await cuisineModel.find({ title: { $regex: searchQuery, $options: "i" } }).exec();
    if (rooms.length > 0) {
        results = rooms;
    } else if (cuisines.length > 0) {
        results = cuisines;

        res.send(results);
    }
    res.send(results);
};

module.exports = {
    getSearch,
};
