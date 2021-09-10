const router = require('express').Router()
const mid = require('../middleware')

const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.gLogin)
router.post('/register', mid, AuthController.gRegister)

module.exports = router