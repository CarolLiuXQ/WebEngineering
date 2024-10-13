# S21_A25_Q1_FB-CSS_Spongebob

AlphaCamp 學期2-1，A25 作業專案的 Facebook 貼文模擬器，
使用 HTML 和 CSS 打造的靜態網頁應用程式，模擬海綿寶寶的 Facebook 貼文。

## 功能描述

- 模擬 Facebook 貼文的外觀和布局。
- 展示海綿寶寶的個人資訊、貼文內容和互動元素。
- 包含貼文者資訊、貼文時間、貼文內容、影片預覽、互動按鈕和評論區域。
- 使用 Node.js 建立簡單的伺服器來託管靜態檔案。

## 專案範例

![範例截圖](./demo.png)

### 安裝與執行步驟

1. 複製專案到本機
```
git clone https://github.com/CarolLiuXQ/S21_A25_Q1_FB-CSS_Spongebob.git
```

2. 進入專案資料夾
```
cd S21_A25_Q1_FB-CSS_Spongebob
```

3. 啟動伺服器
```
node server.js
```

4. 開啟瀏覽器，輸入 http://localhost:3000 即可瀏覽網頁

## 環境建置與需求

- [Node.js](https://nodejs.org/) - JavaScript 執行環境
- [Visual Studio Code](https://code.visualstudio.com/) - 建議使用的程式碼編輯器

## 使用技術

- HTML5
- CSS3
- Node.js (用於靜態檔案服務)

## 專案結構

- `index.html`: 主要的 HTML 檔案，包含 Facebook 貼文的結構
- `style.css`: 樣式表檔案，定義了 Facebook 貼文的樣式和布局
- `server.js`: Node.js 伺服器檔案，用於託管靜態檔案

## 功能說明

1. **貼文頭部**：
   - 顯示海綿寶寶的頭像和名稱。
   - 顯示貼文時間。

2. **貼文內容**：
   - 展示海綿寶寶的貼文文字。
   - 包含 YouTube 影片預覽連結。

3. **互動區域**：
   - 顯示點讚數和評論數。
   - 提供「讚」、「回應」和「分享」按鈕。

4. **評論區域**：
   - 顯示其他角色（如派大星和章魚哥）的評論。
   - 包含評論的點讚功能。

5. **留言輸入框**：
   - 提供一個模擬的留言輸入區域。

## 開發者

[CarolLiuXQ](https://github.com/CarolLiuXQ)

## License
© [CarolLiuXQ] 版權所有