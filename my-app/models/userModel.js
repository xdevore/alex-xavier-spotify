const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  lastPull: {
    type: Number, 
    required: false
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
