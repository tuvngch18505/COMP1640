const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('Comment', new mongoose.Schema({
  id: { type: Number, required: true },
  ideaId: { type: Number, required: true },
  content: { type: String, maxlength: 10000, required: true },
  file: { type: Number, default: 0, required: true },
  totalReply: { type: Number, default: 0 },
  userId: { type: Number, required: true },
  isEdited: { type: Boolean, default: false }
}, {
  timestamps: true
}))

function validateComment (comment) {
  const schema = Joi.object({
    ideaId: Joi.number().required(),
    content: Joi.string().min(2).max(1000).required(),
    commentId: Joi.number()
  })
  return schema.validate(comment)
}
exports.Comment = Comment
exports.validate = validateComment
