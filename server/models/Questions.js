const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema ({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'title must be filled']
  },
  description: {
    type:String,
    required: [true, 'question body must be filled']
  },
  answers:[{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  votes:[{
    author:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
},{timestamps:true})

module.exports = mongoose.model('Question',questionSchema)