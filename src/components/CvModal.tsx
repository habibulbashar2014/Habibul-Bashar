import React from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  MapPin,
  GraduationCap,
  Laptop,
  Languages as LanguagesIcon,
  User,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const { personalInfo, education, skills, languages, hobbies } = data;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTextCv = () => {
    const cvText = `=====================================================
CURRICULUM VITAE - ${personalInfo.name.toUpperCase()}
=====================================================

CONTACT INFORMATION:
Name: ${personalInfo.name}
Email: ${personalInfo.email}
Location: ${personalInfo.location}
LinkedIn: ${personalInfo.socials.linkedin}
Facebook: ${personalInfo.socials.facebook}
Instagram: ${personalInfo.socials.instagram}

CAREER OBJECTIVE:
"${personalInfo.careerObjective}"

ACADEMIC QUALIFICATIONS:
${education
  .map(
    (e, idx) =>
      `${idx + 1}. ${e.degree} (${e.year})\n   Institution: ${e.institution}\n   Board/University: ${e.boardOrUniversity}\n   Result: ${e.result}`
  )
  .join('\n\n')}

COMPUTER SKILLS:
${skills.map((s) => `- ${s.name}: ${s.description}`).join('\n')}

LANGUAGE SKILLS:
${languages.map((l) => `- ${l.language}: Reading (${l.levels.reading}), Writing (${l.levels.writing}), Speaking (${l.levels.speaking})`).join('\n')}

PERSONAL DETAILS:
Date of Birth: ${personalInfo.dateOfBirth}
Home District: ${personalInfo.homeDistrict}
Nationality: ${personalInfo.nationality}
Marital Status: ${personalInfo.maritalStatus}

HOBBIES & INTERESTS:
${hobbies.map((h) => h.name).join(', ')}

=====================================================
Declaration: I hereby declare that the information provided above is true and accurate to the best of my knowledge.
${personalInfo.name}
=====================================================
`;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.shortName.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        {/* Top Control Bar (Hidden when printed) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <h2 id="cv-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Curriculum Vitae — {personalInfo.name}
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Print Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              id="cv-print-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTextCv}
              id="cv-download-txt-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Text File</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV Modal"
              id="cv-modal-close-btn"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-800 dark:text-slate-200" id="printable-cv">
          {/* Header */}
          <div className="border-b-2 border-slate-800 dark:border-slate-300 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
                {personalInfo.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
                {personalInfo.tagline}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1">
              Career Objective
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
              “{personalInfo.careerObjective}”
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Qualification</span>
            </h3>

            <div className="space-y-3">
              {education.map((item) => (
                <div
                  key={item.degree}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {item.degree}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {item.institution} — {item.boardOrUniversity}
                    </span>
                  </div>
                  <div className="text-left sm:text-right font-medium text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      Result: {item.result}
                    </span>
                    <span className="text-slate-400 ml-2">({item.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Computer Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-indigo-600" />
              <span>Computer Skills & Proficiencies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">{skill.name}:</strong>{' '}
                    <span className="text-slate-600 dark:text-slate-400">{skill.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Personal Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
                <LanguagesIcon className="w-4 h-4 text-teal-600" />
                <span>Language Skills</span>
              </h3>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {languages.map((l) => (
                  <div key={l.language} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">{l.language}:</p>
                    <p className="text-slate-600 dark:text-slate-400">Reading: {l.levels.reading} | Writing: {l.levels.writing} | Speaking: {l.levels.speaking}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-purple-600" />
                <span>Personal Particulars</span>
              </h3>
              <div className="text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <p><strong>Name:</strong> {personalInfo.name}</p>
                <p><strong>Date of Birth:</strong> {personalInfo.dateOfBirth}</p>
                <p><strong>Home District:</strong> {personalInfo.homeDistrict}</p>
                <p><strong>Nationality:</strong> {personalInfo.nationality}</p>
                <p><strong>Marital Status:</strong> {personalInfo.maritalStatus}</p>
              </div>
            </div>
          </div>

          {/* Hobbies & Declaration */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p>
              <strong>Hobbies & Interests:</strong> {hobbies.map((h) => h.name).join(', ')}
            </p>
            <p className="italic">
              Declaration: I solemnly declare that all statements made above are true, complete and accurate to the best of my knowledge and belief.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
