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
