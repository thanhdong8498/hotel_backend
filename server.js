const express = require("express");

const userRoute = require("./router/userRoute");
const roomRoute = require("./router/roomRoute");
const authRoute = require("./router/authRoute");
const cuisineRoute = require("./router/cuisineRoute");
const searchRoute = require("./router/searchRoute");
const bookingRoute = require("./router/bookingRoute");
const orderRoute = require("./router/orderRoute");
const contactRoute = require("./router/contactRoute");
const galleryRoute = require("./router/galleryRoute");
const dashboardRoute = require("./router/dashboardRoute");
const connectDb = require("./services/connectDBService");
const cors = require("cors");

const app = express();

require("dotenv").config();

// connect to DB
connectDb();

//cors
app.use(cors());

app.use("/upload", express.static("upload"));

app.use("/auth/admin", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/room", roomRoute);
app.use("/api/cuisine", cuisineRoute);
app.use("/search", searchRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/order", orderRoute);
app.use("/api/contact", contactRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "https://hotel-frontend-ntd.vercel.app/",
        methods: ["GET", "POST"],
    },
});

httpServer.listen(5000);
io.on("connection", (socket) => {
    console.log("connect to socket.io");
    socket.on("ordered", () => {
        io.emit("updateadminorder");
    });
    socket.on("accept", () => {
        io.emit("updateuserorder");
    });
    socket.on("booked", () => {
        io.emit("updatedetail");
    });
    socket.on("deliveried", () => {
        io.emit("updateuserorder");
    });
    socket.on("adminbookingcanceled", () => {
        io.emit("updateuserbooking");
    });
    socket.on("checkedout", () => {
        io.emit("updateuserbooking");
    });
    socket.on("roomdeliveried", () => {
        io.emit("updateuserbooking");
    });
    socket.on("userbookingcancelled", () => {
        io.emit("updatedetail");
    });
    socket.on("usercancelledorder", () => {
        io.emit("updateadminorder");
    });
});
