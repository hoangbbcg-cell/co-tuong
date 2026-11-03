#!/usr/bin/env bash
# One-time preparation for the isolated test VPS. Run only through the reviewed PowerShell wrapper.
set -Eeuo pipefail
umask 077
export PATH=/usr/sbin:/usr/bin:/sbin:/bin

readonly TARGET_IP='103.153.254.184'
readonly APP_ROOT='/srv/cotuong'
readonly BUNDLE_PATTERN='^/home/nhat_hoang/\.cotuong-vps-setup-[a-f0-9]{32}$'
readonly ENV_DIR='/etc/cotuong'
readonly ENV_FILE="$ENV_DIR/cotuong.env"
readonly MIGRATOR_FILE="$ENV_DIR/cotuong-migrator.env"
readonly ADMIN_HELPER='/usr/local/sbin/cotuong-vps-admin'
readonly ACTIVATOR='/usr/local/sbin/cotuong-deploy-activate'
readonly UNIT_SOURCE='/usr/local/share/cotuong-vps/cotuong.service'
readonly UNIT_PATH='/etc/systemd/system/cotuong-test.service'

die() { printf 'prepare-test-vps: %s\n' "$*" >&2; exit 1; }
[[ $# == 1 && "$1" =~ $BUNDLE_PATTERN ]] || die 'expected the unique bundle path under /home/nhat_hoang'
readonly BUNDLE="$1"
[[ "$(id -u)" == 0 ]] || die 'run through interactive sudo'
ip -o -4 addr show scope global | awk '{sub(/\/.*/, "", $4); print $4}' | grep -Fxq "$TARGET_IP" || die 'wrong VPS'
[[ -d "$BUNDLE" && ! -L "$BUNDLE" && "$(realpath -e "$BUNDLE")" == "$BUNDLE" ]] || die 'bundle must be a real directory'
[[ "$(stat -c %U:%G:%a "$BUNDLE")" == 'nhat_hoang:nhat_hoang:700' ]] || die 'bundle must be nhat_hoang-owned mode 0700'

for file in prepare-test-vps-first-boot.sh cotuong-vps-admin cotuong-deploy-activate cotuong.service .sha256; do
  [[ -f "$BUNDLE/$file" && ! -L "$BUNDLE/$file" ]] || die "missing regular bundle file: $file"
  [[ "$(stat -c %U:%G "$BUNDLE/$file")" == 'nhat_hoang:nhat_hoang' ]] || die "unexpected owner on $file"
  [[ -z "$(find "$BUNDLE/$file" -maxdepth 0 -perm /022 -print)" ]] || die "group/world writable bundle file: $file"
done
[[ -f "$BUNDLE/.sha256" && ! -L "$BUNDLE/.sha256" ]] || die 'missing checksum manifest'
(cd "$BUNDLE" && sha256sum --check --status .sha256) || die 'bundle checksum mismatch'
bash -n "$BUNDLE/cotuong-vps-admin" "$BUNDLE/cotuong-deploy-activate" "$BUNDLE/prepare-test-vps-first-boot.sh" || die 'Bash syntax check failed'

id nhat_hoang >/dev/null || die 'administrator identity is missing'
id cotuong >/dev/null || die 'runtime identity is missing'
id cotuong_deploy >/dev/null || die 'deploy identity is missing'
[[ "$(/opt/node-v22.23.3/bin/node --version)" == 'v22.23.3' ]] || die 'Node.js 22.23.3 is not installed at the fixed path'
[[ "$(/opt/node-v22.23.3/bin/npm --version)" == '10.9.9' ]] || die 'unexpected npm version'
[[ -d "$APP_ROOT/releases" && ! -L "$APP_ROOT/releases" ]] || die 'release directory is missing or unsafe'
[[ ! -e "$APP_ROOT/current" && ! -L "$APP_ROOT/current" ]] || die 'current already exists; stop for manual review'
[[ ! -e "$ENV_FILE" && ! -L "$ENV_FILE" && ! -e "$MIGRATOR_FILE" && ! -L "$MIGRATOR_FILE" ]] || die 'environment files already exist; stop for manual review'
[[ ! -e "$UNIT_PATH" && ! -L "$UNIT_PATH" ]] || die 'systemd unit already exists; stop for manual review'
if [[ -e "$ENV_DIR" || -L "$ENV_DIR" ]]; then
  [[ -d "$ENV_DIR" && ! -L "$ENV_DIR" && "$(stat -c %U:%G:%a "$ENV_DIR")" == 'root:cotuong:750' ]] || die '/etc/cotuong exists with unexpected ownership or mode'
fi
[[ "$(stat -c %U:%G:%a "$APP_ROOT")" == 'root:root:755' ]] || die 'app root has unexpected ownership or mode'
[[ "$(stat -c %U:%G:%a "$APP_ROOT/releases")" == 'cotuong_deploy:cotuong_release:2750' ]] || die 'release root has unexpected ownership or mode'
nginx_state="$(systemctl is-active nginx 2>/dev/null || true)"
[[ "$nginx_state" == inactive || "$nginx_state" == unknown || "$nginx_state" == failed ]] || die 'Nginx is active; no changes made'
systemctl is-active --quiet mysql || die 'MySQL service is not active'
[[ "$(mysql --protocol=socket --user=root --batch --skip-column-names --execute='SELECT CURRENT_USER()')" == 'root@localhost' ]] || die 'MySQL socket authentication is not root@localhost'
mysql --protocol=socket --user=root --batch --skip-column-names --execute='SELECT VERSION()' | grep -Eq '^8\.' || die 'MySQL 8.x is required'
command -v openssl >/dev/null || die 'openssl is required to generate database passwords'

readonly existing_state="$(mysql --protocol=socket --user=root --batch --skip-column-names --execute="SELECT (SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name='cotuong_stage') + (SELECT COUNT(*) FROM mysql.user WHERE User IN ('cotuong_app','cotuong_migrator'))")"
[[ "$existing_state" == 0 ]] || die 'test database or account already exists; no changes made'

for path in "$ADMIN_HELPER" "$ACTIVATOR" "$UNIT_SOURCE"; do
  [[ -f "$path" && ! -L "$path" && "$(stat -c %U:%G "$path")" == root:root ]] || die "installed helper/template is missing or unsafe: $path"
  [[ -z "$(find "$path" -maxdepth 0 -perm /022 -print)" ]] || die "installed helper/template is writable by group/world: $path"
done
bash -n "$ADMIN_HELPER" "$ACTIVATOR" || die 'currently installed helper syntax is invalid'
systemd-analyze verify "$BUNDLE/cotuong.service" || die 'systemd rejected the new unit template'

readonly backup_dir="/root/cotuong-helper-backup-$(date -u +%Y%m%dT%H%M%SZ)-$$"
install -d -o root -g root -m 0700 "$backup_dir"
cp -a -- "$ADMIN_HELPER" "$ACTIVATOR" "$UNIT_SOURCE" "$backup_dir/"

install -o root -g root -m 0750 "$BUNDLE/cotuong-vps-admin" "$ADMIN_HELPER.new.$$"
install -o root -g root -m 0750 "$BUNDLE/cotuong-deploy-activate" "$ACTIVATOR.new.$$"
readonly unit_candidate="$UNIT_SOURCE.new-$$.service"
install -o root -g root -m 0644 "$BUNDLE/cotuong.service" "$unit_candidate"
bash -n "$ADMIN_HELPER.new.$$" "$ACTIVATOR.new.$$" || die 'installed candidates failed Bash syntax validation'
systemd-analyze verify "$unit_candidate" || die 'installed unit candidate failed systemd verification'
mv -Tf -- "$ADMIN_HELPER.new.$$" "$ADMIN_HELPER"
mv -Tf -- "$ACTIVATOR.new.$$" "$ACTIVATOR"
mv -Tf -- "$unit_candidate" "$UNIT_SOURCE"

app_password="$(openssl rand -hex 32)"
migrator_password="$(openssl rand -hex 32)"
mysql --protocol=socket --user=root <<SQL
CREATE DATABASE cotuong_stage CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER 'cotuong_app'@'127.0.0.1' IDENTIFIED BY '$app_password';
CREATE USER 'cotuong_migrator'@'127.0.0.1' IDENTIFIED BY '$migrator_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON cotuong_stage.* TO 'cotuong_app'@'127.0.0.1';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, REFERENCES ON cotuong_stage.* TO 'cotuong_migrator'@'127.0.0.1';
SQL

if [[ ! -e "$ENV_DIR" ]]; then
  install -d -o root -g cotuong -m 0750 "$ENV_DIR"
fi
env_tmp="$ENV_FILE.new.$$"
migrator_tmp="$MIGRATOR_FILE.new.$$"
umask 077
printf 'DB_HOST=127.0.0.1\nDB_PORT=3306\nDB_NAME=cotuong_stage\nDB_USER=cotuong_app\nDB_PASSWORD=%s\n' "$app_password" > "$env_tmp"
printf 'DB_HOST=127.0.0.1\nDB_PORT=3306\nDB_NAME=cotuong_stage\nDB_USER=cotuong_migrator\nDB_PASSWORD=%s\n' "$migrator_password" > "$migrator_tmp"
chown root:cotuong "$env_tmp"
chmod 0640 "$env_tmp"
chown root:root "$migrator_tmp"
chmod 0600 "$migrator_tmp"
mv -T -- "$env_tmp" "$ENV_FILE"
mv -T -- "$migrator_tmp" "$MIGRATOR_FILE"
unset app_password migrator_password

"$ADMIN_HELPER" install-app-unit
[[ "$(systemctl is-enabled cotuong-test.service)" == enabled ]] || die 'test service is not enabled'
if systemctl is-active --quiet cotuong-test.service; then die 'service unexpectedly started; stop and inspect manually'; fi
[[ ! -e "$APP_ROOT/current" && ! -L "$APP_ROOT/current" ]] || die 'setup unexpectedly created current'
[[ "$(stat -c %U:%G:%a "$ENV_FILE")" == 'root:cotuong:640' ]] || die 'application environment file permissions are wrong'
[[ "$(stat -c %U:%G:%a "$MIGRATOR_FILE")" == 'root:root:600' ]] || die 'migrator environment file permissions are wrong'
printf 'First-boot preparation complete: helpers updated, empty test schema and least-privilege accounts created, protected env files installed, unit enabled but not started. No migration or deployment was run.\n'
printf 'Root helper backup: %s\n' "$backup_dir"
