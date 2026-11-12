#!/usr/bin/env bash
# Production migrations run only after a fresh verified backup, using the dedicated migrator.
set -Eeuo pipefail
umask 077
readonly APP='/home/nhat_hoang/co-tuong/board-game'
readonly WEB='/var/www/cotuong'
readonly STATE='/home/cotuong_deploy/.cotuong-deploy'
readonly INCOMING='/home/cotuong_deploy/.cotuong-incoming'
readonly HOOK='/usr/local/sbin/cotuong-backup-check'
readonly MIGRATOR_CREDENTIALS='/home/cotuong_deploy/.cotuong-deploy/mysql-migrator.json'
die() { printf 'Preflight: %s\n' "$*" >&2; exit 1; }
[[ "$(id -un)" == cotuong_deploy && "$HOME" == '/home/cotuong_deploy' ]] || die 'Run as cotuong_deploy with its own HOME; administrator/root deployment is refused.'
check_permissions() {
  local private bad runtime_user runtime_uid
  for tool in node npm rsync curl tar flock find stat realpath sudo systemctl; do command -v "$tool" >/dev/null || die "Missing tool: $tool"; done
  [[ "$(node -p 'process.versions.node.split(".")[0]')" == 22 ]] || die 'Node 22 must be available in the non-interactive SSH PATH.'
  for private in "$STATE" "$INCOMING"; do
    [[ -d "$private" && ! -L "$private" && -r "$private" && -w "$private" && -x "$private" ]] || die "Create the private deploy directory first: $private"
    [[ "$(stat -c %u "$private")" == "$(id -u)" ]] || die "Wrong owner: $private"
    bad=$(find "$private" -maxdepth 0 -perm /077 -print) || die "Cannot inspect private directory mode: $private"
    [[ -z "$bad" ]] || die "Expected mode 0700: $private"
  done
  [[ -d "$APP" && -d "$WEB" && -r "$APP/.env" ]] || die 'Cannot access app, frontend or .env; review traversal ACL and file permissions.'
  [[ "$(realpath -e "$APP")" == "$APP" && "$(realpath -e "$WEB")" == "$WEB" ]] || die 'App/frontend paths must be the reviewed real directories, not symlinks.'
  bad=$(find "$APP" \( -name '.env*' -o -name '.admin-access*' -o -name .git -o -name engines -o -name uploads -o -name media -o -name storage \) -prune -o \
    \( -type d \( ! -readable -o ! -writable -o ! -executable \) -o -type f ! -readable \) -print -quit) || die 'Cannot inspect application permissions.'
  [[ -z "$bad" ]] || die "Missing application read/write/traverse permission: $bad"
  bad=$(find "$WEB" \( -type d \( ! -readable -o ! -writable -o ! -executable \) -o -type f ! -readable \) -print -quit) || die 'Cannot inspect frontend permissions.'
  [[ -z "$bad" ]] || die "Missing frontend read/write/traverse permission: $bad"
  runtime_user=$(systemctl show --property=User --value cotuong.service)
  [[ -n "$runtime_user" && "$runtime_user" != root ]] || die 'Review the runtime unit: cotuong.service must run as a non-root user.'
  runtime_uid=$(id -u "$runtime_user") || die 'Cannot resolve the runtime service user.'
  [[ "$runtime_uid" != 0 ]] || die 'The runtime service must not resolve to UID 0.'
  [[ ! -L "$HOOK" && -x "$HOOK" && "$(stat -c %u "$HOOK")" == 0 ]] || die 'Backup adapter must be root-owned and executable.'
  bad=$(find "$HOOK" -perm /022 -print) || die 'Cannot inspect backup adapter permissions.'
  [[ -z "$bad" ]] || die 'Backup adapter must not be group/world writable.'
  # Listing an exact sudo command does not execute it; never stop/start for a preflight check.
  sudo -n -l "$HOOK" verify-existing >/dev/null || die 'Missing sudo permission: backup verify-existing'
  sudo -n -l "$HOOK" create-and-verify >/dev/null || die 'Missing sudo permission: backup create-and-verify'
  sudo -n -l /usr/bin/systemctl stop cotuong.service >/dev/null || die 'Missing sudo permission: service stop'
  sudo -n -l /usr/bin/systemctl start cotuong.service >/dev/null || die 'Missing sudo permission: service start'
  sudo -n -l /usr/bin/systemctl is-active --quiet cotuong.service >/dev/null || die 'Missing sudo permission: service status'
}
check_migrator_credential() {
  local bad
  [[ -f "$MIGRATOR_CREDENTIALS" && -r "$MIGRATOR_CREDENTIALS" && ! -L "$MIGRATOR_CREDENTIALS" ]] || die 'Create the private VPS migrator credential before deployment.'
  [[ "$(stat -c %u "$MIGRATOR_CREDENTIALS")" == "$(id -u)" ]] || die 'Migrator credential has the wrong owner.'
  bad=$(find "$MIGRATOR_CREDENTIALS" -maxdepth 0 -perm /077 -print) || die 'Cannot inspect migrator credential permissions.'
  [[ -z "$bad" ]] || die 'Migrator credential must have mode 0600.'
}
if [[ "${1:-}" == --check ]]; then
  [[ "$#" == 1 ]] || die 'Usage: deploy-vps.sh --check'
  check_permissions
  check_migrator_credential
  sudo -n /usr/bin/systemctl is-active --quiet cotuong.service
  sudo -n "$HOOK" verify-existing
  printf 'Deploy-user preflight passed. No build, backup creation, activation or restart was performed.\n'
  exit 0
