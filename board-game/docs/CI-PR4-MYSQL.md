# PR #4: MySQL integration and random player sides

Base: `57ed88f7b2b40ccdc23ea42af9b8b805926e5034`, branch `test-github-ci`.

GitHub run39871079607 passed typecheck/unit tests and failed integration. Downloading job/run logs returned403 (repository admin rights required), but check-run annotations were readable: account-persistence.integration.test.ts196 expected renamed player in redName, and239 expected disconnect winner black. The connector was not connected; no production access was attempted.

Reproduced from an isolated checkout of that exact commit using a disposable MySQL8.0.45 instance, port33319/temp datadir, without .env. Migrate31 steps, rerun0, schema verify and smoke all passed. Original integration failed2/17: rename expected redName despite first player being Black, and draw attempted a Red move from a Black socket. The disconnect assertion fails for the same reason when the remaining player is Red, as confirmed by GitHub annotations.

RoomService.startMatch intentionally assigns sides at match start using its existing firstPlayerSide selector. The tests incorrectly treated join order as final side. No migration, DB configuration, Elo policy, repository or gameplay changes are needed.

Fix only integration tests: use the acknowledged server snapshot for the renamed player's name field, Red's move socket, and the remaining player's winning side. Inject both selector outcomes through RoomService's existing constructor seam in the test module (all actual service behavior retained), parameterize resignation/draw/disconnect for Red and Black. Keep Elo/gold/energy/history/saved-name/identity assertions, also verify opponent names are unchanged. Integration grows17→20 tests; no skip or weakened expectation.

Validation: disposable MySQL integration20/20, migrate/rerun/verify/smoke PASS; typecheck/build PASS. `npm test`:397 passed/26 gated or skipped by existing conditions,0 failures (95 files); integration is explicitly executed separately. No new skip conditions were added. Local Node24/Windows is not a claim that GitHub Node22/Ubuntu has passed; the PR workflow must confirm that after push.

Changes are prepared in a detached checkout, not the workspace with unfinished UI changes. No production/VPS connection, merge or deployment. Commit/push must pass actual Gitleaks8.30.1 plus the existing pre-push hook; scanner configuration is copied locally for the hook and is not part of this fix.
