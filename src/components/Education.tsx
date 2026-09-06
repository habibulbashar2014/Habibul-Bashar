import React from 'react';
import { GraduationCap, Award, Calendar, School, Building2, BookCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const educationList = data.education;
  return (
    <section id="education" className="py-20 sm:py-24 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80">
            Education Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Qualification
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Formal educational background and academic milestones achieved with consistency.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central connector line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-500 to-slate-300 dark:to-slate-800" />

          {/* Left connector line for mobile */}
          <div className="md:hidden absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-500 to-slate-300 dark:to-slate-800" />

          <div className="space-y-12">
            {educationList.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.degree}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge/Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-md shadow-blue-500/20 z-10">
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Empty spacer for alternating sides on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div
                    className={`pl-16 md:pl-0 w-full md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1">
                      {/* Top Meta: Year & Level Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          <Calendar className="w-3.5 h-3.5" />
                          Passing Year: {item.year}
                        </span>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80">
                          <Award className="w-3.5 h-3.5" />
                          <span>Result: {item.result}</span>
                        </div>
                      </div>

                      {/* Degree Title */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                        {item.degree}
                      </h3>

                      {/* Institution & Board */}
                      <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.institution}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <School className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>
                            {item.type === 'higher' ? 'Affiliation / University' : 'Education Board'}:{' '}
                            <strong className="text-slate-700 dark:text-slate-200 font-medium">
                              {item.boardOrUniversity}
                            </strong>
                          </span>
                        </div>
                      </div>

                      {/* Optional Context Details */}
                      {item.details && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
