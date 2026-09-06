import React from 'react';
import {
  User,
  Calendar,
  MapPin,
  Flag,
  Heart,
  ShieldCheck,
  FileDown,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface PersonalProfileProps {
  onOpenCv: () => void;
}

export const PersonalProfile: React.FC<PersonalProfileProps> = ({ onOpenCv }) => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const profileDetails = [
    {
      label: 'Full Name',
      value: personalInfo.name,
      icon: <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      label: 'Date of Birth',
      value: personalInfo.dateOfBirth,
      icon: <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      label: 'Home District',
      value: personalInfo.homeDistrict,
      icon: <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      label: 'Nationality',
      value: personalInfo.nationality,
      icon: <Flag className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    },
    {
      label: 'Marital Status',
      value: personalInfo.maritalStatus,
      icon: <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <section id="profile" className="py-20 sm:py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
            Official Details
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Personal Profile
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Verified basic personal details suitable for public professional display.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-900/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {profileDetails.map((item, idx) => (
              <div
                key={item.label}
                id={`profile-item-${idx}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.label}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Verification status block */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/70">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Profile Status
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  Verified Candidate Profile
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Note & View Full CV Action */}
          <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3 max-w-xl text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Privacy Policy:</strong> In compliance with online privacy standards, sensitive identifiers (National ID number, blood group, religion, parents’ names, and full permanent home address) are withheld from public display. Authorized employers can access the complete credentials via the official CV.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenCv}
              id="profile-view-full-cv-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FileDown className="w-4 h-4" />
              <span>View Full CV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
