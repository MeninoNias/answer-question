const Sequelize = require("sequelize");

const connection = new Sequelize('answer_question', 'ananias', 'XXXXXXXX', { 
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
