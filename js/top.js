if (sessionStorage.getItem('isNotebookLoggedIn') !== 'true') {
  window.location.href = "init.html";
}
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

const headers = document.querySelectorAll('.card-header');
headers.forEach(header => {
  header.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});