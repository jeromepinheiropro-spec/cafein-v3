import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Seo from "../lib/seo.jsx";
import { Link } from "../lib/link.jsx";
import { SectionLabel } from "../lib/ui.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/*
  Page d'un article de blog : /blog/:slug. Le contenu vient du back-office
  (API /api/posts/:slug), donc l'équipe publie sans toucher au code.
  Le corps est du texte simple : les lignes vides séparent les paragraphes,
  et une ligne commençant par « ## » devient un sous-titre.
*/

function Body({ text }) {
  const blocks = String(text || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <div className="mt-8 space-y-5">
      {blocks.map((b, i) =>
        b.startsWith("## ") ? (
          <h2 key={i} className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight pt-4">
            {b.slice(3)}
          </h2>
        ) : (
          <p key={i} className="text-ink/80 font-medium leading-relaxed text-base md:text-lg whitespace-pre-wrap">
            {b}
          </p>
        ),
      )}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const t = useT();
  const { lang } = useLang();
  const [post, setPost] = useState(undefined); // undefined = chargement, null = introuvable

  useEffect(() => {
    let alive = true;
    setPost(undefined);
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setPost(d))
      .catch(() => alive && setPost(null));
    return () => {
      alive = false;
    };
  }, [slug]);

  const date =
    post && post.date
      ? new Date(post.date).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : "";

  return (
    <section className="relative bg-cream pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {post && (
        <Seo title={`${post.title} | Cafein`} description={post.excerpt || `${post.title}, le blog de Cafein.`} path={`/blog/${post.slug}`} />
      )}
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Link to="/#blog" className="inline-flex items-center gap-2 font-display font-bold text-mint-dark hover:gap-3 transition-all">
          {t("← Le blog", "← The blog")}
        </Link>

        {post === undefined && (
          <p className="mt-10 font-medium text-ink/50">{t("Chargement…", "Loading…")}</p>
        )}

        {post === null && (
          <div className="mt-10">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight">
              {t("Article introuvable", "Article not found")}
            </h1>
            <p className="mt-3 text-ink/60 font-medium">
              {t("Cet article n'existe pas ou n'est plus publié.", "This article doesn't exist or is no longer published.")}
            </p>
          </div>
        )}

        {post && (
          <article className="mt-8">
            <SectionLabel>( {post.tag || t("Article", "Article")} )</SectionLabel>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 16 }}
              className="mt-4 font-display font-extrabold text-4xl md:text-6xl text-ink tracking-tight leading-[0.98]"
            >
              {post.title}
            </motion.h1>
            <p className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-ink/40">{date}</p>

            {post.cover && (
              <img
                src={post.cover}
                alt=""
                className="mt-8 w-full rounded-3xl border-[3px] border-ink shadow-[8px_8px_0_#0A0F0D] object-cover"
              />
            )}

            {post.excerpt && (
              <p className="mt-8 font-serif text-xl md:text-2xl text-ink/80 leading-snug border-l-4 border-mint pl-5">
                {post.excerpt}
              </p>
            )}

            <Body text={post.body} />

            <div className="mt-16 rounded-3xl bg-espresso border-[3px] border-ink p-8 md:p-10 text-center shadow-[8px_8px_0_#1FCE8A]">
              <p className="font-display font-extrabold text-2xl md:text-3xl text-cream">
                {t("Un projet web en tête ?", "Got a web project in mind?")}
              </p>
              <Link
                to="/#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint text-ink font-display font-bold text-lg px-7 py-3.5 border-[3px] border-ink shadow-[5px_5px_0_#0A0F0D] hover:shadow-[0_0_0_#0A0F0D] hover:translate-x-[5px] hover:translate-y-[5px] transition-all"
              >
                {t("Parlons-en autour d'un café", "Let's chat over a coffee")}
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
