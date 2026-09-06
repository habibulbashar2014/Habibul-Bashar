import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CareerObjective } from './components/CareerObjective';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Languages } from './components/Languages';
import { Hobbies } from './components/Hobbies';
import { PersonalProfile } from './components/PersonalProfile';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminFloatingControl } from './components/AdminFloatingControl';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function PortfolioApp() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hb-theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('hb-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hb-theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#1E293B] dark:bg-[#0F172A] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Sticky Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCv={() => setCvModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero onOpenCv={() => setCvModalOpen(true)} />
        <About onOpenCv={() => setCvModalOpen(true)} />
        <CareerObjective />
        <Education />
        <Skills />
        <Languages />
        <Hobbies />
        <PersonalProfile onOpenCv={() => setCvModalOpen(true)} />
        <Contact onOpenCv={() => setCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCv={() => setCvModalOpen(true)} />

      {/* CV Download / Print Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

      {/* Admin Modals & Controls */}
      <AdminLoginModal />
      <AdminPanel />
      <AdminFloatingControl />

      {/* Floating Back to Top Button */}
      {showFloatingTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          id="floating-back-to-top-btn"
          className="fixed bottom-24 right-6 z-40 p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 no-print"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Animated Floating WhatsApp Popup Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
