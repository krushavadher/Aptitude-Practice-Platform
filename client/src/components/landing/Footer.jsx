import React from 'react';
import { landingContent } from '../../pages/landing/landingContent';

export function Footer() {
  const { description, copyright } = landingContent.footer;
  const { logo, links } = landingContent.nav;

  return (
    <footer className="bg-[#EAF7F0] pt-16 pb-8 border-t border-[#0B3D2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16">
          
          <div className="text-center md:text-left max-w-sm">
            <div className="mb-6 flex justify-center md:justify-start">
              <span className="text-2xl font-extrabold text-[#0B3D2E] tracking-tight">{logo}</span>
            </div>
            <p className="text-[15px] font-medium text-[#0B3D2E]/70 leading-relaxed">{description}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-2">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-[15px] font-bold text-[#0B3D2E]/80 hover:text-[#10B981] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-[#0B3D2E]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[13px] font-bold text-[#0B3D2E]/40">
            {copyright}
          </div>
          <div className="flex gap-8 text-[13px] font-bold text-[#0B3D2E]/40">
            <a href="#" className="hover:text-[#10B981] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#10B981] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
