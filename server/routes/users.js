var express = require('express');
var router = express.Router();
const User = require ('../controllers/users')
const Auth = require ('../middleware/auth')

/* GET users listing. */
router.get('/',User.viewAll)
router.post('/',Auth.admin,User.createAdmin)
router.post('/signup',User.signup)
router.post('/signin',User.signin)
router.put('/:id',Auth.user,User.update)
router.delete('/:id',Auth.admin,User.delete)

module.exports = router
