const mongoose = require('mongoose')

const schemaBlog = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'The {PATH} is required']
  },
  title: {
    type: String,
    required: [true, 'The {PATH} is required']
  },
  url: {
    type: String,
    required: [true, 'The {PATH} is required']
  },
  likes:{
    type:Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toObject : {
    transform: (document, returnObject) => {
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
    }
  },
  toJSON : {
    transform: (document, returnObject) => {
      returnObject.id = returnObject._id.toString()
      delete returnObject._id
      delete returnObject.__v
    }
  }
})

module.exports = mongoose.model('Blog', schemaBlog)

