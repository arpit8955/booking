const jwt = require('jsonwebtoken');
const userDB = require('../models/user');
const response = require('../middlewares/response');
require('dotenv').config();
const isAuthorized = async (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;
    let decode; 
    if (!token) {
        return response.validationError(res, "Unauthorized");
    }
    try {
        decode = jwt.verify(token, process.env.JWTSECTET);;
        console.log(decode)
        const user = await userDB.findOne({ _id: decode.id }).select('-password');
        if (!user) {
            return res.status(404).send({error:"User not found with the given token"})
        }
        res.user = user;
         next();

    } catch (error) {
        console.log(error, "err")
        if (error.name === "JsonWebTokenError") {
            return response.tokenValidation(res,"Please logout and login again")
        }
        else {
            return response(res,"token is expired please try again")
        }
    }
}
module.exports = isAuthorized;