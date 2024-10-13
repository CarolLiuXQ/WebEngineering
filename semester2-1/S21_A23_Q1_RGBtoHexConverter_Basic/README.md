# S21_A23_Q1_RGBtoHexConverter_Basic

AlphaCamp 學期2-1，A23 作業專案的 RGB 到 HEX 轉換器，
使用 HTML、CSS 和 JavaScript 打造的動態顏色轉換網頁應用程式。

## 功能描述

- 提供 RGB 顏色輸入介面，包含紅（R）、綠（G）、藍（B）三個輸入欄位。
- 即時將 RGB 值轉換為對應的 HEX 顏色代碼。
- 顯示 RGB 和 HEX 的顏色預覽方塊。
- 使用 Node.js 建立簡單的伺服器來託管靜態檔案。

## 專案範例

![範例動畫](./demo.gif)

### 安裝與執行步驟

1. 複製專案到本機
```
git clone https://github.com/CarolLiuXQ/S21_A23_Q1_RGBtoHexConverter_Basic.git
```

2. 進入專案資料夾
```
cd S21_A23_Q1_RGBtoHexConverter_Basic
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
- Bootstrap（用於樣式和佈局）

## 專案結構

- `index.html`: 主要的 HTML 檔案
- `style.css`: 樣式表檔案
- `index.js`: 前端 JavaScript 檔案，處理動態功能和顏色轉換邏輯
- `server.js`: Node.js 伺服器檔案

## 功能說明

1. **RGB 輸入**：
   - 提供紅（R）、綠（G）、藍（B）三個輸入欄位，接受 0-255 的數值。

2. **即時顏色預覽**：
   - 顯示 RGB 各個分量的顏色預覽方塊。
   - 顯示合成後的 HEX 顏色預覽方塊。

3. **RGB 到 HEX 轉換**：
   - 點擊轉換按鈕後，將 RGB 值轉換為對應的 HEX 顏色代碼。

4. **輸入驗證**：
   - 確保輸入的 RGB 值在有效範圍內（0-255）。
   - 防止空白輸入。

5. **動態更新**：
   - 顏色變更時即時反映在預覽方塊上。

## 開發者

[CarolLiuXQ](https://github.com/CarolLiuXQ)

## License
© [CarolLiuXQ] 版權所有