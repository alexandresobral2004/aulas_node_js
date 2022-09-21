const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Book = require('./routes/bookRouter')
const User = require('./routes/userRouter')



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
app.use('/book', Book)





app.get('/', (req, res) => {
  res.render('dashboard')
})


conn
  // .sync({ force: true })
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