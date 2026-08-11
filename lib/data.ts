export interface NavLink {
  label: string;
  href: string;
  key: string;
  isCTA?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Services", href: "#services", key: "services" },
  { label: "How It Works", href: "#how-it-works", key: "howItWorks" },
  { label: "Case Studies", href: "#case-studies", key: "caseStudies" },
  { label: "Team", href: "#team", key: "team" },
  { label: "FAQ", href: "#faq", key: "faq" },
  { label: "Get Started", href: "#cta", key: "getStarted", isCTA: true },
];

export const brandConstants = {
  name: "Datics AI",
  tagline: "We Build Software That Thinks",
  location: "London, UK",
  email: "hello@datics.ai",
  linkedIn: "https://linkedin.com/company/datics-ai",
  twitter: "https://twitter.com/daticsai",
  github: "https://github.com/datics-ai",
};

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Step {
  step: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
}

export interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}