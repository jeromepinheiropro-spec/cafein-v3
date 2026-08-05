import React from "react";
import { motion } from "framer-motion";
import Seo from "../lib/seo.jsx";
import { Link } from "../lib/link.jsx";
import { SectionLabel } from "../lib/ui.jsx";

/*
  Pages légales : mentions légales, politique de confidentialité (RGPD),
  politique cookies, CGV. Contenu en français (langue de référence au Luxembourg).
  Éditeur : Cafein communication S.à r.l. (RCS Luxembourg B285.136).
*/

const UPDATED = "juillet 2026";

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
          Le site <strong>www.cafein.lu</strong> est édité par <strong>Cafein communication S.à r.l.</strong>,
          société à responsabilité limitée de droit luxembourgeois, dont le siège social est situé{" "}
          2, rue de l'École, L-4394 Pontpierre (commune de Mondercange), Grand-Duché de Luxembourg.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Registre de commerce et des sociétés (RCS) Luxembourg : <strong>B285.136</strong></li>
          <li>Adresse e-mail : hello@cafein.lu</li>
          <li>Téléphone : +33 6 38 95 25 22</li>
        </ul>
        <p>
          Gérant et directeur de la publication : <strong>Jérôme Pinheiro</strong>.
        </p>
      </Section>

      <Section title="Hébergement">
        <p>
          Le site est hébergé par <strong>Railway Corporation</strong>, 2261 Market Street #4059, San Francisco,
          CA 94114, États-Unis, railway.app. Les données sont servies via l'infrastructure de Railway
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
          Le responsable du traitement des données collectées sur www.cafein.lu est{" "}
          <strong>Cafein communication S.à r.l.</strong>, 2, rue de l'École, L-4394 Pontpierre, Grand-Duché de
          Luxembourg. Pour toute question relative à vos données, écrivez à{" "}
          <a href="mailto:hello@cafein.lu" className="text-mint-dark font-semibold hover:underline">hello@cafein.lu</a>.
        </p>
      </Section>

      <Section title="Données collectées et finalités">
        <p>Nous ne collectons que les données strictement nécessaires, et uniquement lorsque vous nous les transmettez :</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Formulaire de contact</strong> : nom, adresse e-mail et message, pour répondre à votre demande.
            Base légale : votre consentement et notre intérêt légitime à traiter les demandes.
          </li>
          <li>
            <strong>Audit instantané</strong> : l'adresse de votre site, votre e-mail et les scores de performance
            mesurés, pour vous transmettre un audit détaillé et vous recontacter. Base légale : votre consentement.
          </li>
          <li>
            <strong>Commentaires</strong> : le nom affiché et le texte du commentaire, pour publication sur le site.
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
          <li><strong>Brevo</strong> (Sendinblue SAS, France), envoi et gestion des e-mails.</li>
          <li><strong>Google</strong> (Google Ireland / LLC), messagerie professionnelle (Google Workspace).</li>
          <li><strong>Railway</strong> (Railway Corporation, États-Unis), hébergement du site et stockage.</li>
          <li><strong>Google PageSpeed Insights</strong>, mesure de performance lors de l'audit (l'URL analysée est transmise à Google).</li>
        </ul>
        <p>
          Certains prestataires étant situés hors de l'Union européenne (États-Unis), les transferts sont encadrés par
          des garanties appropriées (clauses contractuelles types de la Commission européenne).
        </p>
      </Section>

      <Section title="Durée de conservation">
        <p>
          Les messages et demandes sont conservés pendant trois (3) ans à compter du dernier contact,
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
          données (CNPD), autorité de contrôle au Luxembourg, cnpd.public.lu.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Le site utilise Google Analytics pour la mesure d'audience, uniquement avec votre consentement, et aucun cookie
          publicitaire. Pour tout le détail, consultez notre{" "}
          <Link to="/politique-cookies" className="text-mint-dark font-semibold hover:underline">politique de cookies</Link>.
        </p>
      </Section>
    </>
  );
}

