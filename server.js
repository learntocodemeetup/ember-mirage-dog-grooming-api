var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

mongoose.connect('mongodb://localhost/whysobutthurt');

var appointmentSchema = mongoose.Schema({

  ownerName: String,
  suburb: String,
  appointmentTime: Date,
  dogBreed: String,
  dogName: String,
  dogSize: String, 
  
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

app.get('/api/appointments', function(req, res) {
  
  Appointment.find({}, function(err, appointments) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({
        appointments: appointments
      });
    }
  });

})

app.post('/api/appointments', function(req, res) {

  console.log('I received a request ');
  console.log(req.body);

  var appt = req.body.appointment

  var appointment = new Appointment({ 

    ownerName: appt.ownerName,
    suburb: appt.suburb,
    appointmentTime: appt.appointmentTime,
    dogBreed: appt.dogBreed,
    dogName: appt.dogName,
    dogSize: appt.dogSize,

  });

  appointment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        appointment: appointment
      });
    }
  });

  // res.json({
  //   "appointment" : {
  //     ownerName: 'dsds',
  //     suburb: 'dsdsd',
  //     appointmentTime: 'fdfd',
  //     dogBreed: 'fdfd',
  //     dogName: 'fdfd',
  //     dogSize: 'dfd',
  //   }  
  // })

})

app.listen(3000, function() {
  console.log("Server is working");
})