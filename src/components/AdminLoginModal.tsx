import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoginModalOpen) {
      setPassword('');
      setError('');
      setShowPassword(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('অনুগ্রহ করে পাসওয়ার্ড দিন');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await loginAdmin(password);
      if (!success) {
        setError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
        setPassword('');
        inputRef.current?.focus();
      }
    } catch {
      setError('লগইন করার সময় ত্রুটি হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h3
            id="admin-login-title"
            className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Admin Panel Login
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Enter your secret passcode to edit portfolio content
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700 dark:text-rose-300 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="admin-password-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
            >
              Secret Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Verifying...' : 'Unlock Admin Panel'}</span>
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Protected & Encrypted Session • Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700">Ctrl + Shift + A</kbd>
          </p>
        </div>
      </div>
    </div>
  );
};
