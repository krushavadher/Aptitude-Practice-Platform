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
