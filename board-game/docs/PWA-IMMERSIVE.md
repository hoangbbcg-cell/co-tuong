# Installed Android PWA fullscreen

**Superseded on 2026-11-03:** the Android manifest now uses `display: browser`.
Native installation promotion/fullscreen was replaced by manual website-shortcut
guidance. See [WEBSITE-SHORTCUT.md](WEBSITE-SHORTCUT.md). Historical instructions
below do not describe the current product policy.

2026-11-03: Android installs select `public/manifest-android.webmanifest`, with
`display: fullscreen`. Other platforms retain `/manifest.webmanifest` and
`display: standalone`. The manifests have the same `id: /`, scope, start URL,
portrait orientation, official icon URLs and branding. `tests/pwa-platform.test.ts`
checks that `display` is their only data difference to prevent drift.

`public/hovang-pwa-platform.js` runs synchronously in the HTML head, after the
default manifest link and before the React entry. It changes the link only on
Android (excluding native WebView). It uses platform detection rather than screen
width, so resizing a laptop does not select the Android manifest. If scripting
fails or a browser presents a desktop user agent, the existing standalone
manifest remains the fallback.

The platform bootstrap never calls the Fullscreen API. Merely opening the site in
a Chrome tab does not enter immersive mode. Android/Chrome uses the installed
manifest to choose system UI behavior when launching the PWA/WebAPK from its icon.
Fullscreen normally hides status/navigation bars; Android controls the transient
bars revealed by edge swipes. Device policy, Chrome version and OEM settings can
affect behavior. A desktop viewport screenshot cannot certify Android system bars.

## Camera cutouts and controls

Android gets `viewport-fit=contain`, rather than `cover`. Chrome can reserve the
safe rectangle around cutouts instead of drawing controls underneath the camera.
This can leave a protected strip around a cutout; hiding system bars does not mean
putting playable cells or buttons behind physical hardware. No arbitrary notch
height is hardcoded and no CSS fullscreen is used.

Existing board fitting uses its actual arena dimensions/ResizeObserver; the game
surface uses the current dynamic viewport height. Existing mobile Home and install
invitation safe-area rules remain. There are no avatar, board or control geometry
changes in this task. Viewport containment applies to fixed elements and portals
without adding inconsistent padding throughout the application.

The install controller recognizes both standalone and fullscreen display modes,
including on a device with no stored installation marker. The invitation's design,
click handling, seven-day deferral, login and game rules are unchanged.

## Updating an already installed application

The old manifest URL is deliberately kept unchanged for desktop apps. Android
installs made before this change used that same old URL. Android now selects a
different manifest URL, so **automatic migration of the old installation is not
guaranteed**, even though the app identity stays the same. Reopening the old icon
or refreshing game code alone does not prove the native WebAPK display mode was
updated.

For existing Android users who still see system bars:

1. Close HOVANG. Remove/uninstall the installed HOVANG PWA from Android.
2. Keep Chrome's website data/cookies; do not clear site storage. An unlinked Guest
   depends on that browser data. Use the same Chrome profile when reinstalling.
3. Open `https://hovanggame.com` in Chrome Android and choose Chrome's official
   **Install app / Add to Home screen** command. Use the app-install option rather
   than a shortcut-only option if Chrome distinguishes them.
4. Open HOVANG from the newly installed icon. Check the top/bottom system bars,
   then swipe from an edge to verify transient bars. Check the camera area,
   lowest control row, keyboard and external login/return flow on the actual phone.

The custom loading invitation may remain suppressed by its existing installed
marker or deferral. Use Chrome's menu to reinstall; the invitation does not bypass
Chrome's installation decision. No account data is intentionally changed by this
frontend update, but preservation across uninstall depends on browser/OS behavior;
keep an account linked before intentionally clearing any browser data.

For future updates that keep the **Android manifest URL** stable, Chrome supports
manifest updates including `display`. Google documents checks roughly once per
24 hours, with WebAPK updates queued until the app is closed and the device has
Wi-Fi/power. Timing is browser-controlled. For diagnostics, Google's documented
`about://webapks` Update command can schedule a check; this does not guarantee
migration from the old, different manifest URL. Reinstalling is the reliable
fallback for that transition. Desktop users do not need to reinstall.

## Verification boundaries

Automated tests cover platform selection, unchanged desktop identity/branding,
early bootstrap order, absence of Fullscreen API calls, existing invitation
regressions, installed fullscreen exclusion, restore-error priority and game
touch-scrolling behavior. Browser fixture QA uses the actual GamePage replay UI
at phone dimensions and reduced safe-rectangle heights; it is not an Android
system-bar, physical-cutout or native-login certification. Real-device QA must
remain explicitly NOT TESTED until performed.

References:

- [Chromium Android webapps architecture](https://github.com/chromium/chromium/blob/main/components/webapps/docs/android_architecture.md)
- [Fullscreen system bars and swipe behavior](https://codereview.chromium.org/2871103002)
- [Chrome manifest update behavior and URL warning](https://web.dev/articles/manifest-updates)
- [Chrome display-cutout behavior](https://developer.chrome.com/blog/new-in-chrome-69#display-cutouts)
