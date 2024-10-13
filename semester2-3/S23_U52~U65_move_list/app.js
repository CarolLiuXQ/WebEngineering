const express = require('express')
const app = express()
//透過 require 把 express-handlebars 載入進來，並把它存成名為 exphbs 的變數
const exphbs = require('express-handlebars')
//透過 require 把 movies.json 載入進來
const movieList = require('./movies.json')
const port = 3000

//載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
  //create a variable to store movieOne
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movies => {
    return movies.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => {
    return movie.id === Number(req.params.movie_id)
  })
  res.render('show', { movie: movie })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)

})