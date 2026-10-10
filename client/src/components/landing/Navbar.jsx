import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, User } from 'lucide-react';
import { landingContent } from '../../pages/landing/landingContent';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, links } = landingContent.nav;

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-[#0B3D2E]">{logo}</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="p-2 rounded-full border border-slate-200/60 bg-white/50 text-[#0B3D2E] hover:bg-white hover:border-[#10B981]/40 transition-all">
              <Moon className="w-4 h-4" />
            </button>
            <Link to="/login" className="text-sm font-bold text-[#0B3D2E] hover:text-[#10B981] transition-colors">Log in</Link>
            <Link to="/register" className="text-sm font-bold bg-[#0B3D2E] text-white px-5 py-2.5 rounded-full hover:bg-[#07291F] hover:shadow-lg transition-all">
              Get started
            </Link>
            <Link to="/dashboard" className="p-2 rounded-full bg-[#0B3D2E] text-white hover:bg-[#07291F] hover:shadow-lg transition-all flex items-center justify-center">
              <User className="w-4 h-4" />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button className="p-2 rounded-full border border-slate-200/60 bg-white/50 text-[#0B3D2E]">
              <Moon className="w-4 h-4" />
            </button>
            <Link to="/dashboard" className="p-2 rounded-full bg-[#0B3D2E] text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0B3D2E]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-[#EAF7F0] border-b border-[#0B3D2E]/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] hover:bg-white/30">
                {link.label}
              </a>
            ))}
            <Link to="/login" className="block px-3 py-2 text-base font-bold text-[#0B3D2E]/80 hover:text-[#0B3D2E] hover:bg-white/30">Log in</Link>
            <Link to="/register" className="block px-3 py-2 text-base font-bold text-[#0B3D2E] hover:bg-white/30">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
