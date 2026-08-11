"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, ArrowRight, Check, Star, Sparkles, Activity, Layout, FileCode, Terminal, GitBranch, Settings, Users, Clock, Shield, Zap, BarChart2, MessageSquare, Globe, Layers, Code2, Brain, Rocket, Target, TrendingUp } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    description:
      "We help you identify where AI creates the most value in your business and build a clear roadmap to get there — fast.",
    color: "from-violet-500/20 to-purple-500/10",
    accent: "text-violet-400",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description:
      "From LLM integrations to computer vision pipelines, we design and ship production-grade AI systems tailored to your product.",
    color: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
  },
  {
    icon: Layers,
    title: "Full-Stack Product Engineering",
    description:
      "End-to-end software development — web, mobile, APIs, and cloud infrastructure — built to scale from day one.",
    color: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
  },
  {
    icon: Activity,
    title: "MLOps & Model Deployment",
    description:
      "We operationalise your models with robust CI/CD, monitoring, and retraining pipelines so they stay accurate in production.",
    color: "from-orange-500/20 to-amber-500/10",
    accent: "text-orange-400",
  },
  {
    icon: Globe,
    title: "Data Engineering",
    description:
      "Clean, reliable data is the foundation of every AI system. We build pipelines, warehouses, and real-time streams that you can trust.",
    color: "from-pink-500/20 to-rose-500/10",
    accent: "text-pink-400",
  },
  {
    icon: Shield,
    title: "AI Governance & Safety",
    description:
      "Responsible AI by design — bias audits, explainability frameworks, and compliance tooling to keep your systems trustworthy.",
    color: "from-indigo-500/20 to-blue-500/10",
    accent: "text-indigo-400",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We spend time understanding your business, your data, and the outcomes you need. No jargon, no sales pitch — just honest scoping.",
  },
  {
    step: "02",
    title: "Solution Design",
    description:
      "Our engineers and AI specialists co-design a solution architecture that fits your timeline, budget, and technical constraints.",
  },
  {
    step: "03",
    title: "Agile Build",
    description:
      "We ship in two-week sprints with weekly demos so you always know what's happening and can steer the product in real time.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "We deploy to production, hand over documentation, and stay on as your long-term engineering partner as you grow.",
  },
];

const CASE_STUDIES = [
  {
    tag: "FinTech",
    title: "Automated underwriting cut decision time by 94%",
    description:
      "A UK lender was manually reviewing thousands of loan applications per week. We built an AI underwriting engine that processes applications in seconds with explainable decisions regulators can audit.",
    metrics: [
      { label: "Faster decisions", value: "94%" },
      { label: "Reduction in manual review", value: "80%" },
      { label: "Accuracy vs human baseline", value: "99.2%" },
    ],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/46e51cff37bf4e6e8bbc8b3979b50cd1.webp",
  },
  {
    tag: "HealthTech",
    title: "Clinical NLP surfaces insights buried in patient notes",
    description:
      "A digital health platform needed to extract structured data from millions of unstructured clinical notes. Our NLP pipeline now runs in real time, feeding downstream analytics and care-coordination tools.",
    metrics: [
      { label: "Notes processed daily", value: "50k+" },
      { label: "Entity extraction F1", value: "96.4%" },
      { label: "Time to insight", value: "< 2s" },
    ],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/78308178b57b4e8bbd7d5cf8099f4477.png",
  },
  {
    tag: "Retail",
    title: "Demand forecasting reduced overstock by 31%",
    description:
      "A multi-channel retailer was losing margin to overstock and stockouts. We replaced their spreadsheet-based forecasting with a gradient-boosted model trained on three years of sales, weather, and event data.",
    metrics: [
      { label: "Overstock reduction", value: "31%" },
      { label: "Stockout reduction", value: "22%" },
      { label: "Forecast MAPE", value: "4.1%" },
    ],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a77313346c54409a9d007d3da4cc831d.png",
  },
];

const TEAM = [
  {
    name: "Hamza Iqbal",
    role: "CEO & Co-founder",
    bio: "Former ML engineer at a FTSE 100 bank. Obsessed with making AI practical for real businesses.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza%20Iqbal",
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-founder",
    bio: "PhD in Computer Science from Imperial College. Built distributed systems at scale for a decade.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20Chen",
  },
  {
    name: "James Okafor",
    role: "Head of AI Research",
    bio: "Published researcher in NLP and computer vision. Translates cutting-edge papers into shipped products.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20Okafor",
  },
  {
    name: "Priya Sharma",
    role: "Head of Engineering",
    bio: "Led platform engineering at two successful SaaS startups. Believes great infrastructure is invisible.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Sharma",
  },
];

