import React from 'react';
import { BookOpen, Bike, Trophy, Activity, HeartHandshake } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hobbies: React.FC = () => {
  const { data } = usePortfolio();
  const hobbiesList = data.hobbies;
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'cricket':
        return <Trophy className="w-7 h-7 text-amber-500" />;
      case 'football':
        return <Activity className="w-7 h-7 text-emerald-500" />;
      case 'badminton':
        return <HeartHandshake className="w-7 h-7 text-rose-500" />;
      case 'book':
        return <BookOpen className="w-7 h-7 text-blue-500" />;
      case 'bike':
        return <Bike className="w-7 h-7 text-sky-500" />;
      default:
        return <Activity className="w-7 h-7 text-blue-500" />;
    }
  };

  const getEmoji = (name: string) => {
    if (name.includes('Cricket')) return '🏏';
    if (name.includes('Football')) return '⚽';
    if (name.includes('Badminton')) return '🏸';
    if (name.includes('Reading')) return '📚';
    if (name.includes('Cycling')) return '🚴';
    return '⭐';
  };

  return (
    <section id="hobbies" className="py-20 sm:py-24 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80">
            Personal Life & Wellness
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hobbies & Interests
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Activities and athletic passions that maintain high energy, mental clarity, and teamwork skills.
          </p>
        </div>

        {/* Hobby Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {hobbiesList.map((hobby, idx) => (
            <div
              key={hobby.name}
              id={`hobby-card-${idx}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between text-center items-center"
            >
              <div className="space-y-4 flex flex-col items-center">
                {/* Emoji / Icon combo badge */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                    <span>{getEmoji(hobby.name)}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                    {getHobbyIcon(hobby.icon)}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {hobby.name}
                  </h3>
                  <span className="inline-block mt-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/60">
                    {hobby.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {hobby.description}
                </p>
              </div>

              <div className="w-full pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                Active pursuit
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
