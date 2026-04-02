import { writeFile } from "fs/promises";
import { resolve } from "path";

async function generateSitemapXml(pages, baseUrl) {
  console.log(`Generating sitemap for ${pages.length} pages`);

  const sitemapContent = generateXml(pages, baseUrl);
  const sitemapPath = resolve("./public/sitemap.xml");

  try {
    await writeFile(sitemapPath, sitemapContent);
    console.log("Successfully wrote sitemap file to:", sitemapPath);
  } catch (writeError) {
    console.error("Error writing sitemap file:", {
      error: writeError,
      path: sitemapPath,
      cwd: process.cwd(),
    });
  }
}

function generateXml(pages, baseUrl) {
  const today = new Date().toISOString();

  const urlElements = pages
    .map((page) => {
      const path = page.slug === 'home' ? '/' : `/${page.slug}`;
      const fullUrl = `${baseUrl}${path}`;
      const lastmod = page.updated_at ? new Date(page.updated_at).toISOString() : today;

      console.log(`Adding URL: ${fullUrl}`);

      return `
    <url>
      <loc>${fullUrl}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.slug === 'home' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
}

export default generateSitemapXml;
