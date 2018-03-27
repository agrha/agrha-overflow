const jwt = require ('jsonwebtoken')

class Auth {
  static admin(req,res,next){
    let token = req.headers.token
    console.log(token)
    jwt.verify(token,'secret key',(err,decoded)=>{
      if(decoded){
        if(decoded.role === 'admin'){
          next()
        } else {
          res.status(403).json({
            message:'kamu bukan admin'
          })
        }
      } else {
        res.status(403).json({
          message: 'kamu belum login'
        })
      }
    })
  }

  static user(req,res,next){
    let token = req.headers.token
    jwt.verify(token,'secret key',(err,decoded)=>{
      if(decoded){
        if(decoded.id == req.params.id || decoded.role == 'admin'){
          next()
        } else {
          res.status(403).json({
            message: 'you are not authorized user'
          })
        }
      }
    })
  }
}

module.exports = Auth