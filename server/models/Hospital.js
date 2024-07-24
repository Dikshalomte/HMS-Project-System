
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: String,
  city: String,
  speciality: String,
  noOfDoctors: String,
  noOfDepartments: String,
  description: String,
  image: String
});

const Hospital = mongoose.model('newHospital', hospitalSchema);

module.exports = Hospital;
