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
