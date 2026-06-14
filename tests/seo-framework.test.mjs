import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

assert.ok(exists("data/seo-pages.json"), "seed SEO dataset should exist");
assert.ok(exists("templates/seo-page.html"), "SEO page template should exist");
assert.ok(exists("scripts/build-seo.mjs"), "SEO build script should exist");
assert.ok(exists("scripts/verify-seo.mjs"), "SEO verification script should exist");
assert.ok(exists("robots.txt"), "robots.txt should exist");
assert.ok(exists("sitemap.xml"), "sitemap.xml should exist");

const pages = JSON.parse(read("data/seo-pages.json")).pages;
assert.ok(pages.length > 0, "SEO dataset should include generated pages");

const home = read("index.html");
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");

assert.match(home, /<link rel="canonical" href="https:\/\/loaderhouse\.com\/"/, "homepage should include a canonical URL");
assert.match(home, /href="\/services\/freight-visibility-platform\/"/, "homepage should link to generated SEO pages");

assert.match(robots, /^User-agent: \*/m, "robots.txt should allow standard crawlers");
assert.match(robots, /^User-agent: OAI-SearchBot/m, "robots.txt should address OAI-SearchBot");
assert.match(robots, /^Sitemap: https:\/\/loaderhouse\.com\/sitemap\.xml/m, "robots.txt should point at sitemap");

const seenTitles = new Set();
const seenDescriptions = new Set();
const seenCanonicals = new Set();

for (const page of pages) {
  const htmlPath = `${page.slug}/index.html`;
  assert.ok(exists(htmlPath), `${htmlPath} should be generated`);

  const html = read(htmlPath);
  const canonical = `https://loaderhouse.com/${page.slug}/`;

  assert.match(html, new RegExp(`<title>${escapeRegex(page.title)}</title>`), `${page.slug} should use its configured title`);
  assert.match(html, new RegExp(`<meta name="description" content="${escapeRegex(page.description)}"`), `${page.slug} should use its configured description`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegex(canonical)}"`), `${page.slug} should use a clean canonical URL`);
  assert.match(html, new RegExp(`<h1[^>]*>${escapeRegex(page.h1)}</h1>`), `${page.slug} should render its configured H1`);
  assert.match(html, /<script type="application\/ld\+json">/, `${page.slug} should include JSON-LD`);
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(canonical)}</loc>`), `${page.slug} should be listed in sitemap`);

  assert.equal(seenTitles.has(page.title), false, `${page.slug} title should be unique`);
  assert.equal(seenDescriptions.has(page.description), false, `${page.slug} description should be unique`);
  assert.equal(seenCanonicals.has(canonical), false, `${page.slug} canonical should be unique`);

  seenTitles.add(page.title);
  seenDescriptions.add(page.description);
  seenCanonicals.add(canonical);
}

for (const url of ["https://loaderhouse.com/", "https://loaderhouse.com/policy/", "https://loaderhouse.com/terms/"]) {
  assert.match(sitemap, new RegExp(`<loc>${escapeRegex(url)}</loc>`), `${url} should be listed in sitemap`);
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
