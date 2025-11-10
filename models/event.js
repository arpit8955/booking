const mongoose = require("mongoose");
const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    currentStatus: {
      type: String,
      enum: ["PENDING", "PUBLISHED", "CANCELLED"],
      default: "PENDING",
    },
    date: {
      type: String,
    },
    totalSeats: {
      type: Number,
    },
    availableSeats: {
      type: String,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;
