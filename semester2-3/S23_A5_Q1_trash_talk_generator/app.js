const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const functions = require('./controller/functions')

app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  //handlebarsHelpers
  helpers: functions
}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const occupation = String(req.body.radio)
  const description = functions.createDescription(req)
  res.render('index', { description, occupation })
})

app.listen(port, () => {
  console.log('http://localhost:3000')
})