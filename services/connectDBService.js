const mongoose = require("mongoose");

async function connectDatabase() {
    const uri = `mongodb+srv://thanhdonghcmute:thanhdong8498@cluster0.fs9fxcl.mongodb.net/hotel_management`;
    try {
        // await mongoose.connect(`mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`);
        await mongoose.connect(uri);
        console.log("Connect succesfully!");
    } catch (error) {
        handleError(error);
    }
}

module.exports = connectDatabase;
