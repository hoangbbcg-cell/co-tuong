# CI/CD plan for the isolated new VPS

This is a test-only deployment path. Do not edit/reuse the active production workflow or `scripts/deploy-vps.sh`; those are pinned to `103.9.78.75`, `/home/nhat_hoang/co-tuong/board-game`, `/var/www/cotuong`, current production database/backup hooks and `hovanggame.com` health checks.

## Prepared release contract

`build-test-release.sh <40-character SHA>` is intended for a CI runner checked out at that SHA. It confirms the commit is reachable from `origin/master`, refuses tracked environment files other than `.env.example` and admin-access files, installs exactly the lockfile dependencies, runs typecheck/tests/build, archives the tracked `board-game/` project at the release root plus generated `dist` and `node_modules`, verifies the root layout expected by systemd, and places the shared upload directory at `/srv/cotuong/shared/uploads`. `.env.example`, ignored Fairy/Pikafish binaries, and other local files are not packed. The workflow accepts only commits that contain this packager, so it can package the same tested commit without executing tooling from a different revision.

The current artifact-only workflow uploads only the immutable archive to GitHub Actions artifacts. It does not SSH, copy files to the VPS, create release pointers, or run DB migrations. A separate deployment workflow is not part of this PR. If approved and implemented later, that workflow would transfer the archive as `cotuong_deploy` into `/srv/cotuong/releases/<SHA>` owned by `cotuong_deploy:cotuong_release`, create `/srv/cotuong/deploy/pending` as a symlink whose only accepted target is `../releases/<40-hex-SHA>`, and call the exact NOPASSWD command `sudo -n /usr/local/sbin/cotuong-deploy-activate`. It would run no `npm ci` on the server and perform no DB migrations.

The root-owned activation helper accepts no arguments/environment. It validates the pinned host IP, release SHA/path/owner/group and required files, rejects environment/admin-access files, atomically switches `/srv/cotuong/current`, restarts only `cotuong-test.service`, checks `http://127.0.0.1:3001/api/health`, and restores the prior symlink/service if health fails. It never modifies MySQL or deletes old releases. A first deploy with no previous release stops the service and removes `current` if health fails.

## GitHub configuration required later

The candidate repository-root `.github/workflows/vps-test-release.yml` is artifact-only: it dispatches from `master`, checks that the `vps-test` Environment already exists and has at least one required reviewer before any job references the environment, then checks that the selected SHA is on `master`, contains this packager, and has a successful `CI` push run. This preflight prevents GitHub from silently creating an unprotected Environment when the workflow runs. Required reviewers are configured in GitHub Environment settings, not in workflow YAML. The file must be merged to `master` before it can be dispatched; the current master SHA `a1633921736cef352e34baa385980bb81df60ed7` predates this packager and is therefore intentionally not a valid release input.

Before enabling the deployment half, inspect the repository remote and current CI workflow. Keep it separate from both the production workflow and the artifact-only workflow. The deployment workflow must:

1. Runs only from `master`, accepts a full 40-character SHA, and verifies the SHA is an ancestor of `origin/master`.
2. Uses Ubuntu 24.04 and Node 22, runs `npm ci`, typecheck, full tests, build and `build-test-release.sh`.
3. Uses a GitHub Environment named `vps-test` with a required reviewer, least-privilege `contents: read`, no database migration and no production secrets.
4. Uses `VPS_TEST_SSH_KEY` and a verified `VPS_TEST_KNOWN_HOSTS` entry as Environment secrets. Never use `ssh-keyscan` as trust-on-first-use. `VPS_TEST_HOST` must be fixed to `103.153.254.184`; `VPS_TEST_USER` fixed to `cotuong_deploy`.
5. Transfers only the built tarball, extracts as deploy into the SHA directory, creates the pending marker, then invokes the root-owned activation helper. Do not pass shell text, archive paths, service names, database commands or environment variables to sudo.

Pin third-party GitHub Actions to reviewed full commit SHAs. Put the deployment key only in the GitHub Environment secret; create it separately and keep its private half out of this repository, PowerShell history, chat and logs. The public half is installed for `cotuong_deploy` only after host-key and permissions checks.

## Deliberate gates

- This PR includes only the artifact-building workflow. It does not upload to the VPS, deploy code, or set GitHub secrets. A separate deployment workflow remains gated on verified host keys, a deploy key, VPS preflight and explicit review.
- Initial MySQL schema/user and application `.env` require a separate operator step. Do not run migrations on a fresh database until credentials, schema name `cotuong_stage`, grants and migration plan are reviewed.
- Existing app code expects Fairy-Stockfish and Pikafish Linux assets. Fairy release compatibility, license notice and pinned checksum are not established in this repository; deployment can run, but engine play should remain disabled until that asset is reviewed and smoke-tested.
- This workflow does not alter firewall, DNS, TLS, external backups, GitHub production secrets or data on the old VPS.
