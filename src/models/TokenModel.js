const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: 'number', required: true },
  token: { type: 'sting', required: true },
});

module.exports = userSchema;
