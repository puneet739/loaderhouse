import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "seo-pages.json");
const templatePath = path.join(root, "templates", "seo-page.html");

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const template = fs.readFileSync(templatePath, "utf8");
const siteUrl = getSiteUrl(data.site);
const pageMap = new Map(data.pages.map((page) => [page.slug, page]));

for (const page of data.pages) {
  validatePage(page);
  const outputDir = path.join(root, page.slug);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), renderPage(page), "utf8");
}

fs.writeFileSync(path.join(root, "robots.txt"), renderRobots(), "utf8");
fs.writeFileSync(path.join(root, "sitemap.xml"), renderSitemap(), "utf8");

console.log(`Generated ${data.pages.length} SEO pages, robots.txt, and sitemap.xml`);

function renderPage(page) {
  const canonical = toAbsoluteUrl(`/${page.slug}/`);
  const jsonLd = buildJsonLd(page, canonical);
  const sectionsHtml = page.sections
    .map(
      (section) => `          <section class="policy-section">
            <h2>${escapeHtml(section.heading)}</h2>
            <p>${escapeHtml(section.body)}</p>
          </section>`
    )
    .join("\n");

  const faqHtml = page.faqs?.length
    ? `          <section class="policy-section">
            <h2>Frequently asked questions</h2>
            ${page.faqs
              .map(
                (faq) => `<details class="mb-3">
              <summary class="fw-semibold">${escapeHtml(faq.question)}</summary>
              <p class="mt-2 mb-0">${escapeHtml(faq.answer)}</p>
            </details>`
              )
              .join("\n            ")}
          </section>`
    : "";

  const relatedLinksHtml = page.related
    .map((slug) => {
      const related = pageMap.get(slug);
      if (!related) {
        throw new Error(`Unknown related slug "${slug}" in ${page.slug}`);
      }
      return `<li><a href="/${escapeAttribute(slug)}/">${escapeHtml(related.h1)}</a></li>`;
    })
    .join("\n              ");

  return replaceTokens(template, {
    brand: data.site.brand,
    tagline: data.site.tagline,
    siteUrl,
    title: page.title,
    description: page.description,
    canonical,
    eyebrow: page.eyebrow,
    h1: page.h1,
    intro: page.intro,
    primaryCta: page.primaryCta,
    sectionsHtml,
    faqHtml,
    relatedLinksHtml,
    jsonLd: JSON.stringify(jsonLd, null, 2).replace(/</g, "\\u003c")
  });
}

function buildJsonLd(page, canonical) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": data.site.brand,
      "url": `${siteUrl}/`,
      "logo": `${siteUrl}/assets/logo.png`,
      "email": data.site.email,
      "slogan": data.site.tagline
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": `${siteUrl}/`,
      "name": data.site.brand,
      "publisher": {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      "url": canonical,
      "name": page.title,
      "description": page.description,
      "isPartOf": {
        "@id": `${siteUrl}/#website`
      },
      "about": {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${siteUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": page.h1,
          "item": canonical
        }
      ]
    }
  ];

  if (page.type === "Service") {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      "name": page.h1,
      "description": page.description,
      "provider": {
        "@id": `${siteUrl}/#organization`
      },
      "areaServed": "India"
    });
  }

  if (page.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      "mainEntity": page.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function renderRobots() {
  return `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

function renderSitemap() {
  const urls = [
    ...data.site.staticPages.map((page) => ({
      loc: toAbsoluteUrl(page.path),
      priority: page.priority,
      changefreq: page.changefreq
    })),
    ...data.pages.map((page) => ({
      loc: toAbsoluteUrl(`/${page.slug}/`),
      priority: page.priority,
      changefreq: page.changefreq
    }))
  ];

  const body = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${data.site.lastModified}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function replaceTokens(source, tokens) {
  return Object.entries(tokens).reduce((html, [key, value]) => {
    const rawHtmlTokens = new Set(["sectionsHtml", "faqHtml", "relatedLinksHtml", "jsonLd"]);
    const replacement = rawHtmlTokens.has(key) ? String(value) : escapeHtml(value);
    return html.replaceAll(`{{${key}}}`, replacement);
  }, source);
}

function getSiteUrl(site) {
  const cnamePath = path.join(root, "CNAME");
  const host = fs.existsSync(cnamePath) ? fs.readFileSync(cnamePath, "utf8").trim() : "";
  return stripTrailingSlash(site.url || `https://${host}`);
}

function toAbsoluteUrl(urlPath) {
  if (urlPath === "/") {
    return `${siteUrl}/`;
  }
  return `${siteUrl}${ensureLeadingSlash(urlPath).replace(/\/?$/, "/")}`;
}

function validatePage(page) {
  const requiredFields = ["slug", "title", "description", "h1", "intro"];
  for (const field of requiredFields) {
    if (!page[field]) {
      throw new Error(`${page.slug || "SEO page"} is missing required field "${field}"`);
    }
  }
  if (!Array.isArray(page.sections) || page.sections.length === 0) {
    throw new Error(`${page.slug} needs at least one content section`);
  }
  if (page.slug.startsWith("/") || page.slug.endsWith("/")) {
    throw new Error(`${page.slug} should be a clean relative slug without leading or trailing slash`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function ensureLeadingSlash(value) {
  return value.startsWith("/") ? value : `/${value}`;
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}
