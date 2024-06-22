const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  bidAmount: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bidDate: {
    type: Date,
    default: Date.now
  }
});

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  district:{
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactNumber:{
    type:Number,
    required:true
  },
  dateFound: {
    type: Date
  },
  bid: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bids: [BidSchema]
});

module.exports = mongoose.model('Item', ItemSchema);
