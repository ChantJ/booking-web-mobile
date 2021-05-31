var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Appointment = require("../models/appointments");
const authenticate = require("../middleware/authenticate");
const setCookie = require("../middleware/setCookie");
var ObjectID = require("mongodb").ObjectID;

router.get("/", authenticate, (req, res, next) => {
  res.json(req.user);
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email.toLowerCase(), role: req.body.role })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          setCookie(res, user, user);
        } else {
          res.status(400).json("Incorrect Password!");
        }
      } else {
        res.status(401).json("Email Not Found!");
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/logout", (req, res, next) => {
  res.cookie("token", "", { httpOnly: true });
  res.json("logged out successfully")
});


module.exports = router;
