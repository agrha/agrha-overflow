const questionSchema = require('../models/Questions')

class Question {
  static viewAll(req,res) {
    questionSchema.find()
    .populate('author')
    .then(data=>{
      res.status(200).json({
        message:'list of questions:',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static create(req,res){
    let obj = {
      author: req.decoded.id,
      title: req.body.title,
      description: req.body.description
    }
    questionSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'create success',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }

  static update(req,res){
    let target = {
      _id: req.params.id
    }
    questionSchema.findOne(target)
    .then(data=>{
      data.title = req.body.title || data.title
      data.description = req.body.description || data.description
      data.save()
      .then(update=>{
        res.status(200).json({
          message: 'sucess update question',
          update
        })
      })
      .catch(err=>{
        res.status(500).json({
          message: 'something went wrong',
          err
        })
      })
    })
  }

  static delete (req,res){
    let target = {
      _id: req.params.id
    }
    questionSchema.findOneAndRemove(target)
    .then(data=>{
      res.status(200).json({
        message:'delete success',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message: 'something went wrong',
        err
      })
    })
  }

  static detail(req,res){
    let target = {
      _id:req.params.id
    }
    questionSchema.findOne(target)
    .populate('author','username')
    .populate('answers')
    .then(data=>{
      res.status(200).json({
        message:'question:',
        data
      })
    })
    .catch(err=>{
      res.status(500).json({
        message:'something went wrong',
        err
      })
    })
  }
}

module.exports = Question