const db = require('../models');
const {
  getBoardWithList,
  getBoardWithEverything,
  getBoard,
  getList,
} = require('./helpers');
const Board = db.board;
const List = db.list;
const Task = db.task;

const Op = db.Sequelize.Op;

exports.createList = async (req, res) => {
  try {
    let board = await getBoard(req.params.id);
    if (!board) {
      return res.status(404).send({ message: 'Board Not Found' });
    }
    if (board.UserId !== req.userId) {
      return res.status(403).send({ message: 'Not Authorized' });
    }
    await List.create({
      BoardId: req.params.id,
      name: req.body.name,
    });
    board = await getBoardWithEverything(req.userId);
    res.status(200).send({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getLists = async (req, res) => {
  const board = await getBoard(req.params.id);
  if (!board) {
    return res.status(404).send({ message: 'Board Not Found' });
  }
  if (board.UserId !== req.userId) {
    return res.status(403).send({ message: 'Not Authorized' });
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

//board/:id/list/:list_id/rename
exports.renameList = async (req, res) => {
  try {
    let board = await getBoard(req.params.id);
    if (!board) {
      return res.status(404).send({ message: 'Board Not Found' });
    }
    if (board.UserId !== req.userId) {
      return res.status(403).send({ message: 'Not Authorized' });
    }
    let list = await getList(req.params.list_id);
    if (!list) {
      return res.status(404).send({ message: 'list Not Found' });
    }
    await List.update(
      { name: req.body.name },
      {
        where: {
          id: req.params.list_id,
        },
      }
    );
    board = await getBoardWithEverything(req.userId);
    res.status(200).send({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.deleteList = async (req, res) => {
  try {
    let board = await getBoard(req.params.id);
    if (!board) {
      return res.status(404).send({ message: 'Board Not Found' });
    }
    if (board.UserId !== req.userId) {
      return res.status(403).send({ message: 'Not Authorized' });
    }
    let list = await getList(req.params.list_id);
    if (!list) {
      return res.status(404).send({ message: 'list Not Found' });
    }
    await List.destroy({
      where: {
        id: req.params.list_id,
      },
    });
    board = await getBoardWithEverything(req.userId);
    res.status(200).send({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
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
