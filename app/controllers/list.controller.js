const db = require('../models');
const Board = db.board;
const List = db.list;
const Task = db.task;

const Op = db.Sequelize.Op;

exports.createList = async (req, res) => {
  let list = await List.create({
    BoardId: req.params.id,
    name: req.body.name,
  });
  if (list) {
    res.status(200).send({ list });
  }
};

exports.getLists = async (req, res) => {
  let lists = await List.findAll({
    where: {
      BoardId: req.params.id,
    },
  });
  if (lists) {
    res.status(200).send({ lists });
  }
};

exports.renameList = async (req, res) => {
  let list = await List.update(
    { name: req.body.name },
    {
      where: {
        id: req.params.list_id,
      },
    }
  );
  if (list) {
    res.status(200).send({ list });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await List.destroy({
      where: {
        id: req.params.list_id,
      },
    });
    res.status(200);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
