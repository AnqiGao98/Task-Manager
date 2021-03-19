const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.loadUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check username
    let userName = await User.findOne({
      where: {
        username: username,
      },
    });
    if (userName) {
      return res
        .status(404)
        .send({ message: 'Username already exist. Try another one.' });
    }
    //check email
    let userEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userEmail) {
      return res.status(404).send({ message: 'Email already registered.' });
    }
    let user = await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    res.status(200).send({
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid credentials',
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    res.status(200).send({
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
