import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname.startsWith(to) && to !== '/') || (to === '/topics' && (location.pathname.startsWith('/practice') || location.pathname.startsWith('/test')));

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

  const links = navLinks[userRole] || [];

  return (
    <header className="sticky top-[12px] mt-[12px] z-40 mx-auto w-[calc(100%-32px)] max-w-[1280px] rounded-[20px] bg-glass-strong border border-border" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: 'var(--shadow)' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 focus-visible rounded-lg px-2 py-1">
              <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--teal)] drop-shadow-[0_0_15px_rgba(20,114,79,0.4)]">AptiFlow</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map(link => (
              <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
            ))}

            <div className="w-px h-6 bg-glass-border mx-2" />

            <ThemeToggle />

            {userRole !== 'guest' && (
              <NavLink to="/profile">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </div>
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-glass focus-visible"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-glass-border bg-glass-strong">
          <div className="px-2 pt-2 pb-3 space-y-1">
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
            {userRole !== 'guest' && (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-glass flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Profile
              </Link>
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
