const db = require('../models/index');
const User = db.user;

verifySignUp = async (req, res, next) => {
  try {
    //username
    const userWithName = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (userWithName) {
      res.status(400).send({
        message: 'Register failed. Username already exists.',
      });
      return;
    } else {
      //check email
      const userWithEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userWithEmail) {
        res.status(400).send({
          message: 'Register failed. Email already in use.',
        });
        return;
      }
      next();
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = verifySignUp;
