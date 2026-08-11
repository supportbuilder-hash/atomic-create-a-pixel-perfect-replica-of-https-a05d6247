# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Create a pixel-perfect replica of https://datics.ai

## Goal
Build a pixel-perfect Datics AI landing page replica with dark glassmorphism, violet/cyan gradients, animated hero, services, case studies, testimonials, FAQ, and footer.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #0A0A0F`, `--foreground: #F0EEFF`, `--card: #1E1E2E`, `--border: #2E2E4A`, `--muted-foreground: #9B93C4`, `--primary: #7C3AED`, `--accent: #06B6D4`, `--primary-glow: rgba(124, 58, 237, 0.4)`, `--accent-glow: rgba(6, 182, 212, 0.3)`, `--card-hover: #252538`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`caseStudies`, `cases`, `cta`, `faq`, `hero`, `how`, `howItWorks`, `logos`, `nav`, `services`, `team`, `why`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
