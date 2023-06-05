
const express = require('express')
const router = express.Router()
const userRouter = require('./user.route')
const eventRouter = require('./event.route')
const ideaRouter = require('./idea.route')
const categoryRoute = require('./category.route')
const commentRoute = require('./comment.route')

router.use('/user', userRouter)
router.use('/event', eventRouter)
router.use('/idea', ideaRouter)
router.use('/category', categoryRoute)
router.use('/comment', commentRoute)

module.exports = router
