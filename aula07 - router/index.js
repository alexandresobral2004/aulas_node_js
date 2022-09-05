const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const User = require('./routes/userRouter')




//configure template handlebars
app.engine('handlebars', exphbs.engine())
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

//chamar página de login
app.get('/', (req, res) => {
  res.render('login')
})


//webserver
app.listen(port, () => {
  console.log('Server Started')
})