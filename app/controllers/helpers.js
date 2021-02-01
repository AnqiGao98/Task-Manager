const db = require('../models');
const Board = db.board;
const List = db.list;
const Task = db.task;

const getBoardWithEverything = (userId) => {
  return Board.findOne({
    where: {
      UserId: userId,
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
    order: [
      [List, 'order', 'ASC'],
      [List, Task, 'order', 'ASC'],
    ],
  });
};

const getBoardWithList = async (BoardId) => {
  return await Board.findOne({
    where: {
      id: BoardId,
    },
    include: [
      {
        model: List,
      },
    ],
    order: [[List, 'order', 'ASC']],
  });
};

const getListWithTasks = async (listId) => {
  return await List.findOne({
    where: {
      id: listId,
    },
    include: [
      {
        model: Task,
      },
    ],
    order: [[Task, 'order', 'ASC']],
  });
};
module.exports = {
  getBoardWithEverything,
  getBoardWithList,
  getListWithTasks,
};
