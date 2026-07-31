/*
  Prérendu SEO par snapshot navigateur.
  ---------------------------------------------------------------
  1. Suppose que `dist/` est déjà build (npm run build).
  2. Lance le vrai serveur (server.mjs) sur un port local.
  3. Ouvre chaque route dans Chromium (Playwright), attend la fin du
     préchargement + des animations, puis capture :
       - le HTML final de #root (H1, contenu, liens…)
       - les balises SEO du <head> (title, description, canonical,
         hreflang, Open Graph, Twitter, JSON-LD) telles que le
         composant <Seo> les a réellement injectées.
  4. Écrit le tout dans public/prerender-data.json (embarqué dans dist/
     par Vite, donc lu par server.mjs en production).

  Le serveur (server.mjs) réinjecte ensuite ce contenu dans la coquille
  dist/index.html FRAÎCHE à chaque requête : les hash d'assets restent
  toujours ceux du build en cours -> aucun risque de casse.
*/
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { chromium } = require("/home/claude/.npm-global/lib/node_modules/playwright");

const ROOT = path.join(__dirname, "..");
const PORT = 41847;
const BASE = `http://127.0.0.1:${PORT}`;

/* Chemins NEUTRES (version FR). La version EN est le même chemin préfixé /en. */
const STATIC = [
  "/",
  "/creation-site-web",
  "/seo-geo",
  "/communication",
  "/lexique",
  "/notre-expertise",
  "/equipe",
  "/diagnostic",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
  "/politique-cookies",
];
const EXPERTISE = [
  "sites-vitrine", "e-commerce", "developpement-sur-mesure", "seo",
  "geo-visibilite-ia", "seo-local-luxembourg", "reseaux-sociaux",
  "contenus-copywriting", "branding-identite", "campagnes-publicitaires",
  "emailing-newsletters", "data-reporting",
].map((s) => `/notre-expertise/${s}`);
const PROJETS = ["kinteraction", "le-101", "efluenz", "xucom", "7-plis", "agria", "cerberion"]
  .map((s) => `/realisations/${s}`);

const NEUTRAL = [...STATIC, ...EXPERTISE, ...PROJETS];
/* FR (chemin neutre) + EN (préfixe /en) */
let ROUTES = [];
for (const p of NEUTRAL) {
  ROUTES.push(p);
  ROUTES.push(p === "/" ? "/en" : "/en" + p);
}
/* PRERENDER_ONLY=/,/seo-geo  -> ne prérendre que ces routes (test rapide) */
if (process.env.PRERENDER_ONLY) {
  const only = process.env.PRERENDER_ONLY.split(",");
  ROUTES = ROUTES.filter((r) => only.includes(r));
}

const HEAD_SELECTOR = [
  "title",
  'meta[name="description"]',
  'meta[name="robots"]',
  'link[rel="canonical"]',
  'link[rel="alternate"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
].join(", ");

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!fs.existsSync(path.join(ROOT, "dist", "index.html"))) {
    console.error("dist/index.html absent — lance `npm run build` d'abord.");
    process.exit(1);
  }

  // 1) Serveur local (vrai server.mjs, avec API pour /api/seo, /api/posts…)
  console.log("→ démarrage du serveur local…");
  const srv = spawn("node", ["server.mjs"], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  srv.stdout.on("data", () => {});
  srv.stderr.on("data", (d) => process.stderr.write("[srv] " + d));

  // attendre que le serveur réponde
  let up = false;
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) { up = true; break; }
    } catch { /* pas encore prêt */ }
    await wait(250);
  }
  if (!up) { console.error("serveur injoignable"); srv.kill(); process.exit(1); }
  console.log("✓ serveur prêt sur " + BASE);

  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    args: ["--no-sandbox"],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  const data = {};
  let totalBytes = 0;

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 30000 });

      // Attendre la fin du préchargement : App.jsx passe le fond du body
      // en crème (#F5EFE2 = rgb(245,239,226)) quand loading devient false.
      await page.waitForFunction(
        () => getComputedStyle(document.body).backgroundColor === "rgb(245, 239, 226)",
        { timeout: 20000 },
      ).catch(() => {});

      // Déclencher les animations « au scroll » (whileInView once) en
      // parcourant la page via Lenis, puis revenir en haut.
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const L = window.__lenis;
        const h = document.body.scrollHeight;
        for (let y = 0; y <= h; y += 500) {
          if (L) L.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
          await sleep(60);
        }
        if (L) L.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
        await sleep(120);
      });
      await wait(500);

      const cap = await page.evaluate((sel) => {
        const root = document.getElementById("root");
        const head = [...document.head.querySelectorAll(sel)]
          .map((e) => e.outerHTML)
          .join("\n    ");
        return {
          root: root ? root.innerHTML : "",
          head,
          lang: document.documentElement.getAttribute("lang") || "fr",
          h1: [...document.querySelectorAll("h1")].map((h) => (h.innerText || "").trim()),
        };
      }, HEAD_SELECTOR);

      if (cap.h1.length !== 1) {
        console.warn(`  ⚠ ${route} : ${cap.h1.length} H1 (attendu 1)`);
      }
      const bytes = Buffer.byteLength(cap.root + cap.head, "utf8");
      totalBytes += bytes;
      data[route] = { root: cap.root, head: cap.head, lang: cap.lang };
      console.log(`✓ ${route}  (${(bytes / 1024).toFixed(0)} Ko, H1: «${cap.h1[0] || "—"}»)`);
    } catch (e) {
      console.warn(`✗ ${route} : ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  srv.kill();

  const out = path.join(ROOT, "prerender-data.json");
  fs.writeFileSync(out, JSON.stringify(data));
  console.log(`\n✓ ${Object.keys(data).length} pages prérendues → public/prerender-data.json (${(totalBytes / 1024 / 1024).toFixed(2)} Mo)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
