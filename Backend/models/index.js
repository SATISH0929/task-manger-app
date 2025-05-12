const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Task = require("./taskModel")(sequelize, Sequelize.DataTypes);

module.exports = db;
