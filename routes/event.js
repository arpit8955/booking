const express = require("express");
const { createDraftEvent,publishEvent,cancelEvent} = require("../controllers/event");
const router = express.Router();
const isAuthorized = require('../middlewares/auth');
const { isOrganization } = require("../middlewares/roleCheck");

// router.get("/", test);
router.post("/",isAuthorized,isOrganization, createDraftEvent);
router.post("/:id/publish", isAuthorized, publishEvent);
router.post("/:id/cancel", isAuthorized, cancelEvent);


module.exports = router;
