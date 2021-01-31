var express = require('express');
var router = express.Router();

//const { verifySignUp, verifyToken } = require('../app/middleware');
const boardController = require('../app/controllers/board.controller.js');
const listController = require('../app/controllers/list.controller.js');
const taskController = require('../app/controllers/task.controller.js');

const auth = require('../app/middleware/authjwt');
//board
router.get('/', auth, boardController.getBoardWithEverything);
router.post('/', auth, boardController.createBoard);

//list
router.get('/:id/lists', auth, listController.getLists);
router.post('/:id/list', auth, listController.createList);
router.delete('/:id/list/:list_id', auth, listController.deleteList);
router.post('/:id/list/:list_id/rename', auth, listController.renameList);

//tasks
router.post('/:id/list/:list_id/task', auth, taskController.addTask);
router.delete('/:id/list/:list_id/task', auth, taskController.deleteTask);
router.post('/:id/list/:list_id/task/rename', auth, taskController.renameTask);

module.exports = router;
