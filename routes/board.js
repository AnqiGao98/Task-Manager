var express = require('express');
var router = express.Router();

//const { verifySignUp, verifyToken } = require('../app/middleware');
const boardController = require('../app/controllers/board.controller.js');
const listController = require('../app/controllers/list.controller.js');
const taskController = require('../app/controllers/task.controller.js');

const auth = require('../app/middleware/authjwt');
//board
router.get('/', auth, boardController.getBoardAll);
router.post('/', auth, boardController.createBoard);
router.get('/test', auth, boardController.getBoard);
router.put('/:id/rename', auth, boardController.renameBoard);

//list
router.get('/:id/lists', auth, listController.getLists);
router.post('/:id/lists', auth, listController.createList);
router.delete('/:id/list/:list_id', auth, listController.deleteList);
router.put('/:id/list/:list_id/rename', auth, listController.renameList);
router.put('/:id/list/:list_id/reorder', auth, listController.reorderList);

//tasks
router.post('/:id/list/:list_id/task', auth, taskController.addTask);
router.delete('/:id/task/:task_id', auth, taskController.deleteTask);
router.put('/:id/task/:task_id/edit', auth, taskController.updateTask);
router.put('/:id/task/:task_id/reorder', auth, taskController.reorderTask);

module.exports = router;
