const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  mail: { type: 'string', unique: true, required: true },
  password: { type: 'string', required: true, select: false },
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  // specialization: { type: 'string', required: true},
  // class: { type: 'string', required: true, default: 'B3 Informatique'},
  // group: { type: 'string', required: true},
  // isLate: { type: 'boolean' },
  isAbsent: { type: 'boolean', required: true, default: false },
  imageURL: { type: 'string' }, // TODO: choisir si on stock l'image dans la BDD ou si on chope une url externe
  __v: { type: Number, select: false },
});

userSchema.plugin(uniqueValidator);

module.exports = userSchema;
// Use this in case the top line doesn't work, to follow the guides
// module.exports = mongoose.model('User',userSchema);
