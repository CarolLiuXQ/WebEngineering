let dataPanel = document.querySelector("#data-panel");
const movies = [
  {
    title: "The Avengers",
    image:
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/15305/TheAvengersPoster.jpg",
    rating: 0
  },
  {
    title: "Our Times",
    image:
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/15304/OurtimesPoster.jpeg",
    rating: 0
  },
  {
    title: "Aquaman",
    image:
      "https://assets-lighthouse.alphacamp.co/uploads/image/file/15303/AquamanPoster.jpg",
    rating: 0
  }
];
//把movies加入的function
function DisplayMovieDate(movies) {
  let htmlcontent = `
  <table class="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  `;
  movies.forEach((movie) => {
    htmlcontent += `
        <tr>
          <td>
            <img src = ${movie.image} width = "70" class="img-thumbnail" >
          </td>
          <td>${movie.title}</td>
          <td>
            <span class="fa fa-thumbs-up"></span>
            <span class="fa fa-thumbs-down px-2"></span>
            <span>${movie.rating}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-danger">X</button>
          </td>
        </tr>
      `;
  });

  htmlcontent += `
          </tbody>
      </table>
      `;
  return htmlcontent;
}
dataPanel.innerHTML = DisplayMovieDate(movies);

//感應Rating和叉叉的
dataPanel.addEventListener("click", function (event) {
  let target = event.target;
  //點到讚
  if (target.classList.contains("fa-thumbs-up")) {
    let ratingPoint = target.parentElement.children[2].innerText;
    let plusPoint = Number(ratingPoint) + 1;
    target.parentElement.children[2].innerText = plusPoint;
  }
  //點到倒讚
  else if (target.classList.contains("fa-thumbs-down")) {
    let ratingPoint = target.parentElement.children[2].innerText;
    let minusPoint = Number(ratingPoint) - 1;
    //讓分數不要低於0
    target.parentElement.children[2].innerText = Math.max(0, minusPoint);
  }
  //從清單移除
  else if (target.classList.contains("btn-sm")) {
    target.parentElement.parentElement.remove();
  }
});
