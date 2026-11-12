// Android uses browser display for website shortcuts, not a fullscreen WebAPK.
// The desktop manifest URL and display mode stay unchanged.
(function () {
  if (!/Android/i.test(navigator.userAgent) || /; wv\)/i.test(navigator.userAgent)) return;
  var manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) manifest.setAttribute('href', '/manifest-android.webmanifest');
  // Keep the browser viewport inside camera cutouts. Do not opt into cover
  // without auditing every fixed/portal control in the shared game UI.
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    var content = (viewport.getAttribute('content') || '').replace(/,?\s*viewport-fit\s*=\s*[^,]+/gi, '');
    viewport.setAttribute('content', content + ', viewport-fit=contain');
  }
  // No Fullscreen API: a normal browser tab must retain its browser/system UI.
})();
