import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';

export function CTABanner() {
  const { title, desc, buttonText } = landingContent.cta;
  
  return (
    <section className="py-24 bg-[#EAF7F0] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#113426] rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-[#10B981]/20">
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[150%] bg-[#10B981]/15 blur-[120px] rounded-full mix-blend-screen"></div>
            <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[150%] bg-[#10B981]/10 blur-[120px] rounded-full mix-blend-screen"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">{title}</h2>
            <p className="text-lg sm:text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">{desc}</p>
            <Link to="/register" className="inline-flex items-center gap-3 bg-[#10B981] text-[#0B3D2E] font-extrabold text-lg rounded-full px-10 py-4 hover:bg-[#34D399] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] shadow-xl">
              {buttonText} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
