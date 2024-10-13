let results;
let name = document.querySelector(".name");
let email = document.querySelector(".email");
let img = document.querySelector("img");
addEventListener("click", function () {
  axios
    .get("https://randomuser.me/api/")
    .then(function (response) {
      // API回傳結果
      results = response.data.results[0];
      //更新名字
      let firstname = results.name.first;
      let lastname = results.name.last;
      name.innerHTML = `${firstname} ${lastname}`;
      //更新圖片
      img.src = `${results.picture.large}`;
      //更新email
      email.innerHTML = results.email;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
