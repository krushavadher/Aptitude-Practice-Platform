const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'client');
const componentsDir = path.join(clientDir, 'src', 'components', 'landing');

// EXACT COLORS FROM IMAGE (Approximate Tailwind Equivalents)
// Background: #EAF7F0 (very light mint)
// Dark Green Text: #0B3D2E (very dark green)
// Emerald Accent: #10B981 (emerald 500)
// Very Dark Green Card: #113426
// Stats Strip Bg: #DFF1E7 (slightly darker mint)

const files = {
  'Navbar.jsx': `
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { landingContent } from '../../pages/landing/landingContent';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, links } = landingContent.nav;

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-[#0B3D2E]">{logo}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-bold text-[#0B3D2E]">Log in</Link>
            <Link to="/register" className="text-sm font-bold bg-[#0B3D2E] text-white px-5 py-2.5 rounded-full hover:bg-[#07291F] transition-colors">
              Get started
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#0B3D2E] flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0B3D2E]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-[#EAF7F0] border-b border-[#0B3D2E]/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] hover:bg-white/30">
                {link.label}
              </a>
            ))}
            <Link to="/login" className="block px-3 py-2 text-base font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] hover:bg-white/30">Log in</Link>
            <Link to="/register" className="block px-3 py-2 text-base font-bold text-[#0B3D2E] hover:bg-white/30">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
`,

  'Hero.jsx': `
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { landingContent } from '../../pages/landing/landingContent';

export function Hero() {
  const { eyebrow, headline, headlineHighlight, subtext, primaryCTA, secondaryCTA, trustChips } = landingContent.hero;

  const titleParts = headline.split(headlineHighlight);

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#EAF7F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[10px] font-extrabold tracking-[0.15em] text-[#0B3D2E] uppercase">{eyebrow}</span>
            </div>
            
            <h1 className="text-5xl sm:text-[4rem] font-extrabold text-[#0B3D2E] tracking-tight mb-6 leading-[1.05]">
              {titleParts[0]}<br/>
              <span className="relative inline-block text-[#0B3D2E]">
                {headlineHighlight}
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#10B981]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 10 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-[#0B3D2E]/80 mb-10 leading-relaxed max-w-lg font-medium pr-4">
              {subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D2E] text-white font-bold hover:bg-[#07291F] transition-colors w-full sm:w-auto">
                {primaryCTA} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0B3D2E] font-bold border border-[#0B3D2E]/10 hover:bg-white/80 transition-colors w-full sm:w-auto">
                {secondaryCTA}
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#0B3D2E]/80 font-bold">
              {trustChips.map((chip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {chip}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* The mockups from the image */}
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl bg-white shadow-2xl border border-white p-2">
              <img 
                src="/images/landing/hero-dashboard.webp" 
                alt="Dashboard Preview" 
                className="object-cover w-full h-full rounded-xl opacity-90"
                fetchPriority="high"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-[#EAF7F0] items-center justify-center flex-col text-center rounded-xl m-2 border-2 border-dashed border-[#10B981]/30">
                <div className="w-16 h-16 mb-3 rounded-xl bg-white flex items-center justify-center shadow-sm">
                   <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B3D2E]">Live Exam Workspace</h3>
                <p className="text-xs font-bold text-[#10B981]">Interactive Speed Test & Diagnostics</p>
              </div>
            </div>
            
            <div className="absolute -left-4 top-8 bg-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-[3px] border-[#10B981] flex items-center justify-center font-extrabold text-[#0B3D2E] text-[10px]">
                92%
              </div>
              <div>
                <div className="text-[9px] font-bold text-[#0B3D2E]/50">First-attempt</div>
                <div className="text-xs font-extrabold text-[#0B3D2E]">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="absolute right-0 bottom-1/4 translate-x-4 bg-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center text-red-500">⏱️</div>
              <div>
                <div className="text-[9px] font-bold text-[#0B3D2E]/50">Time left</div>
                <div className="text-sm font-extrabold text-[#0B3D2E]">14:59</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-12 bg-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] font-bold text-xs">🏆</div>
              <div>
                <div className="text-xs font-extrabold text-[#0B3D2E]">Rank #12 National</div>
                <div className="text-[9px] font-bold text-[#10B981]">Top 1% Percentile</div>
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
    <section className="py-12 bg-[#DFF1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {landingContent.stats.map((stat, i) => (
            <div key={i} className="flex flex-col border-l-2 border-[#10B981]/30 pl-6">
              <div className="text-4xl font-extrabold text-[#0B3D2E] mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-[#0B3D2E] mb-1">{stat.label}</div>
              <div className="text-[11px] font-medium text-[#0B3D2E]/70 leading-relaxed pr-4">{stat.desc}</div>
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
    <section id="topics" className="py-24 bg-[#EAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-[#10B981] font-bold tracking-[0.15em] text-[10px] uppercase mb-4">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] mb-6 leading-tight tracking-tight">{headline}</h2>
          <p className="text-[15px] text-[#0B3D2E]/70 font-medium leading-relaxed">{subtext}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((topic, i) => {
            const Icon = iconMap[topic.icon];
            const isDark = topic.dark;
            
            return (
              <div key={i} className={\`p-8 rounded-3xl shadow-sm transition-transform hover:-translate-y-1 relative overflow-hidden flex flex-col \${isDark ? 'bg-[#113426]' : 'bg-white'}\`}>
                
                {isDark && topic.tag && (
                  <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-[9px] font-extrabold uppercase tracking-wider mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    {topic.tag}
                  </div>
                )}
                
                <div className={\`w-10 h-10 rounded-lg flex items-center justify-center mb-6 \${isDark ? 'bg-white/10 text-[#10B981]' : 'bg-[#EAF7F0] text-[#10B981]'}\`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                
                <h3 className={\`text-xl font-extrabold mb-3 \${isDark ? 'text-white' : 'text-[#0B3D2E]'}\`}>{topic.title}</h3>
                <p className={\`text-[13px] leading-relaxed mb-8 font-medium flex-1 \${isDark ? 'text-white/80' : 'text-[#0B3D2E]/70'}\`}>{topic.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {topic.chips.map((chip, j) => (
                    <span key={j} className={\`px-3 py-1.5 rounded-full text-[10px] font-extrabold \${isDark ? 'bg-white/10 text-[#10B981]' : 'bg-[#EAF7F0] text-[#10B981]'}\`}>
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
import { landingContent } from '../../pages/landing/landingContent';

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#EAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {landingContent.features.map((feature) => (
          <div key={feature.id} className={\`flex flex-col \${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center\`}>
            <div className="flex-1 w-full max-w-xl">
              <div className="text-[5rem] font-extrabold text-[#A7F3D0]/50 tracking-tighter leading-none mb-4">{feature.id}</div>
              <h2 className="text-3xl font-extrabold text-[#0B3D2E] leading-[1.1] tracking-tight mb-6">{feature.title}</h2>
              <p className="text-[15px] text-[#0B3D2E]/70 font-medium leading-relaxed mb-8">{feature.desc}</p>
              
              <div className="space-y-5">
                {feature.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="text-[13px] leading-relaxed">
                      <span className="font-extrabold text-[#0B3D2E]">{bullet.title}</span>{" "}
                      <span className="font-medium text-[#0B3D2E]/80">{bullet.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full flex justify-center">
              <div className="rounded-3xl border border-[#10B981]/20 bg-white shadow-xl p-3 w-full max-w-lg aspect-[4/3] flex items-center justify-center relative">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="object-cover w-full h-full rounded-2xl opacity-90"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 m-3 bg-[#EAF7F0] rounded-2xl items-center justify-center flex-col text-center p-6 border-2 border-dashed border-[#10B981]/30">
                  <div className="text-3xl mb-3">🖥️</div>
                  <h3 className="text-base font-extrabold text-[#0B3D2E]">{feature.title}</h3>
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
    <section id="how-it-works" className="pt-24 pb-12 bg-[#EAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#10B981] font-bold tracking-[0.15em] text-[10px] uppercase mb-4">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B3D2E] mb-4 tracking-tight leading-tight">{title}</h2>
          <p className="text-[15px] text-[#0B3D2E]/70 font-medium">{subtext}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-start border border-[#10B981]/10">
              <div className="w-10 h-10 rounded-full bg-[#113426] flex items-center justify-center text-white font-extrabold text-sm mb-6">
                {step.num}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B3D2E] mb-2">{step.title}</h3>
              <p className="text-[13px] text-[#0B3D2E]/70 font-medium leading-relaxed">{step.desc}</p>
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
    <section className="pb-24 pt-12 bg-[#EAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#113426] p-10 sm:p-14 lg:p-16 rounded-[2.5rem]">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-[#10B981] font-bold tracking-[0.15em] text-[10px] uppercase mb-4">{eyebrow}</p>
            <h2 className="text-3xl sm:text-[2.5rem] font-extrabold text-white mb-6 leading-[1.1] tracking-tight">{title}</h2>
            <p className="text-[15px] text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">{desc}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, i) => (
              <div key={i} className="bg-[#174634] border border-[#10B981]/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-[9px] font-extrabold tracking-widest uppercase">
                    {stage.num}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-white mb-2">{stage.title}</h3>
                <p className="text-[13px] text-white/70 font-medium leading-relaxed">{stage.desc}</p>
              </div>
            ))}
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
    <section id="faq" className="py-24 bg-[#EAF7F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-[#0B3D2E] text-center mb-12 tracking-tight">{title}</h2>
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-extrabold text-[#0B3D2E] text-[15px]">{item.q}</span>
                  <ChevronDown className={\`w-5 h-5 text-[#0B3D2E]/50 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`} />
                </button>
                <div 
                  className={\`px-6 text-[#0B3D2E]/70 text-sm font-medium overflow-hidden transition-all duration-200 \${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}\`}
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
import { Link } from 'react-router-dom';
import { landingContent } from '../../pages/landing/landingContent';

export function CTABanner() {
  const { title, desc, buttonText } = landingContent.cta;
  
  return (
    <section className="py-24 bg-[#EAF7F0] text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-[#0B3D2E] mb-6 tracking-tight">{title}</h2>
        <p className="text-lg text-[#0B3D2E]/70 font-medium mb-10">{desc}</p>
        <Link to="/register" className="inline-block bg-[#113426] text-white font-bold rounded-full px-10 py-4 hover:bg-[#07291F] transition-colors">
          {buttonText}
        </Link>
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
    <footer className="bg-[#EAF7F0] py-12 border-t border-[#0B3D2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="mb-4 justify-center md:justify-start">
            <span className="text-xl font-bold text-[#0B3D2E] tracking-tight">{logo}</span>
          </div>
          <p className="text-xs font-bold text-[#0B3D2E]/50 max-w-sm">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="text-xs font-bold text-[#0B3D2E]/70 hover:text-[#0B3D2E] transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 text-center text-xs font-bold text-[#0B3D2E]/40">
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

console.log('Components updated with exact styling.');
