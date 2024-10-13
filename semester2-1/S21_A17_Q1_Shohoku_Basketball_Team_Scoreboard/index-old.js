//自己寫的第一版
const tobody = document.querySelector(".table-bordered tbody");
//讓forloop找出得分的那一欄
for (let i = 0; i < tobody.children.length; i++) {
  let points = Number(tobody.children[i].children[1].innerText);
  if (points > 20) {
    let name = tobody.children[i].children[0];
    name.insertAdjacentHTML("afterbegin", '<i class="fa fa-thumbs-up"></i>');
  }
}

// // 觀看同學的解答所做出的第二版
// const tobody = document.querySelector(".table-bordered tbody");
// const icon = '<i class="fa fa-thumbs-up"></i>'
// //讓forloop找出得分的那一欄
// for (let i = 0; i < tobody.children.length; i++) {
//   let points = Number(tobody.children[i].children[1].innerText);
//   if (points > 20) {
//     let name = tobody.children[i].children[0];
//     name.innerHTML += icon
//   }
// }