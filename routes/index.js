const router = require('express').Router()
const mid = require('../middleware')

const AuthController = require('../controllers/AuthController')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')

router.post('/login', AuthController.gLogin)
router.post('/register', AuthController.gRegister)

router.get('/product', ProductController.index)
router.post('/product', mid, ProductController.detail)

router.post('/addcart', mid, UserController.cart)

module.exports = router