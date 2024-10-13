// 選擇所有的表格行
const rows = document.querySelectorAll('tbody tr');

// 計算得分並更新表格
function updateScores() {
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const nameCell = cells[0];
    const pointsCell = cells[1];
    let totalPoints = 0;

    // 計算得分（籃板 + 助攻 + 抄截 + 阻攻）
    for (let i = 2; i < cells.length; i++) {
      totalPoints += parseInt(cells[i].querySelector('span').textContent);
    }

    // 更新得分
    pointsCell.querySelector('span').textContent = totalPoints;

    // 處理拇指圖標
    if (totalPoints >= 20) {
      if (!nameCell.querySelector('.fa-thumbs-up')) {
        const thumbsUp = document.createElement('i');
        thumbsUp.className = 'fa fa-thumbs-up';
        nameCell.insertBefore(thumbsUp, nameCell.firstChild);
      }
    } else {
      const existingThumbsUp = nameCell.querySelector('.fa-thumbs-up');
      if (existingThumbsUp) {
        nameCell.removeChild(existingThumbsUp);
      }
    }
  });
}

// 為特定列添加加減號並設置初始值
rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  
  // 從第三個單元格開始（跳過名字和得分）
  for (let i = 1; i < cells.length; i++) {
    const cell = cells[i];
    const value = parseInt(cell.textContent);
    
    // 創建新的 HTML 結構
    if (i === 1) {  // 得分列
      cell.innerHTML = `<span style="font-size: 25px">${value}</span>`;
    } else {  // 其他統計數據列
      cell.innerHTML = `
        <span style="font-size: 25px">${value}</span>
        <i class="fa fa-plus-circle up" aria-hidden="true"></i>
        <i class="fa fa-minus-circle down" aria-hidden="true"></i>
      `;
    }
  }
});

// 添加事件監聽器到表格
document.querySelector('table').addEventListener('click', function(event) {
  if (event.target.classList.contains('fa-plus-circle') || event.target.classList.contains('fa-minus-circle')) {
    const cell = event.target.closest('td');
    const valueSpan = cell.querySelector('span');
    let value = parseInt(valueSpan.textContent);

    if (event.target.classList.contains('fa-plus-circle')) {
      value++;
    } else {
      value = Math.max(0, value - 1);  // 確保值不會小於 0
    }

    valueSpan.textContent = value;

    // 更新得分和圖標
    updateScores();
  }
});

// 初始更新得分和圖標
updateScores();