#!/usr/bin/env bash
# GitHub Actions runner-side deployment client for the isolated test VPS.
set -Eeuo pipefail
umask 077

readonly SHA="${1:-}"
readonly ARTIFACT_DIR="${2:-}"
readonly RUN_ID="${3:-}"
readonly RUN_ATTEMPT="${4:-}"
readonly MODE="${5:-deploy}"
readonly HOST='103.153.254.184'
readonly USER='cotuong_deploy'

die() { printf 'deploy-test-release: %s\n' "$*" >&2; exit 1; }
[[ "$SHA" =~ ^[a-f0-9]{40}$ ]] || die 'expected a full lowercase master SHA'
[[ "$RUN_ID" =~ ^[0-9]+$ && "$RUN_ATTEMPT" =~ ^[0-9]+$ ]] || die 'invalid GitHub run identity'
[[ "$MODE" == deploy || "$MODE" == stage || "$MODE" == activate ]] || die 'mode must be deploy, stage, or activate'
[[ -d "$ARTIFACT_DIR" && ! -L "$ARTIFACT_DIR" ]] || die 'artifact directory must be a real directory'
[[ -f "$ARTIFACT_DIR/$SHA.tar.gz" && -f "$ARTIFACT_DIR/$SHA.tar.gz.sha256" ]] || die 'release archive or checksum is missing'
[[ -f "$HOME/.ssh/cotuong_deploy" && ! -L "$HOME/.ssh/cotuong_deploy" ]] || die 'deployment identity is missing'
[[ -f "$HOME/.ssh/known_hosts" && ! -L "$HOME/.ssh/known_hosts" ]] || die 'pinned known-hosts file is missing'
ssh-keygen -F "$HOST" -f "$HOME/.ssh/known_hosts" >/dev/null || die 'known-hosts does not contain the pinned VPS host key'

(cd "$ARTIFACT_DIR" && sha256sum -c "$SHA.tar.gz.sha256")
python3 "$(dirname -- "$0")/verify-test-release.py" "$ARTIFACT_DIR/$SHA.tar.gz" "$SHA"

readonly REMOTE="/home/$USER/.cotuong-incoming/$RUN_ID-$RUN_ATTEMPT"
readonly RELEASE_TMP="/srv/cotuong/releases/.incoming-$SHA-$RUN_ID-$RUN_ATTEMPT"
readonly RELEASE="/srv/cotuong/releases/$SHA"
readonly SSH_KEY="$HOME/.ssh/cotuong_deploy"
ssh_opts=(-i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15)

ssh "${ssh_opts[@]}" "$USER@$HOST" bash -s -- "$MODE" "$SHA" <<'REMOTE_PREFLIGHT'
  set -euo pipefail
  MODE="$1"
  SHA="$2"
  RELEASE="/srv/cotuong/releases/$SHA"
  test "$(id -un)" = cotuong_deploy
  test "$HOME" = /home/cotuong_deploy
  test -d /home/cotuong_deploy/.cotuong-incoming
  test ! -L /home/cotuong_deploy/.cotuong-incoming
  test "$(stat -c %U:%G /srv/cotuong/releases)" = cotuong_deploy:cotuong_release
  test "$(stat -c %a /srv/cotuong/releases)" = 2750
  # The deploy identity cannot traverse the protected configuration directory.
  # The root activation helper validates EnvironmentFile before changing current.
  systemctl is-enabled --quiet cotuong-test.service
  unit="$(systemctl cat cotuong-test.service)"
  grep -Fxq "User=cotuong" <<< "$unit"
  grep -Fxq "Group=cotuong" <<< "$unit"
  grep -Fxq "WorkingDirectory=/srv/cotuong/current" <<< "$unit"
  grep -Fxq "Environment=HOST=127.0.0.1" <<< "$unit"
  grep -Fxq "Environment=PORT=3001" <<< "$unit"
  grep -Fxq "ExecStart=/opt/node-v22.23.3/bin/node --import tsx server/index.ts" <<< "$unit"
  if systemctl is-active --quiet nginx.service; then
    echo 'Refusing deploy while Nginx is active on the test VPS.' >&2
    exit 1
  fi
  id -nG | tr ' ' '\n' | grep -Fxq cotuong_release
  id -nG cotuong | tr ' ' '\n' | grep -Fxq cotuong_release
  test "$(stat -c %U:%G:%a /usr/local/sbin/cotuong-deploy-activate)" = root:root:750
  sudo -n -l /usr/local/sbin/cotuong-deploy-activate >/dev/null
  test ! -e /srv/cotuong/deploy/pending && test ! -L /srv/cotuong/deploy/pending
  if [[ "$MODE" == stage || "$MODE" == activate ]]; then
    test ! -e /srv/cotuong/current && test ! -L /srv/cotuong/current
    ! systemctl is-active --quiet cotuong-test.service
  fi
  if [[ "$MODE" == activate ]]; then
    test -d "$RELEASE" && test ! -L "$RELEASE"
    test "$(stat -c %U:%G "$RELEASE")" = cotuong_deploy:cotuong_release
    test "$(stat -c %a "$RELEASE")" = 2750
    test "$(cat "$RELEASE/.cotuong-release-sha")" = "$SHA"
    test -f "$RELEASE/package.json" && test -f "$RELEASE/server/index.ts" && test -f "$RELEASE/dist/index.html" && test -f "$RELEASE/node_modules/tsx/package.json"
    test -L "$RELEASE/uploads" && test "$(readlink "$RELEASE/uploads")" = /srv/cotuong/shared/uploads
    if find "$RELEASE" \( \( -name '.env' -o -name '.env.*' \) ! -name '.env.example' -o -name '.admin-access*' -o \( \( -type f -o -type d \) -a -perm /0022 \) \) -print -quit | grep -q .; then exit 1; fi
    if find "$RELEASE" -type f ! -perm -0040 -print -quit | grep -q .; then exit 1; fi
    if find "$RELEASE" -type d ! -perm -0010 -print -quit | grep -q .; then exit 1; fi
  else
    test ! -e "$RELEASE" && test ! -L "$RELEASE"
  fi
