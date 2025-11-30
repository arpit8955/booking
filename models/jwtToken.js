const mongoose = require('mongoose');

const jwtTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    token: {
        type:String
    },
    createdOn: {
        type:Number
    },
    expiry: {
        type:Number
    }
});
module.exports = mongoose.model("Token", jwtTokenSchema);