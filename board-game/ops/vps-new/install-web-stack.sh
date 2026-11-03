#!/usr/bin/env bash
# Standalone, fixed-scope equivalent of cotuong-vps-admin install-web-stack.
# Intended for one explicit root invocation on the isolated new test VPS.
set -Eeuo pipefail
umask 077
export PATH=/usr/sbin:/usr/bin:/sbin:/bin
export DEBIAN_FRONTEND=noninteractive

readonly TARGET_IP='103.153.254.184'

die() {
  printf 'install-web-stack: %s\n' "$*" >&2
  exit 1
}

[[ "$(id -u)" == 0 ]] || die 'run with sudo'
command -v ip >/dev/null || die 'iproute2 is required'
ip -o -4 addr show scope global \
  | awk '{sub(/\/.*/, "", $4); print $4}' \
  | grep -Fxq "$TARGET_IP" \
  || die "refusing to run: this host does not own $TARGET_IP"

if dpkg-query -W -f='${db:Status-Status}' mysql-server 2>/dev/null | grep -qx installed; then
  die 'MySQL is already installed; review its existing data/config before continuing'
fi
if [[ -L /var/lib/mysql || ( -e /var/lib/mysql && ( ! -d /var/lib/mysql || -n "$(find /var/lib/mysql -mindepth 1 -maxdepth 1 -print -quit)" ) ) ]]; then
  die 'MySQL data path already exists or contains data; refusing to initialize or alter it'
fi
if systemctl is-active --quiet mysql.service; then
  die 'MySQL is already active; refusing to alter an existing database service'
fi

apt-get update

install_without_starting_services() (
  readonly policy='/usr/sbin/policy-rc.d'
  [[ ! -e "$policy" && ! -L "$policy" ]] \
    || die 'existing policy-rc.d requires manual review; refusing to replace it'
  printf '#!/bin/sh\nexit 101\n' > "$policy"
  chown root:root "$policy"
  chmod 0755 "$policy"
  trap 'rm -f -- "$policy"' EXIT
  trap 'exit 130' HUP INT TERM
  apt-get install --yes --no-install-recommends -- \
    ca-certificates curl xz-utils rsync acl nginx mysql-server
)

install_without_starting_services

if systemctl is-active --quiet nginx.service; then
  die 'Nginx is unexpectedly active after package installation; manual review required'
fi

systemctl enable --now mysql.service
systemctl is-active --quiet mysql.service || die 'MySQL did not start successfully'

mapfile -t mysql_listeners < <(ss -H -lnt 'sport = :3306' | awk '{print $4}')
((${#mysql_listeners[@]} > 0)) || {
  systemctl disable --now mysql.service || true
  die 'MySQL has no confirmed listener on port 3306; it was stopped and disabled'
}
for listener in "${mysql_listeners[@]}"; do
  case "$listener" in
    127.0.0.1:3306|'[::1]:3306') ;;
    *)
      systemctl disable --now mysql.service || true
      die "MySQL listener is not loopback-only ($listener); it was stopped and disabled"
      ;;
  esac
done

printf '\n=== WEB STACK VERIFICATION ===\n'
printf 'Target IP: %s\n' "$TARGET_IP"
printf 'Nginx service: '
if systemctl is-active --quiet nginx.service; then
  systemctl is-active nginx.service
  die 'Nginx must remain inactive after this action'
else
  printf 'inactive\n'
fi
nginx -v 2>&1
printf 'MySQL service: '
systemctl is-active mysql.service
mysql --version
printf 'MySQL listeners:\n%s\n' "${mysql_listeners[*]}"
printf 'No Nginx site was enabled and no firewall rules were changed.\n'
