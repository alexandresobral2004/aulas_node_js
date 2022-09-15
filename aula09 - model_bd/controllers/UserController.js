const User = require('../model/User')


module.exports = class UserController {

  static newUser(req, res) {
    res.render('/users/userform')
  }

  static async newUserSave(req, res) {
    const usuario = {
      nome: req.body.nome,
      idade: req.body.idade,
    }
    await User.create(usuario)
    res.redirect('/home')


  }

}
