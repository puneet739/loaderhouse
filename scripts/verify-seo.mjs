import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(read("data/seo-pages.json"));
const siteUrl = stripTrailingSlash(data.site.url);
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");

assert.match(robots, /^User-agent: \*/m, "robots.txt must allow standard crawlers");
assert.match(robots, /^User-agent: OAI-SearchBot/m, "robots.txt must include OAI-SearchBot");
assert.match(robots, new RegExp(`^Sitemap: ${escapeRegex(siteUrl)}/sitemap\\.xml`, "m"), "robots.txt must include sitemap directive");

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const sitemapUrls = extractSitemapUrls(sitemap);
const expectedStaticUrls = data.site.staticPages.map((page) => toAbsoluteUrl(page.path));

for (const url of expectedStaticUrls) {
  assert.ok(sitemapUrls.has(url), `sitemap is missing static URL ${url}`);
}

for (const page of data.pages) {
  const htmlPath = `${page.slug}/index.html`;
  const html = read(htmlPath);
  const canonical = toAbsoluteUrl(`/${page.slug}/`);

  const title = matchOne(html, /<title>(.*?)<\/title>/, `${htmlPath} title`);
  const description = matchOne(html, /<meta name="description" content="([^"]+)"/, `${htmlPath} description`);
  const canonicalHref = matchOne(html, /<link rel="canonical" href="([^"]+)"/, `${htmlPath} canonical`);
  const h1 = matchOne(html, /<h1[^>]*>(.*?)<\/h1>/, `${htmlPath} h1`);

  assert.equal(title, page.title, `${htmlPath} title should match data`);
  assert.equal(description, page.description, `${htmlPath} description should match data`);
  assert.equal(canonicalHref, canonical, `${htmlPath} canonical should match clean URL`);
  assert.equal(stripTags(h1), page.h1, `${htmlPath} H1 should match data`);
  assert.match(html, /<meta property="og:title"/, `${htmlPath} should include Open Graph metadata`);
  assert.match(html, /<script type="application\/ld\+json">/, `${htmlPath} should include JSON-LD`);
  assert.ok(sitemapUrls.has(canonical), `sitemap is missing generated URL ${canonical}`);

  assertUnique(titles, title, "title");
  assertUnique(descriptions, description, "description");
  assertUnique(canonicals, canonicalHref, "canonical");
}

console.log(`Verified ${data.pages.length} generated SEO pages and ${sitemapUrls.size} sitemap URLs.`);

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function matchOne(source, regex, label) {
  const match = source.match(regex);
  assert.ok(match, `${label} should exist`);
  return decodeHtml(match[1].trim());
}

function extractSitemapUrls(xml) {
  return new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
}

function assertUnique(set, value, label) {
  assert.equal(set.has(value), false, `duplicate ${label}: ${value}`);
  set.add(value);
}

function toAbsoluteUrl(urlPath) {
  if (urlPath === "/") {
    return `${siteUrl}/`;
  }
  return `${siteUrl}${urlPath.startsWith("/") ? urlPath : `/${urlPath}`}`.replace(/\/?$/, "/");
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "");
}

function decodeHtml(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
