const form = document.getElementById("palForm"); 
const userTextInput = document.getElementById("userText"); 
const messages = document.getElementById("messages"); 
const doneBtn = document.getElementById("doneBtn"); 
const submitBtn = document.getElementById("submitBtn"); 
 
let sessionActive = true; 
 
function sanitizeInput(raw) { 
  return raw.replace(/[^a-z0-9]/gi, "").toLowerCase(); 
} 
 
function isPalindrome(text) { 
  const clean = sanitizeInput(text); 
  const reversed = clean.split("").reverse().join(""); 
  return clean.length > 0 && clean === reversed; 
} 
 
function renderMessage(html) { 
  messages.innerHTML = html; 
} 
 
function showResult(original, result) { 
  const chip = result ? '<span style="color:green;">Palindrome</span>' : '<span style="color:red;">Not a Palindrome</span>'; 
  renderMessage(`<p><strong>Input:</strong> ${original}</p><p><strong>Result:</strong> ${chip}</p>`); 
} 
 
form.onsubmit = function (evt) { 
  evt.preventDefault(); 
  if (!sessionActive) return; 
  const raw = userTextInput.value || ""; 
  if (raw.trim().length === 0) { 
    renderMessage("<p style='color:red;'>Please enter a word or phrase.</p>"); 
    userTextInput.focus(); 
    return; 
  } 
  const result = isPalindrome(raw); 
  showResult(raw, result); 
  userTextInput.value = ""; 
  userTextInput.focus(); 
}; 
 
doneBtn.onclick = function () { 
  sessionActive = false; 
  renderMessage("<p>Session Ended. Refresh to start again.</p>"); 
  userTextInput.disabled = true; 
  submitBtn.disabled = true; 
  doneBtn.disabled = true; 
}; 