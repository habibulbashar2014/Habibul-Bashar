import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  User,
  GraduationCap,
  Laptop,
  Languages,
  Heart,
  Key,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Image as ImageIcon,
  ExternalLink,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Copy,
  Check,
  FileCode,
  Globe,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  EducationItem,
  ComputerSkill,
  LanguageSkill,
  HobbyItem,
  HighlightCard,
  PortfolioData,
} from '../types';

export const AdminPanel: React.FC = () => {
  const {
    data,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    logoutAdmin,
    saveAll,
    resetToDefault,
    exportBackup,
    importBackup,
    changePassword,
  } = usePortfolio();

  // Local draft state of data
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<
    'personal' | 'education' | 'skills' | 'languages' | 'hobbies' | 'security'
  >('personal');
  const [saveToast, setSaveToast] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [showPassFields, setShowPassFields] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync formData when data changes from outside (e.g. initial open)
  React.useEffect(() => {
    if (isAdminPanelOpen) {
      setFormData(data);
      setSaveToast(false);
      setPassError('');
      setPassSuccess('');
      setCopiedCode(false);
    }
  }, [isAdminPanelOpen, data]);

  if (!isAdminPanelOpen) return null;

  const triggerSave = (updated?: PortfolioData) => {
    const toSave = updated || formData;
    saveAll(toSave);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const generateTypeScriptDataFile = (curData: PortfolioData): string => {
    return `import {
  EducationItem,
  ComputerSkill,
  LanguageSkill,
  HobbyItem,
  HighlightCard,
  PersonalInfo,
  PortfolioData,
} from '../types';

export const PERSONAL_INFO: PersonalInfo = ${JSON.stringify(curData.personalInfo, null, 2)};

export const HIGHLIGHT_CARDS: HighlightCard[] = ${JSON.stringify(curData.highlightCards, null, 2)};

export const EDUCATION_DATA: EducationItem[] = ${JSON.stringify(curData.education, null, 2)};

export const COMPUTER_SKILLS: ComputerSkill[] = ${JSON.stringify(curData.skills, null, 2)};

export const LANGUAGE_SKILLS: LanguageSkill[] = ${JSON.stringify(curData.languages, null, 2)};

export const HOBBIES_DATA: HobbyItem[] = ${JSON.stringify(curData.hobbies, null, 2)};

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: PERSONAL_INFO,
  education: EDUCATION_DATA,
  skills: COMPUTER_SKILLS,
  languages: LANGUAGE_SKILLS,
  hobbies: HOBBIES_DATA,
  highlightCards: HIGHLIGHT_CARDS,
};
`;
  };

  const handleDownloadTsFile = () => {
    const content = generateTypeScriptDataFile(formData);
    const blob = new Blob([content], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyTsCode = () => {
    const content = generateTypeScriptDataFile(formData);
    navigator.clipboard.writeText(content).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    });
  };

  // Image upload handler for Avatar
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size too large! Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const next = {
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            avatarUrl: base64String,
          },
        };
        setFormData(next);
        triggerSave(next);
      };
      reader.readAsDataURL(file);
    }
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!oldPassword || !newPassword) {
      setPassError('সবগুলো ঘর পূরণ করুন।');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি!');
      return;
    }
    if (newPassword.length < 4) {
      setPassError('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }

    const success = await changePassword(oldPassword, newPassword);
    if (success) {
      setPassSuccess('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPassError('বর্তমান পাসওয়ার্ড ভুল হয়েছে!');
    }
  };

  // Education Helpers
  const addEducation = () => {
    const newEdu: EducationItem = {
      degree: 'New Degree / Certificate',
      institution: 'Institution Name',
      boardOrUniversity: 'Board or University',
      result: 'Result / CGPA',
      year: `${new Date().getFullYear()}`,
      type: 'higher',
      details: 'Brief description of coursework and achievements.',
    };
    const next = { ...formData, education: [newEdu, ...formData.education] };
    setFormData(next);
  };

  const updateEducationItem = (index: number, field: keyof EducationItem, val: string) => {
    const nextEdu = [...formData.education];
    nextEdu[index] = { ...nextEdu[index], [field]: val };
    setFormData({ ...formData, education: nextEdu });
  };

  const removeEducationItem = (index: number) => {
    if (window.confirm('Are you sure you want to remove this education record?')) {
      const nextEdu = formData.education.filter((_, i) => i !== index);
      const next = { ...formData, education: nextEdu };
      setFormData(next);
      triggerSave(next);
    }
  };

  // Skills Helpers
  const addSkill = () => {
    const newSkill: ComputerSkill = {
      name: 'New Computer Skill',
      category: 'Office',
      description: 'Practical proficiency and workflow experience.',
      tags: ['Proficiency', 'Productivity'],
      icon: 'file-text',
    };
    const next = { ...formData, skills: [...formData.skills, newSkill] };
    setFormData(next);
  };

  const updateSkillItem = (index: number, field: keyof ComputerSkill, val: any) => {
    const nextSkills = [...formData.skills];
    nextSkills[index] = { ...nextSkills[index], [field]: val };
    setFormData({ ...formData, skills: nextSkills });
  };

  const removeSkillItem = (index: number) => {
    if (window.confirm('Delete this skill item?')) {
      const nextSkills = formData.skills.filter((_, i) => i !== index);
      const next = { ...formData, skills: nextSkills };
      setFormData(next);
      triggerSave(next);
    }
  };

  // Language Helpers
  const addLanguage = () => {
    const newLang: LanguageSkill = {
      language: 'New Language',
      nativeName: '',
      status: 'Working Proficiency',
      levels: { reading: 'High', writing: 'Medium', speaking: 'Medium' },
      note: 'Language proficiency description.',
    };
    const next = { ...formData, languages: [...formData.languages, newLang] };
    setFormData(next);
  };

  const updateLangItem = (index: number, key: string, val: string) => {
    const nextLangs = [...formData.languages];
    if (key.startsWith('level-')) {
      const sub = key.replace('level-', '') as 'reading' | 'writing' | 'speaking';
      nextLangs[index] = {
        ...nextLangs[index],
        levels: { ...nextLangs[index].levels, [sub]: val as any },
      };
    } else {
      nextLangs[index] = { ...nextLangs[index], [key]: val };
    }
    setFormData({ ...formData, languages: nextLangs });
  };

  const removeLangItem = (index: number) => {
    if (window.confirm('Remove this language skill?')) {
      const nextLangs = formData.languages.filter((_, i) => i !== index);
      const next = { ...formData, languages: nextLangs };
      setFormData(next);
      triggerSave(next);
    }
  };

  // Hobby Helpers
  const addHobby = () => {
    const newHobby: HobbyItem = {
      name: 'New Hobby / Activity',
      tag: 'Activity',
      description: 'Personal interest and recreational activity.',
      icon: 'star',
    };
    const next = { ...formData, hobbies: [...formData.hobbies, newHobby] };
    setFormData(next);
  };

  const updateHobbyItem = (index: number, field: keyof HobbyItem, val: string) => {
    const nextHobbies = [...formData.hobbies];
    nextHobbies[index] = { ...nextHobbies[index], [field]: val };
    setFormData({ ...formData, hobbies: nextHobbies });
  };

  const removeHobbyItem = (index: number) => {
    if (window.confirm('Remove this hobby?')) {
      const nextHobbies = formData.hobbies.filter((_, i) => i !== index);
      const next = { ...formData, hobbies: nextHobbies };
      setFormData(next);
      triggerSave(next);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[950px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Portfolio Admin Panel</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/50">
                  Live Editor
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Modify any detail anytime — changes persist in your browser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Save Toast */}
            {saveToast && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold animate-fadeIn shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved Live!</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setActiveTab('security');
              }}
              title="View how to publish updates so other people can see them on GitHub Pages"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 text-xs font-bold transition-all hover:bg-blue-100"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Publish for GitHub</span>
            </button>

            <button
              type="button"
              onClick={() => triggerSave()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdminPanelOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close panel and preview site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 overflow-x-auto no-scrollbar shrink-0 text-xs sm:text-sm font-semibold">
          {[
            { id: 'personal', label: 'Personal & Bio', icon: <User className="w-4 h-4" /> },
            { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'skills', label: 'Computer Skills', icon: <Laptop className="w-4 h-4" /> },
            { id: 'languages', label: 'Languages', icon: <Languages className="w-4 h-4" /> },
            { id: 'hobbies', label: 'Hobbies & Sports', icon: <Heart className="w-4 h-4" /> },
            { id: 'security', label: 'Security & Backup', icon: <Key className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold bg-white/60 dark:bg-slate-800/60'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: Personal & Bio */}
          {activeTab === 'personal' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Profile Avatar Card */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Profile Photo / Avatar</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-24 h-24 rounded-full border-2 border-blue-600 dark:border-blue-400 overflow-hidden shrink-0 shadow-md bg-slate-200 dark:bg-slate-700">
                    {formData.personalInfo.avatarUrl ? (
                      <img
                        src={formData.personalInfo.avatarUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-blue-600 dark:text-blue-300">
                        {formData.personalInfo.initials}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1 w-full">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Upload a new photo (stored in your browser) or enter an external image URL:
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>

                      {formData.personalInfo.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = {
                              ...formData,
                              personalInfo: {
                                ...formData.personalInfo,
                                avatarUrl:
                                  'https://res.cloudinary.com/cvbxk5vv/image/upload/v1788674181/WhatsApp_Image_2026-09-06_at_11.08.54_AM.jpg',
                              },
                            };
                            setFormData(next);
                            triggerSave(next);
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 text-xs font-bold transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset to Cloudinary Photo</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Direct Image Link / URL (Cloudinary, Imgur, etc.):
                      </label>
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        value={formData.personalInfo.avatarUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, avatarUrl: val },
                          });
                        }}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Names & Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, name: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Short Name
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.shortName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, shortName: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Initials (Badge)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={formData.personalInfo.initials}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, initials: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tagline & Headline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Headline (Greeting)
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.headline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, headline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Professional Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.tagline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, tagline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Metrics Bar on Hero */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Hero Metrics Bar
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.stats.graduationYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            stats: {
                              ...formData.personalInfo.stats,
                              graduationYear: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Skills Count Label
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.stats.skillsCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            stats: {
                              ...formData.personalInfo.stats,
                              skillsCount: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                      CGPA / Result Label
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.stats.nuCgpa}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            stats: {
                              ...formData.personalInfo.stats,
                              nuCgpa: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Bio & Intro textareas */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Short Introduction (Hero Section)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.personalInfo.shortIntro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, shortIntro: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    About Me Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={formData.personalInfo.aboutText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, aboutText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Career Objective
                  </label>
                  <textarea
                    rows={3}
                    value={formData.personalInfo.careerObjective}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: {
                          ...formData.personalInfo,
                          careerObjective: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Official Personal Profile Details */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Official Details & Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, email: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, location: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Home District
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.homeDistrict}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            homeDistrict: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            dateOfBirth: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Nationality
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.nationality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            nationality: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Marital Status
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.maritalStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            maritalStatus: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={formData.personalInfo.socials?.facebook || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            socials: {
                              ...formData.personalInfo.socials,
                              facebook: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={formData.personalInfo.socials?.instagram || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            socials: {
                              ...formData.personalInfo.socials,
                              instagram: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.personalInfo.socials?.linkedin || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            socials: {
                              ...formData.personalInfo.socials,
                              linkedin: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      WhatsApp Link (wa.me)
                    </label>
                    <input
                      type="url"
                      placeholder="https://wa.me/8801518477577"
                      value={formData.personalInfo.socials?.whatsapp || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: {
                            ...formData.personalInfo,
                            socials: {
                              ...formData.personalInfo.socials,
                              whatsapp: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Education */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Academic Qualifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add, edit, or remove degree records shown on the timeline and CV
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addEducation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-4 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Record #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEducationItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Degree"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Degree Name
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducationItem(idx, 'degree', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducationItem(idx, 'institution', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Board / University
                        </label>
                        <input
                          type="text"
                          value={edu.boardOrUniversity}
                          onChange={(e) =>
                            updateEducationItem(idx, 'boardOrUniversity', e.target.value)
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Result / CGPA
                        </label>
                        <input
                          type="text"
                          value={edu.result}
                          onChange={(e) => updateEducationItem(idx, 'result', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Passing Year
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducationItem(idx, 'year', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Type
                        </label>
                        <select
                          value={edu.type}
                          onChange={(e) => updateEducationItem(idx, 'type', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        >
                          <option value="higher">Higher Education (Bachelor/Honours)</option>
                          <option value="secondary">Higher Secondary (H.S.C.)</option>
                          <option value="school">Secondary School (S.S.C.)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Description / Academic Details
                      </label>
                      <input
                        type="text"
                        value={edu.details || ''}
                        onChange={(e) => updateEducationItem(idx, 'details', e.target.value)}
                        placeholder="Brief summary of focus or achievements..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Computer Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Computer & Technical Skills
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage software proficiencies, categories, descriptions, and tags
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Skill #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSkillItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Skill Name
                        </label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkillItem(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 block uppercase">
                          Category
                        </label>
                        <select
                          value={skill.category}
                          onChange={(e) => updateSkillItem(idx, 'category', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        >
                          <option value="Office">Office Application</option>
                          <option value="OS">Operating System</option>
                          <option value="Hardware & Support">Hardware & Support</option>
                          <option value="Web & Tools">Web & Digital Tools</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={skill.description}
                        onChange={(e) => updateSkillItem(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={skill.tags.join(', ')}
                        onChange={(e) =>
                          updateSkillItem(
                            idx,
                            'tags',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Languages */}
          {activeTab === 'languages' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Language Proficiencies
                  </h3>
                  <p className="text-xs text-slate-500">
                    Control language competence levels for reading, writing, and speaking
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Language</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Language #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLangItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Language"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block uppercase mb-1">
                          Language Name
                        </label>
                        <input
                          type="text"
                          value={lang.language}
                          onChange={(e) => updateLangItem(idx, 'language', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block uppercase mb-1">
                          Native Script Name
                        </label>
                        <input
                          type="text"
                          value={lang.nativeName || ''}
                          onChange={(e) => updateLangItem(idx, 'nativeName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block uppercase mb-1">
                          Status / Level Label
                        </label>
                        <input
                          type="text"
                          value={lang.status}
                          onChange={(e) => updateLangItem(idx, 'status', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block uppercase mb-1">
                          Reading
                        </label>
                        <select
                          value={lang.levels.reading}
                          onChange={(e) => updateLangItem(idx, 'level-reading', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option value="High">High (Fluent/Advanced)</option>
                          <option value="Medium">Medium (Working)</option>
                          <option value="Basic">Basic (Elementary)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block uppercase mb-1">
                          Writing
                        </label>
                        <select
                          value={lang.levels.writing}
                          onChange={(e) => updateLangItem(idx, 'level-writing', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option value="High">High (Fluent/Advanced)</option>
                          <option value="Medium">Medium (Working)</option>
                          <option value="Basic">Basic (Elementary)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block uppercase mb-1">
                          Speaking
                        </label>
                        <select
                          value={lang.levels.speaking}
                          onChange={(e) => updateLangItem(idx, 'level-speaking', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option value="High">High (Fluent/Advanced)</option>
                          <option value="Medium">Medium (Working)</option>
                          <option value="Basic">Basic (Elementary)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block uppercase mb-1">
                        Proficiency Note
                      </label>
                      <input
                        type="text"
                        value={lang.note || ''}
                        onChange={(e) => updateLangItem(idx, 'note', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Hobbies */}
          {activeTab === 'hobbies' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Personal Hobbies & Sports
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add or update your recreation, wellness, and fitness pursuits
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addHobby}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Hobby</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.hobbies.map((hobby, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Hobby #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeHobbyItem(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete Hobby"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Hobby Name
                      </label>
                      <input
                        type="text"
                        value={hobby.name}
                        onChange={(e) => updateHobbyItem(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Category / Tag
                      </label>
                      <input
                        type="text"
                        value={hobby.tag}
                        onChange={(e) => updateHobbyItem(idx, 'tag', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={hobby.description}
                        onChange={(e) => updateHobbyItem(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Security & Backup */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* Password Change Card */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Change Admin Password
                    </h4>
                    <p className="text-xs text-slate-500">
                      Update your secret passcode. Nobody else can see or reset it without the current password.
                    </p>
                  </div>
                </div>

                {passError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-700 dark:text-rose-300">
                    {passError}
                  </div>
                )}
                {passSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    {passSuccess}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassFields ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                        New Password
                      </label>
                      <input
                        type={showPassFields ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-sm font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassFields ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPassFields(!showPassFields)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      {showPassFields ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassFields ? 'Hide password letters' : 'Reveal password letters'}</span>
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Publish Updates to GitHub / Live Sync Card */}
              <div className="p-6 rounded-3xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Publish Changes for All Visitors (গিটহাবে আপডেট)</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        GitHub Pages
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      অন্যরা আপনার পরিবর্তন দেখতে পাচ্ছে না কেন এবং কীভাবে সবার জন্য লাইভ করবেন?
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
                  <p>
                    📌 <strong>কেন অন্য কেউ দেখতে পায় না:</strong> এডমিন প্যানেল দিয়ে আপনি যা এডিট করেন, তা তাৎক্ষণিকভাবে আপনার নিজস্ব ব্রাউজারে (<code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">localStorage</code>) সেভ হয়। কিন্তু GitHub Pages একটি স্ট্যাটিক সাইট হওয়ায় কোড পরিবর্তন না করা পর্যন্ত বাইরের দর্শকরা আগের তথ্যই দেখতে পাবে।
                  </p>
                  <p>
                    🚀 <strong>সবার জন্য লাইভ করার সহজ উপায়:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 font-medium">
                    <li>নিচের <strong>&ldquo;Download portfolioData.ts&rdquo;</strong> বাটনে ক্লিক করে আপডেটেড ফাইলটি ডাউনলোড করুন।</li>
                    <li>আপনার GitHub রিপোজিটরির <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600">src/data/portfolioData.ts</code> ফাইলটিতে এটি আপলোড বা রিপ্লেস করুন।</li>
                    <li>অথবা আমাদের AI Studio চ্যাটে লিখে বলুন: <em>&ldquo;আমার অমুক তথ্য পরিবর্তন করে দাও&rdquo;</em> — আমি সরাসরি কোডে আপডেট করে বিল্ড বানিয়ে দেব!</li>
                  </ol>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadTsFile}
                    id="admin-download-ts-data-btn"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95"
                  >
                    <FileCode className="w-4 h-4" />
                    <span>Download portfolioData.ts</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyTsCode}
                    id="admin-copy-ts-code-btn"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-white hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Code Copied!' : 'Copy Code to Clipboard'}</span>
                  </button>
                </div>
              </div>

              {/* Data Export / Import Card */}
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Data Backup & Portability
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Download a complete backup file of your portfolio data to keep safely on your computer, or restore it on any device.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={exportBackup}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all shadow-xs"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    <span>Download Backup (.json)</span>
                  </button>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all shadow-xs">
                    <Upload className="w-4 h-4 text-indigo-600" />
                    <span>Restore from Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result as string;
                            if (content && importBackup(content)) {
                              alert('Backup restored successfully!');
                            } else {
                              alert('Invalid backup file format.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone: Reset to Default */}
              <div className="p-6 rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 space-y-3">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">
                    Reset to Initial Data
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  This will discard all your customized edits and restore the original information.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to reset all data back to original defaults?'
                      )
                    ) {
                      resetToDefault();
                      setIsAdminPanelOpen(false);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Default</span>
                </button>
              </div>

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Log Out of Admin Panel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Status Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 bg-slate-50/60 dark:bg-slate-950/40 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="font-medium">Changes apply immediately to your live site</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsAdminPanelOpen(false)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Preview Website</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
