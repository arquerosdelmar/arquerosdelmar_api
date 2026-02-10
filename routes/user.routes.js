const express = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')

//Sign Up a User
router.post('/', user.signup)

module.exports = router
