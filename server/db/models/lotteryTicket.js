const Sequelize = require('sequelize')
const db = require('../db')

const LotteryTicket = db.define('lotteryTicket', {
    requesterId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = LotteryTicket