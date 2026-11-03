# Website shortcuts on Chrome Android

2026-11-03: The user replaced native PWA installation and immersive fullscreen
promotion with a small HOVANG invitation to create a website shortcut manually.

Chrome Android in normal browser display shows the Material invitation during
entry Loading. No installability event or native install API is required. Desktop,
other browsers and standalone/fullscreen display modes bypass it. Existing
authentication/data initialization continues; only the entry UI waits for an
answer. The account's normal Home/Login routing stays unchanged.

- **Để sau:** close, save a seven-day deadline under
  `hovang-shortcut-later-until`, proceed when initialization is ready.
- **Cho phép:** show HOVANG's own manual instructions. It neither invokes a native
  install prompt nor creates a shortcut. The guide can always be closed, including
  when Chrome does not offer the expected menu option.
- **Đóng hướng dẫn:** resume normal entry routing and defer another invitation for
  seven days. This is a dismissal, not evidence of successful shortcut creation.
- No fake success, HTML/MHT download, WebAPK request or automatic fullscreen.

Google's documented sequence is Chrome menu (three dots), **Cài đặt và tạo lối
tắt**, **Tạo lối tắt**, then **Thêm**. The interface may differ across versions;
older Chrome may label the entry **Thêm vào màn hình chính**. If only an app-install
action is available, the player can close our guide and continue. A web page
cannot operate Chrome's menu or reliably observe whether the user added the icon.

The old `hovang-pwa-installed` and `hovang-install-later-until` flags are left in
storage but are no longer used by this feature. No site data or cookies are
cleared. Standalone/fullscreen display detection still prevents showing the new
invitation in an installed app context. The controller retains its existing
internal export names to avoid unrelated changes to the entry wiring.

## Manifest and browser limits

Android continues selecting `/manifest-android.webmanifest`, but its `display` is
now `browser`, not `fullscreen`. Identity, scope, icon URLs, colors and other
metadata remain. The canonical desktop manifest stays `standalone` to avoid
changing existing laptop app behavior. The existing Android viewport containment
remains; there is no new game/mobile/desktop geometry change.

Android automatic `beforeinstallprompt` promotion is prevented without retaining
or invoking its event. This does **not** remove Chrome's manual install command:
Chrome can still offer app installation, and a browser can expose different menu
choices or use cached manifest metadata. We cannot guarantee that every Chrome
version offers shortcut-only creation, nor force an existing WebAPK to turn into
a shortcut. Old installed apps may retain their native display until Chrome
updates their metadata; this update does not uninstall anything.

Do not remove manifest IDs/icons, unregister the push worker, clear storage,
change server settings or implement downloads merely to force shortcut behavior.
The push-only service worker and official icons are preserved byte-for-byte.

## Validation

Tests cover automatic browser-only invitation, loading hold after readiness,
Later/deadline, manual guide/open/close, zero calls to native prompt, unsupported
contexts, storage denial, StrictMode, unmount, restore errors, unchanged auth
routing and Android browser manifest selection. Browser fixtures test responsive
presentation; actual Android menu/icon creation remains separate real-device QA.

References:

- [Google: Create website shortcuts on Android](https://support.google.com/chrome/answer/15085120?co=GENIE.Platform%3DAndroid&hl=vi)
- [Google: Install web apps on Android](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=vi)
