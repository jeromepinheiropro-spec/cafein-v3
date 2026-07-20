import React from "react";
import { motion } from "framer-motion";
import { Link } from "../lib/link.jsx";
import { PageHero, CtaBand, Edito } from "../lib/page.jsx";
import Marquee from "../components/Marquee.jsx";
import { Spark, ArrowUpRight, Bean } from "../lib/ui.jsx";
import { EXPERTISES, getExpertises, Doodle } from "../lib/expertises.jsx";
import Seo, { SITE, breadcrumbLd } from "../lib/seo.jsx";
import { useT, useLang } from "../lib/lang.jsx";

/* La liste des 12 expertises en données structurées */
const LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Les expertises de Cafein",
  itemListElement: EXPERTISES.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: e.title,
    url: `${SITE}/notre-expertise/${e.slug}`,
  })),
};

/*
  La grille des 12 expertises Cafein, façon nooki.fr/notre-expertise :
  chaque carte mène à sa page dédiée.
*/
function ExpertiseCard({ e, i }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ y: -8, rotate: i % 2 ? -1 : 1 }}
      className="h-full"
    >
      <Link
        to={`/notre-expertise/${e.slug}`}
        data-cursor={t("Découvrir", "Discover")}
        className="group flex flex-col rounded-3xl bg-white border-[3px] border-ink p-7 shadow-[5px_5px_0_#0A0F0D] hover:shadow-[9px_9px_0_#1FCE8A] transition-shadow text-left h-full"
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`grid place-items-center w-16 h-16 rounded-2xl border-[3px] border-ink text-ink ${e.bg || "bg-cream-2"}`}
          >
            <Doodle kind={e.icon} />
          </span>
          <span className="font-mono text-xs font-bold text-mint-dark tracking-widest">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 font-display font-extrabold text-xl md:text-2xl text-ink leading-tight">
          {e.title}
        </h3>
        <p className="mt-2.5 text-ink/70 font-medium leading-relaxed text-sm md:text-base">
          {e.desc}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-display font-bold text-sm text-mint-dark group-hover:gap-2.5 transition-all">
          {t("En savoir plus", "Learn more")} <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function Expertise() {
  const t = useT();
  const { lang } = useLang();
  const expertises = getExpertises(lang);
  return (
    <>
      <Seo
        title="Nos 12 expertises web & digital au Luxembourg | Cafein"
        titleEn="Our 12 Web & Digital Areas of Expertise in Luxembourg | Cafein"
        description="Sites vitrine, e-commerce, SEO, GEO, réseaux sociaux, branding, data… Les 12 expertises de Cafein, agence digitale au Luxembourg, un seul interlocuteur du premier appel au suivi."
        descriptionEn="Showcase sites, e-commerce, SEO, GEO, social media, branding, data… The 12 areas of expertise of Cafein, a digital agency in Luxembourg, one contact from first call to follow-up."
        path="/notre-expertise"
        jsonLd={[
          LIST_LD,
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Notre expertise", path: "/notre-expertise" },
          ]),
        ]}
      />
      <PageHero
        n="✦"
        tag={t("Savoir-faire", "Know-how")}
        title={
          lang === "en" ? (
            <>
              Complete expertise, <span className="text-mint-dark">served nice and strong</span>
            </>
          ) : (
            <>
              Une expertise complète, <span className="text-mint-dark">servie bien serrée</span>
            </>
          )
        }
        subtitle={t(
          "Des années d'expérience réunies autour d'une même tasse : sites web, visibilité, communication et data. Douze savoir-faire complémentaires, un seul interlocuteur, au Luxembourg et dans la Grande Région.",
          "Years of experience gathered around a single cup: websites, visibility, communication and data. Twelve complementary skills, one single contact, in Luxembourg and the Greater Region.",
        )}
      >
        <div className="relative select-none" aria-hidden>
          {/* pile de tasses façon autocollants */}
          <div className="rounded-3xl bg-espresso border-[3px] border-ink p-8 shadow-[8px_8px_0_#1FCE8A] rotate-2">
            <div className="grid grid-cols-3 gap-5">
              {["site", "seo", "geo", "social", "contenu", "data"].map((k) => (
                <span key={k} className="grid place-items-center w-16 h-16 rounded-2xl bg-espresso-2 border-2 border-mint/40 text-mint">
                  <Doodle kind={k} className="w-8 h-8" />
                </span>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-cream/50 text-center">
              {t("12 expertises · 1 interlocuteur", "12 areas of expertise · 1 contact")}
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 14, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -top-5 -right-5"
          >
            <Bean className="w-12 h-12" fill="#F4A259" />
          </motion.div>
        </div>
      </PageHero>

      <Marquee
        words={
          lang === "en"
            ? ["Websites", "SEO", "GEO", "Social media", "Content", "Data"]
            : ["Sites web", "SEO", "GEO", "Social media", "Contenus", "Data"]
        }
      />

      {/* Grille des 12 expertises */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-extrabold text-3xl md:text-5xl text-ink tracking-tight"
          >
            {lang === "en" ? (
              <>
                Everything we <span className="squiggle">do</span>
              </>
            ) : (
              <>
                Tout ce qu'on sait <span className="squiggle">faire</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-ink/70 font-medium max-w-2xl"
          >
            {t(
              "Chaque expertise a sa page dédiée, cliquez, explorez, c'est ensemble qu'elles donnent le meilleur mélange.",
              "Each area of expertise has its own dedicated page, click, explore, together they make the best blend.",
            )}
          </motion.p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((e, i) => (
              <ExpertiseCard key={e.slug} e={e} i={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 font-mono text-xs tracking-[0.3em] uppercase text-mint-dark flex items-center gap-2"
          >
            <Spark className="w-4 h-4" /> {t("Il manque la vôtre ? Parlons-en.", "Missing yours? Let's talk.")}
          </motion.p>
        </div>
      </section>

      {/* Bande "pourquoi nous" compacte */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              big: "1",
              label: t(
                "interlocuteur unique, du premier appel au suivi",
                "single contact, from the first call to follow-up",
              ),
            },
            {
              big: "3",
              label: t(
                "métiers complémentaires : site, visibilité, communication",
                "complementary crafts: website, visibility, communication",
              ),
            },
            {
              big: "0",
              label: t(
                "jargon, on vous explique tout, simplement",
                "jargon, we explain everything, simply",
              ),
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-display font-extrabold text-6xl md:text-7xl text-mint">{s.big}</p>
              <p className="mt-3 text-cream/60 font-medium leading-relaxed max-w-[26ch] mx-auto">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Edito
        kicker={t("Une agence, tout le digital", "One agency, all things digital")}
        title={
          lang === "en" ? (
            <>Twelve areas of expertise, <span className="squiggle">just one coffee to pay for</span></>
          ) : (
            <>Douze expertises, <span className="squiggle">un seul café à payer</span></>
          )
        }
        paragraphs={[
          lang === "en" ? (
            <>Choosing a digital agency in Luxembourg that brings together website creation, SEO and communication means avoiding the split between three providers who never talk to each other. Your website feeds your SEO, your content fuels your social media, your data guides your decisions: it all holds together, and it's all under the same roof.</>
          ) : (
            <>Faire appel à une agence digitale au Luxembourg qui réunit création de sites, référencement et communication, c'est éviter le grand écart entre trois prestataires qui ne se parlent pas. Votre site nourrit votre SEO, vos contenus alimentent vos réseaux, vos données guident les décisions : tout se tient, et tout est sous le même toit.</>
          ),
        ]}
        links={[
          { to: "/creation-site-web", label: t("Création de site", "Website creation") },
          { to: "/seo-geo", label: "SEO & GEO" },
          { to: "/communication", label: t("Communication", "Communication") },
        ]}
      />

      <CtaBand
        title={t("Une idée ? On a l'expertise qui va avec.", "Got an idea? We've got the expertise to match.")}
        sub={t(
          "Racontez-nous votre projet autour d'un café, devis gratuit, sans engagement.",
          "Tell us about your project over a coffee, free quote, no strings attached.",
        )}
        label={t("Parlons-en", "Let's talk")}
      />
    </>
  );
}
