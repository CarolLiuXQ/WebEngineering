let findGirlsButton = document.querySelector("#findGirls");
let clearButton = document.querySelector("#clearProfiles");
let profilewrap = document.querySelector(".profilewrap");

findGirlsButton.addEventListener("click", findGirls);
clearButton.addEventListener("click", clearProfiles);

function findGirls() {
  let count = 0;
  while (count < 3) {
    axios
      .get("https://randomuser.me/api/?gender=female")
      .then((response) => {
        let results = response.data.results[0];
        let node = document.createElement("div");
        let firstname = results.name.first;
        let lastname = results.name.last;
        node.innerHTML = `<div class="profile"><h3 class="name">${firstname} ${lastname}</h3><img src="${results.picture.large}" alt="" width="200" height="200"><div class="email">${results.email}</div></div>`;
        profilewrap.appendChild(node);
      })
      .catch(function (error) {
        console.log(error);
      });
    count++;
  }
}

function clearProfiles() {
  profilewrap.innerHTML = '';
}