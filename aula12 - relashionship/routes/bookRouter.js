const express = require('express')
const router = express.Router()
const BookController = require('../controllers/BookController')
// const Book = require('../model/Book')
// const User = require('../model/User')


router.get('/add', BookController.newBook)
router.post('/add', BookController.newBookSave)
router.get('/allBooks', BookController.allBooks)
router.get('/edit/:id', BookController.updateBook)
router.post('/edit', BookController.updateBookSave)


module.exports = router