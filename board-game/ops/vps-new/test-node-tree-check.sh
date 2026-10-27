#!/usr/bin/env bash
set -Eeuo pipefail

node_tree_unsafe_path() {
  local root="$1" expected_uid="${2:-0}"
  find -P "$root" -xdev \
    \( ! -uid "$expected_uid" -o \( ! -type l -a -perm /0022 \) \) \
    -print -quit
}

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

tmp="$(mktemp -d)"
trap 'rm -rf -- "$tmp"' EXIT
uid="$(id -u)"

mkdir -m 0755 "$tmp/valid"
printf 'node fixture\n' > "$tmp/valid/node"
chmod 0755 "$tmp/valid/node"
ln -s node "$tmp/valid/node-link"

result="$(node_tree_unsafe_path "$tmp/valid" "$uid")" || fail 'valid tree audit command failed'
[[ -z "$result" ]] || fail "valid tree rejected: $result"
printf 'PASS: valid owner/modes and 0777 symlink mode accepted\n'

result="$(node_tree_unsafe_path "$tmp/valid" "$((uid + 1))")" || fail 'owner audit command failed'
[[ -n "$result" ]] || fail 'tree with unexpected owner UID was accepted'
printf 'PASS: unexpected owner UID detected\n'

chmod 0664 "$tmp/valid/node"
result="$(node_tree_unsafe_path "$tmp/valid" "$uid")" || fail 'file-mode audit command failed'
[[ "$result" == "$tmp/valid/node" ]] || fail "group-writable file was not isolated: $result"
printf 'PASS: group-writable regular file detected\n'

chmod 0644 "$tmp/valid/node"
chmod 0777 "$tmp/valid"
result="$(node_tree_unsafe_path "$tmp/valid" "$uid")" || fail 'directory-mode audit command failed'
[[ "$result" == "$tmp/valid" ]] || fail "world-writable directory was not isolated: $result"
printf 'PASS: group-writable directory detected\n'

result="$(node_tree_unsafe_path "$tmp/valid/node-link" "$uid")" || fail 'symlink audit command failed'
[[ -z "$result" ]] || fail "owned symlink rejected because of its mode: $result"
result="$(node_tree_unsafe_path "$tmp/valid/node-link" "$((uid + 1))")" || fail 'symlink owner audit command failed'
[[ -n "$result" ]] || fail 'symlink with unexpected owner UID was accepted'
printf 'PASS: symlink mode ignored, symlink owner still checked\n'

mkdir "$tmp/fake-bin"
cat > "$tmp/fake-bin/find" <<'SH'
#!/usr/bin/env bash
exit 7
SH
chmod 0755 "$tmp/fake-bin/find"
if result="$(PATH="$tmp/fake-bin:$PATH" node_tree_unsafe_path "$tmp/valid" "$uid")"; then
  fail 'find failure was treated as a clean audit'
fi
printf 'PASS: find exit code propagates to the caller\n'
