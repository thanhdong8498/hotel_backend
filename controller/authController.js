const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { lastName, firstName, email, phone, password, role } = req.body;
        // check email duplication
        const duplicateEmail = await userModel.findOne({ email: email });

        if (duplicateEmail === null) {
            // creat data in database
            userModel.create({
                lastName: lastName,
                firstName: firstName,
                email: email,
                phone: phone,
                password: bcrypt.hashSync(password, 10),
                role: role || "regular",
            });
            return res.status(200).send("register user");
        } else res.status(201).send({ title: "Email đã tồn tại trên hệ thống" });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    // check email,password
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(201).send("Email không tồn tại trên hệ thống!");
    }
    //check password
    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassword) {
        return res.status(201).send("Password bạn vừa nhập không đúng!");
    }

    const jwtToken = jwt.sign(
        {
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
        },
        process.env.SECRET_JWT,
        {
            expiresIn: "1h",
        }
    );

    return res.status(200).send({
        accessToken: jwtToken,
    });
};

const getUserLogin = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        res.json({
            _id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            role: user.role,
            phone: user.phone,
        });
    } catch (error) {}
};

module.exports = {
    register,
    login,
    getUserLogin,
};
