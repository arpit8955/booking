const response = require('../middlewares/response');
const userDB = require('../models/user')
const eventDB = require('../models/event')
const createDraftEvent = async (req, res) => {
    const { name, date, totalSeats } = req.body
    console.log(req);
    const event = await eventDB({
        name,
        date,
        totalSeats,
        availableSeats: totalSeats,
        // ownerId: req.user._id
    }).save();
    if (!event) {
        return response.validationError(res, "unable to create draft event");
    }
    response.successResponse(res, event, "Succesfully created draft event")
};
const publishEvent = async (req, res) => {
    const { id } = req.params;
    const findEvent = await eventDB.findOne({ _id: id });
    if (!findEvent) {
        return response.validationError(res, "Event not found")
    }
    const updatedStatus = await eventDB.updateOne(
        { _id: findEvent._id },
        { $set: { currentStatus: "PUBLISHED" } }, { new: true }
    );
    return response.successResponse(res,updatedStatus,"Successfully published")
};
const cancelEvent = async (req, res) => {
  const { id } = req.params;
  const findEvent = await eventDB.findOne({ _id: id });
  if (!findEvent) {
    return response.validationError(res, "Event not found");
  }
  const updatedStatus = await eventDB.updateOne(
    { _id: findEvent._id },
    { $set: { currentStatus: "CANCELLED" } },
    { new: true }
    );
    return response.successResponse(
      res,
      updatedStatus,
      "Successfully Cancelled"
    );
};
const updateEvent = async (req, res) => {
    const { name, date, totalSeats } = req.body;
    const updateData = {
        ...(name&&{name:name}),
        ...(totalSeats&&{totalSeats:totalSeats}), 
        ...(totalSeats&&{totalSeats:totalSeats}), 
    }
}
module.exports = { createDraftEvent,publishEvent,cancelEvent };