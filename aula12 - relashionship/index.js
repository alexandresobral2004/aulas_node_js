const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
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

//session middleware
app.use(
  session({
    name: "session", // nome da sessao
    secret: "secret",// chave da sessao
    resave: false,//permite armazenar a sessão sem finalizá-la
    saveUninitialized: false,//envia uma sessão criada, mas n iniciada para armazenamento
    store: new FileStore({//indica onde o arquivo da sessão será salvo
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {//início do cookie
      secure: false,//usado somente com https
      maxAge: 360000,//tempo máximo do cookie em milisegundos
      expires: new Date(Date.now() + 360000),//marca a hora de expirar
      httpOnly: true
    }
  })
)


//set session to res
app.use((req, res, next) => {
  console.log(req.session.userid);
  if (req.session.userid) {
    res.locals.session = req.session
  }
  next();
})

//flash messages
app.use(flash())


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