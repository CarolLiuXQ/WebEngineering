const BASE_URL = "https://movie-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/movies/"
const POSTER_URL = BASE_URL + "/posters/"
const MOVIES_PER_PAGE = 12

//改了movies,和index.js不一樣,直接從local storage中抓
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))

const dataPanel = document.querySelector("#data-panel")
const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const paginator = document.querySelector("#paginator")

//renderMovieList
function renderMovieList(data) {
  let rawHTM = ''
  data.forEach(item => {
    rawHTM += `
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
              <button class="btn btn-danger btn-delete-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      </div>`

  });
  dataPanel.innerHTML = rawHTM

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
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

//deleteToFavorite的function
function deleteToFavorite(id) {
  // //自己想的方法
  // const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  // //建一個移除的List
  // const deleteList = list.filter(deleteMovie => deleteMovie.id !== id)
  // localStorage.setItem('favoriteMovies', JSON.stringify(deleteList))
  // //把移除後的list render進網頁
  // renderMovieList(deleteList)

  //助教的方法,直接把movies中的電影移掉
  if (!movies) return
  //透過 id 找到要刪除電影的 index
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return
  //刪除該筆電影
  movies.splice(movieIndex, 1)
  //存回 local storage
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  //更新頁面
  renderMovieList(movies)
}



//showMovieModal的監聽器
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  }
  else if (event.target.matches('.btn-delete-favorite')) {
    deleteToFavorite(Number(event.target.dataset.id))
  }
})


//將版面把資料從API中傳進來
renderPaginator(movies.length)
renderMovieList(getMoviesByPage(1))