fi
archive=${1:?archive required}
sha=${2:?commit required}
rollback_compatible=${3:-false}
[[ "$sha" =~ ^[a-f0-9]{40}$ ]] || exit 2
[[ "$rollback_compatible" == true || "$rollback_compatible" == false ]] || exit 2
check_permissions
[[ -f "$archive" && -r "$archive" && ! -L "$archive" && "$(realpath -e "$archive")" == "$INCOMING/"*/release.tar.gz ]] || die 'Archive must be a regular release.tar.gz inside the deploy incoming directory.'
check_migrator_credential
exec 9>"$STATE/deploy.lock"
flock -n 9 || { echo 'Another deployment holds the VPS lock.' >&2; exit 1; }
release="$STATE/$(date -u +%Y%m%dT%H%M%SZ)-$sha"
mkdir -p "$release/code" "$release/previous-code" "$release/previous-web"
exec > >(tee -a "$release/deploy.log") 2>&1
phase=preflight
modified=0
snapshot=0
rollback_ready=0
migration_started=0
log() { printf '[%s] %s\n' "$phase" "$*"; }
# Live trees retain administrator-managed ACLs/modes. New files inherit destination
# default ACLs; advertise read/execute bits even though staging is private (umask 077).
# In particular, do not chmod/chown or set directory timestamps owned by another user.
publish_rsync=(-rlt --no-owner --no-group --no-perms --omit-dir-times --omit-link-times --chmod=Du=rwx,Dgo=rx,Fu+rw,Fgo+r,a+X)
sync_code() {
  rsync "${publish_rsync[@]}" --delete --exclude=.env --exclude='.env.*' --exclude='.admin-access*' \
    --exclude=engines --exclude=uploads --exclude=media --exclude=storage \
    --exclude=.git "$1/" "$APP/"
}
sync_web() { rsync "${publish_rsync[@]}" --delete "$1/" "$WEB/"; }
health() {
  local ok=0
  for attempt in {1..20}; do
    if sudo -n /usr/bin/systemctl is-active --quiet cotuong.service && \
      curl --fail --silent --max-time 5 http://127.0.0.1:3001/api/health | \
        node -e 'let s="";process.stdin.on("data",x=>s+=x);process.stdin.on("end",()=>{try{if(JSON.parse(s).status!=="ok")process.exit(1)}catch{process.exit(1)}})'; then ok=1; break; fi
    sleep 2
  done
  [[ "$ok" == 1 ]]
  curl --fail --silent --max-time 15 https://hovanggame.com/api/health | \
    node -e 'let s="";process.stdin.on("data",x=>s+=x);process.stdin.on("end",()=>{try{if(JSON.parse(s).status!=="ok")process.exit(1)}catch{process.exit(1)}})'
  curl --fail --silent --max-time 15 https://hovanggame.com/ -o /dev/null
}
failure() {
  local rc=${1:-$?}
  trap - ERR HUP INT TERM
  log "FAILED (exit=$rc). Private log: $release/deploy.log"
  if [[ "$migration_started" == 1 && "$modified" == 0 ]]; then
    sudo -n /usr/bin/systemctl stop cotuong.service || log 'CRITICAL: Could not stop service after migration failure; inspect VPS immediately.'
    log 'Migration failed; database may be partially migrated. Service stop requested. No code rollback or MySQL restore was attempted.'
  elif [[ "$modified" == 1 && "$snapshot" == 1 && "$rollback_ready" == 1 && "$rollback_compatible" == true ]]; then
    phase=rollback
    # Both old and new versions passed verify on the same unchanged database.
    # Keep service stopped if restoring either tree fails.
    if sudo -n /usr/bin/systemctl stop cotuong.service && \
      sync_code "$release/previous-code" && \
      sync_web "$release/previous-web" && \
      sudo -n /usr/bin/systemctl start cotuong.service && health; then
      log 'Previous code/frontend restored; database untouched.'
    else
      sudo -n /usr/bin/systemctl stop cotuong.service || log 'CRITICAL: Could not stop service; inspect VPS immediately.'
      log 'Rollback failed; service stopped. Manual intervention required.'
    fi
  elif [[ "$modified" == 1 ]]; then
    sudo -n /usr/bin/systemctl stop cotuong.service || log 'CRITICAL: Could not stop service; inspect VPS immediately.'
    log 'Automatic rollback not authorized as data-compatible. Service stop requested; manual review required.'
  fi
  exit "$rc"
}
trap failure ERR
trap 'failure 130' INT
trap 'failure 143' HUP TERM
health
# Root-owned adapter to the EXISTING backup system; never install/guess it here.
sudo -n "$HOOK" verify-existing
log 'Existing backup checked.'
phase=prepare
tar -xzf "$archive" -C "$release/code"
next="$release/code/board-game"
[[ -f "$next/package-lock.json" && -f "$next/server/index.ts" ]]
cp "$APP/.env" "$next/.env"
chmod 600 "$next/.env"
cd "$next"
npm ci --include=dev
npm run build
# Check the currently deployed code and runtime account against the pre-migration schema.
cd "$APP"
npm run db:verify
log 'Current schema verified with the runtime account.'
DB_MIGRATOR_CREDENTIALS_FILE="$MIGRATOR_CREDENTIALS" npm run db:check
log 'Dedicated migrator login and SELECT preflight passed.'
phase=snapshot
rsync -rltp --exclude=.env --exclude='.env.*' --exclude='.admin-access*' \
  --exclude=engines --exclude=uploads --exclude=media --exclude=storage --exclude=.git \
  "$APP/" "$release/previous-code/"
