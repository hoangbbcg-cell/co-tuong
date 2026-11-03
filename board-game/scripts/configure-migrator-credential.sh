#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

readonly STATE='/home/cotuong_deploy/.cotuong-deploy'
readonly TARGET="$STATE/mysql-migrator.json"
[[ "$(id -un)" == cotuong_deploy && "$HOME" == /home/cotuong_deploy ]] || {
  echo 'Run this setup as cotuong_deploy on the VPS.' >&2; exit 1;
}
[[ -d "$STATE" && ! -L "$STATE" && "$(stat -c %u "$STATE")" == "$(id -u)" ]] || {
  echo 'The private deploy state directory is missing or has the wrong owner.' >&2; exit 1;
}
bad=$(find "$STATE" -maxdepth 0 -perm /077 -print)
[[ -z "$bad" ]] || { echo 'The private deploy state directory must be mode 0700.' >&2; exit 1; }
[[ ! -e "$TARGET" && ! -L "$TARGET" ]] || {
  echo 'Migrator credential already exists; review it and rotate it through a separate reviewed procedure.' >&2; exit 1;
}

read -r -s -p 'MySQL cotuong_migrator password: ' password
printf '\n'
[[ -n "$password" && "$password" != *$'\n'* && "$password" != *$'\r'* ]] || {
  unset password; echo 'Password must be non-empty and single-line.' >&2; exit 1;
}
temporary="$STATE/.mysql-migrator.json.$$"
trap 'unset password; rm -f -- "$temporary"' EXIT
printf '%s' "$password" | node --input-type=module -e '
  import { writeFileSync } from "node:fs";
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  writeFileSync(process.argv[1], JSON.stringify({ user: "cotuong_migrator", password: input }), { flag: "wx", mode: 0o600 });
' "$temporary"
unset password
chmod 600 "$temporary"
mv -- "$temporary" "$TARGET"
trap - EXIT
echo 'Credential saved locally with mode 0600. Verify access with DB_MIGRATOR_CREDENTIALS_FILE and npm run db:check.'
