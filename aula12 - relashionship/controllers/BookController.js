const Book = require('../model/Book')
const User = require('../model/User')
// const Users = require('../model/User')




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

    try {
      await Book.create(livro)
      req.flash('message', 'Livro salvo com sucesso!')
      req.session.save(() => {
        res.redirect('/book/allBooks')
      })

    } catch (error) {
      console.log(error)
    }


  }

  static async allBooks(req, res) {
    try {
      const books = await Book.findAll({
        where: {
          UserId: req.session.userid
        },
        raw: true,
        include: User
      })
      // console.log(books[0].User.nome)
      res.render('book/allBooks', { books })
    } catch (error) {
      console.log(error)

    }

  }


  static async allBooksUser(req, res) {

    const users = await User.findAll({
      raw: true

    });

    res.render('book/allBooks_user', { users })
  }

  static async allBooksbyUser(req, res) {
    const id = req.body.userId
    console.log(id)
    const books = await Book.findAll({
      where: {
        UserId: id
      },
      raw: true

    });
    req.session.save(() => {
      res.render('partials/books_user', { books })
    })


  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id
      const book = await Book.findOne({ where: { id: id }, raw: true })

      console.log(req.session.userid)
      const users = await User.findOne({ where: { id: req.session.userid }, raw: true })
      res.render('book/edit', { book, users })

    } catch (error) {

    }
  }

  static async updateBookSave(req, res) {
    try {
      const id = req.body.id
      const book = {
        nome: req.body.nome,
        autor: req.body.autor,
        edicao: req.body.edicao,
        UserId: req.body.userId
      }
      await Book.update(book, { where: { id: id } })
      req.flash('message', 'Livro Editado!')
      req.session.save(() => {
        res.redirect('allBooks')
      })

    } catch (error) {
      console.log(error)
    }
  }

  static async removeBook(req, res) {
    try {
      const id = req.body.id
      await Book.destroy({ where: { id: id } })
      req.flash('message', 'Livro removido!')
      req.session.save(() => {
        res.redirect('allBooks')
      })

    } catch (error) {
      console.log(error)
    }
  }
}