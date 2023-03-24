const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: Date, required: true, default: Date.now() },
  endTime: { type: Date, required: true, default: Date.now() },
});
module.exports = mongoose.model("events", eventSchema);
