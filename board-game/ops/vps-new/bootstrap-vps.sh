#!/usr/bin/env bash
# One-time installation only. Run interactively as nhat_hoang with sudo on the new VPS.
set -Eeuo pipefail
umask 077
readonly TARGET_IP='103.153.254.184'
[[ $# == 1 && "$1" =~ ^/home/nhat_hoang/cotuong-vps-bootstrap-review-[a-f0-9]{32}$ ]] || {
  echo 'expected the unique reviewed bundle path under nhat_hoang home' >&2
  exit 2
}
readonly SOURCE_DIR="$1"
readonly SELF='/root/cotuong-vps-bootstrap.sh'
readonly ADMIN='/usr/local/sbin/cotuong-vps-admin'
readonly SHARE='/usr/local/share/cotuong-vps'
readonly SUDOERS='/etc/sudoers.d/cotuong-vps-admin'
readonly DEPLOY_SUDOERS='/etc/sudoers.d/cotuong-deploy-activate'

die() { printf 'bootstrap-vps: %s\n' "$*" >&2; exit 1; }
[[ "$(id -u)" == 0 ]] || die 'invoke with sudo from the approved PowerShell bootstrap command'
[[ "$(id -un 2>/dev/null || true)" == root ]] || die 'root identity check failed'
[[ -d "$SOURCE_DIR" && ! -L "$SOURCE_DIR" && "$(realpath -e "$SOURCE_DIR")" == "$SOURCE_DIR" && "$(stat -c %U:%a "$SOURCE_DIR")" == 'nhat_hoang:700' ]] || die 'review bundle directory and its parent path must be canonical and nhat_hoang-owned mode 0700'
ip -o -4 addr show scope global | awk '{sub(/\/.*/, "", $4); print $4}' | grep -Fxq "$TARGET_IP" \
  || die "refusing to install on a host other than $TARGET_IP"
id nhat_hoang >/dev/null || die 'expected administrator nhat_hoang'
id -nG nhat_hoang | tr ' ' '\n' | grep -Fxq sudo || die 'nhat_hoang must already have sudo'

for path in "$ADMIN" "$SHARE" "$SUDOERS" "$DEPLOY_SUDOERS" /usr/local/sbin/cotuong-deploy-activate; do [[ ! -e "$path" && ! -L "$path" ]] || die "refusing to overwrite existing path: $path"; done
for path in /usr /usr/local /usr/local/sbin /usr/local/share /etc /etc/sudoers.d; do
  [[ -d "$path" && ! -L "$path" && "$(stat -c %U "$path")" == root ]] || die "unsafe parent directory: $path"
  [[ -z "$(find "$path" -maxdepth 0 -perm /022 -print)" ]] || die "group/world writable parent directory: $path"
done
for file in cotuong.service cotuong-test.conf cotuong-local-backup run-test-backup.py cotuong-backup.service cotuong-backup-alert.service cotuong-backup.timer upload-test-backup-r2.py cotuong-media-backup.py prune-test-r2-backups.py prune-test-local-backups.py cotuong-offsite-backup.service cotuong-r2-retention.service; do
  [[ -f "$SOURCE_DIR/$file" && ! -L "$SOURCE_DIR/$file" ]] || die "missing regular source file: $file"
done
[[ -f "$SOURCE_DIR/cotuong-vps-admin" && ! -L "$SOURCE_DIR/cotuong-vps-admin" ]] || die 'missing admin executable'
[[ -f "$SOURCE_DIR/cotuong-vps-admin.sudoers" && ! -L "$SOURCE_DIR/cotuong-vps-admin.sudoers" ]] || die 'missing sudoers policy'
[[ -f "$SOURCE_DIR/cotuong-deploy-activate" && ! -L "$SOURCE_DIR/cotuong-deploy-activate" ]] || die 'missing deploy activation helper'
[[ -f "$SOURCE_DIR/cotuong-deploy.sudoers" && ! -L "$SOURCE_DIR/cotuong-deploy.sudoers" ]] || die 'missing deploy sudoers policy'

visudo -cf "$SOURCE_DIR/cotuong-vps-admin.sudoers" >/dev/null || die 'sudoers syntax is invalid'
visudo -cf "$SOURCE_DIR/cotuong-deploy.sudoers" >/dev/null || die 'deploy sudoers syntax is invalid'
created_share=0
created=()
rollback_bootstrap() {
  local item
  for item in "${created[@]}"; do rm -f -- "$item"; done
  if ((created_share)); then rmdir -- "$SHARE" 2>/dev/null || true; fi
}
cleanup_bootstrap() {
  local status=$?
  if ((status != 0)); then rollback_bootstrap; fi
  rm -f -- "$SELF"
  exit "$status"
}
trap cleanup_bootstrap EXIT
install -d -o root -g root -m 0755 "$SHARE"
created_share=1
install -o root -g root -m 0750 "$SOURCE_DIR/cotuong-vps-admin" "$ADMIN"
created+=("$ADMIN")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong.service" "$SHARE/cotuong.service"
created+=("$SHARE/cotuong.service")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-test.conf" "$SHARE/cotuong-test.conf"
created+=("$SHARE/cotuong-test.conf")
install -o root -g root -m 0750 "$SOURCE_DIR/cotuong-local-backup" "$SHARE/cotuong-local-backup"
created+=("$SHARE/cotuong-local-backup")
install -o root -g root -m 0750 "$SOURCE_DIR/run-test-backup.py" "$SHARE/run-test-backup.py"
created+=("$SHARE/run-test-backup.py")
install -o root -g root -m 0750 "$SOURCE_DIR/cotuong-deploy-activate" /usr/local/sbin/cotuong-deploy-activate
created+=(/usr/local/sbin/cotuong-deploy-activate)
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-backup.service" "$SHARE/cotuong-backup.service"
created+=("$SHARE/cotuong-backup.service")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-backup-alert.service" "$SHARE/cotuong-backup-alert.service"
created+=("$SHARE/cotuong-backup-alert.service")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-backup.timer" "$SHARE/cotuong-backup.timer"
created+=("$SHARE/cotuong-backup.timer")
install -o root -g root -m 0750 "$SOURCE_DIR/upload-test-backup-r2.py" "$SHARE/upload-test-backup-r2.py"
created+=("$SHARE/upload-test-backup-r2.py")
install -o root -g root -m 0750 "$SOURCE_DIR/cotuong-media-backup.py" "$SHARE/cotuong-media-backup.py"
created+=("$SHARE/cotuong-media-backup.py")
install -o root -g root -m 0750 "$SOURCE_DIR/prune-test-r2-backups.py" "$SHARE/prune-test-r2-backups.py"
created+=("$SHARE/prune-test-r2-backups.py")
install -o root -g root -m 0750 "$SOURCE_DIR/prune-test-local-backups.py" "$SHARE/prune-test-local-backups.py"
created+=("$SHARE/prune-test-local-backups.py")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-offsite-backup.service" "$SHARE/cotuong-offsite-backup.service"
created+=("$SHARE/cotuong-offsite-backup.service")
install -o root -g root -m 0644 "$SOURCE_DIR/cotuong-r2-retention.service" "$SHARE/cotuong-r2-retention.service"
created+=("$SHARE/cotuong-r2-retention.service")
install -o root -g root -m 0440 "$SOURCE_DIR/cotuong-vps-admin.sudoers" "$SUDOERS"
created+=("$SUDOERS")
install -o root -g root -m 0440 "$SOURCE_DIR/cotuong-deploy.sudoers" "$DEPLOY_SUDOERS"
created+=("$DEPLOY_SUDOERS")
visudo -cf "$SUDOERS" >/dev/null || die 'installed sudoers policy failed validation'
visudo -cf "$DEPLOY_SUDOERS" >/dev/null || die 'installed deploy sudoers policy failed validation'

for path in /usr/local /usr/local/sbin "$SHARE" "$ADMIN" /usr/local/sbin/cotuong-deploy-activate "$SUDOERS" "$DEPLOY_SUDOERS"; do
  [[ "$(stat -c %U:%G "$path")" == root:root ]] || die "unexpected owner on $path"
  [[ -z "$(find "$path" -maxdepth 0 -perm /022 -print)" ]] || die "group/world writable path: $path"
done
created=()
created_share=0
printf 'Bootstrap installed. No packages, services, firewall, SSH, MySQL data, or application secrets were changed.\n'
printf 'Review with: sudo -l -U nhat_hoang; sudo %s preflight\n' "$ADMIN"
