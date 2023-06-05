const mongoose = require('mongoose')

const File = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  file: { type: [String], required: true, default: [] }
}, { timestamps: true })

const Files = mongoose.model('File', File)
module.exports = Files
