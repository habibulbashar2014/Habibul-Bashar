import React from 'react';
import { Target, Laptop, BookOpen, Rocket, FileDown, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  onOpenCv: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCv }) => {
  const { data } = usePortfolio();
  const { personalInfo, highlightCards } = data;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target':
        return <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'laptop':
        return <Laptop className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'book-open':
        return <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'rocket':
        return <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-24 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80">
            Professional Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {personalInfo.aboutText}
          </p>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightCards.map((card, idx) => (
            <div
              key={card.title}
              id={`about-highlight-${idx}`}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  {getIcon(card.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {card.stats && (
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>{card.stats}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download CV CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full pointer-events-none -z-0" />
          <div className="space-y-1.5 text-center sm:text-left relative z-10">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Interested in my complete background & academic track record?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Download my official curriculum vitae in a clean, print-ready document.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCv}
            id="about-download-cv-btn"
            className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FileDown className="w-4 h-4" />
            <span>Download My CV</span>
          </button>
        </div>
      </div>
    </section>
  );
};
