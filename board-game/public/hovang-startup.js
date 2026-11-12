// Runs before the app, including on browsers that cannot parse its modules.
(function () {
  'use strict';
  var root = document.getElementById('root');
  if (!root) return;
  var completed = false;
  var observer;
  var timer;
  var panel = document.createElement('section');
  panel.id = 'hovang-startup';
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  panel.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;box-sizing:border-box;background:#193932;color:#fff2cc;font:18px/1.5 sans-serif;text-align:center;';
  var message = document.createElement('p');
  message.textContent = 'Đang mở game HOVANG…';
  panel.appendChild(message);
  var retry = document.createElement('button');
  retry.type = 'button';
  retry.textContent = 'Thử lại';
  retry.style.cssText = 'display:none;padding:12px 28px;border:1px solid #ffe08b;border-radius:8px;background:#613014;color:#fff2cc;font:inherit;cursor:pointer;';
  retry.onclick = function () { window.location.reload(); };
  panel.appendChild(retry);
  var help = document.createElement('p');
  help.style.cssText = 'display:none;max-width:440px;font-size:15px;';
  help.textContent = 'Kiểm tra kết nối mạng rồi thử lại. Nếu vẫn chưa mở được, hãy mở https://hovanggame.com bằng Chrome, Safari hoặc Edge đã cập nhật.';
  panel.appendChild(help);
  document.body.appendChild(panel);
  function failed() {
    if (completed) return;
    message.textContent = 'Chưa tải được game HOVANG';
    retry.style.display = 'block';
    help.style.display = 'block';
  }
  function resourceFailed(event) {
    var target = event.target;
    if (target && target.tagName === 'SCRIPT' && target.type === 'module') failed();
  }
  function check() {
    if (!root.firstElementChild) return;
    completed = true;
    clearTimeout(timer);
    if (observer) observer.disconnect();
    window.removeEventListener('hovang:startup-error', failed);
    window.removeEventListener('vite:preloadError', failed);
    window.removeEventListener('error', resourceFailed, true);
    if (panel.parentNode) panel.parentNode.removeChild(panel);
  }
  window.addEventListener('hovang:startup-error', failed);
  window.addEventListener('vite:preloadError', failed);
  window.addEventListener('error', resourceFailed, true);
  timer = setTimeout(failed, 30000);
  if (typeof MutationObserver === 'function') {
    observer = new MutationObserver(check);
    observer.observe(root, { childList: true });
  }
  check();
})();
