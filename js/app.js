let currentIndex = 0; // 當前觀看的畫作索引

function renderArtwork(index) {
  const data = exhibitionData[index];

  // 1. 切換整體主題 (北齋 / 梵谷 / 未來其他展)
  document.getElementById("app-body").className = data.theme;

  // 2. 填入文字資料
  document.getElementById("exhibition-title").innerText = data.exhibitionTitle;
  document.getElementById("progress-tracker").innerText = `${data.group} - 第 ${index + 1} / ${exhibitionData.length} 件`;
  document.getElementById("artwork-title").innerText = data.artworkTitle;
  document.getElementById("artwork-meta").innerText = data.meta;
  document.getElementById("artwork-img").src = data.imageUrl;

  // 3. 渲染標籤 (Tags)
  const tagsContainer = document.getElementById("tags-container");
  tagsContainer.innerHTML = ""; // 清空舊標籤
  data.tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.innerText = tag;
    tagsContainer.appendChild(span);
  });

  // 4. 渲染條列式看點 (Highlights)
  const highlightsList = document.getElementById("highlights-list");
  highlightsList.innerHTML = ""; // 清空舊看點
  data.highlights.forEach(point => {
    const li = document.createElement("li");
    li.innerText = point;
    highlightsList.appendChild(li);
  });
}

// 按鈕監聽器
document.getElementById("btn-next").addEventListener("click", () => {
  if (currentIndex < exhibitionData.length - 1) {
    currentIndex++;
    renderArtwork(currentIndex);
  }
});

document.getElementById("btn-prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderArtwork(currentIndex);
  }
});

// 初始化：載入第一筆資料
renderArtwork(currentIndex);