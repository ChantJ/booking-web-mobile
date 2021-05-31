const mongoose = require("mongoose");

const Appointments = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true, 
  },
  startDate:{
    type: String,
    required: true,
  },
  endDate:{
    type: String,
    required: true,
  },
  sellerEmail:{
    type: String,
    required: true,
  }
}, { versionKey: false });

module.exports = mongoose.model("Appointment", Appointments, "appointments");
