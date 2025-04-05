const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

async function connectToDB() {
    try {
        mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToDB;