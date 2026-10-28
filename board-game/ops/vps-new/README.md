# New VPS automation bundle (review only)

Pinned target: `103.153.254.184`, Ubuntu 24.04, test-only app tree `/srv/cotuong`. This separate bundle never connects to the old VPS or the existing domain; the CI/CD plan names them only to warn against reusing production configuration.

The `create-deploy-user` action asks for the exact interactive phrase `CREATE-DEPLOY-IDENTITY` before creating accounts and a discarded random password hash.

Security boundary: deploy and runtime share only the dedicated read-only `cotuong_release` group for code. `cotuong_deploy` is not a member of `cotuong`, which owns private uploads/storage, so deployment cannot read user media.

The local test backup script verifies the compressed dump and keeps prior files; it does not delete backups or upload them offsite.

## VPS checkpoint — 2026-10-27

`install-node22` and helper `preflight` pass on the new VPS; Node is `v22.23.3` and npm is `10.9.9`. MySQL is active on `127.0.0.1:3306`; Nginx is inactive and port 80 has no listener. The `cotuong` and `cotuong_deploy` identities and isolated `/srv/cotuong` directories exist. The test schema was not verified because the SSH admin account cannot authenticate as MySQL root over the socket. `/etc/cotuong/cotuong.env`, `/srv/cotuong/current`, and `cotuong-test.service` are not present, so app activation must wait for a reviewed test schema, protected environment file, and release artifact.

`bootstrap-vps.ps1` uploads the bundle to a unique private review directory only, using `StrictHostKeyChecking=yes`; it does not invoke sudo. It verifies SHA256 for every uploaded file against the local reviewed bundle and removes the temporary local manifest. After review, the printed SSH command asks for the administrator's sudo password directly in the PowerShell terminal, refuses an existing `/root/cotuong-vps-bootstrap.sh`, copies the installer to `/root` as root-owned mode 0700, then runs that protected copy to install the helpers, static templates, and two exact-command sudoers policies. The one-time installer removes its temporary root-owned copy on exit, refuses another host and overwrites, validates sudoers syntax before and after installation, checks root ownership and non-writable parent directories, and does not install packages, create users, enable services, change SSH/firewall, create databases, touch data, or store secrets.

The installed admin helper is root-owned and only accepts one fixed action argument. Its sudoers policy has no wildcard, shell, SETENV, SSH/firewall command, package-manager command, or arbitrary path permission. The deploy user has a separate no-argument root helper for fixed-path release activation, service restart and health-checked code rollback only. Every root helper checks that the VPS owns the pinned IP. `upgrade-os` requires an explicit terminal phrase and never reboots. Node 22 uses the official Node.js archive and SHA256 manifest over verified HTTPS, pinned to 22.23.3. Engine installation fails closed until the Linux XQ artifact, runtime compatibility, license notice and release checksum are reviewed.

The existing Node tree audit compares numeric owner UID `0`, checks group/world write bits only on non-symlinks, and does not follow symlinks. When an unsafe entry is found, the helper reports its path; a failed `find` scan is reported separately. An already installed, verified Node version is checked before any archive download; the official archive is fetched only when the fixed target is absent. The old check had no pipeline, and its command substitution did not propagate `find`'s exit status through `[[ ]]`, so `pipefail` was not relevant there. Do not recursively change ownership or permissions to bypass this check. Run `bash ops/vps-new/test-node-tree-check.sh` to exercise clean trees, unexpected owner UID, writable files/directories, symlink mode/ownership, and scan-error handling.

Installed helpers and parent directories are root-owned and not group/world writable, so `nhat_hoang`/deploy/Codex cannot edit them as ordinary users. The administrator retains their existing unrestricted sudo capability; therefore the OS cannot make these helpers immutable to that administrator while preserving sudo access. The bundle does not change or revoke that existing capability. The `upgrade-os` action also requires an explicit `VNC-RECOVERY-READY` phrase before package changes because OS/package changes have no in-script rollback; kernel/OpenSSH upgrades could require console recovery. Take a VPS snapshot and confirm VNC/provider-console access before this action.

`create-deploy-user` creates `cotuong` and `cotuong_deploy` without installing an SSH key; it generates an opaque random password hash for the SSH account without retaining or printing its plaintext. Deploy and runtime share only the dedicated read-only `cotuong_release` group for code. Deploy is not a member of `cotuong`, which owns private uploads/storage, so deployment cannot read user media. Its sudoers grant is only the no-argument activation helper. Creating the account/credential and installing its public key are distinct review gates before CI is enabled. `install-app-unit` installs and enables the unit when the protected environment file exists; before the first release `current` may be absent, and the helper never starts the service. If `current` exists, it must resolve to a complete release under the fixed releases directory. The test Nginx site refuses to enable without an actual built release. The local backup timer refuses to install until a test-only database named `cotuong_stage` is present and MySQL root socket auth works. This is local backup only; offsite upload and restore evidence remain a separate approval gate.