const FAQS = [
  {
    q: "What size companies do you work with?",
    a: "We work with everyone from seed-stage startups to enterprise teams inside FTSE 500 companies. Our engagement model scales to fit — from a focused four-week sprint to a multi-year embedded partnership.",
  },
  {
    q: "Do you work with our existing tech stack?",
    a: "Yes. We integrate with whatever you already have — AWS, GCP, Azure, on-premise, or hybrid. We don't lock you into proprietary tooling.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused MVP typically takes six to twelve weeks. More complex systems with data engineering, model training, and production deployment usually run three to six months. We'll give you a realistic estimate after the discovery call.",
  },
  {
    q: "Who owns the IP?",
    a: "You do. All code, models, and documentation we produce are assigned to you on delivery. We retain no rights to your data or outputs.",
  },
  {
    q: "Can you help us if we don't have much data yet?",
    a: "Absolutely. We often help clients build data collection strategies, use transfer learning from pre-trained models, or apply synthetic data techniques to get started before large datasets exist.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Most clients retain us on a monthly basis for model monitoring, retraining, feature development, and infrastructure management. We become your long-term AI engineering team.",
  },
];

const STATS = [
  { value: "120+", label: "Projects delivered" },
  { value: "98%", label: "Client retention rate" },
  { value: "40+", label: "AI models in production" },
  { value: "4.9★", label: "Average client rating" },
];

const LOGOS = [
  "Barclays",
  "NHS Digital",
  "Unilever",
  "Rightmove",
  "Monzo",
  "Deliveroo",
];

