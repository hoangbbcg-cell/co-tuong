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

`create-deploy-user` creates `cotuong` and `cotuong_deploy` without installing an SSH key; it generates an opaque random password hash for the SSH account without retaining or printing its plaintext. Deploy and runtime share only the dedicated read-only `cotuong_release` group for code. Deploy is not a member of `cotuong`, which owns private uploads/storage, so deployment cannot read user media. Its sudoers grant is only the no-argument activation helper. Creating the account/credential and installing its public key are distinct review gates before CI is enabled. `install-app-unit` installs and enables a unit for boot, but does not start it, and only after a release and correctly protected environment file exist. The test Nginx site refuses to enable without an actual built release. The local backup timer refuses to install until a test-only database named `cotuong_stage` is present and MySQL root socket auth works. This is local backup only; offsite upload and restore evidence remain a separate approval gate.

`build-test-release.sh` prepares a SHA-addressed release for a reviewed CI workflow. It rejects tracked environment files other than the safe `.env.example` template and all admin-access files at any path. The activation helper repeats the environment/admin-access check recursively on the submitted release. See the [CI/CD plan](CI-CD.md) for artifact verification, manual deploy, and remaining prerequisites.

## CI/CD hardening checkpoint — 2026-10-28

The new PR candidate adds Oxlint, high/critical `npm audit`, pinned Gitleaks scanning, and regressions for the test release archive and VPS helper scripts. The packager now uses group-readable/non-writable release permissions (`umask 027`, release root `2750`) and validates the archive before upload. A separate `workflow_dispatch` workflow validates the exact master SHA and successful push CI, runs package checks, waits at the `vps-test` Environment gate, then uses only `cotuong_deploy` plus the fixed no-argument activation helper. Merge never triggers deployment; there are no migrations in the workflow.

Live GitHub facts at this checkpoint: PR #6 is already merged at `28c76bcf041d165b26d5ea4a85c827e0394b3428`; CI push run `40608977741` passed. `vps-test` has reviewer `hoangbbcg-cell`, allows only `master`, and has `can_admins_bypass=false`; self-review is currently allowed. Repository has one collaborator (`hoangbbcg-cell`), no master ruleset/branch protection, and auto-merge is off. The user chose CI-only PR protection (zero required approvals), official squash auto-merge, no bypass, and manual reviewer-gated deploy. A ruleset change was reported before application; it remains to be applied after candidate checks are ready.

The deploy identity key and known-hosts secrets are not configured in Environment `vps-test`. New VPS checkpoint still lacks `/etc/cotuong/cotuong.env`, `cotuong-test.service`, and `/srv/cotuong/current`; the test database/schema has not been verified. Therefore the deploy workflow must fail preflight until those prerequisites are prepared. No VPS, database, firewall, DNS, Nginx, or production data was changed in this checkpoint.

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
