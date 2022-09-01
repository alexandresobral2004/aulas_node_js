const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')




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


app.get('/users/add', (req, res) => {
  res.render('userform')
})


app.post('/users/save', (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const user = { name: name, age: age }
  res.render('viewuser', { user: user })

})
const auth = false
const approved = false
//chamar página de login
app.get('/', (req, res) => {
  res.render('login')
})
//pegar os dados do login

const usuario = {
  login: 'teste',
  password: 123
}
app.post('/user/login', (req, res) => {
  const login = req.body.login
  const password = req.body.password
  let auth = false
  if (login == usuario.login && password == usuario.password) {
    auth = true

    res.render('home', { usuario: usuario, auth, itens: itens })
  }
  else {
    auth = false
    res.render('login', { auth })

  }
})
const itens = ['ítem a', 'ítem b', 'ítem c']

app.get('/home', (req, res) => {

  res.render('home')
})

app.use(function (req, res) {
  res.status(404).render('404')
})


//webserver
app.listen(port, () => {
  console.log('Server Started')
})