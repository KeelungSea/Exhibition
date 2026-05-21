// === data-gogh.js ===
// 1. 確保資料庫存在（這行是防呆機制，不要刪掉）
window.ArtworksDB = window.ArtworksDB || {};

// 2. 將梵谷的畫作陣列註冊進資料庫的 "gogh" 抽屜裡
window.ArtworksDB['gogh'] = [
  {
    id: 0, // 這個 ID 等於陣列的位置（順序）
    group: "群組 1：波瀾的起點",
    title: "神奈川沖浪裏",
    meta: "葛飾北齋 | 1830‒33年頃 | 冨嶽三十六景",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/800px-The_Great_Wave_off_Kanagawa.jpg",
    tags: ["初次公開", "極致摺頁"],
    highlights: [
      "本展焦點：此為現存作品中，摺頁與保存狀態極其卓越的珍稀版本。",
      "構圖看點：巨大的浪花與遠方靜止的富士山形成強烈的「動與靜」對比。"
    ]
  },
  {
    id: 1, 
    group: "群組 1：波瀾的起點",
    title: "凱風快晴 (赤富士)",
    meta: "葛飾北齋 | 1830‒33年頃 | 冨嶽三十六景",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Red_Fuji_southern_wind_clear_morning.jpg/800px-Red_Fuji_southern_wind_clear_morning.jpg",
    tags: ["青富士的對比", "傑作"],
    highlights: [
      "赤富士展現了夏末秋初的早晨，富士山被朝陽染紅的瞬間。",
      "本次展覽將同時展出極度稀有的色變版「青富士」，可對比兩者的色彩張力。"
    ]
  }
];