function Cookies() {
  const reopen = () => window.dispatchEvent(new Event("cafein-open-consent"));
  return (
    <>
      <Section title="En résumé">
        <p>
          www.cafein.lu utilise un seul outil de mesure d'audience, <strong>Google Analytics</strong>, et uniquement
          <strong> si vous y consentez</strong> via le bandeau affiché à votre première visite. Aucun cookie publicitaire
          ni aucun autre traceur tiers n'est utilisé.
        </p>
      </Section>

      <Section title="Cookies de mesure d'audience (soumis à consentement)">
        <p>
          Avec votre accord, nous utilisons <strong>Google Analytics 4</strong> pour comprendre comment le site est
          utilisé (pages visitées, provenance, appareil) et l'améliorer. Ces cookies ne sont déposés qu'après votre
          consentement, et l'adresse IP est anonymisée. Sans consentement, aucun de ces cookies n'est déposé et Google
          Analytics n'est pas chargé.
        </p>
        <p>
          Vous pouvez modifier votre choix à tout moment :{" "}
          <button onClick={reopen} className="text-mint-dark font-semibold hover:underline">rouvrir les préférences de cookies</button>.
        </p>
      </Section>

      <Section title="Cookies strictement nécessaires">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Un <strong>stockage local</strong> mémorise votre choix concernant les cookies, pour ne pas vous redemander à
            chaque visite.
          </li>
          <li>
            Dans l'espace réservé à l'équipe, un stockage de session maintient la connexion. Il n'est pas utilisé pour
            vous suivre et disparaît à la fermeture de l'onglet.
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
          Vous pouvez à tout moment refuser ou retirer votre consentement via le lien ci-dessus, ou configurer votre
          navigateur pour bloquer et supprimer les cookies.
        </p>
      </Section>
    </>
  );
}

