// === init.js ===
//const TARGET_HASH = "677a7a7bb291f4f096f60fa004203c3b0e10a7281d7a4157749df0de86528f4f"; 
const TARGET_HASH = "4d99d50b8706b8cb5380528adee94ccb94ce30d696ce504170a2818106c53ad8";
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleLogin() {
  const inputEl = document.getElementById('auth-input');
  const errorEl = document.getElementById('auth-error');
  const password = inputEl.value;

  if (!password) return;

  const hashedInput = await hashPassword(password);

  if (hashedInput === TARGET_HASH) {
    errorEl.textContent = "";
    
    // 💡 關鍵：驗證成功，在當前分頁寫入登入憑證
    sessionStorage.setItem('isNotebookLoggedIn', 'true');
    
    // 跳轉到首頁 (因為都在 html 資料夾，直接寫檔名)
    window.location.href = "top.html";
  } else {
    errorEl.textContent = "ACCESS DENIED";
    inputEl.value = "";
    inputEl.focus();
  }
}

document.getElementById('auth-btn').addEventListener('click', handleLogin);
document.getElementById('auth-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') handleLogin();
});