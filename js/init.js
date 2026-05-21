const TARGET_HASH = "922b53ea837e15ffe640f2e755e3d2f379fb34d103c8d69f99ec32025434f020";
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
    
    sessionStorage.setItem('isNotebookLoggedIn', 'true');
    
    window.location.href = "top.html";
  } else {
    errorEl.textContent = "Now, say my name!";
    inputEl.value = "";
    inputEl.focus();
  }
}

document.getElementById('auth-btn').addEventListener('click', handleLogin);
document.getElementById('auth-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') handleLogin();
});