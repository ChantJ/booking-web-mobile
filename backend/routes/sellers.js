var express = require("express");
var router = express.Router();
const Appointment = require("../models/appointments");
const authenticate = require("../middleware/authenticate");
const setCookie = require("../middleware/setCookie");
var ObjectID = require("mongodb").ObjectID;

router.get("/appointments", authenticate, function (req, res, next) {
  if (req.user.role === "seller") {
    Appointment.find({ sellerEmail: req.user.email })
      .then((appointments) => {
        setCookie(res, req.user, appointments);
      })
      .catch((error) => res.json(error));
  } else {
    res.status(400).json("Not authorized for this feature");
  }
});

router.post("/approvereject", authenticate, (req, res, next) => {
  if (req.user.role === "seller") {
    Appointment.updateOne({ _id: ObjectID(req.body._id) }, req.body)
      .then((result) => Appointment.find())
      .then((appointments) => {
        setCookie(res, req.user, appointments);
      })
      .catch((err) => res.json(err));
  } else {
    res.status(400).json("Not authorized for this feature");
  }
});
router.post("/changeavailablity", authenticate, (req, res, next) => {
  if (req.user.role === "seller") {
    if (!req.body.isAvailable) {
      let appointment = new Appointment(req.body.data);
      appointment
        .save()
        .then((result) => Appointment.find())
        .then((appointments) => {
          setCookie(res, req.user, appointments);
        })
        .catch((err) => res.json(err));
    } else {
      Appointment.deleteOne({ _id: req.body.id })
        .then((result) => Appointment.find())
        .then((appointments) => {
          setCookie(res, req.user, appointments);
        })
        .catch((err) => res.json(err));
    }
  } else {
    res.status(400).json("Not authorized for this feature");
  }
});

module.exports = router;
