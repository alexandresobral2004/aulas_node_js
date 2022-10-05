const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const User = require('../model/User')

router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.get('/logout', UserController.logout)
router.get('/register', UserController.register)
router.get('/add', UserController.newUser)
router.post('/add', UserController.newUserSave)
router.get('/edit/:id', UserController.updateUser)
router.post('/edit', UserController.updateUserSave)
router.post('/remove', UserController.removeUser)
router.get('/allUsers', UserController.allUsers)
router.get('/home', UserController.home)



module.exports = router
