"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase as Linkedin, MessageCircle as Twitter, Code2 as Github, Mail, ArrowRight } from 'lucide-react';
import { useState } from "react";
import { brandConstants } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const serviceLinks = [
    { label: "Custom Software Development", href: "#services" },
    { label: "LLM Integration & Fine-Tuning", href: "#services" },
    { label: "MLOps & AI Infrastructure", href: "#services" },
    { label: "UI/UX Design Systems", href: "#services" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#team" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Team", href: "#team" },
    { label: "Careers (We're Hiring!)", href: "#cta" },
  ];

  const resourceLinks = [
    { label: "Blog", href: "#" },
    { label: "AI Readiness Checklist", href: "#" },
    { label: "Open Source", href: brandConstants.github },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--primary)] opacity-5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-90" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] blur-md opacity-50" />
                <span className="relative z-10 flex items-center justify-center w-full h-full text-white font-black text-sm">
                  D
                </span>
              </div>
              <span className="font-bold text-lg text-[var(--foreground)] tracking-tight">
                Datics <span className="text-[var(--primary)]">AI</span>
              </span>
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mb-8">
              <a
                href={brandConstants.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={brandConstants.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={brandConstants.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border)] transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${brandConstants.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-2">
                {t("footer.newsletterLabel")}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mb-3 leading-relaxed">
                {t("footer.newsletterDesc")}
              </p>
              {submitted ? (
                <p className="text-sm text-[var(--accent)] font-medium">
                  {t("footer.newsletterSuccess")}
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletterPlaceholder")}
                    required
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]/60 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              {t("footer.servicesHeading")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              {t("footer.companyHeading")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              {t("footer.resourcesHeading")}
            </h3>
            <ul className="space-y-2.5 mb-6">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-4">
              {t("footer.legalHeading")}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.location")}
          </p>
        </div>
      </div>
    </footer>
  );
}