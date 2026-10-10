const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'client');
const componentsDir = path.join(clientDir, 'src', 'components', 'landing');

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
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-on-accent flex items-center justify-center font-bold text-lg">A</div>
            <span className="text-xl font-bold text-primary tracking-tight">{logo}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-bold text-primary hover:text-primary-hover transition-colors">Log in</Link>
            <Button to="/register" variant="primary" className="rounded-full shadow-lg">Get started</Button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-accent">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-glass-bg border-b border-glass-border">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-primary hover:bg-glass">
                {link.label}
              </a>
            ))}
            <Link to="/login" className="block px-3 py-2 text-base font-bold text-primary hover:bg-glass">Log in</Link>
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
import { CircleCheck, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { landingContent } from '../../pages/landing/landingContent';

export function Hero() {
  const { eyebrow, headline, headlineHighlight, subtext, primaryCTA, secondaryCTA, trustChips } = landingContent.hero;

  const titleParts = headline.split(headlineHighlight);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glass border border-glass-border shadow-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">{eyebrow}</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold text-primary tracking-tight mb-6 leading-[1.1]">
              {titleParts[0]}<br/>
              <span className="relative inline-block text-primary">
                {headlineHighlight}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-secondary mb-10 leading-relaxed max-w-lg font-medium">
              {subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button to="/register" variant="primary" size="lg" className="rounded-full shadow-xl shadow-primary/20 flex items-center gap-2 px-8">
                {primaryCTA} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg" className="rounded-full bg-glass border border-glass-border text-primary hover:bg-glass-strong px-8">
                {secondaryCTA}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-secondary font-medium">
              {trustChips.map((chip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-primary" />
                  {chip}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none flex justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden max-w-[500px]">
              <img 
                src="/images/landing/hero-dashboard.webp" 
                alt="Dashboard Preview" 
                className="object-cover w-full h-full rounded-3xl shadow-2xl border border-glass-border"
                fetchPriority="high"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-white/50 backdrop-blur-sm border border-white items-center justify-center flex-col text-center p-6 rounded-3xl shadow-2xl">
                <div className="w-20 h-20 mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                   <span className="text-4xl text-on-accent">📊</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Live Exam Workspace</h3>
                <p className="text-sm font-medium text-secondary">Interactive Simulation</p>
              </div>
            </div>
            
            <div className="absolute top-12 -left-8 bg-white px-4 py-3 rounded-2xl shadow-xl border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-r-transparent flex items-center justify-center font-bold text-primary text-xs">
                92%
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-secondary tracking-wider">First-attempt</div>
                <div className="text-sm font-bold text-primary">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-6 bg-white px-5 py-3 rounded-2xl shadow-xl border border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-danger-soft flex items-center justify-center text-danger">⏱️</div>
              <div>
                <div className="text-[10px] uppercase font-bold text-secondary tracking-wider">Time left</div>
                <div className="text-lg font-bold text-primary tabular">14:59</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-12 bg-white px-5 py-3 rounded-2xl shadow-xl border border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center text-primary">🏆</div>
              <div>
                <div className="text-sm font-bold text-primary">Rank #12 National</div>
                <div className="text-[10px] uppercase font-bold text-primary/60 tracking-wider">Top 1% Percentile</div>
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
    <section className="py-16 bg-primary-soft border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {landingContent.stats.map((stat, i) => (
            <div key={i} className="flex flex-col border-l-2 border-primary/20 pl-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-2 tracking-tight">{stat.value}</div>
              <div className="text-base font-bold text-primary mb-1">{stat.label}</div>
              <div className="text-sm font-medium text-primary/70">{stat.desc}</div>
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

const iconMap = { Calculator, Brain, BookOpen, Dices };

export function TopicsGrid() {
  const { eyebrow, headline, subtext, items } = landingContent.topics;

  return (
    <section id="topics" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">{eyebrow}</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 leading-tight tracking-tight">{headline}</h2>
          <p className="text-lg text-secondary font-medium">{subtext}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((topic, i) => {
            const Icon = iconMap[topic.icon];
            const isDark = topic.dark;
            
            return (
              <div key={i} className={\`p-8 rounded-3xl shadow-lg border \${isDark ? 'card-solid-green border-transparent' : 'bg-white border-glass-border'} transition-transform hover:-translate-y-1 relative overflow-hidden\`}>
                
                {isDark && topic.tag && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/20 text-mint text-[10px] font-bold uppercase tracking-widest mb-6 border border-mint/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                    {topic.tag}
                  </div>
                )}
                
                <div className={\`w-12 h-12 rounded-xl flex items-center justify-center mb-6 \${isDark ? 'bg-white/10 text-mint' : 'bg-primary-soft text-primary'}\`}>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                
                <h3 className={\`text-2xl font-bold mb-4 \${isDark ? 'text-white' : 'text-primary'}\`}>{topic.title}</h3>
                <p className={\`text-sm leading-relaxed mb-8 font-medium \${isDark ? 'text-white/80' : 'text-secondary'}\`}>{topic.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {topic.chips.map((chip, j) => (
                    <span key={j} className={\`px-3 py-1.5 rounded-lg text-xs font-bold \${isDark ? 'bg-black/20 text-mint border border-white/10' : 'bg-bg text-primary border border-border'}\`}>
                      {chip}
                    </span>
                  ))}
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

  'Features.jsx': `
import React from 'react';
import { CircleCheck } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';

export function Features() {
  return (
    <section id="features" className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {landingContent.features.map((feature) => (
          <div key={feature.id} className={\`flex flex-col \${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center\`}>
            <div className="flex-1 space-y-8">
              <div className="text-6xl font-bold text-primary/20 tracking-tighter">{feature.id}</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight tracking-tight">{feature.title}</h2>
              <p className="text-lg text-secondary font-medium leading-relaxed">{feature.desc}</p>
              
              <div className="space-y-6 pt-4">
                {feature.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <CircleCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary block mb-1">{bullet.title}</span>
                      <span className="text-secondary font-medium text-sm leading-relaxed">{bullet.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="rounded-3xl border border-glass-border bg-white shadow-2xl p-2 sm:p-4 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="object-cover w-full h-full rounded-2xl border border-border/50 shadow-inner"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 m-4 bg-primary-soft rounded-2xl border border-primary/20 items-center justify-center flex-col text-center p-8">
                  <div className="text-4xl mb-4 bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm">✨</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
                  <div className="text-sm font-medium text-primary/70">UI Dashboard Component Preview</div>
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
  const { eyebrow, title, subtext, steps } = landingContent.howItWorks;
  
  return (
    <section id="how-it-works" className="pt-24 pb-12 bg-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">{eyebrow}</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight leading-tight">{title}</h2>
          <p className="text-lg text-secondary font-medium">{subtext}</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-glass-border transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-6 shadow-md">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
              <p className="text-sm text-secondary font-medium leading-relaxed">{step.desc}</p>
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
  const { eyebrow, title, desc, stages } = landingContent.trust;
  
  return (
    <section className="pb-24 pt-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-solid-green p-10 sm:p-16 rounded-[2.5rem] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-mint mb-8 border border-white/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            
            <p className="text-mint font-bold tracking-[0.2em] text-xs uppercase mb-4">{eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight tracking-tight">{title}</h2>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed font-medium mb-16">{desc}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {stages.map((stage, i) => (
                <div key={i} className="bg-black/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-colors hover:bg-black/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 rounded bg-white/10 text-mint text-[10px] font-bold tracking-widest uppercase border border-white/5">
                      {stage.num}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-mint/50" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{stage.title}</h3>
                  <p className="text-sm text-white/70 font-medium leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    <section id="faq" className="py-24 bg-primary-soft border-y border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-primary text-center mb-16 tracking-tight">{title}</h2>
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-white border border-glass-border rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none focus-visible:bg-bg"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-primary text-lg">{item.q}</span>
                  <ChevronDown className={\`w-6 h-6 text-primary transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`} />
                </button>
                <div 
                  className={\`px-6 text-secondary font-medium overflow-hidden transition-all duration-200 \${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}\`}
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
    <section className="py-24 bg-bg text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">{title}</h2>
        <p className="text-xl text-secondary font-medium mb-12">{desc}</p>
        <Button to="/register" className="card-solid-green text-white border-none shadow-xl px-10 hover:shadow-2xl" size="lg">
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
    <footer className="bg-primary-soft py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="w-8 h-8 rounded bg-primary text-on-accent flex items-center justify-center font-bold text-lg">A</div>
            <span className="text-2xl font-bold text-primary tracking-tight">{logo}</span>
          </div>
          <p className="text-sm font-medium text-primary/80 max-w-sm">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-bold text-primary hover:text-primary-hover transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-primary/20 text-center text-sm font-bold text-primary/60">
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

console.log('Components updated.');
