const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: String,
  votes: [{
    author:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
},{timestamps:true})