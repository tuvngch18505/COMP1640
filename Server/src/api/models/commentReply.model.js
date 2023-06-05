const mongoose = require('mongoose')
const Joi = require('joi')

const CommentReply = mongoose.model('CommentReply', new mongoose.Schema({
  id: { type: Number, required: true },
  ideaId: { type: Number, required: true },
  commentId: { type: Number, default: 0 },
  content: { type: String, maxlength: 10000, required: true },
  file: { type: Number, default: 0, required: true },
  totalReply: { type: Number, default: 0 },
  userId: { type: Number, required: true },
  userReply: { type: Number, default: 0 },
  isEdited: { type: Boolean, default: false }
}, {
  timestamps: true
}))

function validateCommentReply (comment) {
  const schema = Joi.object({
    ideaId: Joi.number().required(),
    content: Joi.string().min(2).max(1000).required()
  })
  return schema.validate(comment)
}
exports.CommentReply = CommentReply
exports.validate = validateCommentReply