function CGV() {
  return (
    <>
      <Section title="1. Objet et champ d'application">
        <p>
          Les présentes conditions générales de vente (« CGV ») régissent les prestations de services fournies
          par <strong>Cafein communication S.à r.l.</strong> (ci-après « Cafein » ou « le Prestataire »), société à
          responsabilité limitée dont le siège social est situé 2, rue de l'École, L-4394 Pontpierre, immatriculée
          au RCS Luxembourg sous le numéro B285.136, à toute personne physique ou morale qui recourt à ses services
          (ci-après « le Client »). Toute commande implique l'acceptation sans réserve des présentes CGV, qui
          prévalent sur tout autre document du Client, sauf dérogation écrite et expresse.
        </p>
      </Section>

      <Section title="2. Prestations">
        <p>
          Cafein propose des prestations de communication et de marketing digital : création de sites internet et
          d'e-commerce, référencement (SEO, GEO), campagnes publicitaires (SEA, réseaux sociaux), gestion des réseaux
          sociaux, création de contenus, branding et identité visuelle, conseil et formation. Le détail, le périmètre
          et le prix de chaque prestation sont définis dans le devis accepté par le Client.
        </p>
      </Section>

      <Section title="3. Devis et commande">
        <p>
          Chaque prestation fait l'objet d'un devis personnalisé, valable trente (30) jours sauf mention contraire.
          La commande est ferme dès la réception par Cafein du devis daté, accepté et signé par le Client (par voie
          électronique ou manuscrite) et, le cas échéant, du versement de l'acompte prévu. Toute modification du
          périmètre en cours de projet peut donner lieu à un avenant et à un ajustement du prix et des délais.
        </p>
      </Section>

      <Section title="4. Prix">
        <p>
          Les prix sont exprimés en euros (€). Sauf mention contraire, ils s'entendent hors taxes (HT) ; la TVA
          applicable et les éventuels frais tiers (noms de domaine, hébergement, licences, budgets publicitaires,
          banques d'images, etc.) sont facturés en sus. Les budgets média (Google Ads, réseaux sociaux…) sont
          distincts des honoraires de gestion et refacturés ou réglés directement par le Client.
        </p>
      </Section>

      <Section title="5. Modalités de paiement">
        <p>
          Sauf convention particulière, un acompte de 30 % à 50 % est exigible à la commande, le solde étant dû à la
          livraison ou selon l'échéancier prévu au devis. Les factures sont payables à trente (30) jours date de
          facture. Tout retard de paiement entraîne de plein droit, après mise en demeure restée sans effet, des
          intérêts de retard au taux légal luxembourgeois ainsi qu'une indemnité forfaitaire pour frais de
          recouvrement, sans préjudice de la suspension des prestations en cours.
        </p>
      </Section>

      <Section title="6. Délais et obligations du Client">
        <p>
          Les délais indiqués sont donnés à titre indicatif et dépendent de la collaboration du Client. Le Client
          s'engage à fournir en temps utile l'ensemble des éléments nécessaires (contenus, accès, validations,
          informations) et à désigner un interlocuteur. Un retard, une absence de réponse ou une validation tardive
          du Client suspend d'autant les délais et ne saurait engager la responsabilité de Cafein.
        </p>
      </Section>

      <Section title="7. Propriété intellectuelle">
        <p>
          Les créations réalisées par Cafein restent sa propriété jusqu'au paiement intégral du prix. Après paiement
          complet, les droits d'exploitation sur les livrables finaux sont cédés au Client pour l'usage convenu.
          Cafein conserve la propriété de ses savoir-faire, méthodes, outils et éléments préexistants, ainsi que le
          droit de mentionner la réalisation à titre de référence, sauf demande écrite contraire du Client. Les
          éléments fournis par le Client restent sa propriété et sous sa responsabilité (droits, autorisations).
        </p>
      </Section>

      <Section title="8. Hébergement, maintenance et services tiers">
        <p>
          Lorsque la prestation inclut l'hébergement ou la maintenance d'un site, les conditions (durée, périmètre,
          disponibilité) sont précisées au devis. Cafein s'appuie sur des prestataires tiers (hébergeurs, régies
          publicitaires, outils SaaS) dont les propres conditions s'appliquent ; Cafein ne saurait être tenue
          responsable d'une interruption ou d'une défaillance imputable à ces tiers.
        </p>
      </Section>

      <Section title="9. Responsabilité">
        <p>
          Cafein est tenue à une obligation de moyens. Elle met en œuvre son savoir-faire pour atteindre les objectifs
          du Client mais ne garantit pas un résultat commercial déterminé (positions, trafic, chiffre d'affaires),
          ces résultats dépendant de nombreux facteurs externes. La responsabilité de Cafein, toutes causes
          confondues, est limitée au montant des sommes effectivement payées par le Client pour la prestation
          concernée. Cafein ne répond pas des dommages indirects (perte de chiffre d'affaires, de données, d'image…).
        </p>
      </Section>

      <Section title="10. Données personnelles">
        <p>
          Les données personnelles sont traitées conformément au RGPD et à notre{" "}
          <Link to="/confidentialite" className="text-mint-dark font-semibold hover:underline">politique de confidentialité</Link>.
          Lorsque Cafein traite des données pour le compte du Client, un accord de sous-traitance encadre ce
          traitement.
        </p>
      </Section>

      <Section title="11. Résiliation">
        <p>
          En cas de manquement grave de l'une des parties non réparé dans un délai de quinze (15) jours après mise en
          demeure, l'autre partie peut résilier le contrat de plein droit. Les prestations réalisées et les frais
          engagés jusqu'à la résiliation restent dus. Les acomptes versés restent acquis à Cafein à hauteur du
          travail effectué.
        </p>
      </Section>

      <Section title="12. Force majeure">
        <p>
          Aucune des parties ne saurait être tenue responsable d'un manquement résultant d'un cas de force majeure au
          sens du droit luxembourgeois. Les obligations affectées sont suspendues pendant la durée de l'événement.
        </p>
      </Section>

      <Section title="13. Droit applicable et juridiction">
        <p>
          Les présentes CGV sont régies par le droit luxembourgeois. À défaut de résolution amiable, tout litige
          relatif à leur validité, leur interprétation ou leur exécution relève de la compétence exclusive des
          tribunaux de l'arrondissement du siège social de Cafein, au Grand-Duché de Luxembourg.
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
  cgv: {
    tag: "CGV",
    title: "Conditions générales de vente",
    seoTitle: "Conditions générales de vente | Cafein",
    path: "/cgv",
    Body: CGV,
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
      <Seo title={doc.seoTitle} description={`${doc.title} du site Cafein, agence web au Luxembourg.`} path={doc.path} noindex />
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
