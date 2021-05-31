var express = require("express");
var router = express.Router();
const User = require("../models/users");
const Appointment = require("../models/appointments");
const authenticate = require("../middleware/authenticate");
const setCookie = require("../middleware/setCookie");

router.get("/:pageNum", (req, res, next) => {
  let pageNum=parseInt(req.params.pageNum.split(":")[1])
  User.find({role:"seller"})
  .then(sellers=>{
    res.json({data:sellers.slice(pageNum*5, (pageNum+1)*5), total:sellers.length})})
  .catch(err=>res.json(err))
});

router.post("/searchbyname", (req, res, next)=>{
  User.find({role:"seller"})
  .then(sellers=>{
    let result=sellers.filter(seller=>seller.name.includes(req.body.search))
    res.json({data:result.slice(req.body.pageNum*5, (req.body.pageNum+1)*5), total:result.length})})
  .catch(err=>res.json(err))
})

router.get("/myappointments/:email",authenticate, (req, res, next)=>{
  Appointment.find({ email: req.params.email.split(":")[1] })
  .then((appointments) => {
    setCookie(res, req.user, appointments);
  })
  .catch((error) => res.json(error));
})

router.get("/appointments/:email", authenticate, function (req, res, next) {
    Appointment.find({ sellerEmail: req.params.email.split(":")[1] })
      .then((appointments) => {
        setCookie(res, req.user, appointments);
      })
      .catch((error) => res.json(error));

});

router.post("/addappointment", (req, res, next) => {
    let appointment = new Appointment(req.body.data);
    appointment
      .save()
      .then((result) => Appointment.find())
      .then((appointments) => {
        setCookie(res, req.user, appointments);
      })
      .catch((err) => res.json(err));

});

module.exports = router;
