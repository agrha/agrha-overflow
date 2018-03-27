var express = require('express');
var router = express.Router();
const Question = require ('../controllers/questions')
const Auth = require ('../middleware/auth')

/* GET users listing. */
router.get('/',Auth.login,Question.viewAll)
router.get('/:id',Auth.login,Question.detail)
router.post('/',Auth.login, Question.create)
router.put('/:id',Auth.login,Question.update)
router.delete('/:id',Auth.login,Question.delete)



module.exports = router
