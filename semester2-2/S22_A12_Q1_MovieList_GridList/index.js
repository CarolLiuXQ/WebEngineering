const BASE_URL = "https://movie-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/movies/"
const POSTER_URL = BASE_URL + "/posters/"

const MOVIES_PER_PAGE = 12

const movies = []
let filteredMovies = []
let listFlag = localStorage.getItem('listFlag') === 'false' ? false : true
let currentPage = 1
const gridPanel = document.querySelector("#grid-panel")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const paginator = document.querySelector("#paginator")
const listPanel = document.querySelector("#list-panel")
const gridAndListIcons = document.querySelector('#grid-and-list-icons')
const dataPanel = document.querySelector('#data-panel')


//renderMovieList
function renderMovieList(data) {
  let rawHTML = ''
  if (listFlag === false) {
    data.forEach(item => {
      rawHTML += `
        <div class="col-sm-3">
        <div class="mt-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                data-bs-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>
      </div>`
    });
    listPanel.innerHTML = ''
    gridPanel.innerHTML = rawHTML
  }
  else if (listFlag === true) {
    data.forEach(item => {
      rawHTML += `
        <li class="list-group-item d-flex flex-row align-items-center">
          <h5 class="card-title col-10" style="margin-bottom: 0px;">${item.title}</h5>
          <div class="list-footer col-2">
            <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
              data-bs-target="#movie-modal" data-id="${item.id}">More</button>
            <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </div>
        </li>
    `
    })
    gridPanel.innerHTML = ''
    listPanel.innerHTML = rawHTML
  }
}
//render page數的函式
function renderPaginator(amount) {
  //要先算會有幾頁
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 0; page < numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}">${page + 1}</a></li>`
  }
  paginator.innerHTML = rawHTML
}


//讓資料分頁的function, 如果給了page1的話, 他會給第一頁中有哪12部電影, 如果是page2的話,會給第2頁中有哪12部電影
function getMoviesByPage(page) {
  //因為搜尋列的頁數也加進來了,所以getMoviesByPage的page就會有2種data,一個是movies一個是filterMovies
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}


//showMovieModal的function
function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id).then(response => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" class="img-fuid"></img>`
  })
}

//addToFavorite的function
function addToFavorite(id) {
  //先把localStorage的東西拿出來,但是拿出來的時候會有兩個情況,有可能是有清單,或是沒有清單,所以如果是沒有的話,會回傳一個[]空陣列, || 會回傳左右邊其中一個是true的東西,兩個都是true的話以左邊為優先
  //因為Local Storage只能存string,所以要用parse把string轉成object
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  //接下來要找到那部電影的資訊
  const movie = movies.find((movie) => movie.id === id)
  //把電影推到list中, 但是要先確認此添加的電影有沒有重複
  if (list.some(movie => movie.id === id)) {
    return alert("已經在最愛清單裡了喔!")
  }
  else {
    list.push(movie)
    console.log(list)
    //因為Local Storage只能存string,所以要用stringify把object轉成string
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
  }
}

//幫已點選的頁碼上色
function colorPagination(clickedPage) {
  const pagination = document.querySelectorAll('#paginator li')
  pagination.forEach(page => {
    if (clickedPage === Number(page.innerText)) {
      page.className = 'page-item active'
    }
    else { page.className = 'page-item' }
  })
}

//搜尋功能的render
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  if (filteredMovies.length === 0) {
    return alert('cannot find a movies with keywords: ' + keyword)
  }
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPage(1))
})

//showMovieModal的監聽器
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }
  else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})


//點分頁的監聽器
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)

  //幫已點選的頁碼上色
  if (currentPage !== page) colorPagination(page)
  currentPage = page
  renderMovieList(getMoviesByPage(currentPage))

})

//換grid和list的監聽器
gridAndListIcons.addEventListener('click', function clickedIcon(event) {
  if (event.target.matches('.grid-icon')) {
    listFlag = false
    localStorage.setItem('listFlag', 'false')
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(currentPage))
    colorPagination(currentPage)
  }
  else if (event.target.matches('.list-icon')) {
    listFlag = true
    localStorage.setItem('listFlag', 'true')
    renderPaginator(movies.length)
    renderMovieList(getMoviesByPage(currentPage))
    colorPagination(currentPage)
  }
})


//將版面把資料從API中傳進來
axios.get(INDEX_URL).then(response => {
  movies.push(...response.data.results)
  renderPaginator(movies.length)
  renderMovieList(getMoviesByPage(1))
  colorPagination(1)
})