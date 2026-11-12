// Compensate measured Android in-app text scaling without resizing game artwork.
(function () {
  var ua = navigator.userAgent || '';
  if (!/Android/i.test(ua) || !/Zalo|;\s*wv\b|Version\/4\.0/i.test(ua)) return;
  var adjustment = '100%';
  var probe = null;
  var scheduled = false;
  function apply(element) {
    if (!element || element.nodeType !== 1 || element === probe || !element.style) return;
    element.style.setProperty('-webkit-text-size-adjust', adjustment, 'important');
    element.style.setProperty('text-size-adjust', adjustment, 'important');
  }
  function subtree(root) {
    apply(root);
    if (!root.querySelectorAll) return;
    var nodes = root.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) apply(nodes[i]);
  }
  function calibrate() {
    if (!document.body) return;
    if (!probe) {
      probe = document.createElement('span');
      probe.setAttribute('data-hovang-font-probe', '');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;overflow:hidden;visibility:hidden;pointer-events:none;font:16px/16px Arial!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important';
      probe.textContent = 'M';
      document.body.appendChild(probe);
    }
    var measured = parseFloat(getComputedStyle(probe).fontSize);
    if (!isFinite(measured) || measured <= 0) return;
    // Ignore reductions and implausible samples; only compensate measured enlargement.
    var ratio = measured / 16;
    var next = ratio > 1.05 && ratio <= 4 ? (Math.round(10000 / ratio) / 100) + '%' : '100%';
    if (next !== adjustment) {
      adjustment = next;
      subtree(document.documentElement);
    }
    document.documentElement.setAttribute('data-hovang-text-adjustment', adjustment);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; calibrate(); });
  }
  subtree(document.documentElement);
  document.documentElement.setAttribute('data-hovang-inapp-text-sizing', '3');
  new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      for (var j = 0; j < records[i].addedNodes.length; j++) subtree(records[i].addedNodes[j]);
    }
    schedule();
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  schedule();
})();
