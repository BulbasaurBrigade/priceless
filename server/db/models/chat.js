const Sequelize = require('sequelize'),
const db = require('../db')

const Chat = db.define('chat', {
    recipientId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    posterId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Chat