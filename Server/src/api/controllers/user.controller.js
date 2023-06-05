const apiResponse = require('../helpers/api.response.helper')
const { User } = require('../models/user.model')
const Languages = require('../utils/languages')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { BASEURL_AVATAR } = require('../utils/global')
require('dotenv').config()

function validateUser (user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email(),
    firstName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z]{2,30}/),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z]{2,30}/),
    department: Joi.string().min(1).max(30),
    role: Joi.number().max(5).min(1)
  })
  return schema.validate(user)
}
module.exports = {
  async changePassword  (req, res) {
    try {
      const { userId, password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const changePassword = await User.findOneAndUpdate(userId, { password: hashPassword }, { new: false })
      console.log(changePassword)
      if (changePassword) {
        return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_SUCCESS, 200)
      } else {
        return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_FAIL, 404)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },

  async updateUser (req, res) {
    try {
      const id = req.params.id
      const { email, lastName, firstName, department, isActive, role } = req.body
      const result = validateUser(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      const updateUser = await User.findOneAndUpdate({ userId: id }, { email, lastName, firstName, department, isActive, role }, { new: false })
      console.log(updateUser)
      if (updateUser) {
        return apiResponse.response_status(res, Languages.UPDATE_USER_SUCCESSFUL, 200)
      } else {
        return apiResponse.response_status(res, Languages.ACCOUNT_NOT_EXISTS, 404)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  // async updateProfileUser (req, res) {
  //   try {
  //     const id = req.params.id,
  //     const { avatar,password } = req.body
  //   }
  // },
  async deleteUser (req, res) {
    try {
      const id = req.params.id
      const deleteUser = await User.findOneAndDelete({ userId: id })
      console.log(deleteUser)
      if (deleteUser) {
        return apiResponse.response_status(res, Languages.DELETE_USER_SUCCESSFUL, 200)
      }
      return apiResponse.response_status(res, Languages.DELETE_USER_FAIL, 400)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getListUser (req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      // const keyword = req.query.keyword
      const skip = (limit * page) - limit
      const list = await User.find({}, { _id: 0, password: 0, __v: 0 }).skip(skip).limit(limit)
      const listUser = list.map(user => {
        return {
          ...user._doc,
          avatar: `${BASEURL_AVATAR}${user.avatar}`
        }
      })
      const totalUser = await User.find().countDocuments()
      const response = apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        listUser,
        totalUser
      })
      return response
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }

}
