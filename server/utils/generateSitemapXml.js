import { writeFile } from "fs/promises";
import { resolve } from "path";

const EXCLUDED_PATHS = ["/lost", "/config", "/home"];

async function generateSitemapXml(data, baseUrl) {
  const linksArray = Object.values(data.links);
  console.log(`Fetched ${linksArray.length} total links`);

  const validPages = linksArray.filter((link) => {
    if (link.is_folder) return false;
    if (EXCLUDED_PATHS.includes(link.real_path)) return false;
    return true;
  });

  console.log(`Found ${validPages.length} valid pages for sitemap`);

  const sitemapContent = generateXml(validPages, baseUrl);
  const sitemapPath = resolve("./public/sitemap.xml");

  await writeFile(sitemapPath, sitemapContent);
  console.log("Sitemap written successfully to:", sitemapPath);

  try {
    await writeFile(sitemapPath, sitemapContent);
    console.log("Successfully wrote sitemap file");
  } catch (writeError) {
    console.error("Error writing sitemap file:", {
      error: writeError,
      path: sitemapPath,
      cwd: process.cwd(),
    });
    throw writeError;
  }
}

function generateXml(links, baseUrl) {
  const today = new Date().toISOString();

  const urlElements = links
    .map((link) => {
      const path = link.real_path?.replace(/\/+/g, "/").replace(/^\/?/, "/");
      const cleanPath = path === "/" ? path : path.replace(/\/$/, "");

      const fullUrl = `${baseUrl}${cleanPath}`;
      console.log(`Adding URL: ${fullUrl}`);

      return `
    <url>
      <loc>${fullUrl}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${link.is_startpage ? "1.0" : "0.8"}</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>${urlElements}
</urlset>`;
}

export default generateSitemapXml;
