const router = require("express").Router();
const { Op } = require("sequelize")
const {
    models: { Chat, Post, User },
} = require("../db")
module.exports = router

router.get("/users/:id", async (req, res, next) => {
    try {
        const chats = await Post.findAll({ 
            include: {model: User, as: 'recipient' },
            // where: {
            //     [Op.or]: [
            //         {
            //             RecipientId: req.params.id
            //         },
            //         {
            //             '$post.posterId$': req.params.id
            //         }
            //     ]
            // } 
        })
        res.send(chats)
    } catch (err) {
        next(err)
    }
})