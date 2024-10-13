let RGBpart = document.querySelector(".RGBpart");
let Rsquare = document.querySelector(".Rsquare");
let Gsquare = document.querySelector(".Gsquare");
let Bsquare = document.querySelector(".Bsquare");
let HEXsquare = document.querySelector(".HEXsquare");
RGBpart.addEventListener("click", function (event) {
  let target = event.target;
  //方塊顏色defult是紅色
  if (target.classList.contains("btn-primary")) {
    let RinputvalueNum = Number(document.querySelector(".R input").value);
    let GinputvalueNum = Number(document.querySelector(".G input").value);
    let BinputvalueNum = Number(document.querySelector(".B input").value);
    let Rinputvalue = document.querySelector(".R input").value;
    let Ginputvalue = document.querySelector(".G input").value;
    let Binputvalue = document.querySelector(".B input").value;
    //如果不是輸入0~255或是空白值的話,就不會動
    if (
      // RinputvalueNum < 255 &&
      // GinputvalueNum < 255 &&
      // BinputvalueNum < 255 &&
      // RinputvalueNum >= 0 &&
      // GinputvalueNum >= 0 &&
      // BinputvalueNum >= 0 &&
      // Rinputvalue.length > 0 &&
      // Ginputvalue.length > 0 &&
      // Binputvalue.length > 0
      //以下為助教建議修改後的ver1~
      // checkValue(Rinputvalue) &&
      // checkValue(Ginputvalue) &&
      // checkValue(Binputvalue)
      //以下為助教建議修改後的ver2
      checkValue(Rinputvalue, Ginputvalue, Binputvalue)
    ) {
      //變換RGB的顏色
      Rsquare.innerHTML = `<div style="width:36px; height:36px;background-color:rgb(${RinputvalueNum}, 0, 0)" class='Rsquare'></div>`;
      Gsquare.innerHTML = `<div style="width:36px; height:36px;background-color:rgb(0, ${GinputvalueNum}, 0)" class='Gsquare'></div>`;
      Bsquare.innerHTML = `<div style="width:36px; height:36px;background-color:rgb(0, 0, ${BinputvalueNum})" class='Bsquare'></div>`;
      //變換HEX的顏色
      HEXsquare.innerHTML = `<div style="width:100px; height:100px; background-color:rgb(${RinputvalueNum}, ${GinputvalueNum}, ${BinputvalueNum})" class='HEXsquare'></div>`;
      //轉換成16進制
      let RHEX = RinputvalueNum.toString(16).toUpperCase();
      let GHEX = GinputvalueNum.toString(16).toUpperCase();
      let BHEX = BinputvalueNum.toString(16).toUpperCase();
      let HEXinput = RHEX.concat(GHEX, BHEX);
      //將HEX更新進欄位
      document.querySelector(".HEX input").value = HEXinput;
      console.log(RHEX.toUpperCase());
      console.log(GHEX.toUpperCase());
      console.log(BHEX.toUpperCase());
      console.log(HEXinput);
    }
    //設置警告標示請他們輸入正確的數值
    else {
      alert(
        "You have to put number between 0 to 255 in RGB bar and you can't left one of the RBG bar empty!"
      );
    }
  }
});

//助教建議的例外檢驗function ver1~
// function checkValue(input) {
//   if (Number(input) < 255 && Number(input) >= 0 && input.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// }
//助教建議的例外檢驗function ver2~
function checkValue(r, g, b) {
  if (Number(r) <= 255 && Number(r) >= 0 && r.length > 0) {
    if (Number(g) <= 255 && Number(g) >= 0 && g.length > 0) {
      if (Number(b) <= 255 && Number(b) >= 0 && b.length > 0) {
        return true;
      }
    }
  } else {
    return false;
  }
}
