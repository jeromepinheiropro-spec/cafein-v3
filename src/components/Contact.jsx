import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel, Magnetic, LeafMark, ArrowUpRight } from "../lib/ui.jsx";
import { useEggSpeed } from "./EasterEggs.jsx";
import { useLang, useT } from "../lib/lang.jsx";

/* Confettis maison : petites particules qui explosent au succès */
function Confetti() {
  const parts = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 480,
    y: -(120 + Math.random() * 320),
    r: Math.random() * 540 - 270,
    s: 0.6 + Math.random() * 1.1,
    c: ["#1FCE8A", "#F4A259", "#FFD166", "#F5EFE2"][i % 4],
    shape: i % 3,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {parts.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 40, opacity: 1, rotate: 0, scale: p.s }}
          animate={{ x: p.x, y: p.y, opacity: [1, 1, 0], rotate: p.r }}
          transition={{ duration: 1.4 + Math.random() * 0.6, ease: [0.15, 0.6, 0.4, 1] }}
          className="absolute"
          style={{
            width: p.shape === 0 ? 12 : 9,
            height: p.shape === 1 ? 12 : 9,
            backgroundColor: p.c,
            borderRadius: p.shape === 2 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

function Field({ label, id, type = "text", as = "input", value, onChange, required }) {
  const Comp = as;
  const t = useT();
  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="block font-mono text-[11px] font-bold tracking-[0.3em] uppercase text-cream/60 mb-2 group-focus-within:text-mint transition-colors"
      >
        {label} {required && <span className="text-mint">*</span>}
      </label>
      <Comp
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={as === "textarea" ? 4 : undefined}
        className="w-full bg-transparent border-b-[3px] border-cream/25 focus:border-mint outline-none py-3 text-lg md:text-xl font-medium text-cream placeholder-cream/25 transition-colors resize-none"
        placeholder={as === "textarea" ? t("Racontez-nous tout…", "Tell us everything…") : ""}
      />
    </div>
  );
}

export default function Contact() {
  const eggSpeed = useEggSpeed();
  const { lang } = useLang();
  const t = useT();
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (status === "sending" || status === "done") return;
    setStatus("sending");
    setErrMsg("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "");
      setStatus("done");
    } catch (e2) {
      setStatus("error");
      setErrMsg(
        e2.message ||
          t(
            "Envoi impossible pour le moment. Réessayez ou écrivez-nous à hello@cafein.lu.",
            "Couldn't send right now. Please retry or email us at hello@cafein.lu."
          )
      );
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="relative bg-espresso py-24 md:py-36 overflow-hidden">
      {/* halo + feuille déco */}
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-mint/8 blur-3xl pointer-events-none" />
      <motion.div
        aria-hidden
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: (7) / eggSpeed }}
        className="absolute top-24 right-[10%] hidden lg:block opacity-60"
      >
        <LeafMark className="h-16 w-auto" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel dark>{t("( Contact )", "( Get in touch )")}</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="font-display font-extrabold text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] text-cream mt-4"
          >
            {lang === "en" ? (
              <>
                Got a<br />
                <span className="text-mint">project?</span>
              </>
            ) : (
              <>
                Un<br />
                <span className="text-mint">projet&nbsp;?</span>
              </>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-cream/70 font-medium max-w-md leading-relaxed"
          >
            {t(
              "Une question, un projet ? Écrivez-nous, on vous répond rapidement, le temps de faire couler un café.",
              "A question, a project? Drop us a line, we'll get back to you fast, in the time it takes to brew a coffee."
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 font-mono text-xs tracking-[0.2em] uppercase text-cream/50"
          >
            <span className="rounded-full border border-cream/20 px-4 py-2">Luxembourg</span>
            <a
              href="mailto:hello@cafein.lu"
              data-cursor="hello@cafein.lu"
              className="rounded-full border border-cream/20 px-4 py-2 hover:border-mint hover:text-mint transition-colors"
            >
              hello@cafein.lu
            </a>
            <a
              href="tel:+33616254467"
              data-cursor="+33 6 16 25 44 67"
              className="rounded-full border border-cream/20 px-4 py-2 hover:border-mint hover:text-mint transition-colors"
            >
              +33 6 16 25 44 67
            </a>
            <span className="rounded-full border border-cream/20 px-4 py-2">{t("Réponse rapide", "Quick reply")}</span>
          </motion.div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="relative rounded-[2rem] bg-mint border-[3px] border-ink p-10 md:p-14 text-center shadow-[10px_10px_0_rgba(245,239,226,0.15)]"
              >
                <Confetti />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 14 }}
                  className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-ink mb-6"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#1FCE8A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l5 5L20 7" />
                  </svg>
                </motion.div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-ink">
                  {t("C'est envoyé !", "Message sent!")}
                </h3>
                <p className="mt-3 text-ink/80 font-medium text-lg">
                  {t("Merci", "Thanks")} {form.nom.split(" ")[0] || ""}
                  {t(", on revient vers vous très vite.", ", we'll get back to you very soon.")}
                  <br />
                  {t("(Le temps d'un espresso, promis.)", "(Just the time for an espresso, promise.)")}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 rounded-[2rem] border-2 border-cream/15 p-8 md:p-12 bg-espresso-2/60 backdrop-blur"
              >
                <Field label={t("Nom", "Name")} id="nom" value={form.nom} onChange={set("nom")} required />
                <Field label="Email" id="email" type="email" value={form.email} onChange={set("email")} required />
                <Field label="Message" id="message" as="textarea" value={form.message} onChange={set("message")} required />
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-hiss
                    data-cursor={t("Envoyer !", "Send it!")}
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 rounded-full bg-mint text-ink font-display font-bold text-lg px-8 py-4 border-[3px] border-ink shadow-[5px_5px_0_#F5EFE2] hover:shadow-[0_0_0_#F5EFE2] hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-200 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: (0.8) / eggSpeed, ease: "linear" }}
                          className="w-5 h-5 rounded-full border-[3px] border-ink border-t-transparent"
                        />
                        {t("Envoi…", "Sending…")}
                      </>
                    ) : (
                      <>
                        {t("Envoyer", "Send")}
                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </Magnetic>
                {status === "error" && (
                  <p className="text-caramel font-medium text-sm">
                    {errMsg}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
