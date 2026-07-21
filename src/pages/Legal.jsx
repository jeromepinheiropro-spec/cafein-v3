import React from "react";
import { motion } from "framer-motion";
import Seo from "../lib/seo.jsx";
import { Link } from "../lib/link.jsx";
import { SectionLabel } from "../lib/ui.jsx";

/*
  Pages légales : mentions légales, politique de confidentialité (RGPD),
  politique cookies. Contenu en français (langue de référence au Luxembourg).
  Les identifiants propres à l'entreprise sont laissés en [À COMPLÉTER] :
  Pinoo n'a qu'à les renseigner ici avant mise en ligne définitive.
*/

const UPDATED = "juillet 2026";

/* Petit composant : une entrée à compléter, visuellement repérable. */
function Fill({ children }) {
  return (
    <mark className="bg-sun/60 text-ink font-semibold px-1.5 py-0.5 rounded not-italic">
      [À COMPLÉTER : {children}]
    </mark>
  );
}

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="mt-10"
    >
      <h2 className="font-display font-extrabold text-xl md:text-2xl text-ink tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-ink/75 font-medium leading-relaxed">{children}</div>
    </motion.section>
  );
}

/* ── Contenus ─────────────────────────────────────────────────── */

function MentionsLegales() {
  return (
    <>
      <Section title="Éditeur du site">
        <p>
          Le site <strong>www.cafein.lu</strong> est édité par <Fill>raison sociale</Fill>,{" "}
          <Fill>forme juridique (ex. SARL, société à responsabilité limitée)</Fill>, dont le siège social est situé{" "}
          <Fill>adresse complète</Fill>, Luxembourg.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Numéro d'immatriculation (RCS Luxembourg) : <Fill>n° RCS</Fill></li>
          <li>Numéro de TVA intracommunautaire : <Fill>n° TVA (LU…)</Fill></li>
          <li>Autorisation d'établissement : <Fill>n° d'autorisation</Fill></li>
          <li>Adresse e-mail : hello@cafein.lu</li>
          <li>Téléphone : <Fill>numéro de téléphone</Fill></li>
        </ul>
        <p>
          Directeur / directrice de la publication : <Fill>nom du responsable de la publication</Fill>.
        </p>
      </Section>

      <Section title="Hébergement">
        <p>
          Le site est hébergé par <strong>Railway Corporation</strong>, 2261 Market Street #4059, San Francisco,
          CA 94114, États-Unis — railway.app. Les données sont servies via l'infrastructure de Railway
          (région Europe de l'Ouest).
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur le site (textes, visuels, illustrations, logo, code, éléments
          graphiques et animations) est la propriété exclusive de l'éditeur ou de ses partenaires, et est protégé
          par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou
          exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.
        </p>
      </Section>

      <Section title="Responsabilité">
        <p>
          L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site,
          mais ne saurait garantir l'absence d'erreurs ou d'omissions. Le site peut contenir des liens vers des
          sites tiers dont l'éditeur ne maîtrise pas le contenu et ne saurait être tenu responsable.
        </p>
      </Section>

      <Section title="Droit applicable">
        <p>
          Le présent site et ses mentions légales sont régis par le droit luxembourgeois. Tout litige relatif à leur
          utilisation relève de la compétence des tribunaux du Grand-Duché de Luxembourg.
        </p>
      </Section>
    </>
  );
}

function Confidentialite() {
  return (
    <>
      <Section title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur www.cafein.lu est <Fill>raison sociale</Fill>,{" "}
          <Fill>adresse</Fill>. Pour toute question relative à vos données, écrivez à{" "}
          <a href="mailto:hello@cafein.lu" className="text-mint-dark font-semibold hover:underline">hello@cafein.lu</a>.
        </p>
      </Section>

      <Section title="Données collectées et finalités">
        <p>Nous ne collectons que les données strictement nécessaires, et uniquement lorsque vous nous les transmettez :</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Formulaire de contact</strong> : nom, adresse e-mail et message — pour répondre à votre demande.
            Base légale : votre consentement et notre intérêt légitime à traiter les demandes.
          </li>
          <li>
            <strong>Audit instantané</strong> : l'adresse de votre site, votre e-mail et les scores de performance
            mesurés — pour vous transmettre un audit détaillé et vous recontacter. Base légale : votre consentement.
          </li>
          <li>
            <strong>Commentaires</strong> : le nom affiché et le texte du commentaire — pour publication sur le site.
            Base légale : votre consentement.
          </li>
          <li>
            <strong>Données techniques</strong> : adresse IP et horodatage, conservés temporairement pour la sécurité
            et la prévention des abus (anti-spam). Base légale : intérêt légitime.
          </li>
        </ul>
      </Section>

      <Section title="Destinataires et sous-traitants">
        <p>Vos données peuvent être traitées par des prestataires techniques agissant pour notre compte :</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Brevo</strong> (Sendinblue SAS, France) — envoi et gestion des e-mails.</li>
          <li><strong>Google</strong> (Google Ireland / LLC) — messagerie professionnelle (Google Workspace).</li>
          <li><strong>Railway</strong> (Railway Corporation, États-Unis) — hébergement du site et stockage.</li>
          <li><strong>Google PageSpeed Insights</strong> — mesure de performance lors de l'audit (l'URL analysée est transmise à Google).</li>
        </ul>
        <p>
          Certains prestataires étant situés hors de l'Union européenne (États-Unis), les transferts sont encadrés par
          des garanties appropriées (clauses contractuelles types de la Commission européenne).
        </p>
      </Section>

      <Section title="Durée de conservation">
        <p>
          Les messages et demandes sont conservés pendant <Fill>durée (ex. 3 ans à compter du dernier contact)</Fill>,
          puis supprimés. Les commentaires publiés sont conservés tant qu'ils restent en ligne.
        </p>
      </Section>

      <Section title="Vos droits">
        <p>
          Conformément au Règlement général sur la protection des données (RGPD), vous disposez d'un droit d'accès,
          de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Vous pouvez
          les exercer à tout moment en écrivant à{" "}
          <a href="mailto:hello@cafein.lu" className="text-mint-dark font-semibold hover:underline">hello@cafein.lu</a>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la Commission nationale pour la protection des
          données (CNPD), autorité de contrôle au Luxembourg — cnpd.public.lu.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Le site n'utilise pas de cookies publicitaires ni de traceurs tiers. Pour plus de détails, consultez notre{" "}
          <Link to="/politique-cookies" className="text-mint-dark font-semibold hover:underline">politique de cookies</Link>.
        </p>
      </Section>
    </>
  );
}

