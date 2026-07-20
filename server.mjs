/*
  Serveur Cafein : sert le site (dist/) + API commentaires.
  - GET    /api/comments        → liste des commentaires (publics)
  - POST   /api/comments        → { name, text } ajoute un commentaire
  - DELETE /api/comments/:id    → suppression (header x-admin-key = ADMIN_KEY)
  Stockage : JSON sur disque (DATA_DIR ou ./data). Sur Railway, monter un
  volume sur /data pour que les commentaires survivent aux déploiements.
*/
import express from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || (fs.existsSync("/data") ? "/data" : path.join(__dirname, "data"));
const FILE = path.join(DATA_DIR, "comments.json");
const CONTACT_FILE = path.join(DATA_DIR, "contacts.json");
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const CONTACT_TO = process.env.CONTACT_TO || "hello@cafein.lu";
/* Expéditeur technique des notifications : doit être un sender vérifié dans
   le compte Brevo « Cafein ». pinoo54440@gmail.com y est vérifié ; le replyTo
   pointe vers le visiteur pour répondre en un clic. */
const CONTACT_FROM = process.env.CONTACT_FROM || "pinoo54440@gmail.com";
const PORT = process.env.PORT || 3000;

fs.mkdirSync(DATA_DIR, { recursive: true });

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}
function save(list) {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

let comments = load();

/* Anti-spam très simple : 5 commentaires max par IP par heure */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 3600_000);
  if (arr.length >= 5) return true;
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

const app = express();
app.use(express.json({ limit: "10kb" }));
app.disable("x-powered-by");

app.get("/api/comments", (_req, res) => {
  res.json(comments.map(({ id, name, text, date }) => ({ id, name, text, date })));
});

app.post("/api/comments", (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "?";
  if (rateLimited(ip)) return res.status(429).json({ error: "Doucement sur le café ! Réessayez plus tard." });

  let { name, text } = req.body || {};
  name = String(name || "").trim().slice(0, 30);
  text = String(text || "").trim().slice(0, 280);
  if (!name || !text) return res.status(400).json({ error: "Un pseudo et un message, et c'est parti !" });

  const c = { id: crypto.randomUUID(), name, text, date: new Date().toISOString(), ip };
  comments.push(c);
  if (comments.length > 500) comments = comments.slice(-500);
  save(comments);
  res.status(201).json({ id: c.id, name: c.name, text: c.text, date: c.date });
});

app.delete("/api/comments/:id", (req, res) => {
  if (!ADMIN_KEY) return res.status(503).json({ error: "ADMIN_KEY non configurée sur le serveur." });
  if (req.headers["x-admin-key"] !== ADMIN_KEY) return res.status(401).json({ error: "Clé invalide." });
  const before = comments.length;
  comments = comments.filter((c) => c.id !== req.params.id);
  if (comments.length === before) return res.status(404).json({ error: "Introuvable." });
  save(comments);
  res.json({ ok: true });
});

/* ── Formulaire de contact ─────────────────────────────────────
   Stocke le message (volume /data) et l'envoie par e-mail vers
   CONTACT_TO via l'API Brevo (si BREVO_API_KEY est configurée). */
function loadContacts() {
  try {
    return JSON.parse(fs.readFileSync(CONTACT_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function sendViaBrevo({ nom, email, message, lang }) {
  if (!BREVO_API_KEY) return { sent: false, reason: "no-key" };
  const body = {
    sender: { name: "Site Cafein", email: CONTACT_FROM },
    to: [{ email: CONTACT_TO }],
    replyTo: { email, name: nom },
    subject: `Nouveau message du site (${lang || "fr"}) — ${nom}`,
    htmlContent:
      `<h2>Nouveau message depuis cafein.lu</h2>` +
      `<p><b>Nom :</b> ${escapeHtml(nom)}</p>` +
      `<p><b>Email :</b> ${escapeHtml(email)}</p>` +
      `<p><b>Langue :</b> ${escapeHtml(lang || "fr")}</p>` +
      `<p><b>Message :</b></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  };
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    return { sent: false, reason: `brevo-${r.status}`, detail: txt.slice(0, 200) };
  }
  return { sent: true };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

app.post("/api/contact", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "?";
  if (rateLimited(ip)) return res.status(429).json({ error: "Trop d'envois. Réessayez dans un instant." });

  let { nom, email, message, lang } = req.body || {};
  nom = String(nom || "").trim().slice(0, 80);
  email = String(email || "").trim().slice(0, 120);
  message = String(message || "").trim().slice(0, 4000);
  lang = lang === "en" ? "en" : "fr";
  if (!nom || !email || !message) return res.status(400).json({ error: "Champs manquants." });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: "E-mail invalide." });

  const entry = { id: crypto.randomUUID(), nom, email, message, lang, date: new Date().toISOString(), ip };
  let contacts = loadContacts();
  contacts.push(entry);
  if (contacts.length > 1000) contacts = contacts.slice(-1000);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));

  let mail = { sent: false, reason: "no-key" };
  try {
    mail = await sendViaBrevo(entry);
  } catch (e) {
    mail = { sent: false, reason: "exception", detail: String(e).slice(0, 120) };
  }
  /* On confirme toujours au visiteur : le message est stocké côté serveur
     même si l'e-mail échoue (consultable dans /moderation). */
  res.status(201).json({ ok: true, mailed: mail.sent });
});

app.get("/api/contact", (req, res) => {
  if (req.headers["x-admin-key"] !== ADMIN_KEY || !ADMIN_KEY) return res.status(401).json({ error: "Clé invalide." });
  res.json(loadContacts());
});

app.delete("/api/contact/:id", (req, res) => {
  if (!ADMIN_KEY || req.headers["x-admin-key"] !== ADMIN_KEY) return res.status(401).json({ error: "Clé invalide." });
  const contacts = loadContacts().filter((c) => c.id !== req.params.id);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));
  res.json({ ok: true });
});

/* Vérification de la clé admin (pour la page de modération) */
app.get("/api/admin/check", (req, res) => {
  if (!ADMIN_KEY) return res.status(503).json({ ok: false, error: "ADMIN_KEY non configurée." });
  res.json({ ok: req.headers["x-admin-key"] === ADMIN_KEY });
});

/* Site statique + fallback SPA */
const DIST = path.join(__dirname, "dist");
app.use(express.static(DIST, { maxAge: "1h", index: false }));
app.get(/.*/, (_req, res) => res.sendFile(path.join(DIST, "index.html")));

app.listen(PORT, "0.0.0.0", () => console.log(`Cafein en ligne sur :${PORT} — data: ${FILE}`));
