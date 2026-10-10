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
              <div key={i} className={`p-8 rounded-3xl shadow-sm transition-transform hover:-translate-y-1 relative overflow-hidden flex flex-col ${isDark ? 'bg-[#113426]' : 'bg-white'}`}>
                
                {isDark && topic.tag && (
                  <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-[9px] font-extrabold uppercase tracking-wider mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    {topic.tag}
                  </div>
                )}
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 ${isDark ? 'bg-white/10 text-[#10B981]' : 'bg-[#EAF7F0] text-[#10B981]'}`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                
                <h3 className={`text-xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-[#0B3D2E]'}`}>{topic.title}</h3>
                <p className={`text-[13px] leading-relaxed mb-8 font-medium flex-1 ${isDark ? 'text-white/80' : 'text-[#0B3D2E]/70'}`}>{topic.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {topic.chips.map((chip, j) => (
                    <span key={j} className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold ${isDark ? 'bg-white/10 text-[#10B981]' : 'bg-[#EAF7F0] text-[#10B981]'}`}>
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
