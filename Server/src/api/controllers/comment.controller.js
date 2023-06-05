const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const fs = require('fs')
const getNextSequenceValue = require('../utils/icrement.db')
const Files = require('../models/file.model')
const { Comment, validate } = require('../models/comments.model')
const path = require('path')
const directoryFile = path.join(__dirname, '../../../upload/')
const { BASEURL_FILE } = require('../utils/global')
const moment = require('moment')
const { CommentReply } = require('../models/commentReply.model')

function unlinkFile (file) {
  fs.unlink(file, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`${file}`)
    }
  })
}
function timeComment (diffMinutes) {
  let message
  if (diffMinutes < 1) {
    message = Languages.JUST_FINISHED
  } else if (diffMinutes === 1) {
    message = `${diffMinutes} minute ago`
  } else if (diffMinutes < 60) {
    message = `${diffMinutes} minutes ago`
  } else if (diffMinutes === 60) {
    message = `${Math.floor(diffMinutes / 60)} hour ago`
  } else if (diffMinutes < 1440) {
    message = `${Math.floor(diffMinutes / 60)} hours ago`
  } else if (diffMinutes === 1440) {
    message = `${Math.floor(diffMinutes / 1440)} day ago`
  } else if (diffMinutes < 10080) {
    message = `${Math.floor(diffMinutes / 1440)} days ago`
  } else {
    message = Languages.LONG_TIME
  }
  return message
}

module.exports = {
  async createComment (req, res) {
    const listFile = req.listFile
    try {
      const userId = req.userId
      const { ideaId, content, commentId, deadlineComment } = req.body
      const resultValidate = validate(req.body)
      if (resultValidate.error) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            unlinkFile(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, resultValidate.error.message, 400)
      }
      const valueDeadlineComment = new Date(deadlineComment).getTime()
      const now = new Date().getTime()
        if (valueDeadlineComment > now){
          if (listFile.length !== 0) {
            listFile.forEach(element => {
              unlinkFile(directoryFile + element)
            })
          }
          return apiResponse.response_status(res, Languages.EVENT_EXPIRED, 400)
        }
      if (listFile.length > 0) {
        const fileId = await getNextSequenceValue('fileId')
        await Files.create({ id: fileId, file: listFile })
        if (commentId === undefined) {
          const id = await getNextSequenceValue('commentId')
          await new Comment({ ideaId, id, userId, content, file: fileId }).save()
        } else {
          const baseComment = await Comment.findOne({ id: commentId })
          if (baseComment == null) {
            return apiResponse.response_status(res, Languages.COMMENT_NOT_FOUND, 400)
          }
          const replyId = await getNextSequenceValue('commentReplyId')
          await new CommentReply({ ideaId, id: replyId, userId, content, commentId, file: fileId }).save()
        }
      } else {
        if (commentId === undefined) {
          const id = await getNextSequenceValue('commentId')
          await new Comment({ ideaId, id, userId, content }).save()
        } else {
          const baseComment = await Comment.findOne({ id: commentId })
          if (baseComment == null) {
            return apiResponse.response_status(res, Languages.COMMENT_NOT_FOUND, 400)
          }
          const replyId = await getNextSequenceValue('commentReplyId')
          await new CommentReply({ ideaId, id: replyId, userId, content, commentId }).save()
        }
      }
      return apiResponse.response_status(res, Languages.CREATE_IDEA_SUCCESS, 200)
    } catch (error) {
      if (listFile.length !== 0) {
        listFile.forEach(element => {
          unlinkFile(directoryFile + element)
        })
      }
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async listComment (req, res) {
    try {
      const ideaId = parseInt(req.query.ideaId)
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const skip = (limit * page) - limit
      const comments = await Comment.aggregate([
        {
          $match: { ideaId }

        },
        {
          $lookup: {
            from: 'commentreplies',
            localField: 'id',
            foreignField: 'commentId',
            as: 'commentReply'
          }
        },
        {
          $lookup: {
            from: 'files',
            localField: 'file',
            foreignField: 'id',
            as: 'files'
          }
        },
        { $unwind: '$file' },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'userId',
            as: 'user'
          }
        },
        { $unwind: '$user' },
        {
          $lookup: {
            from: 'users',
            localField: 'userReplyId',
            foreignField: 'userId',
            as: 'userReply'
          }
        },
        {
          $unwind: { path: '$userReply', preserveNullAndEmptyArrays: true }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            content: 1,
            totalReply: 1,
            isEdited: 1,
            createdAt: 1,
            updatedAt: 1,
            files: {
              $map: {
                input: '$files',
                as: 'file',
                in: {
                  fileId: '$$file.id',
                  urls: {
                    $map: {
                      input: '$$file.file',
                      as: 'filename',
                      in: {
                        $concat: [BASEURL_FILE, '$$filename']
                      }
                    }
                  }
                }
              }
            },
            'user.userId': 1,
            'user.email': 1,
            'user.fullName': 1
          }
        }, { $skip: skip }, { $limit: limit }, { $sort: { createdAt: -1 } }
      ])
      const listComment = comments.map(comment => {
        const commentTime = new Date(comment.createdAt)
        const diffMinutes = moment().diff(commentTime, 'minutes')
        const time = timeComment(diffMinutes)
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createAt,
          totalReply: comment.totalReply,
          isEdited: comment.isEdited,
          user: comment.user,
          files: comment.files,
          timeAgo: time

        }
      })
      const totalComment = await Comment.find({ ideaId }).lean().countDocuments()
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        listComment,
        totalComment
      })
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateComment (req, res) {
    try {
      const { commentId, content } = req.body
      const id = req.params.id
      const userId = req.userId

      if (commentId === undefined) {
        const commentIsMyself = await Comment.findOne({ id, userId })
        if (commentIsMyself == null) {
          return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
        }
        await Comment.findOneAndUpdate(id, { content })
        return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
      } else {
        const commentIsMyself = await CommentReply.findOne({ id, userId, commentId })
        if (commentIsMyself == null) {
          return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
        }
        await CommentReply.findOneAndUpdate(id, { content })
        return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteComment (req, res) {
    try {
      const userId = req.userId
      const commentId = req.params.id
      const commentIsMyself = await Comment.findOne({ id: commentId, userId })
      if (commentIsMyself == null) {
        return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
      }
      await Comment.findOneAndDelete({ id: commentId, userId })
      return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteCommentReply (req, res) {
    try {
      const userId = req.userId
      const commentId = req.params.id
      const commentIsMyself = await CommentReply.findOne({ id: commentId, userId })
      if (commentIsMyself == null) {
        return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
      }
      await CommentReply.findOneAndDelete({ id: commentId, userId })
      return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
