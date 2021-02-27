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
  try {
    board = await getBoardWithEverything(req.userId);
    res.json({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.renameBoard = async (req, res) => {
  try {
    let board = await Board.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!board) {
      return res.status(404).send({ message: 'Board Not Found' });
    }
    board.name = req.body.name;
    board.save();
    res.json({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
