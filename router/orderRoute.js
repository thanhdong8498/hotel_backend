const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/create", jsonParser, urlencodedParser, [authMiddleware.isAuthentication], orderController.createOrder);
router.get(
    "/list",
    jsonParser,
    urlencodedParser,
    [authMiddleware.isAuthentication, authMiddleware.isAdmin],
    orderController.getListOrder
);
router.get("/user", jsonParser, urlencodedParser, [authMiddleware.isAuthentication], orderController.getUserOrder);
router.put(
    "/accept/:id",
    jsonParser,
    urlencodedParser,
    [authMiddleware.isAuthentication, authMiddleware.isAdmin],
    orderController.acceptOrder
);
router.put(
    "/deliveried/:id",
    jsonParser,
    urlencodedParser,
    [authMiddleware.isAuthentication, authMiddleware.isAdmin],
    orderController.deliveriedOrder
);

module.exports = router;
