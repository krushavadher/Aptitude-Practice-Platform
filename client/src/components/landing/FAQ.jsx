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
                  <ChevronDown className={`w-5 h-5 text-[#0B3D2E]/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-6 text-[#0B3D2E]/70 text-sm font-medium overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
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
