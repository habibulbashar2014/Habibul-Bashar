import React from 'react';
import {
  FileText,
  Table,
  Presentation,
  LayoutGrid,
  Cpu,
  Wrench,
  Globe,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const skillsList = data.skills;

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'file-text':
        return <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'table':
        return <Table className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'presentation':
        return <Presentation className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      case 'layout-grid':
        return <LayoutGrid className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-24 bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80">
            Technical Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Computer Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Applied technical knowledge in modern office productivity suites, operating systems, hardware setups, and troubleshooting.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsList.map((skill, idx) => (
            <div
              key={skill.name}
              id={`skill-card-${idx}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header row: Icon + Category */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center shadow-xs">
                    {getSkillIcon(skill.icon)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>

              {/* Tags / Sub-skills */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Practical Experience Highlights */}
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            <div className="pt-4 md:pt-0">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Operating Systems
              </span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Windows 7, 8, 8.1 & 10
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Installation, configuration & maintenance
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Office Productivity
              </span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                MS Word, Excel & PowerPoint
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Accurate documentation, sheets & slides
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Hardware & Support
              </span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Setup & Diagnostics
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Peripherals, troubleshooting & issue resolution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
