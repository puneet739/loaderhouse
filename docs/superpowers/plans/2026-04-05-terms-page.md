# Terms Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a stronger platform-facing terms page at `/terms` and connect the homepage footer to it.

**Architecture:** The site remains a static GitHub Pages site. A new `terms/index.html` page will reuse the shared CSS and legal-page layout introduced for `/policy`, while the homepage footer and route verification script are updated to assert the new canonical `/terms` path.

**Tech Stack:** Static HTML, existing shared CSS, shell verification script

---

### Task 1: Route And Link Verification

**Files:**
- Modify: `tests/policy_page_check.sh`

- [ ] **Step 1: Write the failing test**

```bash
#!/usr/bin/env bash
set -euo pipefail

test -f policy/index.html
test -f terms/index.html
grep -q 'href="/policy"' index.html
grep -q 'href="/terms"' index.html
grep -q 'N &amp; M KANYSHA LOGISTICS LLP' policy/index.html
grep -q 'These Terms of Use' terms/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash tests/policy_page_check.sh`
Expected: FAIL because `terms/index.html` does not exist yet and the footer link is still `#`.

- [ ] **Step 3: Write minimal implementation**

Create `terms/index.html` and update the footer terms link in `index.html`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bash tests/policy_page_check.sh`
Expected: PASS with no output.

### Task 2: Terms Content And Navigation

**Files:**
- Modify: `index.html`
- Create: `terms/index.html`

- [ ] **Step 1: Add the terms page**

Create a full HTML page with:
- Loaderhouse and operator identification
- Indian-operations scope
- stronger sections for service use, bookings, prohibited items, pricing, liability, indemnity, suspension, governing law, and disputes
- navigation back to home and links to privacy and contact

- [ ] **Step 2: Update the homepage footer link**

Change the terms footer anchor to `href="/terms"` so the custom domain resolves the page from the site root.

- [ ] **Step 3: Re-run verification**

Run: `bash tests/policy_page_check.sh`
Expected: PASS.
