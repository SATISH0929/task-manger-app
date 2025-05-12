module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Task", {
    taskTitle: DataTypes.STRING,
    taskDescription: DataTypes.TEXT,
    taskDueDate: DataTypes.DATE,
    taskStatus: DataTypes.STRING,
    taskRemarks: DataTypes.TEXT,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
  });
};
