const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/add', UserController.newUser)
router.post('/add', UserController.newUserSave)
router.get('/allUsers', UserController.allUsers)
router.get('/', UserController.home)


module.exports = router
