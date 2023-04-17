const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/register", jsonParser, urlencodedParser, authController.register);
router.post("/login", jsonParser, urlencodedParser, authController.login);
router.get("/me", [authMiddleware.isAuthentication], authController.getUserLogin);

module.exports = router;
