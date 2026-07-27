import React, { useMemo, useRef, useState } from "react";
import Seo, { breadcrumbLd, serviceLd } from "../lib/seo.jsx";
import { Link } from "../lib/link.jsx";
import { useT } from "../lib/lang.jsx";

/*
  Page /diagnostic : l'outil de test de performance en libre-service.
  Le visiteur saisit l'URL de son site, on interroge /api/audit (Google
  PageSpeed en vrai), puis on affiche les scores ET le détail des
  problèmes (gravité, explication, impact, correctif) — la valeur ajoutée
  par rapport à un simple score. Design system Cafein, icônes maison.
*/

const CSS = `
.diag{--esp:#0A0F0D;--cream:#F5EFE2;--cream2:#EDE5D3;--mint:#1FCE8A;--mintd:#17A46E;--sun:#FFD166;--caramel:#F4A259;--red:#E5623E;}
.diag{background:var(--cream);color:#141A17;}
.diag .in{max-width:1000px;margin:0 auto;padding:0 24px;}
.diag .kick{font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:700;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--mintd);}
.diag .hero{position:relative;text-align:center;padding:120px 0 34px;}
.diag .hero h1{font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:800;font-size:clamp(38px,6.5vw,66px);line-height:1;color:var(--esp);letter-spacing:-.02em;margin-top:16px;}
.diag .hero h1 .ac{color:var(--mint);position:relative;}
.diag .hero h1 .ac::after{content:"";position:absolute;left:0;right:0;bottom:-10px;height:10px;background-image:url("data:image/svg+xml,%3Csvg width='40' height='8' viewBox='0 0 40 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4 Q5 0 10 4 T20 4 T30 4 T40 4' stroke='%231FCE8A' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:repeat-x;background-size:40px 10px;}
.diag .hero p.sub{margin:26px auto 0;max-width:560px;font-size:18px;font-weight:600;color:rgba(10,15,13,.62);}
.diag form{margin:34px auto 0;display:flex;gap:12px;max-width:600px;background:#fff;border:3px solid var(--esp);border-radius:999px;padding:8px 8px 8px 22px;box-shadow:7px 7px 0 var(--esp);}
.diag form input{flex:1;border:none;outline:none;font-size:17px;font-weight:600;color:var(--esp);background:transparent;min-width:0;}
.diag form input::placeholder{color:#9a9384;}
.diag form button{flex-shrink:0;background:var(--mint);color:var(--esp);font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:800;font-size:17px;border:3px solid var(--esp);border-radius:999px;padding:12px 24px;cursor:pointer;}
.diag form button:disabled{opacity:.6;cursor:default;}
.diag .trust{margin-top:16px;font-family:"Space Mono",monospace;font-size:12.5px;letter-spacing:.06em;color:rgba(10,15,13,.5);}
.diag .err{margin:24px auto 0;max-width:560px;background:#F9D2C6;border:3px solid var(--esp);border-radius:16px;padding:14px 18px;font-weight:600;color:var(--esp);box-shadow:4px 4px 0 var(--esp);}
.diag .loading{text-align:center;padding:50px 0;}
.diag .spinner{width:64px;height:64px;margin:0 auto 20px;border:7px solid var(--cream2);border-top-color:var(--mint);border-radius:50%;animation:dgspin .8s linear infinite;}
@keyframes dgspin{to{transform:rotate(360deg);}}
.diag .loadtxt{font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:700;font-size:21px;color:var(--esp);}
.diag .res{padding:16px 0 90px;}
.diag .rhead{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px;}
.diag .rhead h2{font-family:"Bricolage Grotesque Variable",sans-serif;font-size:30px;font-weight:800;color:var(--esp);}
.diag .rurl{font-family:"Space Mono",monospace;font-size:14px;background:var(--esp);color:var(--cream);padding:5px 12px;border-radius:999px;}
.diag .scores{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr 1fr;gap:14px;margin:24px 0 12px;}
@media(max-width:760px){.diag .scores{grid-template-columns:1fr 1fr;}}
.diag .scard{background:#fff;border:3px solid var(--esp);border-radius:20px;box-shadow:5px 5px 0 var(--esp);padding:18px;text-align:center;}
.diag .scard.big{box-shadow:6px 6px 0 var(--mint);}
.diag .gwrap{position:relative;width:112px;height:112px;margin:0 auto;}
.diag .gwrap.sm{width:88px;height:88px;}
.diag .gnum{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:800;font-size:34px;}
.diag .gwrap.sm .gnum{font-size:26px;}
.diag .gwrap svg circle.arc{transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1);}
.diag .slabel{margin-top:10px;font-family:"Space Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(10,15,13,.6);}
.diag .scard.big .slabel{font-size:12px;color:var(--esp);font-weight:700;}
.diag .verdict{margin:22px 0 30px;background:var(--esp);color:var(--cream);border:3px solid var(--esp);border-radius:22px;padding:22px 26px;display:flex;gap:16px;align-items:center;box-shadow:7px 7px 0 var(--mint);}
.diag .verdict .vico{display:flex;flex-shrink:0;}
.diag .verdict .vico svg{width:44px;height:44px;color:var(--mint);}
.diag .verdict b{font-family:"Bricolage Grotesque Variable",sans-serif;font-size:20px;color:#fff;}
.diag .verdict p{font-size:14.5px;color:rgba(245,239,226,.78);margin-top:3px;}
.diag .isechead{display:flex;align-items:baseline;gap:12px;margin:8px 0 16px;}
.diag .isechead h3{font-family:"Bricolage Grotesque Variable",sans-serif;font-size:24px;font-weight:800;color:var(--esp);}
.diag .isechead span{font-family:"Space Mono",monospace;font-size:13px;color:var(--mintd);}
.diag .filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
.diag .filters button{font-family:"Space Mono",monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;border:2.5px solid var(--esp);background:#fff;border-radius:999px;padding:7px 14px;cursor:pointer;color:var(--esp);}
.diag .filters button.active{background:var(--esp);color:var(--cream);}
.diag .issue{background:#fff;border:3px solid var(--esp);border-radius:18px;padding:18px 20px;margin-bottom:14px;box-shadow:4px 4px 0 var(--esp);display:flex;gap:16px;align-items:flex-start;}
.diag .sev{flex-shrink:0;width:54px;height:54px;border-radius:14px;border:3px solid var(--esp);display:flex;align-items:center;justify-content:center;background:var(--cream2);box-shadow:3px 3px 0 var(--esp);}
.diag .sev svg{width:34px;height:34px;}
.diag .issue .body{flex:1;min-width:0;}
.diag .issue .top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.diag .issue h4{font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:800;font-size:18px;color:var(--esp);}
.diag .chip{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:4px 9px;border-radius:999px;border:2px solid var(--esp);}
.diag .chip.cat{background:var(--cream);}
.diag .chip.crit{background:var(--red);color:#fff;border-color:var(--red);}
.diag .chip.warn{background:var(--caramel);}
.diag .chip.ok{background:var(--mint);}
.diag .issue .desc{font-size:14.5px;color:rgba(10,15,13,.72);margin-top:8px;line-height:1.5;}
.diag .issue .meta{display:flex;gap:22px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:2px dashed rgba(10,15,13,.14);}
.diag .issue .meta .k{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(10,15,13,.45);}
.diag .issue .meta .v{font-weight:700;color:var(--esp);margin-top:2px;font-size:13px;}
.diag .issue .meta .v.fix{color:var(--mintd);}
.diag .cta{margin-top:40px;background:var(--mint);border:3px solid var(--esp);border-radius:26px;box-shadow:9px 9px 0 var(--esp);padding:38px 34px;text-align:center;}
.diag .cta h3{font-family:"Bricolage Grotesque Variable",sans-serif;font-size:30px;font-weight:800;color:var(--esp);display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;}
.diag .cta h3 svg{width:30px;height:30px;}
.diag .cta p{max-width:520px;margin:12px auto 0;font-size:16px;font-weight:600;color:rgba(10,15,13,.72);}
.diag .cta a.btn{display:inline-flex;align-items:center;gap:10px;margin-top:22px;background:var(--esp);color:var(--cream);font-family:"Bricolage Grotesque Variable",sans-serif;font-weight:800;font-size:18px;text-decoration:none;padding:15px 30px;border-radius:999px;border:3px solid var(--esp);box-shadow:5px 5px 0 rgba(245,239,226,.9);}
.diag .note{text-align:center;font-family:"Space Mono",monospace;font-size:11px;color:rgba(10,15,13,.4);margin-top:12px;}
`;

