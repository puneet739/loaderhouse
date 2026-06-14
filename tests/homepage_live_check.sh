#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOME_PAGE="$ROOT_DIR/index.html"

grep -q "Where every load matters" "$HOME_PAGE"
grep -q "https://play.google.com/store/apps/details?id=com.loaderhouse.partnerapp" "$HOME_PAGE"
grep -q "https://play.google.com/store/apps/details?id=com.loaderhouse.userapp" "$HOME_PAGE"
grep -q "Download User App" "$HOME_PAGE"
grep -q "Download Partner App" "$HOME_PAGE"

if grep -qi "coming soon" "$HOME_PAGE"; then
  echo "Homepage should not contain coming soon copy"
  exit 1
fi

if grep -qi "launching in" "$HOME_PAGE"; then
  echo "Homepage should not show launch countdown copy"
  exit 1
fi
