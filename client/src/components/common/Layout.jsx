import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, User, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to ||
    (to !== '/' && to !== '/admin' && location.pathname.startsWith(to)) ||
    (to === '/topics' && (location.pathname.startsWith('/practice') || location.pathname.startsWith('/test')));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all focus-visible ${isActive
        ? 'bg-[color:var(--primary)] text-white shadow-md'
        : 'text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-glass'
        }`}
    >
      {children}
    </Link>
  );
}

export function Navbar({ userRole = 'guest', onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = {
    guest: [
      { to: '/login', label: 'Login' },
      { to: '/register', label: 'Register' }
    ],
    student: [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/topics', label: 'Topics' },
      { to: '/leaderboard', label: 'Leaderboard' },
      { to: '/history', label: 'History' }
    ],
    admin: [
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/topics', label: 'Topics' },
      { to: '/admin/questions', label: 'Questions' },
      { to: '/admin/users', label: 'Users' }
    ]
  };

  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <header className="absolute top-0 w-full z-50">
        <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center gap-2.5 focus-visible rounded-lg px-2 py-1">
              <span className="font-extrabold text-3xl tracking-tighter text-[#10241E]">AptiFlow</span>
            </Link>
            <Link to="/" className="text-[14px] font-bold text-[#5B6F67] hover:text-[#10241E] bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/60 px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const links = navLinks[userRole] || [];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-2xl transition-all">
      <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 focus-visible rounded-lg px-2 py-1">
              <span className="font-extrabold text-3xl tracking-tighter text-[#10241E]">AptiFlow</span>
            </Link>
          </div>

          {/* Centered Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {userRole === 'guest' ? (
              <>
                <a href="/#features" className="text-[15px] font-extrabold text-[#14724F] hover:text-[#10241E] transition-colors">Features</a>
                <a href="/#topics" className="text-[15px] font-extrabold text-[#14724F] hover:text-[#10241E] transition-colors">Topics</a>
                <a href="/#how-it-works" className="text-[15px] font-extrabold text-[#14724F] hover:text-[#10241E] transition-colors">How it works</a>
                <a href="/#faq" className="text-[15px] font-extrabold text-[#14724F] hover:text-[#10241E] transition-colors">Quality & FAQ</a>
              </>
            ) : (
              <div className="flex items-center gap-6">
                {links.map(link => (
                  <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
                ))}
              </div>
            )}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            
            {userRole === 'guest' ? (
              <>
                <Link to="/login" className="text-[15px] font-extrabold text-[#5B6F67] hover:text-[#10241E] transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-[#10241E] text-white px-6 py-2.5 rounded-full text-[15px] font-bold hover:bg-[#1A3A30] transition-colors shadow-md">
                  Get started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onLogout} className="text-[#5B6F67] hover:text-[#10241E] font-bold text-[13px] px-2 py-1 h-auto">
                  Log out
                </Button>
                <Link to="/profile" className="w-8 h-8 rounded-full bg-[#10241E] text-white flex items-center justify-center hover:bg-[#1A3A30] transition-colors shadow-md">
                  <User className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-secondary hover:text-primary focus-visible"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#10241E]" /> : <Menu className="w-6 h-6 text-[#10241E]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-glass-border bg-glass-strong">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {userRole === 'guest' ? (
              <>
                <a href="/#features" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass">Features</a>
                <a href="/#topics" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass">Topics</a>
                <a href="/#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass">How it works</a>
                <a href="/#faq" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass">Quality & FAQ</a>
              </>
            ) : (
              <>
                {links.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return null;
}
