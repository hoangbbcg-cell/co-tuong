# Loading, install invitation and entry transition

**Superseded on 2026-11-03:** the user replaced native PWA installation with
manual website-shortcut guidance. See [WEBSITE-SHORTCUT.md](WEBSITE-SHORTCUT.md).
The historical flow below is no longer the active product policy.

2026-11-03: The entry UI now waits for an already-visible Chrome Android PWA
invitation to settle. This supersedes the earlier behavior where finishing the
minimum loading timer could unmount an unanswered invitation.

`EntryGate` subscribes to `loadingInstall.getGateSnapshot()` separately from the
invitation's visible-event snapshot. It keeps `GameLoadingScreen` mounted while
there is an unanswered eligible invitation or an outstanding native prompt.
Account restore/data loading continue normally in `useEntryStore`; only the UI
transition waits. The ordinary minimum loading timer and account readiness are
still required. Existing routing remains authoritative: a valid entry leads to
Home, otherwise Login; the install flow never creates authentication.

- No usable event before loading completes: proceed normally; never wait for a
  future installability event. Late events are ignored after the transition.
- **Để sau:** consume this invitation, save the seven-day deadline, then proceed
  once background initialization/minimum loading have completed.
- **Cho phép:** call the saved event's `prompt()` synchronously in the click
  handler. Hide the custom invitation but retain a separate native-pending gate.
  Release after prompt/user-choice completion, rejection or synchronous failure.
- A completed/dismissed/failed invitation cannot reopen repeatedly in the same
  entry session. A future page load can offer again subject to stored policies
  and a new browser event. Each native event can be consumed only once.
- Installed markers, appinstalled, standalone/fullscreen display modes and
  non-Chrome-Android environments bypass the invitation. Errors remain visible.
- Leaving/unmounting Loading invalidates pending async completions. Restore
  errors cancel the invitation/native gate; stale completion cannot overwrite
  the current entry flow. React StrictMode preserves an early captured offer.

No timeout guesses how long the user needs to choose or how long Chrome keeps
its native prompt open. While a real prompt is genuinely outstanding, waiting is
intentional. No background API request is paused. No new Fullscreen API call,
manifest/icon/style change, backend behavior or database access was introduced.

Tests use the actual EntryGate with a controlled account source and browser-event
promises, covering readiness before choice, Later, native dismissal/acceptance/
errors, no event, installed/desktop bypass, early choice before network readiness,
late events, unmount, restore errors and StrictMode. Native Android dialog QA is
separate and must not be inferred from jsdom tests.
