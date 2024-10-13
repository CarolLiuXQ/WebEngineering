// DEFAULT CODE ////////////////////////
const BASE_URL = "https://lyric-api-403c0.firebaseio.com/Adele/";
const songList = document.querySelector("#song-list");
const lyricsPanel = document.querySelector("#lyrics-panel");
const album = {
  artist: "Adele",
  album: "25",
  tracks: [
    "Hello",
    "Send My Love (To Your New Lover)",
    "I Miss You",
    "When We Were Young",
    "Remedy",
    "Water Under the Bridge",
    "River Lea",
    "Love in the Dark",
    "Million Years Ago",
    "All I Ask",
    "Sweetest Devotion"
  ]
};

// WRITE YOUR CODE ////////////////////////
//song list part////
//將song list的單頭加上
const songListContainer = document.querySelector(".song-list-container");
songListContainer.innerHTML +=
  '<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">';
const listTabContainer = document.querySelector("#v-pills-tab");

// 將album的title變成html的function
function addAlbumTitle(album) {
  //為了讓初始畫面是第一筆，所以把第一筆的Hello拿出迴圈獨自寫,所以是從0開始
  listTabContainer.innerHTML += `
  <a class="nav-link active show" id="v-pills-${0}-tab" data-toggle="pill" href="#v-pills-${0}" role="tab" aria-controls="v-pills-${0}" aria-selected="true">${album.tracks[0]
    }</a>
  `;
  //第一筆之後的
  for (let i = 1; i < album.tracks.length; i++) {
    listTabContainer.innerHTML += `
  <a class="nav-link" id="v-pills-${i}-tab" data-toggle="pill" href="#v-pills-${i}" role="tab" aria-controls="v-pills-${i}" aria-selected="false">${album.tracks[i]}</a>
  `;
  }
}
addAlbumTitle(album);

//將lyrics加入lyrics-panel的function
function addLyrics(album) {
  //為了讓初始畫面是第一筆，所以把第一筆的Hello拿出迴圈獨自寫,所以是從0開始
  axios
    .get(`${BASE_URL}${album.tracks[0]}.json`)
    .then(function (response) {
      tabContentdiv.innerHTML += `<div class="tab-pane fade active show" id="v-pills-${0}" role="tabpanel" aria-labelledby="v-pills-${0}-tab"><h3>${album.tracks[0]
        }</h3><pre>${response.data.lyrics}</pre></div>`;
    })
    .catch(function (error) {
      console.log(error);
    });
  //第一筆之後的
  for (let i = 1; i < album.tracks.length; i++) {
    axios
      .get(`${BASE_URL}${album.tracks[i]}.json`)
      .then(function (response) {
        tabContentdiv.innerHTML += `<div class="tab-pane fade" id="v-pills-${i}" role="tabpanel" aria-labelledby="v-pills-${i}-tab"><h3>${album.tracks[i]}</h3><pre>${response.data.lyrics}</pre></div>`;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


//lyrics part///////////
//將lyrics-panel的bootstrap的單頭加上

lyricsPanel.innerHTML += `<div class="tab-content" id="v-pills-tabContent">`;
const tabContentdiv = document.querySelector("#v-pills-tabContent");
//執行API把歌詞全部載入
addLyrics(album);


//加入loadingImg//////////
let loadingImg = document.createElement("img");
loadingImg.src =
  "https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif";
loadingImg.className = "loadingImg";
loadingImg.height = 500;
loadingImg.weight = 500;
//確認是不是已經將全部的api導入,如果還沒有全部導入的話,用添加進loadingImg
if (
  tabContentdiv.children.length !== album.tracks.length &&
  lyricsPanel.children[1] === undefined
) {
  lyricsPanel.appendChild(loadingImg);
}

//如果已經全部導入了,要將添加進的loadingImg刪除
listTabContainer.addEventListener("click", function clickLabel(event) {
  if (
    tabContentdiv.children.length === album.tracks.length &&
    typeof lyricsPanel.children[1] === "object"
  ) {
    lyricsPanel.children[1].remove();
  }
});