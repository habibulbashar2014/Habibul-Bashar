import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  Mail,
  MapPin,
  GraduationCap,
  Laptop,
  Languages as LanguagesIcon,
  User,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData } from '../types';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function generateCvStandaloneHtml(data: PortfolioData): string {
  const { personalInfo, education, skills, languages, hobbies } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curriculum Vitae - ${personalInfo.name}</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      font-size: 12.5px;
    }
    .header {
      border-bottom: 2.5px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .name {
      font-size: 24px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      color: #0f172a;
      margin: 0;
    }
    .tagline {
      font-size: 13px;
      color: #2563eb;
      font-weight: 600;
      margin-top: 4px;
    }
    .contacts {
      font-size: 11.5px;
      color: #475569;
      text-align: right;
      line-height: 1.6;
    }
    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 14px;
      margin-bottom: 8px;
    }
    .objective {
      font-size: 12px;
      color: #334155;
      font-style: italic;
      line-height: 1.6;
      margin: 0;
      padding: 6px 10px;
      background: #f8fafc;
      border-left: 3px solid #2563eb;
      border-radius: 0 4px 4px 0;
    }
    table.edu-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6px;
      font-size: 11.5px;
    }
    table.edu-table th, table.edu-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    table.edu-table th {
      background-color: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 12px;
      font-size: 11.5px;
    }
    .skill-item {
      padding: 5px 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 6px;
    }
    .info-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 11.5px;
      line-height: 1.6;
    }
    .declaration {
      margin-top: 16px;
      font-size: 11px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      font-style: italic;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="name">${personalInfo.name}</h1>
      <div class="tagline">${personalInfo.tagline}</div>
    </div>
    <div class="contacts">
      <div><strong>Email:</strong> ${personalInfo.email}</div>
      <div><strong>Location:</strong> ${personalInfo.location}</div>
      ${personalInfo.socials.linkedin ? `<div><strong>LinkedIn:</strong> ${personalInfo.socials.linkedin}</div>` : ''}
    </div>
  </div>

  <div class="section-title">Career Objective</div>
  <p class="objective">“${personalInfo.careerObjective}”</p>

  <div class="section-title">Academic Qualifications</div>
  <table class="edu-table">
    <thead>
      <tr>
        <th>Degree / Exam</th>
        <th>Institution</th>
        <th>Board / University</th>
        <th>Passing Year</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      ${education
        .map(
          (e) => `
        <tr>
          <td><strong>${e.degree}</strong></td>
          <td>${e.institution}</td>
          <td>${e.boardOrUniversity}</td>
          <td>${e.year}</td>
          <td><strong>${e.result}</strong></td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <div class="section-title">Computer Skills &amp; Proficiencies</div>
  <div class="skills-grid">
    ${skills
      .map(
        (s) => `
      <div class="skill-item">
        <strong>${s.name}:</strong> ${s.description}
      </div>
    `
      )
      .join('')}
  </div>

  <div class="two-col">
    <div>
      <div class="section-title">Language Skills</div>
      <div class="info-box">
        ${languages
          .map(
            (l) => `
          <div style="margin-bottom: 4px;">
            <strong>${l.language}:</strong> Reading (${l.levels.reading}), Writing (${l.levels.writing}), Speaking (${l.levels.speaking})
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <div>
      <div class="section-title">Personal Particulars</div>
      <div class="info-box">
        <div><strong>Date of Birth:</strong> ${personalInfo.dateOfBirth}</div>
        <div><strong>Home District:</strong> ${personalInfo.homeDistrict}</div>
        <div><strong>Nationality:</strong> ${personalInfo.nationality}</div>
        <div><strong>Marital Status:</strong> ${personalInfo.maritalStatus}</div>
      </div>
    </div>
  </div>

  <div class="section-title">Hobbies &amp; Interests</div>
  <div class="info-box" style="margin-top: 4px;">
    ${hobbies.map((h) => `<strong>${h.name}</strong> (${h.tag})`).join(' • ')}
  </div>

  <div class="declaration">
    <strong>Declaration:</strong> I solemnly declare that all statements made above are true, complete and accurate to the best of my knowledge and belief.
    <br><br>
    <strong>${personalInfo.name}</strong>
  </div>
</body>
</html>`;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolio();
  const { personalInfo, education, skills, languages, hobbies } = data;
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  // 100% fail-proof print via isolated invisible iframe (prevents blank/white page bug)
  const handlePrint = () => {
    const printFrame = document.createElement('iframe');
    printFrame.setAttribute(
      'style',
      'position: fixed; top: 0; left: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none; border: 0;'
    );
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const cvHtml = generateCvStandaloneHtml(data);
    doc.open();
    doc.write(cvHtml);
    doc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
      } catch {
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
          }
        }, 2000);
      }
    }, 350);
  };

  // Direct standalone HTML download
  const handleDownloadHtmlCv = () => {
    const cvHtml = generateCvStandaloneHtml(data);
    const blob = new Blob([cvHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.shortName.replace(/\s+/g, '_')}_CV.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedFormat('html');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  // Text format download
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
    setDownloadedFormat('txt');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        {/* Top Control Bar */}
        <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 shrink-0 gap-3">
          <div className="flex items-center gap-2">
            <h2 id="cv-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Curriculum Vitae — {personalInfo.name}
            </h2>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Print / PDF Ready
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
            <button
              type="button"
              onClick={handlePrint}
              id="cv-print-btn"
              title="Print or Save as PDF"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtmlCv}
              id="cv-download-html-btn"
              title="Download standalone HTML CV (opens in any browser or Word)"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              {downloadedFormat === 'html' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <FileText className="w-4 h-4 text-blue-500" />
              )}
              <span>Download HTML</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTextCv}
              id="cv-download-txt-btn"
              title="Download Plain Text CV"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              {downloadedFormat === 'txt' ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Download className="w-4 h-4 text-slate-500" />
              )}
              <span>Download Text</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV Modal"
              id="cv-modal-close-btn"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip banner for user in Bengali */}
        <div className="no-print px-6 py-2 bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
          <span>
            💡 <strong>পিডিএফ করার নিয়ম:</strong> <strong>&ldquo;Print / Save as PDF&rdquo;</strong> বাটনে চাপ দিলে ব্রাউজারের প্রিন্ট উইন্ডো আসবে, সেখানে Destination হিসেবে <strong>&ldquo;Save as PDF&rdquo;</strong> সিলেক্ট করলেই ঝকঝকে পিডিএফ সেভ হয়ে যাবে।
          </span>
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
              &ldquo;{personalInfo.careerObjective}&rdquo;
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
              <span>Computer Skills &amp; Proficiencies</span>
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
              <strong>Hobbies &amp; Interests:</strong> {hobbies.map((h) => h.name).join(', ')}
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
