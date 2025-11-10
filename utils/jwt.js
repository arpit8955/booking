const token = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (id) => {
    return token.sign({ id }, process.env.JWTSECTET, {
        expiresIn: "15d"
    });
};
module.exports = generateToken;