`build-test-release.sh` prepares a SHA-addressed release for a reviewed CI workflow. It rejects tracked environment files other than the safe `.env.example` template and all admin-access files at any path. The activation helper repeats the environment/admin-access check recursively on the submitted release. See the [CI/CD plan](CI-CD.md) for artifact verification, manual deploy, and remaining prerequisites.

## CI/CD checkpoint — 2026-10-28 (before first-boot setup)

CI hardening and manual-only VPS test workflows are merged. `master` is protected by a ruleset requiring PRs and passing `checks`/`Secret scan`, allowing squash only, with no bypass actors and no required approvals. PR #6 and PR #7 are merged; the CI run on `39488082d71eb63cfd052c10603f9463fcc893db` passed. The test deployment remains a separate `workflow_dispatch` action behind the `vps-test` reviewer gate; merge never deploys.

Environment `vps-test` requires reviewer `hoangbbcg-cell`, allows only `master`, and disallows admin bypass. Environment secrets `VPS_TEST_SSH_KEY` and `VPS_TEST_KNOWN_HOSTS` are configured. SSH with the dedicated deploy key has been verified against `cotuong_deploy`; its only sudo grant is the fixed no-argument activation helper. The test host key is pinned to ED25519 fingerprint `SHA256:CJzV7hFpB6mDfGDoBm/ViJvw5D5HlBhR60gmOJGLW74`.

On the new VPS, MySQL is active and a read-only query confirmed `root@localhost`; schema `cotuong_stage` and users `cotuong_app`/`cotuong_migrator` are absent. `/etc/cotuong/cotuong.env`, `cotuong-test.service`, and `/srv/cotuong/current` are absent. Nginx remains inactive. The deploy public key and private incoming directories are prepared; no app release was activated. A follow-up code review found and fixed two first-deploy issues in the pending CD change: the deploy identity must not inspect the protected environment path, and the unit must be installable/enabled without starting the service before the first release. The first-boot PowerShell script and root setup script are prepared alongside these fixes; DB/environment/unit creation requires interactive sudo. No old VPS, production data, DNS, firewall, public Nginx, or deployment was touched.

## Actions after bootstrap (one at a time)

Each operation is separate and should be approved/executed only after reviewing its preflight:

```powershell
ssh -i "$HOME\.ssh\cotuong_new_vps" -o IdentitiesOnly=yes -o BatchMode=yes nhat_hoang@103.153.254.184 'sudo -n /usr/local/sbin/cotuong-vps-admin preflight'
ssh -tt -i "$HOME\.ssh\cotuong_new_vps" -o IdentitiesOnly=yes nhat_hoang@103.153.254.184 'sudo -n /usr/local/sbin/cotuong-vps-admin upgrade-os'
```

Then separately: `install-web-stack`, `install-node22`, `install-netdata`, `create-deploy-user`, test-only MySQL user/schema setup, engine verification, service, Nginx and backup. Do not batch these actions: inspect and validate after every stage. `install-fairy-stockfish` currently exits safely because compatibility of an upstream Linux XQ asset with the repository's Fairy adapter has not been verified. Do not substitute Pikafish assets.

## Explicit approval gates

- Snapshot/console recovery before OS upgrades or any externally reachable service.
- Exposing test HTTP on port 80 and allowing inbound traffic in provider controls. This bundle does not change host or provider firewall.
- Creating fresh test MySQL users/schema and entering credentials in `/etc/cotuong/cotuong.env`; secrets are not in this repository.
- Choosing a verified Fairy-Stockfish Linux XQ release/artifact and reviewing its license/source notice and checksum.
- Creating the CI deploy SSH key, adding its public key, and setting GitHub Environment secrets/branch protections. No private key is generated, uploaded, or printed by this bundle.
- Any DNS/TLS/cutover, production data copy, external backup destination, or monitoring endpoint exposure.

## Security review / validation commands

Run from Git Bash/Ubuntu staging (not against production):

```sh
bash -n ops/vps-new/cotuong-vps-admin ops/vps-new/bootstrap-vps.sh ops/vps-new/cotuong-local-backup ops/vps-new/cotuong-deploy-activate ops/vps-new/build-test-release.sh
bash -n ops/vps-new/test-node-tree-check.sh
bash ops/vps-new/test-node-tree-check.sh
visudo -cf ops/vps-new/cotuong-vps-admin.sudoers
visudo -cf ops/vps-new/cotuong-deploy.sudoers
```

Inspect installed files after bootstrap:

```sh
sudo namei -l /usr/local/sbin/cotuong-vps-admin /usr/local/share/cotuong-vps /etc/sudoers.d/cotuong-vps-admin
sudo find /usr/local/sbin/cotuong-vps-admin /usr/local/share/cotuong-vps /etc/sudoers.d/cotuong-vps-admin -maxdepth 0 -printf '%u:%g %m %p\n'
sudo visudo -c
sudo -l -U nhat_hoang
```

