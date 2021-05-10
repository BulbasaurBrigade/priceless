const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
    content: {
        type: Sequelize.TEXT
    },
    authorId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Message