#!/usr/bin/env bash
# No production DDL. Pending/mismatched migrations fail closed.
set -Eeuo pipefail
umask 077
APP=/home/nhat_hoang/co-tuong/board-game
WEB=/var/www/cotuong
STATE=/home/nhat_hoang/.cotuong-deploy
HOOK=/usr/local/sbin/cotuong-backup-check
archive=${1:?archive required}
sha=${2:?commit required}
rollback_compatible=${3:-false}
[[ "$sha" =~ ^[a-f0-9]{40}$ ]] || exit 2
[[ "$rollback_compatible" == true || "$rollback_compatible" == false ]] || exit 2
mkdir -p "$STATE"
exec 9>"$STATE/deploy.lock"
flock -n 9 || { echo 'Another deployment holds the VPS lock.' >&2; exit 1; }
release="$STATE/$(date -u +%Y%m%dT%H%M%SZ)-$sha"
mkdir -p "$release/code" "$release/previous-code" "$release/previous-web"
exec > >(tee -a "$release/deploy.log") 2>&1
phase=preflight
modified=0
snapshot=0
rollback_ready=0
log() { printf '[%s] %s\n' "$phase" "$*"; }
sync_code() {
  rsync -a --delete --exclude=.env --exclude='.env.*' --exclude='.admin-access*' \
    --exclude=engines --exclude=uploads --exclude=media --exclude=storage \
    --exclude=.git "$1/" "$APP/"
}
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
  if [[ "$modified" == 1 && "$snapshot" == 1 && "$rollback_ready" == 1 && "$rollback_compatible" == true ]]; then
    phase=rollback
    # Both old and new versions passed verify on the same unchanged database.
    # Keep service stopped if restoring either tree fails.
    if sudo -n /usr/bin/systemctl stop cotuong.service && \
      sync_code "$release/previous-code" && \
      rsync -a --delete "$release/previous-web/" "$WEB/" && \
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
for tool in node npm rsync curl tar flock; do command -v "$tool" >/dev/null; done
[[ "$(node -p 'process.versions.node.split(".")[0]')" == 22 ]]
[[ -d "$APP" && -d "$WEB" && -f "$APP/.env" ]]
health
# Root-owned adapter to the EXISTING backup system; never install/guess it here.
[[ ! -L "$HOOK" && -x "$HOOK" && "$(stat -c %u "$HOOK")" == 0 ]]
[[ -z "$(find "$HOOK" -perm /022 -print)" ]]
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
# Runtime credentials must already have SELECT, not temporary DDL privileges.
npm run db:verify
cd "$APP"
npm run db:verify
rollback_ready=1
log 'New and current schemas verified. No migration will be executed.'
phase=snapshot
rsync -a --exclude=.env --exclude='.env.*' --exclude='.admin-access*' \
  --exclude=engines --exclude=uploads --exclude=media --exclude=storage --exclude=.git \
  "$APP/" "$release/previous-code/"
rsync -a "$WEB/" "$release/previous-web/"
snapshot=1
phase=backup
# Finish preparation first; no application files/service touched if this gate fails.
sudo -n "$HOOK" create-and-verify
log 'Fresh local backup verified and cloud job completed.'
phase=activate
modified=1
sudo -n /usr/bin/systemctl stop cotuong.service
sync_code "$next"
rsync -a --delete "$next/dist/" "$WEB/"
sudo -n /usr/bin/systemctl start cotuong.service
phase=health
npm run db:verify
health
curl --fail --silent --compressed --max-time 15 https://hovanggame.com/ -o "$release/public-index.html"
cmp "$next/dist/index.html" "$release/public-index.html"
phase=complete
log "Deployed $sha. Snapshots retained in $release. No MySQL restore or DDL performed."
