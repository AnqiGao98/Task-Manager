module.exports = (sequelize, Sequelize) => {
  const Board = sequelize.define('Board', {
    name: {
      type: Sequelize.STRING,
      defaultValue: 'Add board title...',
    },
  });

  return Board;
};
