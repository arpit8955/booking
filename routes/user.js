const express = require('express')
const { test,createUser, loginUser } = require('../controllers/user')
const router = express.Router();

router.get("/", test);
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;