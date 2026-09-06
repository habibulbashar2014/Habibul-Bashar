import React from 'react';
import {
  FileDown,
  User,
  ExternalLink,
  Laptop,
  FileSpreadsheet,
  Cpu,
  GraduationCap,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  ArrowDown,
  MessageCircle,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import defaultAvatarImg from '../assets/images/habibul_bashar_avatar_1788668051645.jpg';

interface HeroProps {
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv }) => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const avatarSource = personalInfo.avatarUrl || defaultAvatarImg;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 sm:pt-28 sm:pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/80"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-sky-400/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status / Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities & Growth
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300">{personalInfo.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 tracking-normal">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.shortIntro}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenCv}
                id="hero-download-cv-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download My CV</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollTo('profile')}
                id="hero-view-profile-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <span>View Profile</span>
              </button>
            </div>

            {/* Quick Metrics Bar from Professional Polish */}
            <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 w-full border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                  {personalInfo.stats?.graduationYear || '2022'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">Graduation</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                  {personalInfo.stats?.skillsCount || '7+'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">IT Skills</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                  {personalInfo.stats?.nuCgpa || '2.92'}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-widest">NU CGPA</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Connect:
              </span>
              <div className="flex items-center gap-2.5">
                {personalInfo?.socials?.facebook && (
                  <a
                    href={personalInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-social-facebook"
                    aria-label="Facebook Profile"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:scale-110 shadow-sm"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {personalInfo?.socials?.instagram && (
                  <a
                    href={personalInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-social-instagram"
                    aria-label="Instagram Profile"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-400 dark:hover:border-pink-600 transition-all hover:scale-110 shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {personalInfo?.socials?.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-social-linkedin"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:scale-110 shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {personalInfo?.socials?.whatsapp && (
                  <a
                    href={personalInfo.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="hero-social-whatsapp"
                    aria-label="WhatsApp Chat"
                    title="Chat on WhatsApp"
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:scale-110 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    id="hero-social-email"
                    aria-label={`Email ${personalInfo.name}`}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:scale-110 shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Circular Profile Image with Animated Border & Floating Badges */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
              {/* Outer decorative spinning / glowing border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-[3px] animate-[spin_16s_linear_infinite] opacity-80 blur-[1px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-950" />
              </div>

              {/* Second subtle counter-ring */}
              <div className="absolute inset-3 rounded-full border-2 border-dashed border-blue-400/40 dark:border-blue-500/30 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Inner Profile Image Circle Container */}
              <div className="relative w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/20">
                <img
                  src={avatarSource}
                  alt={`${personalInfo.name} - Professional Profile`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full select-none"
                  onError={(e) => {
                    // Fallback to default avatar if custom url fails
                    const target = e.currentTarget;
                    if (target.src !== defaultAvatarImg) {
                      target.src = defaultAvatarImg;
                    }
                  }}
                />
              </div>

              {/* Active Green Status Dot */}
              <div 
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-emerald-500 w-6 sm:w-7 h-6 sm:h-7 border-4 border-white dark:border-slate-900 rounded-full shadow-md z-20 animate-pulse" 
                title="Active & Available"
              />

              {/* Subtle Floating Elements */}
              {/* Badge 1: Computer Skills (Top-Left) */}
              <div className="absolute -top-3 left-0 sm:-left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3.5 shadow-lg shadow-slate-900/5 flex items-center gap-2.5 animate-bounce [animation-duration:5s] hover:scale-105 transition-transform select-none">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Laptop className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Proficiency
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Computer Skills
                  </p>
                </div>
              </div>

              {/* Badge 2: Microsoft Office (Bottom-Left) */}
              <div className="absolute -bottom-2 -left-2 sm:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3.5 shadow-lg shadow-slate-900/5 flex items-center gap-2.5 animate-bounce [animation-duration:6s] [animation-delay:1s] hover:scale-105 transition-transform select-none">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Productivity
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Microsoft Office
                  </p>
                </div>
              </div>

              {/* Badge 3: Technology (Top-Right) */}
              <div className="absolute top-4 -right-2 sm:-right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3.5 shadow-lg shadow-slate-900/5 flex items-center gap-2.5 animate-bounce [animation-duration:5.5s] [animation-delay:0.5s] hover:scale-105 transition-transform select-none">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Enthusiast
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Technology
                  </p>
                </div>
              </div>

              {/* Badge 4: Continuous Learning (Bottom-Right) */}
              <div className="absolute -bottom-4 right-0 sm:-right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3.5 shadow-lg shadow-slate-900/5 flex items-center gap-2.5 animate-bounce [animation-duration:6.5s] [animation-delay:1.5s] hover:scale-105 transition-transform select-none">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Mindset
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Continuous Learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => handleScrollTo('about')}
            className="flex flex-col items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group focus:outline-none"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium tracking-wide mb-1">Scroll to explore</span>
            <div className="w-7 h-11 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center p-1">
              <span className="w-1.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
