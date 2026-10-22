#!/bin/bash
# Headless Chromium wrapper for cloud sessions behind the agent proxy.
# Remotion's own proxy flags are dropped and replaced with $HTTPS_PROXY, and the proxy's
# interception CA is trusted by SPKI pin (computed from /root/.ccr/ca-bundle.crt), so
# Google Fonts load. Usage: CAROUSEL_BROWSER=scripts/chrome-proxy.sh npm run carousel -- <id>
set -e
BIN=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell 2>/dev/null | head -1)
[ -x "$BIN" ] || { echo "headless_shell not found under /opt/pw-browsers" >&2; exit 1; }
SPKI=$(python3 -I - <<'EOF'
import base64, hashlib, re, subprocess
pem = open("/root/.ccr/ca-bundle.crt").read()
pins = set()
for c in re.findall(r"-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----", pem, re.S):
    subj = subprocess.run(["openssl", "x509", "-noout", "-subject"], input=c.encode(), capture_output=True).stdout.decode()
    if "agent-proxy" not in subj:
        continue
    pub = subprocess.run(["openssl", "x509", "-pubkey", "-noout"], input=c.encode(), capture_output=True).stdout
    der = subprocess.run(["openssl", "pkey", "-pubin", "-outform", "DER"], input=pub, capture_output=True).stdout
    pins.add(base64.b64encode(hashlib.sha256(der).digest()).decode())
print(",".join(sorted(pins)))
EOF
)
args=()
for a in "$@"; do case "$a" in --no-proxy-server|--proxy-server=*|--proxy-bypass-list=*) ;; *) args+=("$a");; esac; done
exec "$BIN" --proxy-server="$HTTPS_PROXY" "--proxy-bypass-list=localhost;127.0.0.1" --ignore-certificate-errors-spki-list="$SPKI" "${args[@]}"
