const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const User = require('./routes/userRouter')
const conn = require('./db/conn')
const userModel = require('./model/User')



const hbs = exphbs.create({
  partialsDir: ["views/partials"]
})

//configure template handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


//parser para leitura do body
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

//adicionando CSS
app.use(express.static('public'))




//adicionando rota User
app.use('/users', User)



conn
  .sync()
  .then(() => {
    app.listen(3000)
    console.log('Server Started')
  })
  .catch((err) => {
    console.log(err)
  })


// app.listen(3000, () => {
//   console.log('Server Started')
// })