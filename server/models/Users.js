const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'username must be filled']
  },
  password: {
    type: String,
    required: ['true', 'password must be filled']
  },
  role : {
    type : String
  }
})

module.exports = mongoose.model('User', userSchema)