const contactModel = require("../models/contactModel");

const createContact = (req, res) => {
    try {
        contactModel.create({
            fullname: req.body.fullName,
            email: req.body.email,
            message: req.body.message,
        });
        res.send("Gửi thông tin liên hệ thành công!");
    } catch (error) {
        console.log(error);
    }
};
const getListContact = async (req, res) => {
    try {
        const contacts = await contactModel.find();
        res.send(contacts);
    } catch (error) {
        console.log(error);
    }
};
module.exports = { createContact, getListContact };
