# Policy Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a privacy policy page at `/policy` and connect the existing homepage footer to it.

**Architecture:** The site remains a plain static GitHub Pages site. A new `policy/index.html` file will hold the privacy policy content and reuse existing CSS plus a few page-specific styles, while the homepage footer link is updated to the canonical `/policy` path.

**Tech Stack:** Static HTML, existing shared CSS, shell verification script

---

### Task 1: Route And Link Verification

**Files:**
- Create: `tests/policy_page_check.sh`

- [ ] **Step 1: Write the failing test**

```bash
#!/usr/bin/env bash
set -euo pipefail

test -f policy/index.html
grep -q 'href="/policy"' index.html
grep -q 'N &amp; M KANYSHA LOGISTICS LLP' policy/index.html
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash tests/policy_page_check.sh`
Expected: FAIL because `policy/index.html` does not exist yet and the footer link is still `#`.

- [ ] **Step 3: Write minimal implementation**

Create `policy/index.html` and update the privacy link in `index.html`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bash tests/policy_page_check.sh`
Expected: PASS with no output.

### Task 2: Policy Content And Styling

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`
- Create: `policy/index.html`

- [ ] **Step 1: Add the privacy policy page**

Create a full HTML page with:
- canonical title and description for Loaderhouse privacy policy
- brand/operator identification
- structured sections for collection, usage, disclosures, cookies, retention, security, rights, children, updates, and contact
- navigation back to home

- [ ] **Step 2: Add minimal page-specific styles**

Extend `css/styles.css` with focused classes for readable long-form policy content without disturbing the homepage.

- [ ] **Step 3: Update the homepage footer link**

Change the privacy footer anchor to `href="/policy"` so GitHub Pages serves the page from the custom domain root.

- [ ] **Step 4: Re-run verification**

Run: `bash tests/policy_page_check.sh`
Expected: PASS.
