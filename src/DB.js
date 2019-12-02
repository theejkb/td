const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoURI, options);

const userSchema = require('./models/UserModel');

mongoose.model('User', userSchema);

mongoose.connection.on('connected', async () => {
  console.log(`Mongoose default connection open to ${mongoURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`handle mongo errored connections: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