rsync -rltp "$WEB/" "$release/previous-web/"
snapshot=1
phase=backup
# Finish preparation first; no application files/service touched if this gate fails.
sudo -n "$HOOK" create-and-verify
log 'Fresh local and cloud backup verified before migration.'
phase=migration
migration_started=1
if (cd "$next" && DB_MIGRATOR_CREDENTIALS_FILE="$MIGRATOR_CREDENTIALS" npm run db:migrate); then :; else
  migration_rc=$?
  log 'MySQL migration command failed; schema may be partially changed.'
  failure "$migration_rc"
fi
if (cd "$next" && DB_MIGRATOR_CREDENTIALS_FILE="$MIGRATOR_CREDENTIALS" npm run db:verify); then :; else
  migration_rc=$?
  log 'Post-migration db:verify failed; schema may be partially changed.'
  failure "$migration_rc"
fi
migration_started=0
rollback_ready=1
log 'Pending migrations applied and new schema/checksums verified with the migrator account.'
phase=activate
modified=1
sudo -n /usr/bin/systemctl stop cotuong.service
sync_code "$next"
sync_web "$next/dist"
sudo -n /usr/bin/systemctl start cotuong.service
phase=health
npm run db:verify
health
curl --fail --silent --compressed --max-time 15 https://hovanggame.com/ -o "$release/public-index.html"
cmp "$next/dist/index.html" "$release/public-index.html"
phase=complete
log "Deployed $sha. Snapshots retained in $release. Migrations applied; no MySQL restore performed."
