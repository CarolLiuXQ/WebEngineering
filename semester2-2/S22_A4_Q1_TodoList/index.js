// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#newTodo");
const done = document.querySelector("#my-done");
const todoDoneWrap = document.querySelector("#todoDoneWrap");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

// 函式-輸入內容為何而創建一個item
function addItem(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

//函式-確認是否有input值,*也一起確認是否輸入的為空白鍵*,並且將值加到Todo之後把input值清空
function checkInputValue(event) {
  const inputValue = input.value;
  //如果是空值或是空白鍵則部會執行
  if (inputValue.length === 0 || inputValue.trim().length === 0) {
    event.preventDefault();
    input.className = "form-control mr-2 is-invalid";
  }
  //input中有內容才會執行加入
  else if (inputValue.length > 0) {
    event.preventDefault();
    addItem(inputValue);
    //如果把文字加入後就把input中的內容刪掉
    input.value = "";
    input.className = "form-control mr-2";
  }
}

//將資料匯入Todo中
for (let todo of todos) {
  addItem(todo);
}

//1. add new Todo by 點擊add button
addBtn.addEventListener("click", function cilckedAddButton(event) {
  checkInputValue(event);
});

//按下Enter鍵時，可以新增 to-do
input.addEventListener("keypress", function EnteredAddButton(event) {
  if (event.keyCode == 13) {
    checkInputValue(event);
  }
});

//讓每一次點input的時候會重置,不要是invalid
input.addEventListener("click", function (event) {
  input.className = "form-control mr-2";
});

//2. delete, check, return todo
todoDoneWrap.addEventListener("click", function deleteCheckReturn(event) {
  const target = event.target;
  const parentElement = target.parentElement;
  //如果是點擊的地方剛好是垃圾桶則刪除
  if (target.classList.contains("delete")) {
    parentElement.remove();
  }
  //如果是點擊的地方剛好是label則讓他有check
  else if (target.tagName === "LABEL") {
    let checkStatus = target.classList.toggle("checked");
    if (checkStatus === true) {
      //然後將他移置Done的地方
      done.appendChild(parentElement);
    }
    //如果想要把Done轉回Todo
    else {
      list.appendChild(parentElement);
    }
  }
});
