const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type:String,
    enum:['Male','Female','Other'],
    required:true
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  mobile:{
    type:Number,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);