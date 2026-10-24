import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Injects the configurable site URL into index.html (canonical, og:url, JSON-LD)
 * and emits robots.txt + sitemap.xml at build time. When VITE_SITE_URL is empty the
 * absolute-URL tags are removed instead of shipping a made-up domain.
 */
function seo(siteUrl: string): Plugin {
  const url = siteUrl.replace(/\/+$/, "");
  return {
    name: "cinelane-seo",
    transformIndexHtml(html) {
      if (!url) {
        return html
          .replace(/\s*<link rel="canonical"[^>]*>/, "")
          .replace(/\s*<meta property="og:url"[^>]*>/, "")
          .replace(/\s*<meta property="og:image"[^>]*>/, "")
          .replace(/\s*<meta name="twitter:image"[^>]*>/, "")
          .replaceAll("%SITE_URL%", "");
      }
      return html.replaceAll("%SITE_URL%", url);
    },
    generateBundle() {
      const robots = url
        ? `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`
        : "User-agent: *\nAllow: /\n";
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      if (url) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n</urlset>\n`,
        });
      } else {
        this.warn("VITE_SITE_URL não definido: sitemap.xml e canonical não foram gerados.");
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), seo(env.VITE_SITE_URL ?? "")],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    build: {
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks: { react: ["react", "react-dom"] },
        },
      },
    },
  };
});
