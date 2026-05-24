
if (sessionStorage.getItem('isNotebookLoggedIn') !== 'true') {
  window.location.href = "init.html";
}

const urlParams = new URLSearchParams(window.location.search);
const exhibitionId = urlParams.get('exhibition');
const artworkId = parseInt(urlParams.get('id'));

if (!exhibitionId) {
  window.location.href = "top.html";
} else {
  
  const dataScript = document.createElement('script');
  dataScript.src = `../data/data-${exhibitionId}.js`; // 自動對準 data-hokusai.js 或 data-gogh.js

  dataScript.onload = function() {
    
    const exhibitionData = window.ArtworksDB ? window.ArtworksDB[exhibitionId] : null;

    if (!exhibitionData || isNaN(artworkId) || !exhibitionData[artworkId]) {
      window.location.href = `index.html?exhibition=${exhibitionId}`;
    } else {
      
      const artwork = exhibitionData[artworkId];
      document.getElementById("detail-body").classList.add(`theme-${exhibitionId}`);

      let currentLang = localStorage.getItem('selectedLang') || 'zh';
      
      function renderDetail() {
        document.getElementById("group-title").innerText = artwork.group[currentLang];
        document.getElementById("artwork-title").innerText = artwork.title[currentLang];
        document.getElementById("artwork-meta").innerText = artwork.meta[currentLang];
        document.getElementById("artwork-img").src = artwork.imageUrl;

        const displayNum = String(artworkId).padStart(2, '0');
        document.getElementById("progress-tracker").innerText = `${displayNum} / ${exhibitionData.length-1}`;

        const tagsContainer = document.getElementById("tags-container");
        tagsContainer.innerHTML = "";
        artwork.tags[currentLang].forEach(tag => {
          const span = document.createElement("span");
          span.className = "tag";
          span.innerText = tag;
          tagsContainer.appendChild(span);
        });

        const highlightsList = document.getElementById("highlights-list");
        highlightsList.innerHTML = "";
        artwork.highlights[currentLang].forEach(point => {
          const li = document.createElement("li");
          li.innerText = point;
          highlightsList.appendChild(li);
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
          localStorage.setItem('selectedLang', 'zh');
          updateSwitcherUI();
          renderDetail();
        });

        btnJa.addEventListener('click', () => {
          currentLang = 'ja';
          localStorage.setItem('selectedLang', 'ja');
          updateSwitcherUI();
          renderDetail();
        });

        updateSwitcherUI();
      }
      const btnPrev = document.getElementById("btn-prev");
      const btnNext = document.getElementById("btn-next");
      const btnIndex = document.getElementById("btn-index");

      btnIndex.href = `index.html?exhibition=${exhibitionId}`;

      if (artworkId > 0) {
        btnPrev.href = `detail.html?exhibition=${exhibitionId}&id=${artworkId - 1}`;
      } else {
        btnPrev.classList.add("disabled");
        btnPrev.removeAttribute("href"); 
      }

      if (artworkId < exhibitionData.length - 1) {
        btnNext.href = `detail.html?exhibition=${exhibitionId}&id=${artworkId + 1}`;
      } else {
        btnNext.classList.add("disabled");
        btnNext.removeAttribute("href");
      }

      initLangSwitcher();
      renderDetail();
    }
  };

  dataScript.onerror = function() {
    window.location.href = "top.html";
  };

  document.head.appendChild(dataScript);
}