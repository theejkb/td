const passport = require('passport');
const bcrypt = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const { createToken } = require('../services/AuthServices');
const UserService = require('../services/UserServices');
const {
  bodyValidator,
  verification,
} = require('../services/ValidationServices');

const authentication = async (req, res) => {
  const fieldsVerification = verification(req);
  if (fieldsVerification) {
    res.status(422).json({
      errors: fieldsVerification,
    });
    return;
  }

  const { mail, password } = req.body;
  const user = await UserService.findOneBy({ mail }, ['password']);

  if (!user) {
    res.status(401).json({
      errors: {
        code: 'BAD_CREDENTIALS',
        message: 'Invalid password or mail',
      },
    });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({
      errors: {
        code: 'BAD_CREDENTIALS',
        message: 'Invalid password or mail',
      },
    });
    return;
  }

  try {
    const token = createToken(user);

    res.json({ token });
  } catch (error) {
    console.error('There is a problem while gerenating the token. Please check you .env and refer to .env.example !');
    console.log(error);
    console.error('There is a problem while gerenating the token. Please check you .env and refer to .env.example !');
  }
};

module.exports = (router) => {
  router.post('/auth', bodyValidator(['mail', 'password']), authentication);

  return router;
};

passport.use(
  new BearerStrategy((token, callback) => {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err || !decoded) {
        callback(null, false);
        return;
      }

      const user = await UserService.findOneBy({ _id: decoded.userId });

      if (!user) {
        callback(null, false);
        return;
      }

      return callback(null, user);
    });
  }),
);
