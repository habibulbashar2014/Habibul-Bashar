import React from 'react';
import { ArrowUp, Heart, Facebook, Instagram, Linkedin, Mail, Lock, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onOpenCv: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCv }) => {
  const { data, isAdminLoggedIn, setIsAdminPanelOpen, setIsLoginModalOpen } = usePortfolio();
  const { personalInfo } = data;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Languages', href: '#languages' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="font-display tracking-tight text-base font-bold">{personalInfo.initials}</span>
              </div>
              <span className="font-display font-bold text-xl text-slate-800 dark:text-white tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenCv}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              CV
            </button>
          </div>

          {/* Back to top button */}
          <div className="md:col-span-2 flex items-center justify-center md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              id="footer-back-to-top-btn"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-xs font-bold shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100 dark:border-slate-800" />

        {/* Bottom copyright line with Admin Lock access */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p className="font-semibold">
            © {currentYear} {personalInfo.name}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1 font-medium">
              <span>Designed & Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>by {personalInfo.name}</span>
            </p>

            <button
              type="button"
              onClick={() => {
                if (isAdminLoggedIn) {
                  setIsAdminPanelOpen(true);
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              id="footer-admin-trigger-btn"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Admin Panel (Ctrl+Shift+A)"
            >
              {isAdminLoggedIn ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Lock className="w-3 h-3" />
              )}
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
