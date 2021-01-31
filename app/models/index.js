const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);

db.board = require('../models/board.js')(sequelize, Sequelize);

db.list = require('../models/list.js')(sequelize, Sequelize);

db.task = require('../models/task.js')(sequelize, Sequelize);

const { user, board, list, task } = db;
user.hasOne(board);
board.belongsTo(user);
board.hasMany(list, { onDelete: 'cascade', hooks: true });
list.belongsTo(board);
list.hasMany(task, { onDelete: 'cascade', hooks: true });
task.belongsTo(list);

module.exports = db;
