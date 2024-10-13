// 用戶數據
const users = [
    {
        name: "Guillaume Vincent",
        email: "guillaume.vincent@example.com",
        gender: "male",
        age: 25,
        region: "CH",
        birthday: "1995-05-05",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15982/man_02.png"
    },
    {
        name: "Vanessa Davis",
        email: "vanessa.davis@example.com",
        gender: "female",
        age: 33,
        region: "AU",
        birthday: "1987-08-08",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15980/woman_01.png"
    },
    {
        name: "Justine Smith",
        email: "justine.smith@example.com",
        gender: "female",
        age: 53,
        region: "CA",
        birthday: "1967-11-13",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15987/woman_04.png"
    },
    {
        name: "Zbigniew Gleich",
        email: "zbigniew.gleich@example.com",
        gender: "male",
        age: 45,
        region: "DE",
        birthday: "1975-10-13",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15983/man_03.png"
    },
    {
        name: "Elias Silva",
        email: "elias.silva@example.com",
        gender: "male",
        age: 31,
        region: "BR",
        birthday: "1989-12-05",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15981/man_01.png"
    },
    {
        name: "Anna-Marie Kretschmann",
        email: "anna-marie.kretschmann@example.com",
        gender: "female",
        age: 22,
        region: "DE",
        birthday: "1998-04-10",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15986/woman_03.jpg"
    },
    {
        name: "Dominic Dupont",
        email: "dominic.dupont@example.com",
        gender: "male",
        age: 63,
        region: "CH",
        birthday: "1957-06-29",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15985/man_04.png"
    },
    {
        name: "Mae Robinson",
        email: "mae.robinson@example.com",
        gender: "female",
        age: 36,
        region: "US",
        birthday: "1984-11-29",
        avatar: "https://assets-lighthouse.alphacamp.co/uploads/image/file/15984/woman_02.png"
    },
];

// 生成用戶卡片
function generateUserCards() {
    const userList = document.getElementById('user-list');
    users.forEach(user => {
        const card = `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${user.avatar}" class="card-img-top" alt="${user.name}">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">${user.region}</p>
                        <button class="btn btn-primary" onclick="showUserDetails('${user.email}')">查看詳情</button>
                    </div>
                </div>
            </div>
        `;
        userList.innerHTML += card;
    });
}

// 顯示用戶詳情
function showUserDetails(email) {
    const user = users.find(u => u.email === email);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${user.avatar}" class="img-fluid mb-3" alt="${user.name}">
        <p><strong>名字：</strong> ${user.name}</p>
        <p><strong>郵箱：</strong> ${user.email}</p>
        <p><strong>性別：</strong> ${user.gender}</p>
        <p><strong>年齡：</strong> ${user.age}</p>
        <p><strong>地區：</strong> ${user.region}</p>
        <p><strong>生日：</strong> ${user.birthday}</p>
    `;
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
}

// 頁面加載時生成用戶卡片
document.addEventListener('DOMContentLoaded', generateUserCards);