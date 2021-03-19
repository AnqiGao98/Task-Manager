module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define('List', {
    name: {
      type: Sequelize.STRING,
      defaultValue: 'Add List title...',
    },
    order: {
      type: Sequelize.INTEGER,
    },
  });

  List.prototype.getUser = async function () {
    const board = await this.getBoard();
    return await board.getUser();
  };

  List.addHook('beforeValidate', async (list) => {
    try {
      const board = await sequelize.models.Board.findByPk(list.BoardId);
      if (board) {
        const lists = await board.getLists();
        if (!list.order) {
          list.order = lists.length + 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  return List;
};
