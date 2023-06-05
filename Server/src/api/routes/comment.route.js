const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth.middleware')
const CommentController = require('../controllers/comment.controller')
const { uploadFiles } = require('../middlewares/file.middleware')

router.post('/create', [verifyToken, uploadFiles], CommentController.createComment)
router.get('/list', CommentController.listComment)
router.put('/update/:id', verifyToken, CommentController.updateComment)
router.delete('/delete/:id', verifyToken, CommentController.deleteComment)
router.delete('/delete-reply/:id', verifyToken, CommentController.deleteComment)
module.exports = router
