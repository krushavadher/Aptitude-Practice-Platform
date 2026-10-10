import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { landingContent } from '../../pages/landing/landingContent';

export function Hero() {
  const { eyebrow, headline, headlineHighlight, primaryCTA, secondaryCTA, trustChips } = landingContent.hero;

  const titleParts = headline.split(headlineHighlight);

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#EAF7F0] overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[#10B981]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          <div className="w-full lg:w-5/12 xl:w-1/2 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[10px] font-extrabold tracking-[0.15em] text-[#0B3D2E] uppercase">{eyebrow}</span>
            </div>
            
            <h1 className="text-5xl sm:text-[4rem] font-extrabold text-[#0B3D2E] tracking-[-0.03em] mb-6 leading-[1.05]">
              {titleParts[0]}<br/>
              <span className="relative inline-block text-[#0B3D2E]">
                {headlineHighlight}
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#10B981]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 10 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
              Master <span className="font-bold text-[#0B3D2E] bg-white/50 px-1.5 py-0.5 rounded border border-slate-200/50">Quantitative</span>, <span className="font-bold text-[#0B3D2E] bg-white/50 px-1.5 py-0.5 rounded border border-slate-200/50">Logical Reasoning</span>, and <span className="font-bold text-[#0B3D2E] bg-white/50 px-1.5 py-0.5 rounded border border-slate-200/50">Verbal Ability</span> with curated problem sets, high-yield shortcuts, and AI-generated challenges rigorously vetted by exam toppers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D2E] text-white font-bold hover:bg-[#07291F] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all w-full sm:w-auto">
                {primaryCTA} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0B3D2E] font-bold border border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all w-full sm:w-auto">
                {secondaryCTA}
              </a>
            </div>
            
            <div className="flex flex-col gap-y-3 text-sm text-slate-600 font-bold">
              {trustChips.map((chip, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {chip}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 xl:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            {/* DOM-based Realistic Mockup */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 p-6 flex flex-col z-10">
              
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="flex gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-[#10B981] ring-2 ring-[#10B981]/20' : i < 3 ? 'bg-[#10B981]/40' : 'bg-slate-200'}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100/50">
                    💡 Shortcut hint
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100/50">
                    ⏱️ 14:28 remaining
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="flex-1">
                <div className="text-[11px] font-extrabold text-slate-400 mb-2.5 uppercase tracking-wider">Question 4 of 25</div>
                <h3 className="text-lg font-bold text-[#0B3D2E] leading-relaxed mb-6">
                  Q4. A train running at <span className="bg-[#EAF7F0] text-[#0B3D2E] px-1 rounded">54 km/h</span> passes a <span className="bg-[#EAF7F0] text-[#0B3D2E] px-1 rounded">240 m</span> platform in <span className="bg-[#EAF7F0] text-[#0B3D2E] px-1 rounded">24 seconds</span>. Find the length of the train.
                </h3>
                
                <div className="space-y-3">
                  {['120 m', '150 m', '180 m', '210 m'].map((opt, i) => {
                    const isSelected = i === 0;
                    return (
                      <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${isSelected ? 'border-[#10B981] bg-[#10B981]/5 shadow-[0_2px_10px_rgba(16,185,129,0.05)]' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#10B981]' : 'border-slate-300'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />}
                        </div>
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#0B3D2E]' : 'text-slate-600'}`}>{String.fromCharCode(65 + i)}: {opt}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Floating Metric Badges */}
            <div className="absolute -left-4 sm:-left-8 top-12 bg-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 border border-slate-100 z-20">
              <div className="w-10 h-10 rounded-full border-[3px] border-[#10B981] flex items-center justify-center font-extrabold text-[#0B3D2E] text-xs">
                92%
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">First-attempt</div>
                <div className="text-sm font-extrabold text-[#0B3D2E]">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="absolute -right-4 sm:-right-8 bottom-1/3 bg-white px-4 py-3 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 border border-slate-100 z-20">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-lg">⚡</div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Average</div>
                <div className="text-sm font-extrabold text-[#0B3D2E]">Speed: 38s avg</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-12 sm:left-16 bg-white px-5 py-3 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 border border-slate-100 z-30">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] font-bold text-sm">🏆</div>
              <div>
                <div className="text-sm font-extrabold text-[#0B3D2E]">Rank #12 National</div>
                <div className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Top 1% Percentile</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
