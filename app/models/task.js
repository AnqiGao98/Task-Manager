module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('Task', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  });

  Task.addHook('beforeValidate', async (task) => {
    try {
      const list = await sequelize.models.List.findByPk(task.ListId);
      if (list) {
        const tasks = await list.getTasks();
        if (!task.order) {
          task.order = tasks.length + 1;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  return Task;
};