const SEVLABEL = { crit: "Critique", warn: "À améliorer", ok: "Bon" };
const LOADING = ["On mesure la vitesse de chargement…", "On inspecte la structure SEO…", "On teste la version mobile…", "On vérifie l'accessibilité…", "On compile votre rapport…"];
function gColor(s) { return s >= 90 ? "#1FCE8A" : s >= 50 ? "#F4A259" : "#E5623E"; }

function Gauge({ score, small }) {
  const s = score == null ? 0 : score;
  const C = 2 * Math.PI * 52;
  const off = C * (1 - s / 100);
  const col = gColor(s);
  return (
    <div className={`gwrap${small ? " sm" : ""}`}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#EDE5D3" strokeWidth="12" />
        <circle className="arc" cx="60" cy="60" r="52" fill="none" stroke={col} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={off} transform="rotate(-90 60 60)" />
      </svg>
      <div className="gnum" style={{ color: col }}>{score == null ? "–" : score}</div>
    </div>
  );
}

export default function Diagnostic() {
  const t = useT();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loadIdx, setLoadIdx] = useState(0);
  const [filter, setFilter] = useState("all");
  const timers = useRef([]);

  const scores = data ? [data.performance, data.seo, data.accessibility, data.bestPractices].filter((x) => x != null) : [];
  const global = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const issues = (data && data.issues) || [];
  const cats = useMemo(() => ["all", ...Array.from(new Set(issues.map((i) => i.cat)))], [issues]);
  const shown = filter === "all" ? issues : issues.filter((i) => i.cat === filter);
  const nProblems = issues.filter((i) => i.sev !== "ok").length;

  const verdict = global == null ? null
    : global >= 90 ? { t: "Votre site carbure. 👏", p: "Beau travail : il est rapide et bien construit. On regarde ensemble les derniers points pour rester devant." }
    : global >= 50 ? { t: "Pas mal, mais on peut viser plus haut.", p: "Quelques réglages et vous passez dans le vert. Voici précisément ce qui vous freine." }
    : { t: "Il y a du potentiel inexploité.", p: "Votre site est lent et perd des visiteurs (et des positions Google) en route. Bonne nouvelle : les points ci-dessous sont exactement ce qu'on redresse." };

  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = []; }

  async function analyze(e) {
    e.preventDefault();
    const u = url.trim();
    if (!u) { setError("Entrez l'adresse de votre site."); return; }
    setError(""); setStatus("loading"); setData(null); setFilter("all"); setLoadIdx(0);
    clearTimers();
    LOADING.forEach((_, i) => { if (i > 0) timers.current.push(setTimeout(() => setLoadIdx(i), i * 3500)); });
    try {
      const r = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: u }) });
      const d = await r.json().catch(() => ({}));
      clearTimers();
      if (!r.ok || !d.ok) { setError(d.detail || "Analyse impossible pour le moment. Vérifiez l'adresse et réessayez."); setStatus("idle"); return; }
      setData(d); setStatus("done");
    } catch {
      clearTimers();
      setError("Connexion perdue. Réessayez."); setStatus("idle");
    }
  }

  return (
    <div className="diag">
      <style>{CSS}</style>
      <Seo
        title={t("Testez la performance de votre site — gratuit | Cafein", "Free website performance test | Cafein")}
        description={t("Analysez gratuitement la vitesse, le SEO et le mobile de votre site. Vos vrais scores Google et le détail de chaque problème à corriger, en 30 secondes.", "Free analysis of your site's speed, SEO and mobile. Real Google scores plus every issue to fix, in 30 seconds.")}
        path="/diagnostic"
        jsonLd={[
          serviceLd(t("Diagnostic de site web", "Website audit"), t("Analyse gratuite de performance, SEO et mobile.", "Free performance, SEO and mobile analysis."), "/diagnostic"),
          breadcrumbLd([{ name: "Accueil", path: "/" }, { name: t("Diagnostic", "Audit"), path: "/diagnostic" }]),
        ]}
      />

      {/* icônes maison, univers café */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="ic-image" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><rect x="7" y="11" width="34" height="26" rx="5" fill="#F5EFE2" /><circle cx="17" cy="20" r="3.4" fill="#FFD166" /><path d="M9 35 L20 24 L27 31 L32 26 L39 33 V35 Z" fill="#1FCE8A" /></g></symbol>
        <symbol id="ic-hourglass" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"><path d="M14 8h20M14 40h20" /><path d="M17 9v5l7 10 -7 10v5M31 9v5l-7 10 7 10v5" fill="#F5EFE2" /><path d="M19 12h10l-5 7z" fill="#F4A259" strokeWidth="0" /><path d="M24 27l5 8H19z" fill="#F4A259" strokeWidth="0" /></g></symbol>
        <symbol id="ic-thermos" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><path d="M15 15l3 24a3 3 0 0 0 3 2.6h6a3 3 0 0 0 3-2.6l3-24z" fill="#F4A259" /><rect x="13" y="9" width="22" height="6.5" rx="3.2" fill="#0A0F0D" strokeWidth="0" /><path d="M16.5 25h15l-1.4 9h-12.2z" fill="#F5EFE2" strokeWidth="2.5" /></g></symbol>
        <symbol id="ic-tag" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><path d="M9 25 24 10h13a2 2 0 0 1 2 2v13L24 40z" fill="#FFD166" /><circle cx="32.5" cy="16.5" r="2.6" fill="#F5EFE2" /></g></symbol>
        <symbol id="ic-phone" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><rect x="15" y="7" width="18" height="34" rx="4" fill="#1FCE8A" /><rect x="18.5" y="12" width="11" height="17" rx="2" fill="#F5EFE2" strokeWidth="2.4" /><circle cx="24" cy="36" r="1.8" fill="#0A0F0D" strokeWidth="0" /></g></symbol>
        <symbol id="ic-beans" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinecap="round"><ellipse cx="16" cy="17" rx="7" ry="10" fill="#1FCE8A" /><path d="M16 9c-3 4 3 8 0 16" fill="none" strokeWidth="2.4" /><ellipse cx="32" cy="17" rx="7" ry="10" fill="#F4A259" /><path d="M32 9c-3 4 3 8 0 16" fill="none" strokeWidth="2.4" /><ellipse cx="24" cy="33" rx="7" ry="10" fill="#FFD166" /><path d="M24 25c-3 4 3 8 0 16" fill="none" strokeWidth="2.4" /></g></symbol>
        <symbol id="ic-rosette" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><path d="M18 27l-4 14 10-5 10 5-4-14z" fill="#F4A259" /><circle cx="24" cy="19" r="13" fill="#1FCE8A" /><path d="M18 19l4 4 8-9" fill="none" strokeLinecap="round" /></g></symbol>
        <symbol id="ic-gauge" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18a9 9 0 0 1 18 0" /><path d="M12 18l5-5" /><circle cx="12" cy="18" r="1.6" /></g></symbol>
        <symbol id="ic-cup" viewBox="0 0 48 48"><g stroke="#0A0F0D" strokeWidth="3" strokeLinejoin="round"><path d="M9 17h24v9a12 12 0 0 1-24 0z" fill="#F5EFE2" /><path d="M33 19h4a5.5 5.5 0 0 1 0 11h-4" fill="none" /><path d="M15 9c-1.4 1.7-1.4 3.4 0 5.1M23 9c-1.4 1.7-1.4 3.4 0 5.1" fill="none" strokeLinecap="round" /></g></symbol>
      </svg>

      {/* HERO */}
      {status !== "done" && (
        <section className="hero">
          <div className="in">
            <div className="kick">( {t("Analyse gratuite · en 30 secondes", "Free analysis · in 30 seconds")} )</div>
            <h1>{t("Votre site est-il", "Is your site")} <span className="ac">{t("performant", "fast")}</span> ?</h1>
            <p className="sub">{t("On passe votre site au crible : vitesse, SEO, mobile, accessibilité. Et surtout, on vous dit exactement ce qui cloche, en clair.", "We put your site through the wringer: speed, SEO, mobile, accessibility. And we tell you exactly what's wrong, in plain words.")}</p>
            <form onSubmit={analyze}>
              <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder={t("votre-site.lu", "your-site.com")} autoComplete="off" disabled={status === "loading"} />
              <button type="submit" disabled={status === "loading"}>{status === "loading" ? t("Analyse…", "Testing…") : t("Analyser ↗", "Analyze ↗")}</button>
            </form>
            <div className="trust">{t("Analyse réelle · aucun compte requis", "Real analysis · no account needed")}</div>
            {error && <div className="err">{error}</div>}
          </div>
        </section>
      )}

      {/* LOADING */}
      {status === "loading" && (
        <section className="in loading">
          <div className="spinner" />
          <div className="loadtxt">{LOADING[loadIdx]}</div>
        </section>
      )}

      {/* RESULTS */}
      {status === "done" && data && (
        <section className="res">
          <div className="in">
            <div className="rhead"><h2>{t("Le verdict", "The verdict")}</h2><span className="rurl">{String(data.url || url).replace(/^https?:\/\//, "").replace(/\/$/, "")}</span></div>
            <div className="scores">
              <div className="scard big"><Gauge score={global} /><div className="slabel">{t("Score global", "Overall")}</div></div>
              <div className="scard"><Gauge score={data.performance} small /><div className="slabel">{t("Performance", "Performance")}</div></div>
              <div className="scard"><Gauge score={data.seo} small /><div className="slabel">SEO</div></div>
              <div className="scard"><Gauge score={data.accessibility} small /><div className="slabel">{t("Accessibilité", "Accessibility")}</div></div>
              <div className="scard"><Gauge score={data.bestPractices} small /><div className="slabel">{t("Bonnes pratiques", "Best practices")}</div></div>
            </div>

            {verdict && (
              <div className="verdict">
                <div className="vico"><svg><use href="#ic-gauge" /></svg></div>
                <div><b>{verdict.t}</b><p>{verdict.p}</p></div>
              </div>
            )}

            <div className="isechead"><h3>{t("Ce qu'on a trouvé", "What we found")}</h3><span>{nProblems > 0 ? `${nProblems} ${t("points à regarder", "points to look at")}` : t("Rien de bloquant, bravo", "Nothing blocking, well done")}</span></div>
            {cats.length > 2 && (
              <div className="filters">
                {cats.map((c) => (
                  <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c === "all" ? t("Tout", "All") : c}</button>
                ))}
              </div>
            )}

            {shown.map((i) => (
              <div className="issue" key={i.id}>
                <div className="sev"><svg><use href={"#" + i.icon} /></svg></div>
                <div className="body">
                  <div className="top">
                    <h4>{i.title}</h4>
                    <span className={"chip " + i.sev}>{SEVLABEL[i.sev]}</span>
                    <span className="chip cat">{i.cat}</span>
                  </div>
                  <div className="desc">{i.desc}</div>
                  <div className="meta">
                    {i.impact && <div><div className="k">{t("Impact", "Impact")}</div><div className="v">{i.impact}</div></div>}
                    <div><div className="k">{t("Le correctif", "The fix")}</div><div className="v fix">{i.fix}</div></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cta">
              <h3>{t("Des points rouges sur votre site ?", "Red flags on your site?")} <svg><use href="#ic-cup" /></svg></h3>
              <p>{t("On les corrige un par un (vitesse, SEO, mobile) et on remet votre site dans le vert. Le premier échange est offert, autour d'un café.", "We fix them one by one (speed, SEO, mobile) and get your site back in the green. First chat's on us, over a coffee.")}</p>
              <Link className="btn" to="/#contact">{t("Parlons-en →", "Let's talk →")}</Link>
            </div>

            <div className="note">{t("Analyse fournie par Google PageSpeed Insights.", "Analysis powered by Google PageSpeed Insights.")}</div>
          </div>
        </section>
      )}
    </div>
  );
}
