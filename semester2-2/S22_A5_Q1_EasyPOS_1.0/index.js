// ======= default data =======
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
];
// ======= 請從這裡開始 =======
//1. 先讓menu產生出菜單(先把原本html的資料註解掉補進新的)
for (let i = 0; i < productData.length; i++) {
  menu.innerHTML += `
      <div class="col-3">
       <div class="card">
          <img src="${productData[i].imgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${productData[i].name}</h5>
            <p class="card-text">${productData[i].price}</p>
            <a href="#" class="btn btn-primary">加入購物車</a>
          </div>
        </div>
      </div>
  `
}

//2. 設置加入購物車的監聽器, 然後同時設置購物清單(把原本的HTML註解掉)
menu.addEventListener('click', function (event) {
  if (event.target.classList.contains("btn-primary")) {
    // 防止默認行為（頁面跳轉）
    event.preventDefault();
    
    //2.1 在購物清車清單加上物品
    let addItem = document.createElement("LI");
    addItem.className = "list-group-item";
    let itemPrice = event.target.parentElement.firstElementChild.nextElementSibling.innerText;
    let itemName = event.target.parentElement.firstElementChild.innerText;
    addItem.innerText = `${itemName} X 1 小計:${itemPrice}`
    cart.appendChild(addItem);
    
    //2.2 把總金額增加
    let currentAmount = totalAmount.innerText;
    if (currentAmount === "--") {
      currentAmount = 0;
    }
    let sumAmount = Number(currentAmount) + Number(itemPrice);
    totalAmount.innerText = sumAmount;
  }
})

//3. 點了送出訂單
button.addEventListener('click', function (event) {
  //3.1 在視窗上顯示跳出收據
  //因為一般最後的確認會選要還是不要,所以比起alert,我用了confirm 因為confirm有true或false可以選擇
  if (confirm(`感謝購買
購買金額 : ${totalAmount.innerText}`) === true) {
    //3.2 如果收據按了確定的話讓購物車清單和總金額清空
    totalAmount.innerText = "--";
    cart.innerHTML = "";
  };
})