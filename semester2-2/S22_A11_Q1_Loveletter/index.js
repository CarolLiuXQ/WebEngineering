const BASE_URL = 'https://user-list.alphacamp.io/'
const INDEX_URL = BASE_URL + 'api/v1/users/'

const peopleData = []
let filterFriend = []
const personPerPage = 18

const avatarButton = document.querySelector('#avatar-button')
const peopleListPanel = document.querySelector('#people-list-panel')
const modalContent = document.querySelector('#modal-content')
const pagination = document.querySelector('#pagination')
const searchButton = document.querySelector('#searchButton')
const searchInput = document.querySelector('#searchInput')
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
      <h6 class="age" style="color: #BCAAA8;">${item.age} Years Old <button class="btn btn-outline-secondary ms-2" data-id="${item.id}">+</button>
      </h6>
    </div>
  </div>
    `
  });
  peopleListPanel.innerHTML = rawHTML
}

//show per page 12 people
function showPerPage(page) {
  let data = filterFriend.length ? filterFriend : peopleData
  let startIndex = (page - 1) * personPerPage
  return data.slice(startIndex, startIndex + personPerPage)
}

//render pagination
function renderPaginator(dataLen) {
  let paginationList = ''
  for (let i = 0; i < Math.ceil(dataLen / personPerPage); i++) {
    paginationList += `
    <li class="page-item"><a class="page-link" href="#anchor">${i + 1}</a></li>
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

//新增進My friends清單
function addToMyFriendsList(peopleId) {
  const friend = peopleData.find(friend => friend.id === peopleId)
  const friendsList = JSON.parse(localStorage.getItem('MyFriendsList')) || []
  //如果已經有加進來的就會跳出警告
  if (friendsList.some(item => item.id === peopleId)) {
    return alert("You are already friend!")
  }
  else {
    if (!friendsList || friendsList.length === 0) {
      localStorage.setItem('MyFriendsList', JSON.stringify([friend]))
    } else {
      friendsList.push(friend)
      localStorage.setItem('MyFriendsList', JSON.stringify(friendsList))
    }
  }
}

//searchRender來判段有沒有找到朋友
function searchRender() {
  if (filterFriend.length > 0) {
    renderPeopleList(showPerPage(1))
    renderPaginator(filterFriend.length)
  //讓他滑到friends的地方
    window.scrollTo(0, 700)
  } else {
    alert("Didn't find this friend!")
  }
  document.querySelector('#searchInput').value = ''
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


//對peopleList做監聽器
peopleListPanel.addEventListener('click', function clickedAvatar(event) {
  let peopleId = Number(event.target.dataset.id)
  if (event.target.matches('img')) {
    showPeopleListModal(peopleId)
  }
  else if (event.target.matches('button')) {
    addToMyFriendsList(peopleId)
  }
})

//分頁的監聽器
pagination.addEventListener('click', function clickedPage(event) {
  pageNum = Number(event.target.innerText)
  renderPeopleList(showPerPage(pageNum))

})

//Search的監聽器,讓enter和click都有反應
searchButton.addEventListener('click', function clickedSearchButton(event) {
  // 防止earchButton重整頁面
  event.preventDefault()
  const searchInput = document.querySelector('#searchInput').value.trim().toLowerCase()
  filterFriend = peopleData.filter(item => {
    const fullName = `${item.name} ${item.surname}`.toLowerCase()
    return fullName.includes(searchInput)
  })
  searchRender()
})

//呼叫API
axios.get(INDEX_URL)
  .then(function (response) {
    peopleData.push(...response.data.results)
    renderPeopleList(showPerPage(1))
    renderPaginator(peopleData.length)
  })
  .catch(function (error) {
    console.log(error);
  })



//讓navbar持續在最上面
document.addEventListener("scroll", function () {
  const navbarHeight = 100
  const distanceFromTop = Math.abs(document.body.getBoundingClientRect().top)
  distanceFromTop >= navbarHeight ? changeNavbarStyle('top') : changeNavbarStyle('under')
})