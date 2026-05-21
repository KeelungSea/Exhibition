// === detail.js ===

// 🛡️ 安全守衛：沒登入就踢走
if (sessionStorage.getItem('isNotebookLoggedIn') !== 'true') {
  window.location.href = "init.html";
}

const urlParams = new URLSearchParams(window.location.search);
const exhibitionId = urlParams.get('exhibition');
const artworkId = parseInt(urlParams.get('id'));

// 🛑 核心防呆第一階段：如果連展覽 ID 都沒有，直接踢回大門
if (!exhibitionId) {
  window.location.href = "top.html";
} else {
  
  // 🚀 【核心黑魔法】：根據網址參數，動態建立並載入專屬資料檔
  const dataScript = document.createElement('script');
  dataScript.src = `../data/data-${exhibitionId}.js`; // 自動對準 data-hokusai.js 或 data-gogh.js

  // 當資料檔成功下載並解析完成後，才開始執行渲染
  dataScript.onload = function() {
    
    // 檢查動態下載的資料庫中是否有這個展覽
    const exhibitionData = window.ArtworksDB ? window.ArtworksDB[exhibitionId] : null;

    // 🛑 防呆第二階段：展覽對了，但畫作 ID 找不到，退回目錄頁
    if (!exhibitionData || isNaN(artworkId) || !exhibitionData[artworkId]) {
      window.location.href = `index.html?exhibition=${exhibitionId}`;
    } else {
      
      // 🟢 資料完全正確，開始執行原本完美的渲染邏輯
      const artwork = exhibitionData[artworkId];
      document.getElementById("detail-body").classList.add(`theme-${exhibitionId}`);

      // 讀取語言設定
      let currentLang = localStorage.getItem('selectedLang') || 'zh';
      
      // 雙語內容渲染函式
      function renderDetail() {
        document.getElementById("group-title").innerText = artwork.group[currentLang];
        document.getElementById("artwork-title").innerText = artwork.title[currentLang];
        document.getElementById("artwork-meta").innerText = artwork.meta[currentLang];
        document.getElementById("artwork-img").src = artwork.imageUrl;

        const displayNum = String(artworkId + 1).padStart(2, '0');
        document.getElementById("progress-tracker").innerText = `${displayNum} / ${exhibitionData.length}`;

        // 渲染雙語標籤 (Tags)
        const tagsContainer = document.getElementById("tags-container");
        tagsContainer.innerHTML = "";
        artwork.tags[currentLang].forEach(tag => {
          const span = document.createElement("span");
          span.className = "tag";
          span.innerText = tag;
          tagsContainer.appendChild(span);
        });

        // 渲染雙語看點 (Highlights)
        const highlightsList = document.getElementById("highlights-list");
        highlightsList.innerHTML = "";
        artwork.highlights[currentLang].forEach(point => {
          const li = document.createElement("li");
          li.innerText = point;
          highlightsList.appendChild(li);
        });
      }

      // 雙語切換監聽
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

      // 上下一頁按鈕路由與防呆
      const btnPrev = document.getElementById("btn-prev");
      const btnNext = document.getElementById("btn-next");
      const btnIndex = document.getElementById("btn-index");

      btnIndex.href = `index.html?exhibition=${exhibitionId}`;

      if (artworkId > 0) {
        btnPrev.href = `detail.html?exhibition=${exhibitionId}&id=${artworkId - 1}`;
      } else {
        btnPrev.classList.add("disabled");
        btnPrev.removeAttribute("href"); // 移除連結，防止點擊
      }

      if (artworkId < exhibitionData.length - 1) {
        btnNext.href = `detail.html?exhibition=${exhibitionId}&id=${artworkId + 1}`;
      } else {
        btnNext.classList.add("disabled");
        btnNext.removeAttribute("href");
      }

      // 執行初始化
      initLangSwitcher();
      renderDetail();
    }
  };

  // 🛑 防呆第三階段：如果連對應的 data-xxx.js 檔案都找不到（例如您還沒寫該展覽的資料），直接退回首頁
  dataScript.onerror = function() {
    window.location.href = "top.html";
  };

  // 將這個動態建立的標籤插入 HTML 頁面中啟動
  document.head.appendChild(dataScript);
}