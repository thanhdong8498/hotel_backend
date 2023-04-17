const express = require("express");

const userRoute = require("./router/userRoute");
const roomRoute = require("./router/roomRoute");
const authRoute = require("./router/authRoute");
const cuisineRoute = require("./router/cuisineRoute");
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

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
