//為了擷取Rbar的slider的動態數字
document.getElementById("Rbar").oninput = (event) => {
  let target = event.target;
  let value = target.value;
  target.nextElementSibling.innerText = value;
  let RHEXpart = document.querySelector(".RHEXpart");
  let RHEXnum = Number(value).toString(16);
  RHEXpart.innerText = RHEXnum;
  //找到G的顏色
  let Gnum = target.parentElement.nextElementSibling.children[2].innerText;
  //找到B的顏色
  let Bnum =
    target.parentElement.nextElementSibling.nextElementSibling.children[2]
      .innerText;
  //更新背景顏色
  document.getElementById(
    "container"
  ).style.backgroundColor = `rgb(${value},${Gnum},${Bnum})`;
};
//為了擷取Gbar的slider的動態數字
document.getElementById("Gbar").oninput = (event) => {
  let target = event.target;
  let value = target.value;
  target.nextElementSibling.innerText = value;
  let GHEXpart = document.querySelector(".GHEXpart");
  let GHEXnum = Number(value).toString(16);
  GHEXpart.innerText = GHEXnum;
  //找到R的顏色
  let Rnum = target.parentElement.previousElementSibling.children[2].innerText;
  //找到B的顏色
  let Bnum = target.parentElement.nextElementSibling.children[2].innerText;
  //更新背景顏色
  document.getElementById(
    "container"
  ).style.backgroundColor = `rgb(${Rnum},${value},${Bnum})`;
};
//為了擷取Bbar的slider的動態數字
document.getElementById("Bbar").oninput = (event) => {
  let target = event.target;
  let value = target.value;
  target.nextElementSibling.innerText = value;
  let BHEXpart = document.querySelector(".BHEXpart");
  let BHEXnum = Number(value).toString(16);
  BHEXpart.innerText = BHEXnum;
  //找到R的顏色
  let Rnum =
    target.parentElement.previousElementSibling.previousElementSibling
      .children[2].innerText;
  //找到G的顏色
  let Gnum = target.parentElement.previousElementSibling.children[2].innerText;
  //更新背景顏色
  document.getElementById(
    "container"
  ).style.backgroundColor = `rgb(${Rnum},${Gnum},${value})`;
};
