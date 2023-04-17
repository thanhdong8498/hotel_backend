const cuisineModel = require("../models/cuisineModel");
const fs = require("fs");

const createCuisine = (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push("/upload/cuisine/" + req.files[i].filename);
    }

    const newCuisineModel = new cuisineModel({
        type: req.body.type,
        title: req.body.title,
        images: reqFiles,
        listedPrice: req.body.listedPrice,
        promotionalPrice: req.body.promotionalPrice,
        description: req.body.description,
        tags: req.body.tags,
        summary: req.body.summary,
    });
    newCuisineModel
        .save()
        .then(() => res.json("new cuisine added!"))
        .catch((err) => res.status(400).json(`Error:${err}`));
};

const getListCusines = async (req, res) => {
    try {
        const cuisines = await cuisineModel.find();
        return res.status(200).send(cuisines);
    } catch (error) {
        //gửi mã lỗi để client refresh token
        console.log(error);
    }
};

const getCuisineDetail = async (req, res) => {
    const cuisineId = req.params.id;
    const cuisine = await cuisineModel.findById(cuisineId);
    res.json(cuisine);
};

const deleteCuisine = async (req, res) => {
    const cuisineId = req.params.id;
    const response = await cuisineModel.findByIdAndRemove(cuisineId);
    const images = response.images.map((image) => "." + image);
    images.map((file) => {
        fs.unlinkSync(file);
        console.log(`deleted ${file}`);
    });
    return res.status(200).send("Xóa thành công!");
};
const updateCuisine = async (req, res) => {
    const oldImage = req.body.oldImage;
    let oldFile;
    console.log(oldFile);
    const cuisineId = req.params.id;
    const reqFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push("/upload/room/" + req.files[i].filename);
    }
    if (reqFiles.length > 0 && oldImage) {
        oldFile = oldImage.map((image) => "." + image);
        oldFile.map((file) => {
            fs.unlinkSync(file);
            console.log(`deleted ${file}`);
        });
    }
    if (reqFiles.length > 0) {
        const response = await cuisineModel.findByIdAndUpdate(
            cuisineId,
            {
                type: req.body.type,
                title: req.body.title,
                images: reqFiles,
                listedPrice: req.body.listedPrice,
                promotionalPrice: req.body.promotionalPrice,
                description: req.body.description,
                tags: req.body.tags,
                summary: req.body.summary,
            },
            { new: true }
        );
        res.send("Cập nhật thành công!");
    }
    if (oldImage && reqFiles.length === 0) {
        const response = await cuisineModel.findByIdAndUpdate(
            cuisineId,
            {
                type: req.body.type,
                title: req.body.title,
                images: oldImage,
                listedPrice: req.body.listedPrice,
                promotionalPrice: req.body.promotionalPrice,
                description: req.body.description,
                tags: req.body.tags,
                summary: req.body.summary,
            },
            { new: true }
        );
        res.send("Cập nhật thành công!");
    }
};

module.exports = {
    createCuisine,
    getListCusines,
    getCuisineDetail,
    deleteCuisine,
    updateCuisine,
};
