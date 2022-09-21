const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('../model/User');

const Book = db.define('Book', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edicao: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
//relacionamento entre entidades
//um plivro pertence ao usuário, a chave estrangeira fica em book
Book.belongsTo(User)
//um usuário tem muitos livros, a chave estrangeira fica em Tought
User.hasMany(Book)


module.exports = Book