const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post(
    "/create",
    jsonParser,
    urlencodedParser,
    [authMiddleware.isAuthentication],
    bookingController.createBooking
);
router.get("/list", bookingController.getListBookings);
router.put("/checkout/:id", jsonParser, urlencodedParser, bookingController.checkOutBookings);

module.exports = router;
