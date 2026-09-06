import React from 'react';
import { Languages as LanguagesIcon, CheckCircle2, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Languages: React.FC = () => {
  const { data } = usePortfolio();
  const languagesList = data.languages;
  const getLevelDisplay = (level: 'High' | 'Medium' | 'Basic') => {
    switch (level) {
      case 'High':
        return {
          percentage: '90%',
          label: 'High',
          badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          barClass: 'from-emerald-500 to-teal-500',
          dots: 3,
        };
      case 'Medium':
        return {
          percentage: '70%',
          label: 'Medium',
          badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          barClass: 'from-blue-500 to-indigo-500',
          dots: 2,
        };
      default:
        return {
          percentage: '40%',
          label: 'Basic',
          badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          barClass: 'from-slate-400 to-slate-500',
          dots: 1,
        };
    }
  };

  return (
    <section id="languages" className="py-20 sm:py-24 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80">
            Linguistic Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Language Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Effective communication capabilities across regional and international languages.
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {languagesList.map((lang) => (
            <div
              key={lang.language}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <LanguagesIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {lang.language}
                        </h3>
                        {lang.nativeName && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {lang.nativeName}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {lang.status}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                {/* Criteria Meters */}
                <div className="py-6 space-y-5">
                  {(['reading', 'writing', 'speaking'] as const).map((skillKey) => {
                    const levelVal = lang.levels[skillKey];
                    const meta = getLevelDisplay(levelVal);
                    const formattedLabel = skillKey.charAt(0).toUpperCase() + skillKey.slice(1);

                    return (
                      <div key={skillKey} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {formattedLabel}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[1, 2, 3].map((dot) => (
                                <span
                                  key={dot}
                                  className={`w-2 h-2 rounded-full ${
                                    dot <= meta.dots
                                      ? 'bg-blue-600 dark:bg-blue-400'
                                      : 'bg-slate-200 dark:bg-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-md border ${meta.badgeClass}`}
                            >
                              {meta.label}
                            </span>
                          </div>
                        </div>

                        {/* Visual Progress Track */}
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${meta.barClass} transition-all duration-500`}
                            style={{ width: meta.percentage }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              {lang.note && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{lang.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
