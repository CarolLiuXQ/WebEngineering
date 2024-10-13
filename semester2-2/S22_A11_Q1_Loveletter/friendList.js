const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
const INDEX_URL = BASE_URL + 'api/v1/users/'

//peopleData直接從local Storage抓
const peopleData = JSON.parse(localStorage.getItem('MyFriendsList'))
const personPerPage = 18

const avatarButton = document.querySelector('#avatar-button')
const peopleListPanel = document.querySelector('#people-list-panel')
const modalContent = document.querySelector('#modal-content')
const pagination = document.querySelector('#pagination')
const navbar = document.querySelector("#navbar")


//render PeopleList
function renderPeopleList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `
    <div class="card col-2"  id="card-wrapper">
    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="img-button">
      <img src="${item.avatar}" class="card-img-top avatar" alt="avatar" data-id="${item.id}">
    </button>
    <div class="d-flex flex-column justify-content-center align-items-center card-body">
      <h5 class="card-title"style="font-family: Lora; color: #DA0035;">${item.name} ${item.surname}</h5>
      <h6 class="age" style="color: #BCAAA8;">${item.age} Years Old</h6>
      <div class="myFriendsListCard">
        <button class="btn btn-outline-secondary">Message</button>
        <button class="btn btn-outline-danger" data-id="${item.id}">X</button>
      </div>
    </div>
  </div>
    `
  });
  peopleListPanel.innerHTML = rawHTML
}

//show per page 12 people
function showPerPage(page) {
  let startIndex = (page - 1) * personPerPage
  return peopleData.slice(startIndex, startIndex + personPerPage)
}

//render pagination
function renderPaginator(dataLen) {
  let paginationList = ''
  for (let i = 0; i < Math.ceil(dataLen / personPerPage); i++) {
    paginationList += `
    <li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>
    `
  }
  pagination.innerHTML = paginationList
}

//show peopleListModal
function showPeopleListModal(id) {
  let modalList = ''
  let filteredData = peopleData.filter(item =>
    item.id === id
  )
  modalList = `
    <div class="modal-header" style="color: #DA0035;">
    <h5 class="modal-title" id="exampleModalLabel">${filteredData[0].name} ${filteredData[0].surname}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body" style="color: #6A6261;">
    <img src="${filteredData[0].avatar}" alt="" class="rounded card-img-top">
    <div class="modalEmail mt-1">Email: ${filteredData[0].email}</div>
    <div class="modalGender">Gender: ${filteredData[0].gender}</div>
    <div class="modalRegion">Region: ${filteredData[0].region}</div>
    <div class="modalBirthday">Birthday: ${filteredData[0].birthday}</div>
  </div>
  `
  modalContent.innerHTML = modalList
}

//把朋友移除
function removeFriend(id) {
  const friendIndex = peopleData.findIndex(item => item.id == id)
  peopleData.splice(friendIndex, 1)
  localStorage.setItem('MyFriendsList', JSON.stringify(peopleData))
  renderPeopleList(showPerPage(1))
  renderPaginator(peopleData.length)
}

//讓navbar持續在最上面中的程式碼封裝
function changeNavbarStyle(type) {
  if (type === 'top') {
    navbar.className = "navbar navbar-expand-lg navbar-light ps-5 pe-5"
    navbar.classList.add("fixed-top")
    navbar.style.backgroundColor = 'rgba(57, 57, 61, 0.9)'
  }
  if (type === 'under') {
    navbar.classList.remove("fixed-top")
    navbar.className = "navbar navbar-expand-lg navbar-light"
    navbar.style.backgroundColor = ''
  }
}

//對圖片做監聽器
peopleListPanel.addEventListener('click', function clickedAvatar(event) {
  const peopleId = Number(event.target.dataset.id)
  if (event.target.matches('img')) {
    showPeopleListModal(peopleId)
  }
  else if (event.target.matches('.btn-outline-danger')) {
    removeFriend(peopleId)
  }
})

//分頁的監聽器
pagination.addEventListener('click', function clickedPage(event) {
  pageNum = Number(event.target.innerText)
  renderPeopleList(showPerPage(pageNum))

})

//執行function
renderPeopleList(showPerPage(1))
renderPaginator(peopleData.length)


//讓navbar持續在最上面
document.addEventListener("scroll", function () {
  const navbarHeight = 100
  const distanceFromTop = Math.abs(document.body.getBoundingClientRect().top)
  distanceFromTop >= navbarHeight ? changeNavbarStyle('top') : changeNavbarStyle('under')
})