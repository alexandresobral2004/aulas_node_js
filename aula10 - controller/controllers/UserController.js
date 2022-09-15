const User = require('../model/User')


module.exports = class UserController {

  static newUser(req, res) {
    res.render('users/userform')
  }

  static async newUserSave(req, res) {
    const usuario = {
      nome: req.body.name,
      idade: req.body.age,
    }

    await User.create(usuario)
      .then(() => {
        this.allUsers()//carrega todos os usuários
      }).catch((error) => {
        console.log(error)
      })
    res.redirect('/users/allUsers')

  }
  static async home(req, res) {
    res.render('users/home')
  }

  static async allUsers(req, res) {
    const users = await User.findAll({ raw: true })
    res.render('users/viewuser', { users })
  }


}
