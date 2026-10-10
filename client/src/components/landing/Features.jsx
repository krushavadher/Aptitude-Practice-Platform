import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#EAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {landingContent.features.map((feature) => (
          <div key={feature.id} className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
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
