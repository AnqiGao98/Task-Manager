const { getBoardWithEverything } = require('./helpers');
const db = require('../models');
const Board = db.board;
const List = db.list;
const Task = db.task;

const Op = db.Sequelize.Op;

exports.getBoard = async (req, res) => {
  let board = await Board.findOne({
    where: {
      UserId: req.userId,
    },
  });
  if (board) {
    res.status(200).send({ board });
  }
};

exports.createBoard = async (req, res) => {
  let board = await Board.create({
    name: req.body.name,
    UserId: req.userId,
  });
  if (board) {
    res.status(200).send({ board });
  }
};

exports.getBoardAll = async (req, res) => {
  console.log(req.userId);
  let board = await getBoardWithEverything(req.userId);
  if (board) {
    res.status(200).send({ board });
  }
};
