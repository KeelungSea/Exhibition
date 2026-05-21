
if (sessionStorage.getItem('isNotebookLoggedIn') !== 'true') {
  window.location.href = "init.html";
}

const urlParams = new URLSearchParams(window.location.search);
const currentExhibitionId = urlParams.get('exhibition');

if (!currentExhibitionId || !exhibitionDatabase[currentExhibitionId]) {
  window.location.href = "top.html";
} else {
  const data = exhibitionDatabase[currentExhibitionId];
  document.body.classList.add(`theme-${currentExhibitionId}`);

  let currentLang = localStorage.getItem('selectedLang') || 'ja';

  function renderCatalog() {
    document.getElementById("page-title").innerText = data.title[currentLang];
    document.getElementById("page-subtitle").innerText = data.subtitle[currentLang];

    const catalogList = document.getElementById("catalog-list");
    catalogList.innerHTML = "";
    
    let currentGroup = "";

    data.artworks.forEach((artwork, index) => {
      const groupName = artwork.group[currentLang];
      if (groupName !== currentGroup) {
        currentGroup = groupName;
        catalogList.innerHTML += `<div class="group-title">${currentGroup}</div>`;
      }

      const displayNum = String(index + 1).padStart(2, '0');

      const rowHTML = `
        <a href="detail.html?exhibition=${currentExhibitionId}&id=${artwork.id}" class="artwork-row">
          <div class="artwork-number">${displayNum}</div>
          <div class="artwork-info">
            <div class="artwork-title">${artwork.title[currentLang]}</div>
            <div class="artwork-meta">${artwork.meta[currentLang]}</div>
          </div>
          <div class="artwork-arrow">→</div>
        </a>
      `;
      catalogList.innerHTML += rowHTML;
    });
  }

  function initLangSwitcher() {
    const btnZh = document.getElementById('lang-zh');
    const btnJa = document.getElementById('lang-ja');

    function updateSwitcherUI() {
      if (currentLang === 'zh') {
        btnZh.classList.add('active');
        btnJa.classList.remove('active');
      } else {
        btnJa.classList.add('active');
        btnZh.classList.remove('active');
      }
    }

    btnZh.addEventListener('click', () => {
      currentLang = 'zh';
      localStorage.setItem('selectedLang', 'zh'); // 儲存選擇
      updateSwitcherUI();
      renderCatalog();
    });

    btnJa.addEventListener('click', () => {
      currentLang = 'ja';
      localStorage.setItem('selectedLang', 'ja'); // 儲存選擇
      updateSwitcherUI();
      renderCatalog();
    });

    updateSwitcherUI();
  }

  initLangSwitcher();
  renderCatalog();
}