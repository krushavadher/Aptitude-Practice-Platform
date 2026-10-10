import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { landingContent } from '../landing/landingContent';
import { CheckCircle2, Calculator, Brain, BookOpen, Dices, ArrowRight, Activity, Clock, Target, Check, BarChart3, ShieldCheck, Trophy, RefreshCw, FileText, Flag, Sparkles, UserCog, ChevronDown, ChevronUp } from 'lucide-react';

export default function Landing() {
  const { hero, stats, topics, trust } = landingContent;
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: "How are AptiFlow questions different from standard mock tests?",
      a: "Standard mock sets often pull from recycled, decade-old public PDF sheets that students memorize. AptiFlow continuously generates fresh, contextual questions modeling modern exam patterns (TCS NQT, Cognizant, AMCAT, CAT). Crucially, every single item is verified by human aptitude trainers to eliminate answer key ambiguity."
    },
    {
      q: "Is AptiFlow suitable for both campus placements and CAT/GATE exams?",
      a: "Yes, our difficulty settings allow you to ramp up from baseline placement level all the way to rigorous CAT/GATE standards."
    },
    {
      q: "Are the timed tests modeled after real company assessment patterns?",
      a: "Absolutely. Our mocks emulate the exact sectional constraints and negative marking schemes of major corporate drives."
    },
    {
      q: "Can I access AptiFlow on mobile devices or tablets?",
      a: "Yes, the platform is fully responsive and optimized for practice on any device."
    },
    {
      q: "Is the platform free to get started?",
      a: "Yes, you can create a free account to access basic topic drills and start tracking your progress immediately."
    }
  ];


  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#EEF8F3] to-[#E3F4EA]">
        <div className="max-w-[1150px] mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Text */}
          <div className="space-y-6 relative z-10 text-center lg:text-left pr-0 lg:pr-4">
            

            
            <h1 className="text-[44px] sm:text-[52px] lg:text-[64px] font-extrabold text-[#10241E] leading-[1.05] tracking-tight">
              Practice smarter.<br />
              Perform better <br />
              <span className="text-[#14724F] relative inline-block">
                under pressure.
                <span className="absolute bottom-[-8px] md:bottom-[-20px] left-0 w-full h-[5px] sm:h-[6px] bg-[#14724F] -rotate-[1.5deg] transform origin-center rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-base md:text-[17px] text-[#5B6F67] max-w-[480px] mx-auto lg:mx-0 leading-[1.6] font-medium">
              Master Quantitative, Logical Reasoning, and Verbal Ability with curated problem sets, high-yield shortcuts, and AI-generated challenges rigorously vetted by exam toppers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-[#024329] text-white px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#012E1B] transition-all shadow-md w-full sm:w-auto">
                Start practicing free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/#how-it-works" className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#A3E0C1] text-[#024329] px-7 py-3.5 rounded-full font-bold text-[15px] hover:bg-white/50 transition-all w-full sm:w-auto">
                See how it works
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 pt-6 max-w-[480px] mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#5B6F67]">
                <CheckCircle2 className="w-4 h-4 text-[#14724F]" strokeWidth={2.5} /> Admin-reviewed questions
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#5B6F67]">
                <CheckCircle2 className="w-4 h-4 text-[#14724F]" strokeWidth={2.5} /> Realistic timed tests
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#5B6F67]">
                <CheckCircle2 className="w-4 h-4 text-[#14724F]" strokeWidth={2.5} /> Step-by-step shortcuts
              </div>
            </div>
          </div>

          {/* Right Hero Mock UI */}
          <div className="relative z-10 hidden md:block mt-12 lg:mt-0 lg:ml-auto w-full max-w-[460px]">
            {/* Outer browser-like window */}
            <div className="bg-white/50 backdrop-blur-md rounded-[20px] shadow-[0_20px_50px_rgba(20,114,79,0.05)] border border-white p-2.5 pt-3 relative">
              {/* Browser Bar */}
              <div className="flex items-center justify-center mb-2.5">
                <div className="bg-white/80 text-[#94A3B8] text-[8px] font-bold px-4 py-1.5 rounded-full shadow-sm border border-white">
                  aptiflow.com/practice/quantitative
                </div>
              </div>
              
              {/* Inner dashed area */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[16px] border-2 border-dashed border-[#A3E0C1] h-[190px] relative p-4 flex flex-col justify-between overflow-hidden">
                
                {/* Skeletons background */}
                <div className="w-full flex justify-between items-center opacity-40">
                  <div className="w-24 h-2 bg-[#C5D0CA] rounded-full"></div>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 bg-[#C5D0CA] rounded-md"></div>
                    <div className="w-4 h-4 bg-[#C5D0CA] rounded-md"></div>
                    <div className="w-4 h-4 bg-[#C5D0CA] rounded-md"></div>
                  </div>
                </div>
                <div className="space-y-2 opacity-40 mt-2">
                  <div className="w-16 h-1.5 bg-[#C5D0CA] rounded-full"></div>
                  <div className="w-full h-1.5 bg-[#C5D0CA] rounded-full"></div>
                  <div className="w-32 h-1.5 bg-[#C5D0CA] rounded-full"></div>
                </div>
                <div className="flex gap-2 opacity-40 mt-auto">
                  <div className="w-full h-4 bg-[#C5D0CA] rounded-full"></div>
                  <div className="w-full h-4 bg-[#C5D0CA] rounded-full"></div>
                  <div className="w-full h-4 bg-[#C5D0CA] rounded-full"></div>
                </div>

                {/* Floating Solid Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] p-3 w-[210px] flex flex-col items-center text-center z-10 border border-slate-50">
                  <div className="w-6 h-6 mb-1.5 text-[#14724F]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
                  </div>
                  <h3 className="text-[#10241E] text-[13px] font-extrabold mb-0.5 tracking-tight">Live Exam Workspace</h3>
                  <p className="text-[#5B6F67] text-[8px] font-medium leading-tight mb-2">Interactive Speed Test & Solution Diagnostics</p>
                  <div className="bg-[#D1F0DE] text-[#14724F] text-[7px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                    16:10 Interactive Simulation
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Widget 1: Accuracy Rate */}
            <div className="absolute -top-3 -left-3 bg-white rounded-2xl p-2 pr-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.08)] flex items-center gap-2 z-20">
              <div className="w-6 h-6 rounded-full border-[2px] border-[#22C55E] flex items-center justify-center bg-white">
                <span className="text-[8px] font-extrabold text-[#10241E]">92%</span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[6px] font-extrabold text-[#94A3B8] uppercase tracking-wider mb-0.5">First-attempt</div>
                <div className="text-[10px] font-extrabold text-[#10241E] leading-tight">Accuracy Rate</div>
              </div>
            </div>

            {/* Floating Widget 2: Rank */}
            <div className="absolute -bottom-3 left-6 bg-white rounded-2xl p-2 pr-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.08)] flex items-center gap-2 z-20">
              <div className="w-6 h-6 rounded-full bg-[#D1F0DE] flex items-center justify-center text-[#14724F]">
                <Trophy className="w-3 h-3" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[9px] font-extrabold text-[#10241E] leading-tight mb-0.5">Rank #12 National</div>
                <div className="text-[7px] font-extrabold text-[#22C55E] leading-tight">Top 1% Percentile</div>
              </div>
            </div>

            {/* Floating Widget 3: Time Left */}
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white rounded-2xl p-2 pr-3.5 shadow-[0_12px_24px_rgba(0,0,0,0.08)] flex items-center gap-2 z-20">
              <div className="w-6 h-6 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#EF4444]">
                <Clock className="w-3 h-3" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[6px] font-extrabold text-[#94A3B8] uppercase tracking-wider mb-0.5">Time left</div>
                <div className="text-[11px] font-extrabold text-[#10241E] leading-tight">14:59</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#EAF3EF]/80 backdrop-blur-md px-4 py-6 md:py-8 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map(stat => (
            <div key={stat.label} className="border-l-2 border-[#14724F]/20 pl-6 lg:pl-8">
              <div className="text-4xl md:text-5xl font-extrabold text-[#14724F] mb-3">{stat.value}</div>
              <div className="text-[#10241E] font-bold text-lg mb-1.5">{stat.label}</div>
              <div className="text-[#5B6F67] text-[13px] leading-relaxed max-w-[200px]">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics Masonry Grid */}
      <section id="topics" className="px-4 py-20 md:py-24 bg-[#E3F4EA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="text-[#024329] text-[10px] font-black tracking-widest uppercase mb-4">{topics.eyebrow}</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#10241E] tracking-tight">{topics.headline}</h2>
            <p className="text-lg text-[#5B6F67]">{topics.subtext}</p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-5 lg:gap-6">
            {/* Box 1 (Quant) */}
            <div className="md:col-span-8 bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_15px_40px_rgb(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <h3 className="text-[24px] font-extrabold text-[#10241E] mb-3">Quantitative Aptitude</h3>
                <p className="text-[#5B6F67] text-[14px] leading-[1.6] max-w-lg mb-8 font-medium">
                  Speed arithmetic, algebraic equations, number systems, and percentage models taught with 30-second shortcut formulas and Vedic math principles.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Number Systems', 'Algebra', 'Geometry & Mensuration', 'Speed Math', 'Data Interpretation'].map(chip => (
                  <span key={chip} className="px-3.5 py-1.5 rounded-full bg-[#DDF3E6] text-[#024329] text-[10px] font-extrabold">{chip}</span>
                ))}
              </div>
            </div>

            {/* Box 2 (Probability - Dark) */}
            <div className="md:col-span-4 bg-gradient-to-br from-[#1A362D] to-[#10241E] rounded-[24px] p-6 lg:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#4ADE80]/30 text-[#4ADE80] text-[8px] font-black tracking-widest uppercase">
                    <div className="w-1 h-1 rounded-full bg-[#4ADE80]"></div> HIGH YIELD TOPIC
                  </span>
                </div>
                <h3 className="text-[24px] font-extrabold text-white mb-2">Probability & PnC</h3>
                <p className="text-[#A3B8B0] text-[13px] leading-[1.6] mb-8 font-medium">
                  Combinatorics, Bayes' theorem, and probability puzzles that separate top 1% candidates in tier-1 product assessments.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {['Permutations', 'Combinations', 'Bayes Theorem', 'Distributions'].map(chip => (
                  <span key={chip} className="px-3 py-1.5 rounded-full bg-[#264D40] text-[#A3E0C1] text-[9px] font-extrabold">{chip}</span>
                ))}
              </div>
            </div>

            {/* Box 3 (Logical) */}
            <div className="md:col-span-5 bg-white rounded-[24px] p-8 lg:p-10 min-h-[280px] shadow-[0_15px_40px_rgb(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <h3 className="text-[22px] font-extrabold text-[#10241E] mb-3">Logical Reasoning</h3>
                <p className="text-[#5B6F67] text-[14px] leading-[1.6] mb-8 font-medium">
                  Deductive matrices, syllogisms, circular seating arrangements, and pattern recognition matrices for TCS, Infosys, and Cognizant.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Seating Layouts', 'Syllogisms', 'Blood Relations', 'Coding-Decoding'].map(chip => (
                  <span key={chip} className="px-3.5 py-1.5 rounded-full bg-[#DDF3E6] text-[#024329] text-[10px] font-extrabold">{chip}</span>
                ))}
              </div>
            </div>

            {/* Box 4 (Verbal) */}
            <div className="md:col-span-7 bg-white rounded-[24px] p-8 lg:p-10 min-h-[280px] shadow-[0_15px_40px_rgb(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <h3 className="text-[22px] font-extrabold text-[#10241E] mb-3">Verbal Ability & Reading Comprehension</h3>
                <p className="text-[#5B6F67] text-[14px] leading-[1.6] mb-8 max-w-xl font-medium">
                  Sentence correction rules, parajumbles, vocabulary nuances, and high-speed passage comprehension frameworks designed to maximize sectional cutoffs.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Reading Comprehension', 'Sentence Correction', 'Para Jumbles', 'Vocabulary & Idioms', 'Critical Reasoning'].map(chip => (
                  <span key={chip} className="px-3.5 py-1.5 rounded-full bg-[#DDF3E6] text-[#024329] text-[10px] font-extrabold">{chip}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Engineered For Confidence (Features Showcase) */}
      <section id="features" className="px-4 py-24 md:py-32 bg-[#F5F9F7] relative overflow-hidden">
        {/* Background decorative arc */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full border border-[#C5D0CA]/30 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] rounded-full border border-[#C5D0CA]/20 -translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
          <div className="text-[#14724F] text-[11px] font-bold tracking-widest uppercase mb-6">ENGINEERED FOR CONFIDENCE</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#10241E] tracking-tight max-w-4xl mx-auto">
            Tools designed specifically for peak exam performance
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
          {/* Left Description */}
          <div className="space-y-6">
            <div className="text-[80px] md:text-[96px] font-black text-[#14724F]/10 leading-none -ml-1 -mb-8 select-none">01</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#10241E] leading-tight">
              Topic-wise practice with instant step-by-step solutions
            </h3>
            <p className="text-lg text-[#5B6F67] leading-relaxed max-w-lg">
              No more flipping to back pages or deciphering cryptic answer sheets. Every problem is paired with a direct conceptual breakdown and a speed shortcut method.
            </p>
            
            <ul className="space-y-5 pt-4">
              {[
                {title: "Adaptive difficulty", desc: "Smooth ramp-up from baseline basics to multi-step challenges."},
                {title: "Formula hints on demand", desc: "Peek at underlying equations without revealing the final answer."},
                {title: "Alternate methods", desc: "Learn both formal algebraic and 20-second elimination strategies."}
              ].map(b => (
                <li key={b.title} className="flex gap-3.5 max-w-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#14724F] flex-shrink-0 mt-0.5" />
                  <div className="text-[15px]">
                    <span className="font-extrabold text-[#10241E]">{b.title}: </span>
                    <span className="text-[#5B6F67]">{b.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Mock UI */}
          <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-[0_20px_50px_rgba(20,114,79,0.05)] border border-[#EAF3EF] max-w-[480px] w-full mx-auto h-fit">
            <div className="bg-[#F5F9F7] rounded-3xl p-5 md:p-6 space-y-5">
               
               <div className="flex justify-between items-center text-[10px] font-bold text-[#5B6F67]">
                 <span className="bg-[#EAF3EF] px-2.5 py-1 rounded-full text-[#14724F]">Question 4 of 25 • Quant</span>
                 <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Avg. time: 48s</span>
               </div>
               
               <p className="text-[#10241E] font-medium leading-relaxed text-[13px]">
                 A train 180 meters long is traveling at 54 km/h. How many seconds does it take to pass a telegraph post by the track side?
               </p>
               
               <div className="space-y-2.5">
                 <div className="bg-white border border-[#EAF3EF] rounded-xl p-3 flex items-center gap-3 shadow-sm opacity-60">
                   <div className="w-7 h-7 rounded-full border border-[#C5D0CA] flex items-center justify-center text-[11px] font-bold text-[#5B6F67]">A</div>
                   <span className="text-[#10241E] font-medium text-[13px]">10 seconds</span>
                 </div>
                 <div className="bg-[#EAF3EF] border-[1.5px] border-[#14724F] rounded-xl p-3 flex items-center gap-3 shadow-sm">
                   <div className="w-7 h-7 rounded-full bg-[#14724F] flex items-center justify-center text-white shadow-sm"><Check className="w-4 h-4 stroke-[3]"/></div>
                   <span className="text-[#10241E] font-bold text-[13px]">12 seconds</span>
                 </div>
                 <div className="bg-white border border-[#EAF3EF] rounded-xl p-3 flex items-center gap-3 shadow-sm opacity-60">
                   <div className="w-7 h-7 rounded-full border border-[#C5D0CA] flex items-center justify-center text-[11px] font-bold text-[#5B6F67]">C</div>
                   <span className="text-[#10241E] font-medium text-[13px]">14 seconds</span>
                 </div>
               </div>
               
               <div className="bg-[#14724F]/10 rounded-xl p-4 border border-[#14724F]/20 mt-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#14724F]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex items-center gap-1.5 text-[#14724F] font-extrabold mb-2 relative z-10 text-[11px]">
                     <Target className="w-4 h-4"/> Shortcut Explanation
                  </div>
                  <div className="text-[11px] text-[#10241E]/90 space-y-1 relative z-10 font-medium">
                     <p>Convert speed: <span className="bg-white/50 px-1 rounded font-bold">54 × (5/18) = 15 m/s</span>.</p>
                     <p>Time = Distance / Speed = <span className="bg-white/50 px-1 rounded font-bold">180 / 15 = 12s</span>.</p>
                  </div>
               </div>

            </div>
          </div>
        </div>

        {/* Feature 02 */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10 mt-16 lg:mt-24">
          {/* Left Mock UI */}
          <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-[0_20px_50px_rgba(20,114,79,0.05)] border border-[#EAF3EF] max-w-[480px] w-full mx-auto h-fit order-2 lg:order-1">
            <div className="bg-[#F5F9F7] rounded-3xl p-5 md:p-6 space-y-5">
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5B6F67]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#14724F]"></div>
                  Curated Pipeline #Q-9481
                </div>
                <div className="bg-[#14724F] text-white px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5"/> Admin Verified
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAF3EF] shadow-sm">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[#5B6F67] text-[9px] font-black tracking-widest uppercase">Logical Syllogism Check</span>
                  <span className="bg-[#EAF3EF] text-[#14724F] px-2 py-0.5 rounded text-[9px] font-bold">Difficulty: 7.8/10</span>
                </div>
                <p className="text-[#10241E] text-[13px] font-medium italic leading-relaxed opacity-90">
                  "All coders are analysts. Some analysts are strategists. No strategist is a tester..."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#EAF3EF] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#10241E] font-bold text-[12px] mb-0.5">
                    <Check className="w-3.5 h-3.5 text-[#14724F]"/> Zero Ambiguity
                  </div>
                  <div className="text-[#5B6F67] text-[10px]">Dual-instructor audited</div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#EAF3EF] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#10241E] font-bold text-[12px] mb-0.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[#14724F]"/> Novel Variations
                  </div>
                  <div className="text-[#5B6F67] text-[10px]">No outdated copy-paste</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="text-[80px] md:text-[96px] font-black text-[#14724F]/10 leading-none -ml-1 -mb-8 select-none">02</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#10241E] leading-tight">
              Vetted AI questions with zero ambiguity
            </h3>
            <p className="text-lg text-[#5B6F67] leading-relaxed max-w-lg">
              Standard question banks reuse the same stale problems from 2012. AptiFlow continuously generates fresh problem variations, but passes each one through human pedagogical gatekeepers before publishing.
            </p>
            
            <ul className="space-y-5 pt-4">
              {[
                {title: "Never memorize answers", desc: "Train intuition on novel problem setups that test underlying theory."},
                {title: "Flawless keys", desc: "Every distracter option is hand-verified to ensure true mathematical uniqueness."},
                {title: "Realistic company styles", desc: "Questions tailored to match TCS NQT, AMCAT, eLitmus, and CAT standards."}
              ].map(b => (
                <li key={b.title} className="flex gap-3.5 max-w-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#14724F] flex-shrink-0 mt-0.5" />
                  <div className="text-[15px]">
                    <span className="font-extrabold text-[#10241E]">{b.title}: </span>
                    <span className="text-[#5B6F67]">{b.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature 03 */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10 mt-16 lg:mt-24 mb-10">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="text-[80px] md:text-[96px] font-black text-[#14724F]/10 leading-none -ml-1 -mb-8 select-none">03</div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#10241E] leading-tight">
              Realistic timed tests & national benchmarking
            </h3>
            <p className="text-lg text-[#5B6F67] leading-relaxed max-w-lg">
              Doing problems untimed is easy. Solving under the ticking clock of a placement drive is completely different. Replicate true exam pressure in a distraction-free cockpit.
            </p>
            
            <ul className="space-y-5 pt-4">
              {[
                {title: "Strict sectional constraints", desc: "Train time management for strict countdown blocks."},
                {title: "Negative marking simulation", desc: "Learn when to take an educated guess versus skip."},
                {title: "Peer percentiles", desc: "See exactly where your speed stands among top aspirants."}
              ].map(b => (
                <li key={b.title} className="flex gap-3.5 max-w-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#14724F] flex-shrink-0 mt-0.5" />
                  <div className="text-[15px]">
                    <span className="font-extrabold text-[#10241E]">{b.title}: </span>
                    <span className="text-[#5B6F67]">{b.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Mock UI */}
          <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-[0_20px_50px_rgba(20,114,79,0.05)] border border-[#EAF3EF] max-w-[480px] w-full mx-auto h-fit">
            <div className="bg-[#F5F9F7] rounded-3xl p-5 md:p-6 space-y-5">
              
              <div className="flex justify-between items-start border-b border-[#EAF3EF] pb-5 mb-5">
                <div>
                  <div className="text-[#10241E] font-bold text-[14px]">National Mock Drive #14</div>
                  <div className="text-[#5B6F67] text-[10px] mt-1">General Placement Pattern (CAT & Tech Drives)</div>
                </div>
                <div className="border border-[#14724F] text-[#14724F] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 bg-white shadow-sm">
                  LIVE EXAM
                </div>
              </div>

              <div>
                <div className="text-[#5B6F67] text-[11px] font-bold mb-3">Question Navigation Palette (30 Total):</div>
                <div className="flex flex-wrap gap-2">
                  {[1,2,3,4,5].map(n => (
                    <div key={n} className="w-7 h-7 rounded-full bg-[#14724F] text-white flex items-center justify-center text-[11px] font-bold shadow-sm">
                      {n}
                    </div>
                  ))}
                  {[6,7,8,9,10].map(n => (
                    <div key={n} className="w-7 h-7 rounded-full bg-white border border-[#C5D0CA] text-[#5B6F67] flex items-center justify-center text-[11px] font-bold">
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 mt-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5B6F67]">
                  <div className="w-2 h-2 rounded-full bg-[#14724F]"></div> 4 Answered
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5B6F67]">
                  <div className="w-2 h-2 rounded-full bg-[#E05252]"></div> 1 Flagged
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5B6F67]">
                  <div className="w-2 h-2 rounded-full border border-[#C5D0CA]"></div> 25 Unvisited
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Methodical Preparation (How it works) */}
      <section id="how-it-works" className="px-4 py-24 md:py-32 bg-[#EAF3EF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center mb-16 space-y-6">
          <div className="text-[#14724F] text-[11px] font-bold tracking-widest uppercase">METHODICAL PREPARATION</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#10241E] tracking-tight">How AptiFlow accelerates readiness</h2>
          <p className="text-lg text-[#5B6F67]">From your first diagnostic practice session to exam day confidence in four clear steps.</p>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-4 gap-6">
          {[
            { num: "01", title: "Choose a Topic", desc: "Select Quantitative, Logical Reasoning, Verbal, or Probability according to target company patterns." },
            { num: "02", title: "Practice or Drill", desc: "Engage in untimed conceptual practice drills or jump into strict real-time countdown mock tests." },
            { num: "03", title: "Absorb Shortcuts", desc: "Learn the optimal 30-second shortcut approach for every failed question to eliminate unnecessary algebra." },
            { num: "04", title: "Track & Excel", desc: "Benchmark performance, review personalized weak-spot analytics, and climb into top 1% percentiles." }
          ].map((step) => (
            <div key={step.num} className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-start hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#14724F] text-white font-extrabold flex items-center justify-center mb-6">
                {step.num}
              </div>
              <h3 className="text-xl font-extrabold text-[#10241E] mb-3">{step.title}</h3>
              <p className="text-[#5B6F67] text-[14px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Human + AI Verification Pipeline (Trust) */}
      <section className="px-4 py-24 md:py-32 bg-[#E3F4EA]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#D1F0DE] flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-6 h-6 text-[#14724F]" />
            </div>
            <h2 className="text-3xl md:text-[42px] font-extrabold text-[#10241E] tracking-tight leading-tight">
              Quality You Can Rely On: AI Drafted,<br/> Human Admin Verified
            </h2>
            <p className="text-[15px] text-[#5B6F67] leading-relaxed max-w-2xl mx-auto font-medium">
              Generic AI test tools hallucinate incorrect answer keys and impossible constraints. AptiFlow combines the rapid scalability of LLMs with stringent human pedagogical oversight.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#EAF3EF] text-[#14724F] px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                  STAGE 01
                </span>
                <Sparkles className="w-5 h-5 text-[#14724F]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#10241E] mb-3">AI Problem Generation</h3>
              <p className="text-[13px] text-[#5B6F67] leading-[1.6] font-medium">
                Models synthesize realistic word scenarios, diverse mathematical variables, and realistic distracter answer choices based on past placement trends.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(20,114,79,0.08)] border-[1.5px] border-[#14724F]/10 transform md:scale-105 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#024329] text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                  STAGE 02 • CORE GUARD
                </span>
                <UserCog className="w-5 h-5 text-[#14724F]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#10241E] mb-3">Subject Expert Audit</h3>
              <p className="text-[13px] text-[#5B6F67] leading-[1.6] font-medium">
                Experienced aptitude educators recalculate step solutions, eliminate semantic ambiguity, and verify mathematical solvability within 60 seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#EAF3EF] text-[#14724F] px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                  STAGE 03
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#14724F]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#10241E] mb-3">Published to Test Pool</h3>
              <p className="text-[13px] text-[#5B6F67] leading-[1.6] font-medium">
                Question is digitally stamped, tagged with accurate difficulty parameters, and unlocked for live candidate mock evaluations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-24 md:py-32 bg-[#EAF3EF]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="text-[#14724F] text-[10px] font-black tracking-widest uppercase">GOT QUESTIONS?</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#10241E] tracking-tight">Frequently Asked Questions</h2>
            <p className="text-[14px] text-[#5B6F67] font-medium">Everything you need to know about preparing with the AptiFlow platform.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[16px] overflow-hidden cursor-pointer shadow-sm transition-all border border-[#EAF3EF]"
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <div className="p-6 flex justify-between items-center select-none">
                  <h4 className="text-[15px] font-bold text-[#10241E] pr-8">{faq.q}</h4>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#14724F] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5B6F67] flex-shrink-0" />
                  )}
                </div>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-[13.5px] text-[#5B6F67] leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-24 bg-[#EAF3EF]">
        <div className="max-w-7xl mx-auto bg-[#1C2C27] rounded-[40px] px-6 py-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative faint circles */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#14724F]/20 rounded-full blur-3xl translate-y-1/4 translate-x-1/4"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14724F]/30 border border-[#14724F]/50 text-[#4ADE80] text-[9px] font-black tracking-widest uppercase mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
              READY TO BEGIN
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Start your aptitude practice today
            </h2>
            
            <p className="text-[#A3B8B0] text-base mb-10 max-w-lg font-medium leading-relaxed">
              Join over 25,000+ candidates sharpening their problem-solving speed and accuracy. Free access included, no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto justify-center">
              <Link to="/register" className="w-full sm:w-auto bg-white text-[#10241E] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#F5F9F7] transition-colors flex items-center justify-center gap-2">
                Get started for free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/topics" className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/5 transition-colors text-center">
                Browse all question topics
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-bold text-[#A3B8B0]">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Instant access</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> No card needed</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Verified solutions</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

