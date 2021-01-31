const db = require('../models');
const Board = db.board;
const List = db.list;
const Task = db.task;

const Op = db.Sequelize.Op;

exports.addTask = async (req, res) => {
  let task = await Task.create({
    ListId: req.params.list_id,
    name: req.body.name,
  });
  if (task) {
    res.status(200).send({ task });
  }
};

exports.deleteTask = async (req, res) => {
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

exports.renameTask = async (req, res) => {
  let task = await Task.update(
    { name: req.body.name },
    {
      where: {
        id: req.params.task_id,
      },
    }
  );
  if (task) {
    res.status(200).send({ task });
  }
};
