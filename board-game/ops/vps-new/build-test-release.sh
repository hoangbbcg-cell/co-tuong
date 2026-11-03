#!/usr/bin/env bash
# CI-only packager. The caller supplies a full commit SHA already verified on master.
set -Eeuo pipefail
umask 027
readonly SHA="${1:-}"
[[ "$SHA" =~ ^[a-f0-9]{40}$ ]] || { echo 'Usage: build-test-release.sh <full-master-sha>' >&2; exit 2; }
[[ "$(git rev-parse HEAD)" == "$SHA" ]] || { echo 'Checkout does not match the requested SHA' >&2; exit 1; }
git merge-base --is-ancestor "$SHA" origin/master || { echo 'SHA is not reachable from master' >&2; exit 1; }
tracked_paths="$(git ls-tree -r --name-only "$SHA")" || { echo 'Could not inspect tracked files in the requested commit' >&2; exit 1; }
if awk -F/ '{ name=$NF; if ((name ~ /^\.env/ && name != ".env.example") || name ~ /^\.admin-access/) found=1 } END { exit !found }' <<< "$tracked_paths"; then
  echo 'Commit contains a forbidden environment/admin-access file; refusing to package it' >&2
  exit 1
fi

npm ci
npm run typecheck
npm test
npm run build

repo_root="$(git rev-parse --show-toplevel)"
stage="$(mktemp -d "${TMPDIR:-/tmp}/cotuong-test-release.XXXXXX")"
cleanup() { rm -rf -- "$stage"; }
trap cleanup EXIT
git -C "$repo_root" archive --format=tar "$SHA" board-game | tar -xf - --strip-components=1 -C "$stage"
rm -f -- "$stage/.env.example"
cp -a dist node_modules "$stage/"
chmod 2750 "$stage"
[[ -f "$stage/package.json" && -f "$stage/server/index.ts" && -f "$stage/dist/index.html" && -f "$stage/node_modules/tsx/package.json" ]] \
  || { echo 'Release archive does not match the systemd release-root contract' >&2; exit 1; }
[[ ! -e "$stage/uploads" && ! -L "$stage/uploads" ]] || { echo 'Release already contains uploads; refusing to replace shared runtime data' >&2; exit 1; }
ln -s /srv/cotuong/shared/uploads "$stage/uploads"
printf '%s\n' "$SHA" > "$stage/.cotuong-release-sha"
tar -czf "$PWD/$SHA.tar.gz" -C "$stage" .
python3 ops/vps-new/verify-test-release.py "$PWD/$SHA.tar.gz" "$SHA"
printf 'Created %s.tar.gz; no .env or ignored local engine assets were included.\n' "$SHA"
