const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(store => {
    return store.id === Number(req.params.id)
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordLowercaseNonSpace = keyword.toLowerCase().split(" ").join("")

  //搜尋餐廳名稱和分類,剔除多餘的空白和變小寫
  const restaurant = restaurantList.results.filter(store => {
    const storeLowercaseNonSpace = store.name.toLowerCase()
    const categoryLowercaseNonSpace = store.category.toLowerCase()
    const locationLowercaseNonSpace = store.location.toLowerCase()
    return (storeLowercaseNonSpace.includes(keywordLowercaseNonSpace) || categoryLowercaseNonSpace.includes(keywordLowercaseNonSpace) || locationLowercaseNonSpace.includes(keywordLowercaseNonSpace))
  })
  const noSearchResult = restaurant.length === 0 ? 'No searching results. Please try agin.' : null
  //還差搜尋沒有結果時也有對應頁面提示
    res.render('index', { restaurant: restaurant, keyword: keyword, noSearchResult: noSearchResult })

})

app.listen(port, () => [
  console.log(`Express is listening on http://localhost:${port}`)

])