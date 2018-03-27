const userSchema = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)

class User {
  static viewAll(req,res){
    userSchema.find()
    .then(data=>{
      res.status(200).json({
        message: 'list of users:',
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

  static createAdmin(req,res){
    let password   = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      username: req.body.username,
      password: password,
      role: 'admin'
    }
    userSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'create user successfully',
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
    let password = bcrypt.hashSync(req.body.password,salt)
    let target = {
      _id:req.params.id
    }
    userSchema.findOne(target)
    .then(data=>{
      data.username = req.body.username || data.username,
      data.password = password || user.password,
      data.status = data.status
      data.save()
      .then(dataUpdate =>{
        res.status(200).json({
          message: 'updated successfully',
          dataUpdate
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'something went wrong',
          err
        })
      })
    })
  }

  static delete(req,res){
    let target = {
      _id:req.params.id
    }
    userSchema.findOneAndRemove(target)
    .then(data=>{
      res.status(200).json({
        message:'delete success',
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

  static signup(req,res){
    let password = bcrypt.hashSync(req.body.password,salt)
    let obj = {
      username: req.body.username,
      password: password,
      role: 'user'
    }
    userSchema.create(obj)
    .then(data=>{
      res.status(200).json({
        message:'user created successfully',
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

  static signin(req,res){
    let target = {
      username : req.body.username
    }
    userSchema.findOne(target)
    .then(data=>{
      if(!data){
        res.status(403).json({
          message:'username is not found'
        })
      }
      let clarify = bcrypt.compareSync(req.body.password, data.password)
      if(!clarify){
        res.status(403).json({
          message: 'invalid password'
        })
      }

      let payload = {
        id: data._id,
        username: data.username,
        role: data.role
      }

      jwt.sign(payload,'secret key', (err,token) => {
        if(!err){
          res.status(200).json({
            message: 'sign in success',
            userid: data._id,
            username: data.username,
            token: token
          })
        }
      })
    })
    .catch(err=>{
      res.status(401).json({
        message:'something went wrong',
        err
      })
    })
  }
}

module.exports = User
