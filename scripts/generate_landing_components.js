const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'client');
const componentsDir = path.join(clientDir, 'src', 'components', 'landing');
const pagesDir = path.join(clientDir, 'src', 'pages', 'public');

const files = {
  'Navbar.jsx': `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';
import { landingContent } from '../../pages/landing/landingContent';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, links } = landingContent.nav;

  return (
    <nav className="sticky top-0 z-50 w-full bg-glass-bg border-b border-glass-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">{logo}</Link>
          
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <ThemeToggle />
            <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors">Log in</Link>
            <Button to="/register" variant="primary" size="sm">Get started</Button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-primary">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-glass-bg-strong border-b border-glass-border">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-secondary hover:text-primary hover:bg-glass">
                {link.label}
              </a>
            ))}
            <Link to="/login" className="block px-3 py-2 text-base font-medium text-secondary hover:text-primary hover:bg-glass">Log in</Link>
            <Link to="/register" className="block px-3 py-2 text-base font-bold text-primary hover:bg-glass">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
`,

  'Hero.jsx': `
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { landingContent } from '../../pages/landing/landingContent';

export function Hero() {
  const { eyebrow, headline, subtext, primaryCTA, secondaryCTA, trustChips } = landingContent.hero;

  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-4">{eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight mb-6 leading-tight">
              {headline}
            </h1>
            <p className="text-lg text-secondary mb-8 leading-relaxed max-w-xl">
              {subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button to="/register" variant="primary" size="lg" className="w-full sm:w-auto">
                {primaryCTA}
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
                {secondaryCTA}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-secondary font-medium">
              {trustChips.map((chip, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {chip}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl bg-surface border border-border shadow-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              {/* Fallback image handler */}
              <img 
                src="/images/landing/hero-dashboard.webp" 
                alt="Dashboard Preview" 
                width="800" height="600"
                className="object-cover w-full h-full"
                fetchpriority="high"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-surface-strong items-center justify-center flex-col text-center p-6">
                <div className="w-16 h-16 mb-4 rounded-full bg-border flex items-center justify-center">
                   <span className="text-2xl text-secondary">📊</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Dashboard Preview</h3>
                <p className="text-sm text-secondary">Aptitude Practice Dashboard Image goes here</p>
              </div>
            </div>
            
            {/* Floating chips */}
            <div className="absolute -left-6 top-1/4 glass-card px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success font-bold text-xs">92%</div>
              <div className="text-sm font-bold text-primary">Accuracy</div>
            </div>
            <div className="absolute -right-6 bottom-1/4 glass-card px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <div className="text-xl">⏱️</div>
              <div>
                <div className="text-xs text-secondary font-medium">Time left</div>
                <div className="text-sm font-bold text-primary tabular-nums">14:59</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  'StatsStrip.jsx': `
import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function StatsStrip() {
  return (
    <section className="py-12 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {landingContent.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  'TopicsGrid.jsx': `
import React from 'react';
import { Calculator, Brain, BookOpen, Dices } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';
import { Link } from 'react-router-dom';

const iconMap = { Calculator, Brain, BookOpen, Dices };

export function TopicsGrid() {
  return (
    <section id="topics" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Comprehensive Topic Coverage</h2>
          <p className="text-lg text-secondary">Practice specific areas to strengthen your weaknesses before the real exam.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {landingContent.topics.map((topic, i) => {
            const Icon = iconMap[topic.icon];
            return (
              <Link to="/register" key={i} className="group block bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{topic.title}</h3>
                    <p className="text-secondary text-sm mb-4 leading-relaxed">{topic.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.chips.map((chip, j) => (
                        <span key={j} className="px-2.5 py-1 rounded-md bg-bg text-xs font-medium text-secondary border border-border">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`,

  'Features.jsx': `
import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function Features() {
  return (
    <section id="features" className="py-20 bg-surface-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {landingContent.features.map((feature, i) => (
          <div key={i} className={\`flex flex-col \${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center\`}>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-primary">{feature.title}</h2>
              <p className="text-lg text-secondary leading-relaxed">{feature.desc}</p>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-2xl border border-border bg-surface shadow-lg overflow-hidden aspect-[16/10] flex items-center justify-center relative">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  width="600" height="375"
                  className="object-cover w-full h-full"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-bg items-center justify-center flex-col text-center p-6">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="text-sm font-bold text-secondary">{feature.title} UI</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  'HowItWorks.jsx': `
import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function HowItWorks() {
  const { title, steps } = landingContent.howItWorks;
  
  return (
    <section id="how-it-works" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-border -z-10" />
              )}
              <div className="bg-surface border border-border w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-primary mb-6 mx-auto shadow-sm">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-primary text-center mb-2">{step.title}</h3>
              <p className="text-sm text-secondary text-center leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  'TrustSection.jsx': `
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';

export function TrustSection() {
  const { title, desc } = landingContent.trust;
  
  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-soft text-primary mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-6">{title}</h2>
        <p className="text-lg text-secondary leading-relaxed">{desc}</p>
      </div>
    </section>
  );
}
`,

  'FAQ.jsx': `
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { title, items } = landingContent.faq;

  return (
    <section id="faq" className="py-20 bg-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">{title}</h2>
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden transition-all">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus-visible:bg-primary-soft"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-primary">{item.q}</span>
                  <ChevronDown className={\`w-5 h-5 text-secondary transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`} />
                </button>
                <div 
                  className={\`px-6 text-secondary overflow-hidden transition-all duration-200 \${isOpen ? 'max-h-48 pb-4' : 'max-h-0'}\`}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`,

  'CTABanner.jsx': `
import React from 'react';
import { Button } from '../common/Button';
import { landingContent } from '../../pages/landing/landingContent';

export function CTABanner() {
  const { title, desc, buttonText } = landingContent.cta;
  
  return (
    <section className="py-20 bg-primary text-on-primary text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg opacity-90 mb-10">{desc}</p>
        <Button to="/register" className="bg-on-primary text-primary hover:bg-bg border-none shadow-lg" size="lg">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
`,

  'Footer.jsx': `
import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function Footer() {
  const { description, copyright } = landingContent.footer;
  const { logo, links } = landingContent.nav;

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold text-primary tracking-tight mb-2">{logo}</div>
          <p className="text-sm text-secondary max-w-xs">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-medium text-secondary hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border text-center text-sm text-secondary">
        {copyright}
      </div>
    </footer>
  );
}
`
};

Object.entries(files).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(componentsDir, filename), content.trim() + '\n');
});

// Update pages/public/Landing.jsx
const landingPageContent = `
import React from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { Hero } from '../../components/landing/Hero';
import { StatsStrip } from '../../components/landing/StatsStrip';
import { TopicsGrid } from '../../components/landing/TopicsGrid';
import { Features } from '../../components/landing/Features';
import { HowItWorks } from '../../components/landing/HowItWorks';
import { TrustSection } from '../../components/landing/TrustSection';
import { FAQ } from '../../components/landing/FAQ';
import { CTABanner } from '../../components/landing/CTABanner';
import { Footer } from '../../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-on-accent">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <TopicsGrid />
        <Features />
        <HowItWorks />
        <TrustSection />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
`;

fs.writeFileSync(path.join(pagesDir, 'Landing.jsx'), landingPageContent.trim() + '\n');

console.log('Components and Landing page created.');
