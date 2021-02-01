const db = require('../models');
const { getBoardWithList, getBoardWithEverything } = require('./helpers');
const Board = db.board;
const List = db.list;
const Task = db.task;

const Op = db.Sequelize.Op;

exports.createList = async (req, res) => {
  const board = await getBoardWithList(req.params.id);
  if (!board) {
    return res.status(404).send({ message: 'Board Not Found' });
  }
  let list = await List.create({
    BoardId: req.params.id,
    name: req.body.name,
  });
  if (list) {
    res.status(200).send({ list });
  }
};

exports.getLists = async (req, res) => {
  const board = await getBoardWithList(req.params.id);
  if (!board) {
    return res.status(404).send({ message: 'Board Not Found' });
  }
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
  const board = await getBoardWithList(req.params.id);
  if (!board) {
    return res.status(404).send({ message: 'Board Not Found' });
  }
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
  const board = await getBoardWithList(req.params.id);
  if (!board) {
    return res.status(404).send({ message: 'Board Not Found' });
  }
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

///board/:id/list/:list_id/reorder
exports.reorderList = async (req, res) => {
  try {
    let board = await getBoardWithList(req.params.id);
    if (!board) {
      res.status(404).send({ message: 'Board not found.' });
    }

    let list = await List.findByPk(req.params.list_id);
    if (!list) {
      res.status(404).send({ message: 'List not found.' });
    }

    const listIds = board.Lists.map((list) => list.id);
    if (!listIds.includes(list.id)) {
      res.status(404).send({ message: 'List does not belong to board.' });
    }

    const reorderNum = req.body.orderNum;
    board.Lists.splice(listIds.indexOf(list.id), 1);
    board.Lists.splice(reorderNum, 0, list);

    //update all list's order
    for (let i of board.Lists) {
      await i.update({ order: board.Lists.indexOf(i) + 1 });
    }
    board = await getBoardWithEverything(req.userId);
    res.status(200).send({ board });
  } catch (error) {
    res.status(500).send({ error });
  }
};