The deploy account must later be checked with `sudo -l -U cotuong_deploy`; it must have no sudo rights. Keep the old `scripts/deploy-vps.sh`, old sudoers example, systemd units, `/home/nhat_hoang/co-tuong/board-game`, `/var/www/cotuong`, old database/backups, VPS and domain untouched. They are specific to the current production deployment and are not consumed by this bundle.

## VPS test checkpoint — 2026-10-28 (after first-boot setup)

The operator reported successful first-boot setup: empty `cotuong_stage`, app/migrator accounts, protected environment files, and `cotuong-test.service` installed/enabled but not started. No migration or release activation was run. The root helper backup reported by the operator is `/root/cotuong-helper-backup-20261028T045100Z-32997`.

Read-only verification after bootstrap: Ubuntu 24.04.3; MySQL active; `cotuong-test.service` enabled/inactive; Nginx inactive with no listeners on ports 80/443; `/srv/cotuong` root:root 0755, `releases` cotuong_deploy:cotuong_release 2750, `deploy` cotuong_deploy:cotuong_deploy 0700, and `current` absent. The unit points to `/srv/cotuong/current`, uses `/opt/node-v22.23.3/bin/node`, runs as `cotuong`, and binds port 3001 to `127.0.0.1`. Installed admin and activation helpers are root:root 0750; the unit template is root:root 0644; `/etc/cotuong` is root:cotuong 0750. No secret values were read.

GitHub API confirms Environment `vps-test` allows only `master`, has required reviewer `hoangbbcg-cell`, and disallows admin bypass. `prevent_self_review` is false, so the sole configured reviewer may approve their own run. The names `VPS_TEST_SSH_KEY` and `VPS_TEST_KNOWN_HOSTS` exist as Environment secrets; values were not read. Master commit `af307564ddb161832be054aba3ff63fe19f1bec4` passed CI run `40634111191`.

The deploy user's private home is mode 0700, so its `.cotuong-incoming` directory and sudo policy could not be checked through the admin SSH identity without another privileged read. The read-only GitHub workflow `vps-test-preflight.yml` is intended to verify that contract after its Environment approval, without uploading or activating a release. The current release artifact has not been built. MySQL schema/grants and protected env file metadata were not independently re-read because privileged SQL/stat required an interactive sudo password; the successful bootstrap log confirms their creation. All migration files remain unapplied. No deployment, service start, Nginx, firewall, DNS, old VPS, or production data was changed.

## Next steps before the first test release

1. Run the `VPS test read-only preflight` workflow from `master` and approve its Environment gate. It must pass before deployment; it does not upload or activate a release.
2. Separately review and apply the current SQL migrations to `cotuong_stage` with the protected migrator configuration, then run `db:verify` with the application account. Do not start the service or deploy while migrations are pending. DDL has implicit commits; preserve the migration journal and stop for manual inspection if a step fails.
3. Select a full `master` SHA with successful push CI. The manual release/deploy workflow will package that SHA, validate the checksum/archive, pause at the `vps-test` reviewer gate, then run its SSH preflight before transferring a release. Merge and artifact creation alone do not deploy.
4. After explicit approval to deploy, watch systemd/API/Socket.IO health. On first-release failure, the activation helper removes `current` and stops `cotuong-test.service`; it never rolls back database migrations. Keep Nginx inactive and public ports closed.

## Current readiness — 2026-10-28

The operator confirms bootstrap completed, creating `cotuong_stage`, app/migrator accounts, protected environment and `cotuong-test.service`. PR #15 merged and master CI passed. Read-only VPS preflight run `40640901804` reports both `validate-environment-gate` and `preflight` SUCCESS; the `vps-test` Environment was approved. This is user-provided run evidence. It proves the checks in that read-only workflow passed, but it does not verify MySQL grants/schema journal or protected env metadata and did not create a backup, restore a dump, run migrations, build/transfer a release, or start/restart a service.

The current local checkout from the earlier task was on `test-github-ci` with extensive modified and untracked files from unrelated UI/game work and VPS preparation. It was preserved untouched. The deployment-readiness candidate is being prepared in a separate worktree from fetched `origin/master` at `63055354`; the old checkpoint above remains historical and must not be used as current VPS state.

Before first release, produce a SHA-addressed artifact from a master commit with passing push CI, take a test-only pre-migration backup, verify its SHA-256, and run the repository's disposable-schema restore validator. Only then run migrations `001`–`012` on `cotuong_stage` with `cotuong_migrator`, followed by `db:verify` with `cotuong_app`. The deploy workflow intentionally runs no DDL. The service health endpoint is liveness-only; deployment adds a Socket.IO polling handshake but neither proves DB readiness. The first activation restarts the service; on failure with no prior release it stops service and removes `current`. No DB rollback is automated.

No actual backup, restore, migration, or deployment has been reported. The restore validator has only repository regression tests and has not been exercised on VPS/MySQL. Keep Nginx inactive and public ports closed.
