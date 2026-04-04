#!/usr/bin/env bash
set -euo pipefail

test -f policy/index.html
test -f terms/index.html
grep -q 'href="/policy"' index.html
grep -q 'href="/terms"' index.html
grep -q 'N &amp; M KANYSHA LOGISTICS LLP' policy/index.html
grep -q 'These Terms of Use' terms/index.html
