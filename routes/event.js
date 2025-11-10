const express = require("express");
const { createDraftEvent,publishEvent,cancelEvent} = require("../controllers/event");
const router = express.Router();
const isAuthorized = require('../middlewares/auth')

// router.get("/", test);
router.post("/",isAuthorized, createDraftEvent);
router.post("/:id/publish", isAuthorized, publishEvent);
router.post("/:id/cancel", isAuthorized, cancelEvent);


module.exports = router;
