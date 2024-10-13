# S22_A1_Q2_幫我找個朋友(Friend_Finder)

AlphaCamp 學期2-2，A1 作業專案的隨機用戶生成器，
使用 HTML、CSS 和 JavaScript 打造的動態網頁應用程式，通過 API 獲取隨機用戶信息。

## 功能描述

- 提供一個 "Random User" 按鈕，點擊後生成隨機用戶資料。
- 顯示隨機用戶的姓名、頭像和電子郵件地址。
- 使用 axios 庫從 Random User API 獲取隨機用戶數據。
- 使用 Node.js 建立簡單的伺服器來託管靜態檔案。

## 專案範例

![範例動畫](./demo.gif)

### 安裝與執行步驟

1. 複製專案到本機
```
git clone https://github.com/CarolLiuXQ/S22_A1_Q2_Friend_Finder.git
```

2. 進入專案資料夾
```
cd S22_A1_Q2_Friend_Finder
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
- JavaScript (ES6+)
- Node.js
- axios (用於 API 請求)

## 專案結構

- `index.html`: 主要的 HTML 檔案，包含用戶界面結構
- `style.css`: 樣式表檔案，定義了頁面的樣式和布局
- `index.js`: 前端 JavaScript 檔案，處理按鈕點擊事件和 API 請求
- `server.js`: Node.js 伺服器檔案，用於託管靜態檔案

## 功能說明

1. **隨機用戶生成**：
   - 點擊 "Random User" 按鈕，從 Random User API 獲取隨機用戶數據。

2. **用戶信息顯示**：
   - 顯示隨機用戶的姓名。
   - 顯示用戶的頭像圖片。
   - 顯示用戶的電子郵件地址。

3. **動態更新**：
   - 每次點擊按鈕時，頁面上的用戶信息會即時更新。

4. **響應式設計**：
   - 使用 CSS 確保頁面在不同設備上都能正常顯示。

## 開發者

[CarolLiuXQ](https://github.com/CarolLiuXQ)

## License
© [CarolLiuXQ] 版權所有