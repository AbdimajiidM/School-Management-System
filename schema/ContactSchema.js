const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  passport: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  birthday: {
    type: Date,
  },
  pob: {
    type: Date,
  },
  nationality: {
    type: String,
    default: 'Somali'
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
}, {timestamps: true});

module.exports = contactSchema;
