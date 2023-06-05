const { Category, validate } = require('../models/category.model')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')
const { Ideas } = require('../models/idea.model')

module.exports = {
  async createCategory (req, res) {
    try {
      const { name } = req.body
      const result = validate(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      const category = await Category.findOne({ name })
      if (category) {
        return apiResponse.response_status(res, Languages.CATEGORY_EXSITS, 400)
      }
      const id = await getNextSequenceValue('categoryId')
      const newCategory = new Category({ name, id })
      await newCategory.save()
      return apiResponse.response_status(res, Languages.CATEGORY_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getListCategory (req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (limit * page) - limit
      const list = await Category.find({}, { _id: 0, __v: 0 }).skip(skip).limit(limit)
      if (list.error) {
        return apiResponse.response_status(res, list.error.message, 400)
      }
      const totalCategory = await Category.find().countDocuments()
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        list,
        totalCategory
      })
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteCategory (req, res) {
    try {
      const id = req.params.id
      const category = await Category.findOneAndDelete({ id })
      if (category != null) {
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      }
      const ideaCategory = await Ideas.find({ categoryId: id })
      if (ideaCategory != null) {
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      }
      return apiResponse.response_status(res, Languages.CATEGORY_DELETE_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async listIdeaCategory (req, res) {
    try {
      const id = parseInt(req.params.id) || 0
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (limit * page) - limit
      const ideas = await Ideas.aggregate([
        {
          $match: { categoryId: id }
        },
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
          $project: {
            _id: 0,
            id: 1,
            title: 1,
            content: 1,
            anonymous: 1,
            categoryId: 1,
            createdAt: 1,
            updatedAt: 1,
            'user.username': 1,
            'user.userId': 1,
            'user.email': 1,
            'user.fullName': 1
          }
        }, { $skip: skip }, { $limit: limit }]
      )
      const totalIdea = await Ideas.find({ categoryId: id }).countDocuments()
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        ideas,
        totalIdea
      })
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
