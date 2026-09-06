import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenCv }) => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Languages', href: '#languages' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setIsScrolled(currentScroll > 20);

      // Section spy
      const sections = ['home', 'about', 'education', 'skills', 'languages', 'hobbies', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 pointer-events-none">
      {/* Scroll progress bar (pinned at very top) */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-sm transition-all duration-300">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <span className="font-display tracking-tight">{personalInfo.initials}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {personalInfo.shortName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Technology Enthusiast
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors cursor-pointer py-1 relative ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Theme Toggle & CV Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              id="theme-toggle-btn"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              type="button"
              onClick={onOpenCv}
              id="nav-download-cv-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              id="mobile-menu-toggle"
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md shadow-blue-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>Download My CV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