function Cookies() {
  return (
    <>
      <Section title="En résumé">
        <p>
          Bonne nouvelle : www.cafein.lu ne vous piste pas. Le site n'utilise <strong>aucun cookie publicitaire,
          aucun traceur tiers, ni aucun outil de mesure d'audience</strong> (pas de Google Analytics, pas de pixel).
        </p>
      </Section>

      <Section title="Ce que nous utilisons">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Stockage strictement nécessaire</strong> : un espace de stockage local (sessionStorage) est utilisé
            uniquement dans l'espace réservé à l'équipe pour maintenir la session de connexion. Il n'est pas utilisé
            pour vous suivre et disparaît à la fermeture de l'onglet.
          </li>
          <li>
            <strong>Aucun cookie de suivi</strong> n'est déposé lors de la navigation classique sur le site.
          </li>
        </ul>
      </Section>

      <Section title="Services tiers">
        <p>
          Lorsque vous utilisez l'audit instantané, l'adresse de votre site est transmise à l'API Google PageSpeed
          Insights pour en mesurer la performance. Cette opération n'installe pas de cookie sur votre navigateur.
        </p>
      </Section>

      <Section title="Gérer les cookies">
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer le stockage local. Si nous
          venions à ajouter un outil de mesure d'audience à l'avenir, un bandeau de consentement serait mis en place
          au préalable, conformément à la réglementation.
        </p>
      </Section>
    </>
  );
}

const DOCS = {
  mentions: {
    tag: "Mentions légales",
    title: "Mentions légales",
    seoTitle: "Mentions légales | Cafein",
    path: "/mentions-legales",
    Body: MentionsLegales,
  },
  confidentialite: {
    tag: "Confidentialité",
    title: "Politique de confidentialité",
    seoTitle: "Politique de confidentialité | Cafein",
    path: "/confidentialite",
    Body: Confidentialite,
  },
  cookies: {
    tag: "Cookies",
    title: "Politique de cookies",
    seoTitle: "Politique de cookies | Cafein",
    path: "/politique-cookies",
    Body: Cookies,
  },
};

export default function Legal({ kind }) {
  const doc = DOCS[kind] || DOCS.mentions;
  const Body = doc.Body;
  return (
    <section className="relative bg-cream pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <Seo title={doc.seoTitle} description={`${doc.title} du site Cafein, agence web au Luxembourg.`} path={doc.path} />
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <SectionLabel>( {doc.tag} )</SectionLabel>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 130, damping: 16 }}
          className="mt-4 font-display font-extrabold text-4xl md:text-6xl text-ink tracking-tight leading-[0.95]"
        >
          {doc.title}
        </motion.h1>
        <p className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-ink/40">
          Dernière mise à jour : {UPDATED}
        </p>

        <Body />

        <div className="mt-16 flex flex-wrap gap-3">
          {Object.entries(DOCS)
            .filter(([k]) => k !== kind)
            .map(([k, d]) => (
              <Link
                key={k}
                to={d.path}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border-2 border-ink px-4 py-2 font-display font-bold text-sm text-ink shadow-[2px_2px_0_#0A0F0D] hover:shadow-[4px_4px_0_#1FCE8A] transition-shadow"
              >
                {d.title}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
