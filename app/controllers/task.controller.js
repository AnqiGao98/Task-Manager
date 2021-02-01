const db = require('../models');
const {
  getBoardWithList,
  getBoardWithEverything,
  getListWithTasks,
} = require('./helpers');
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

///board/:id/task/:task_id/reorder
exports.reorderTask = async (req, res) => {
  try {
    const { fromListId, toListId, orderNum } = req.body;
    let board = await getBoardWithList(req.params.id);
    if (!board) {
      res.status(404).send({ message: 'Board not found.' });
    }
    let fromList = await getListWithTasks(fromListId);
    if (!fromList) {
      res.status(404).send({ message: 'fromList not found.' });
    }
    let toList = await getListWithTasks(toListId);
    if (!toList) {
      res.status(404).send({ message: 'toList not found.' });
    }
    const task = await Task.findByPk(req.params.task_id);
    if (!task) {
      res.status(404).send({ message: 'Task not found.' });
    }

    const taskIds = fromList.Tasks.map((task) => task.id);
    if (!taskIds.includes(task.id)) {
      res.status(404).send({ message: 'Task does not belong to fromBaord.' });
    }

    if (fromListId === toListId) {
      fromList.Tasks.splice(taskIds.indexOf(task.id), 1);
      fromList.Tasks.splice(orderNum, 0, task);

      //update all task's order within the list
      for (let i of fromList.Tasks) {
        await i.update({ order: fromList.Tasks.indexOf(i) + 1 });
      }
    } else {
      fromList.Tasks.splice(taskIds.indexOf(task.id), 1);
      toList.Tasks.splice(orderNum, 0, task);

      //update all task's order within the list
      for (let i of toList.Tasks) {
        await i.update({ order: toList.Tasks.indexOf(i) + 1 });
      }
    }
    board = await getBoardWithEverything(req.userId);
    res.status(200).send({ board });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
};
