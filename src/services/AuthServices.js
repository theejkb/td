const jwt = require('jsonwebtoken');
const passport = require('passport');

const authenticateRoute = () => passport.authenticate('bearer', { session: false });

const createToken = (user) => jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
  expiresIn: Number(process.env.JWT_TOKEN_EXPIRATION_TIME),
});

module.exports = { createToken, authenticateRoute };
