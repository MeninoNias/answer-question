const Sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define('answers', {
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    question:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(()=> console.log('Create answer table'));

module.exports = Answer;