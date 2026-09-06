import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCheck, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [message, setMessage] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  const rawPhone = '+8801518477577';
  const cleanPhone = '8801518477577';

  // Show floating tooltip prompt after a gentle delay to catch attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenWhatsApp = (customText?: string) => {
    const textToSend = customText || message.trim() || 'Hello Md. Habibul Bashar, I visited your portfolio and would like to connect!';
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setShowPrompt(false);
  };

  const quickPrompts = [
    { label: '💼 Job / Project Opportunity', text: 'Hello Habibul! I have a project/job opportunity and would like to discuss with you.' },
    { label: '🤝 Professional Inquiry', text: 'Hi Md. Habibul Bashar, I found your portfolio profile and would like to connect.' },
    { label: '💬 Just saying Hello!', text: 'Hello Md. Habibul Bashar! Nice portfolio!' },
  ];

  const avatarSrc = personalInfo.avatarUrl || 'https://res.cloudinary.com/cvbxk5vv/image/upload/v1788674181/WhatsApp_Image_2026-09-06_at_11.08.54_AM.jpg';

  return (
    <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col items-end" ref={popupRef}>
      {/* Floating Animated Prompt Pill / Tooltip */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="mb-3 max-w-[240px] sm:max-w-xs bg-white dark:bg-slate-900 border border-emerald-500/30 rounded-2xl p-3 shadow-xl shadow-emerald-500/10 flex items-start gap-2.5 cursor-pointer hover:border-emerald-500 transition-colors"
            onClick={() => {
              setIsOpen(true);
              setShowPrompt(false);
            }}
          >
            <span className="relative flex h-3 w-3 mt-0.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="text-xs text-slate-700 dark:text-slate-200">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Chat on WhatsApp
              </span>
              <span>Need quick assistance? Let&apos;s talk directly!</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
              }}
              aria-label="Dismiss message prompt"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Interactive Pop-up Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.18 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[360px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col"
          >
            {/* Header with WhatsApp Emerald Styling */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={avatarSrc}
                    alt={personalInfo.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/80 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    <span>{personalInfo.shortName || personalInfo.name}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  </h4>
                  <p className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Active on WhatsApp ({rawPhone})</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat popup"
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body simulating conversation */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/70 space-y-3.5 max-h-[320px] overflow-y-auto">
              <div className="text-center">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Direct WhatsApp Chat
                </span>
              </div>

              {/* Bot / Owner Greeting Message Bubble */}
              <div className="flex items-end gap-2 max-w-[88%]">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs text-slate-800 dark:text-slate-200 space-y-1">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                    Md. Habibul Bashar
                  </p>
                  <p className="leading-relaxed">
                    Hello! 👋 Welcome to my portfolio. Feel free to send me a message on WhatsApp for any inquiries, discussions, or opportunities.
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
                    <span>Just now</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Quick Prompt Options */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block px-1">
                  Quick Inquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOpenWhatsApp(item.text)}
                      className="text-left text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-200 transition-all font-medium flex items-center justify-between group shadow-2xs"
                    >
                      <span>{item.label}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input & Direct Send Footer */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a custom message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleOpenWhatsApp();
                    }
                  }}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleOpenWhatsApp()}
                  id="whatsapp-popup-send-btn"
                  title="Send via WhatsApp"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-transform hover:scale-105 active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline py-0.5"
              >
                Or click here to open WhatsApp directly (wa.me/{rawPhone})
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated WhatsApp Trigger Button */}
      <div className="relative group">
        {/* Continuous pulsing halo around button */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/60 animate-ping opacity-60 pointer-events-none" />
        <span className="absolute -inset-2 rounded-full bg-emerald-400/20 animate-pulse pointer-events-none" />

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowPrompt(false);
          }}
          id="floating-whatsapp-btn"
          aria-label="Open WhatsApp conversation"
          className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform active:scale-95 ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-900 rotate-90 shadow-slate-900/30'
              : 'bg-[#25D366] hover:bg-[#20ba5a] hover:scale-110 shadow-emerald-500/40'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <MessageCircle className="w-7 h-7 fill-white/20 transition-transform" />
          )}

          {/* Active green status indicator dot when closed */}
          {!isOpen && (
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