REMOTE_PREFLIGHT

if [[ "$MODE" != activate ]]; then
ssh "${ssh_opts[@]}" "$USER@$HOST" \
  "set -euo pipefail; test ! -e '$REMOTE' && test ! -L '$REMOTE'; install -d -m 0700 '$REMOTE'; test ! -e '$RELEASE_TMP' && test ! -L '$RELEASE_TMP'; test ! -e '$RELEASE' && test ! -L '$RELEASE'; install -d -m 2750 '$RELEASE_TMP'"
scp "${ssh_opts[@]}" "$ARTIFACT_DIR/$SHA.tar.gz" "$ARTIFACT_DIR/$SHA.tar.gz.sha256" "$USER@$HOST:$REMOTE/"

ssh "${ssh_opts[@]}" "$USER@$HOST" \
  "set -euo pipefail; cd '$REMOTE'; sha256sum -c '$SHA.tar.gz.sha256'; tar -xzf '$SHA.tar.gz' -C '$RELEASE_TMP' --no-same-owner --no-same-permissions; test \"\$(stat -c %U:%G '$RELEASE_TMP')\" = cotuong_deploy:cotuong_release; test \"\$(stat -c %a '$RELEASE_TMP')\" = 2750; test -f '$RELEASE_TMP/package.json' && test -f '$RELEASE_TMP/server/index.ts' && test -f '$RELEASE_TMP/dist/index.html' && test -f '$RELEASE_TMP/node_modules/tsx/package.json'; test -L '$RELEASE_TMP/uploads' && test \"\$(readlink '$RELEASE_TMP/uploads')\" = /srv/cotuong/shared/uploads; if find '$RELEASE_TMP' \( \( -name '.env' -o -name '.env.*' \) ! -name '.env.example' -o -name '.admin-access*' -o \( \( -type f -o -type d \) -a -perm /0022 \) \) -print -quit | grep -q .; then exit 1; fi; if find '$RELEASE_TMP' -type f ! -perm -0040 -print -quit | grep -q .; then exit 1; fi; if find '$RELEASE_TMP' -type d ! -perm -0010 -print -quit | grep -q .; then exit 1; fi; mv -T '$RELEASE_TMP' '$RELEASE'"

ssh "${ssh_opts[@]}" "$USER@$HOST" "test \"\$(cat '$RELEASE/.cotuong-release-sha')\" = '$SHA'"
if [[ "$MODE" == stage ]]; then
  printf 'Staged verified release %s. Service was not activated.\n' "$SHA"
  exit 0
fi
fi

if [[ "$MODE" == activate ]]; then
  ssh "${ssh_opts[@]}" "$USER@$HOST" \
    "set -euo pipefail; test ! -e '$REMOTE' && test ! -L '$REMOTE'; install -d -m 0700 '$REMOTE'"
fi

readonly PENDING_TMP="/srv/cotuong/deploy/.pending-$RUN_ID-$RUN_ATTEMPT"
ssh "${ssh_opts[@]}" "$USER@$HOST" \
  "set -euo pipefail; test ! -e /srv/cotuong/deploy/pending && test ! -L /srv/cotuong/deploy/pending; test ! -e '$PENDING_TMP' && test ! -L '$PENDING_TMP'; ln -s '../releases/$SHA' '$PENDING_TMP'; mv -T '$PENDING_TMP' /srv/cotuong/deploy/pending; nohup sh -c 'set +e; sudo -n /usr/local/sbin/cotuong-deploy-activate > \"\$1/activation.log\" 2>&1; rc=\$?; printf \"%s\\n\" \"\$rc\" > \"\$1/activation.result.tmp\"; mv \"\$1/activation.result.tmp\" \"\$1/activation.result\"; exit \"\$rc\"' sh '$REMOTE' >/dev/null 2>&1 </dev/null &"

deadline=$((SECONDS + 5400))
while true; do
  if (( SECONDS >= deadline )); then
    die "activation has not completed; inspect $REMOTE/activation.log before retrying"
  fi
  result="$(ssh "${ssh_opts[@]}" "$USER@$HOST" \
    "if test -f '$REMOTE/activation.result'; then cat '$REMOTE/activation.result'; else echo RUNNING; fi")"
  if [[ "$result" == RUNNING ]]; then sleep 15; continue; fi
  [[ "$result" =~ ^[0-9]+$ ]] || die 'invalid activation status from VPS'
  [[ "$result" == 0 ]] || die "activation failed; code-only rollback was attempted; inspect $REMOTE/activation.log"
  break
done

ssh "${ssh_opts[@]}" "$USER@$HOST" '
  set -euo pipefail
  curl --fail --silent --show-error --max-time 5 http://127.0.0.1:3001/api/health >/dev/null
  socket_reply="$(curl --fail --silent --show-error --max-time 5 "http://127.0.0.1:3001/socket.io/?EIO=4&transport=polling")"
  [[ "$socket_reply" == 0\{* ]]
'

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo '## VPS test deployment'
    echo
    echo "- Commit: `$SHA`"
    echo "- Target: `$USER@$HOST`"
    echo '- Result: activation helper and loopback HTTP/API/Socket.IO handshake passed.'
    echo "- Run: ${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-}/actions/runs/${GITHUB_RUN_ID:-$RUN_ID}"
  } >> "$GITHUB_STEP_SUMMARY"
fi
