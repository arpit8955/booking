const mongoose = require('mongoose');
const connectDB = async (url) => {
    await mongoose.connect(url).then(e => {
        console.log("Successfully connected to the database")
    }).catch(e => {
        console.log("failed to connect to database")
        console.log(e, "error")
    })
};
module.exports = connectDB;