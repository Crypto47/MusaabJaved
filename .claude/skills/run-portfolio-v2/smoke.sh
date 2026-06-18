#!/usr/bin/env bash
# Smoke test for portfolio-v2 Next.js dev server.
# Usage: bash smoke.sh [base_url]
# Defaults to http://localhost:3000

BASE="${1:-http://localhost:3000}"
FAIL=0

check() {
  local label="$1" url="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "200" ]; then
    echo "  PASS $label ($code)"
  else
    echo "  FAIL $label — expected 200, got $code"
    FAIL=1
  fi
}

echo "Smoke testing $BASE"
check "home"  "$BASE/"
check "about" "$BASE/about"
check "work"  "$BASE/work"
check "blog"  "$BASE/blog"

if [ "$FAIL" -eq 0 ]; then
  echo "All checks passed."
  exit 0
else
  echo "One or more checks failed."
  exit 1
fi
