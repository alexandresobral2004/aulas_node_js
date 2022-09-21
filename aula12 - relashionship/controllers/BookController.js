const Book = require('../model/Book')
const User = require('../model/User')
const Users = require('../model/User')




module.exports = class BookController {

  static async newBook(req, res) {
    const users = await User.findAll({ raw: true })

    res.render('book/addBook', { users })
  }


  static async newBookSave(req, res) {

    const livro = {
      nome: req.body.nome,
      autor: req.body.autor,
      edicao: req.body.edicao,
      UserId: req.body.userId

    }
    console.log(livro.Userid)

    await Book.create(livro)
      .catch((err) => {
        console.log(err)
      })
    res.redirect('/book/allBooks')
  }

  static async allBooks(req, res) {
    const books = await Book.findAll({ include: User, raw: true })
    res.render('book/allBooks', { books })
  }

  static async updateBook(req, res) {
    const id = req.params.id
    const book = await Book.findOne({ where: { id: id }, raw: true })
    console.log(book.toJSON)
    const users = await User.findAll({ raw: true })
      .catch((err) => {
        console.log(err)
      })

    res.render('book/edit', { book })
  }

  static async updateBookSave(req, res) {
    const id = req.body.id
    const book = {
      nome: req.body.nome,
      autor: req.body.autor,
      edicao: req.body.edicao,
      UserId: req.body.userId
    }
    await Book.update(book, { where: { id: id } })
      .then(res.redirect('/book/allBooks'))
      .catch((err) => {
        console.log(err)
      })
  }

  static async removeBook(req, res) {
    const id = req.body.id
    await Book.destroy({ where: { id: id } })
      .then(res.redirect('/book/allBooks'))
      .catch((err) => {
        console.log(err)
      })
  }
}