const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('graphql_books', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
