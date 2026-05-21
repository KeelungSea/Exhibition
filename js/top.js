// === top.js ===

// 🛡️ 安全守衛：檢查是否有登入蓋章，沒有就強制踢回登入頁
if (sessionStorage.getItem('isNotebookLoggedIn') !== 'true') {
  window.location.href = "init.html";
}

// 💡 這裡原本的 const portalData = [...] 已經移到 data/top-data.js 裡了！
// 接下來的引擎會直接使用 portalData 這個變數

const listContainer = document.getElementById("exhibition-list");

portalData.forEach(exhibition => {
  const highlightsHTML = exhibition.highlights.map(point => `<li>${point}</li>`).join('');
  const cardHTML = `
    <div class="exhibition-card">
      <div class="card-header">
        <div class="card-title-group">
          <h2>${exhibition.title}</h2>
          <div class="subtitle">${exhibition.subtitle}</div>
        </div>
        <div class="toggle-icon">▼</div>
      </div>
      <div class="card-details-wrapper">
        <div class="card-details-inner">
          <div class="info-grid">
            <div class="info-item"><span>展期 Dates</span>${exhibition.date}</div>
            <div class="info-item"><span>地點 Venue</span>${exhibition.location}</div>
            <div class="info-item"><span>門票 Tickets</span>${exhibition.price}</div>
          </div>
          <div class="highlights">
            <h3>展覽看點 Highlights</h3>
            <ul>${highlightsHTML}</ul>
          </div>
          <a href="index.html?exhibition=${exhibition.id}" class="btn-enter">進入展覽目錄 →</a>
        </div>
      </div>
    </div>
  `;
  listContainer.innerHTML += cardHTML;
});

// 綁定點擊展開事件
const headers = document.querySelectorAll('.card-header');
headers.forEach(header => {
  header.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});