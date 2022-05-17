const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const contactSchema = {
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    // required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
    trim: true,
    lowercase: true,
    required: true,
    enum: ['male', 'female']
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
};

module.exports = contactSchema;