// ─── Hero section ────────────────────────────────────────────────────────────

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-[var(--background)] pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Mesh glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[var(--brand-accent)]/10 blur-[120px]" />
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/8 blur-[100px]" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[90px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div variants={heroContainer} initial="hidden" animate="visible">
              <motion.div variants={heroItem}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-6">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1 variants={heroItem} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.08] text-balance mb-6">
                {t("hero.headline1")}{" "}
                <span className="text-[var(--brand-accent)]">
                  {t("hero.headline2")}
                </span>{" "}
                {t("hero.headline3")}
              </motion.h1>

              <motion.p variants={heroItem} className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl mb-10 text-pretty">
                {t("hero.subheadline")}
              </motion.p>

              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <Link href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:opacity-90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]">
                  {t("hero.cta_primary")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="#case-studies" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--brand-accent)]/50 hover:bg-[var(--brand-accent)]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]">
                  {t("hero.cta_secondary")}
                </Link>
              </motion.div>

              {/* Trust signals */}
              <motion.div variants={heroItem} className="mt-12 flex flex-wrap items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (<img key={i} src={`/images/avatar-client-${i}.jpg`} alt={`Client ${i}`} className="h-9 w-9 rounded-full border-2 border-[var(--background)] object-cover" />))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {t("hero.trust_label")}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: visual */}
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }} className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_24px_80px_-16px_rgba(0,0,0,0.5)]">
                <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f1b306d53a7e4faba8cde6cb89163248.jpg" alt="Datics AI platform dashboard" className="w-full h-auto object-cover" />
                {/* Floating stat card */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-6 left-6 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">{t("hero.stat_label")}</p>
                      <p className="text-lg font-bold text-[var(--foreground)]">{t("hero.stat_value")}</p>
                    </div>
                  </div>
                </motion.div>
                {/* Floating badge */}
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-6 right-6 rounded-xl border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/15 backdrop-blur-md px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                    <span className="text-xs font-semibold text-[var(--brand-accent)]">{t("hero.badge_float")}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── Logos ── */}
      <section className="border-y border-[var(--border)] bg-[var(--card)]/40 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest text-[var(--muted-foreground)] uppercase mb-8">
            {t("logos.label")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {LOGOS.map((logo) => (<span key={logo} className="text-base font-bold text-[var(--muted-foreground)]/50 tracking-tight select-none">
              {logo}
            </span>))}
          </div>
        </div>
      </section>
      {/* ── Stats ── */}
      <Reveal>
        <section className="py-20 md:py-24 bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight mb-2">{i === 0 ? "200+" : stat.value}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* ── Services ── */}
      <Reveal>
        <section id="services" className="py-24 md:py-32 bg-[var(--card)]/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                {t("services.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
                {t("services.heading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("services.subheading")}
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={scaleIn} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--brand-accent)]/40 hover:shadow-[0_8px_40px_-8px_rgba(99,102,241,0.2)] transition-all duration-300">
                    <div
                      className={cn(
                        "mb-5 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                        svc.color
                      )}>
                      <Icon className={cn("h-6 w-6", svc.accent)} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {svc.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* ── How It Works ── */}
      <Reveal>
        <section id="how-it-works" className="py-24 md:py-32 bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                {t("how.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
                {t("how.heading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("how.subheading")}
              </p>
            </div>

            <div className="relative">
              {/* Connector line */}
              <div aria-hidden="true" className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent hidden lg:block" />
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                {HOW_IT_WORKS.map((step, i) => (
                  <motion.div key={step.step} variants={fadeInUp} className="relative flex flex-col items-start">
                    <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 shadow-[0_0_24px_rgba(99,102,241,0.15)]">
                      <span className="text-2xl font-bold text-[var(--brand-accent)]">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── Case Studies ── */}
      <Reveal>
        <section id="case-studies" className="py-24 md:py-32 bg-[var(--card)]/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                {t("cases.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
                {t("cases.heading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("cases.subheading")}
              </p>
            </div>

            <div className="space-y-10">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.title} delay={i * 0.08}>
                  <div
                    className={cn(
                      "grid lg:grid-cols-2 gap-0 rounded-2xl border border-[var(--border)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]",
                      i % 2 === 1 && "lg:[&>*:first-child]:order-2"
                    )}>
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto min-h-[280px] bg-[var(--card)]">
                      <img src={cs.image} alt={cs.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-5 left-5 rounded-full border border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/20 px-3 py-1 text-xs font-semibold text-[var(--brand-accent)]">
                        {cs.tag}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="bg-[var(--card)] p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-4 text-balance">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                        {cs.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        {cs.metrics.map((m) => (<div key={m.label}>
                          <p className="text-2xl font-bold text-[var(--brand-accent)] mb-1">
                            {m.value}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)] leading-snug">
                            {m.label}
                          </p>
                        </div>))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── Team ── */}
      <Reveal>
        <section id="team" className="py-24 md:py-32 bg-[var(--background)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                {t("team.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
                {t("team.heading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("team.subheading")}
              </p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (<motion.div key={member.name} variants={scaleIn} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--brand-accent)]/40 transition-all duration-300">
                <div className="relative h-56 bg-[var(--card)]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[var(--foreground)] mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-[var(--brand-accent)] mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>))}
            </motion.div>
          </div>
        </section>
      </Reveal>
      {/* ── Why Datics ── */}
      <Reveal>
        <section className="py-24 md:py-32 bg-[var(--brand-accent)]/5 border-y border-[var(--brand-accent)]/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                  {t("why.eyebrow")}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-6 text-balance">
                  {t("why.heading")}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-10 text-pretty">
                  {t("why.body")}
                </p>
                <Link href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]">
                  {t("why.cta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Rocket,
                    title: t("why.point1_title"),
                    body: t("why.point1_body"),
                  },
                  {
                    icon: Target,
                    title: t("why.point2_title"),
                    body: t("why.point2_body"),
                  },
                  {
                    icon: Users,
                    title: t("why.point3_title"),
                    body: t("why.point3_body"),
                  },
                  {
                    icon: Clock,
                    title: t("why.point4_title"),
                    body: t("why.point4_body"),
                  },
                ].map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.title} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-[var(--brand-accent)]/15 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[var(--brand-accent)]" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                          {pt.title}
                        </h3>
                        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                          {pt.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── FAQ ── */}
      <Reveal>
        <section id="faq" className="py-24 md:py-32 bg-[var(--background)]">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-4">
                {t("faq.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
                {t("faq.heading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed text-pretty">
                {t("faq.subheading")}
              </p>
            </div>

            <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] overflow-hidden">
              {FAQS.map((item, i) => (
                <div key={item.q}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[var(--card)]/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-accent)]" aria-expanded={openFaq === i}>
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 flex-shrink-0 text-[var(--muted-foreground)] transition-transform duration-300",
                        openFaq === i && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={
                      openFaq === i
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── CTA ── */}
      <Reveal>
        <section id="cta" className="py-24 md:py-32 bg-[var(--card)]/30">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <div className="relative rounded-3xl border border-[var(--brand-accent)]/20 bg-gradient-to-br from-[var(--brand-accent)]/10 via-[var(--card)] to-[var(--card)] p-12 md:p-20 overflow-hidden shadow-[0_24px_80px_-16px_rgba(99,102,241,0.2)]">
              {/* Glow */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[var(--brand-accent)]/15 blur-[80px]" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-6">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cta.badge")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6 text-balance">
                  {t("cta.heading")}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto mb-10 text-pretty">
                  {t("cta.body")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="mailto:hello@datics.ai" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-8 py-4 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_0_32px_rgba(99,102,241,0.4)] hover:opacity-90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]">
                    {t("cta.primary")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="https://calendly.com/datics" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 py-4 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--brand-accent)]/50 hover:bg-[var(--brand-accent)]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]">
                    {t("cta.secondary")}
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-[var(--muted-foreground)]">
                  {[t("cta.trust1"), t("cta.trust2"), t("cta.trust3")].map((item) => (<span key={item} className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    {item}
                  </span>))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}