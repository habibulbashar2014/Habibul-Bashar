import React from 'react';
import { Quote, Sparkles, Compass } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const CareerObjective: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="py-12 sm:py-16 bg-transparent transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm">
          {/* Decorative corner accent from Professional Polish design */}
          <div className="absolute top-0 right-0 w-36 sm:w-44 h-36 sm:h-44 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full pointer-events-none -z-0" />
          <Quote className="absolute right-6 bottom-6 w-20 h-20 text-slate-100 dark:text-slate-800/50 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                Career Objective
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-4 mb-3 leading-tight text-slate-900 dark:text-white">
                Hi, I'm {personalInfo.shortName} — <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400">Technology Enthusiast & Lifelong Learner</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base max-w-3xl italic border-l-4 border-blue-600 dark:border-blue-400 pl-4 py-1 my-3">
                “{personalInfo.careerObjective}”
              </p>
            </div>

            {/* Stat metrics row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.stats?.graduationYear || '2022'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">
                  Honours Degree
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.stats?.skillsCount || '7+'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">
                  Technical Competencies
                </span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {personalInfo.stats?.nuCgpa || '2.92'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">
                  National University
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
