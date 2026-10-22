#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

RUN_DIR=${1:?Missing run directory}
SHA=${2:?Missing commit SHA}
ROLLBACK=${3:?Missing rollback option}

[[ "$(id -un)" == cotuong_deploy ]] || exit 1
[[ "$RUN_DIR" == /home/cotuong_deploy/.cotuong-incoming/* ]] || exit 1
[[ "$SHA" =~ ^[a-f0-9]{40}$ ]] || exit 1
[[ "$ROLLBACK" == true || "$ROLLBACK" == false ]] || exit 1
[[ -f "$RUN_DIR/release.tar.gz" ]] || exit 1
[[ -f "$RUN_DIR/deploy-vps.sh" ]] || exit 1

cd "$RUN_DIR"

# Prevent the same release from being started twice.
if ! mkdir deploy.started 2>/dev/null; then
  echo "Deployment already started for this run." >&2
  exit 1
fi

result=1
trap 'printf "%s\n" "$result" > deploy.exit' EXIT

set +e
bash ./deploy-vps.sh "$RUN_DIR/release.tar.gz" "$SHA" "$ROLLBACK" \
  > deploy-output.log 2>&1
result=$?
set -e

exit "$result"
