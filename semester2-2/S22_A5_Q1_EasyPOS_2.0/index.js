const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");

// 菜單資料
let productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
]

//把個數和金額加進購物車清單的函數
function addPricePiece(index, itemName, itemPrice) {
  let cartItemPrice = cart.children[index].dataset.price
  let cartItemPiece = cart.children[index].dataset.piece
  cart.children[index].setAttribute('data-price', `${Number(itemPrice) + Number(cartItemPrice)}`)
  cart.children[index].setAttribute('data-piece', `${Number(cartItemPiece) + 1}`)
  cart.children[index].innerText = `${itemName} X ${Number(cartItemPiece) + 1} 小計:${Number(itemPrice) + Number(cartItemPrice)}`
}


//1. 先讓menu產生出菜單(先把原本html的資料註解掉補進新的)
for (let i = 0; i < productData.length; i++) {
  menu.innerHTML += `
      <div class="col-3">
       <div class="card">
          <img src="${productData[i].imgUrl}" class="card-img-top" alt="${productData[i].name}">
          <div class="card-body">
            <h5 class="card-title">${productData[i].name}</h5>
            <p class="card-text">${productData[i].price}</p>
            <div class="btn btn-primary">加入購物車</div>
          </div>
        </div>
      </div>
  `
}


//2. 設置加入購物車的監聽器, 然後同時設置購物清單(把原本的HTML註解掉)
menu.addEventListener('click', function (event) {
  const itemPrice = event.target.parentElement.firstElementChild.nextElementSibling.innerText
  const itemName = event.target.parentElement.firstElementChild.innerText

  if (event.target.classList.contains("btn-primary")) {
    //2.1 在購物清車清單加上物品
    //如果購物車清單是空白的話,將卡片加入
    if (cart.children.length === 0) {
      let addItem = `
      <li class="list-group-item" data-name="${itemName}" data-price="${itemPrice}" data-piece="1">${itemName} X 1 小計:${itemPrice}</li>
      `
      cart.innerHTML += addItem
    }
    //購物車已經不是空白了
    else {
      let isInCartFlag = false
      let indexOfItem = null
      //要確認有沒有已經被放入購物車裡了
      for (let i = 0; i < cart.children.length; i++) {
        //已經被放入購物車裡
        if (cart.children[i].dataset.name === itemName) {
          isInCartFlag = true
          indexOfItem = i
        }
      }
      if (isInCartFlag) {
        addPricePiece(indexOfItem, itemName, itemPrice)
      }
      else if (!isInCartFlag) {
        let addItem = `
          <li class="list-group-item" data-name="${itemName}" data-price="${itemPrice}" data-piece="1">${itemName} X 1 小計:${itemPrice}</li>
          `
        cart.innerHTML += addItem
      }
    }

    //2.2 把總金額增加
    let currentAmount = totalAmount.innerText;
    if (currentAmount === '--') {
      currentAmount = 0;
    }
    let sumAmount = Number(currentAmount) + Number(itemPrice);
    totalAmount.innerText = sumAmount;
  }
})

//3. 點了送出訂單
button.addEventListener('click', function clickedButton() {
  let cartList = ``
  for (let i = 0; i < cart.children.length; i++) {
    cartList += cart.children[i].innerText
    cartList += '\n'
  }
  //3.1 在視窗上顯示跳出收據
  //因為一般最後的確認會選要還是不要,所以比起alert,我用了confirm 因為confirm有true或false可以選擇
  if (confirm(`感謝購買
購買金額 : ${totalAmount.innerText}
${cartList}`) === true) {
    //3.2 如果收據按了確定的話讓購物車清單和總金額清空
    totalAmount.innerText = '--'
    cart.innerHTML = ''
  }
})