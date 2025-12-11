const response = require('../middlewares/response');
const userDB = require('../models/user')
const bcrypt = require('bcryptjs');
const jwtTokenDB = require('../models/jwtToken');
const generateToken = require('../utils/jwt')
const test = async (req, res) => {
   response.successResponse(res,"","working fine from server from automation new")
}
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    // if (!name || !email)
    const user = await userDB({
        name,
        email,
        password: hashedPassword,
        role: role
    }).save();
    if (!user) {
        return response.validationError(res, "unable to create user");
    }
    response.successResponse(res, user, "Successfully created the user");
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return response.validationError(res,`can not proceed without ${!email?email:!password?password:"proper details"}`)
    }
    const findUser = await userDB.findOne({ email: email });
    if (!findUser) {
        return response.notFountError(res, "User not found");
    }
    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword) {
        return response.errorResponse(res,"incorrect password")
    }
    const generatedToken = generateToken(findUser._id);
    console.log(generateToken,"tokeen")
    const token = { generatedToken };
    console.log(token,"rrrr")
    response.successResponse(res, token, "Login Successful");
}
module.exports = { test, createUser,loginUser };