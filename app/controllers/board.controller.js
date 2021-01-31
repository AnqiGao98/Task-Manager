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

exports.getBoardWithEverything = async (req, res) => {
  let board = await Board.findOne({
    where: {
      UserId: req.userId,
    },
    include: [
      {
        model: List,
        include: [
          {
            model: Task,
          },
        ],
      },
    ],
  });
  if (board) {
    res.status(200).send({ board });
  }
};
