import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  PersonalInfo,
  EducationItem,
  ComputerSkill,
  LanguageSkill,
  HobbyItem,
  HighlightCard,
} from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';

// SHA-256 hash of the initial password
const DEFAULT_PASSWORD_HASH = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

async function hashString(plain: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-256', enc.encode(plain));
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface PortfolioContextType {
  data: PortfolioData;
  isAdminLoggedIn: boolean;
  isLoginModalOpen: boolean;
  isAdminPanelOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  setIsAdminPanelOpen: (open: boolean) => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateEducation: (edu: EducationItem[]) => void;
  updateSkills: (skills: ComputerSkill[]) => void;
  updateLanguages: (langs: LanguageSkill[]) => void;
  updateHobbies: (hobbies: HobbyItem[]) => void;
  updateHighlightCards: (cards: HighlightCard[]) => void;
  saveAll: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  exportBackup: () => void;
  importBackup: (jsonString: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('hb_portfolio_data');
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            ...INITIAL_PORTFOLIO_DATA,
            ...parsed,
            personalInfo: {
              ...INITIAL_PORTFOLIO_DATA.personalInfo,
              ...(parsed.personalInfo || {}),
              avatarUrl:
                parsed.personalInfo?.avatarUrl || INITIAL_PORTFOLIO_DATA.personalInfo.avatarUrl,
              stats: {
                ...INITIAL_PORTFOLIO_DATA.personalInfo.stats,
                ...(parsed.personalInfo?.stats || {}),
              },
              socials: {
                ...INITIAL_PORTFOLIO_DATA.personalInfo.socials,
                ...(parsed.personalInfo?.socials || {}),
              },
            },
          };
        }
      } catch (err) {
        console.error('Failed to load portfolio data from storage', err);
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hb_admin_auth') === 'true';
    }
    return false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Sync data to localStorage on changes
  const persistData = (nextData: PortfolioData) => {
    setData(nextData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hb_portfolio_data', JSON.stringify(nextData));
    }
  };

  // Keyboard shortcut Ctrl+Shift+A / Cmd+Shift+A to toggle Admin Login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminPanelOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const loginAdmin = async (password: string): Promise<boolean> => {
    const enteredHash = await hashString(password.trim());
    const savedHash =
      (typeof window !== 'undefined' && localStorage.getItem('hb_admin_pass_hash')) ||
      DEFAULT_PASSWORD_HASH;

    if (enteredHash === savedHash) {
      setIsAdminLoggedIn(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hb_admin_auth', 'true');
      }
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('hb_admin_auth');
    }
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    const oldHash = await hashString(oldPass.trim());
    const savedHash =
      (typeof window !== 'undefined' && localStorage.getItem('hb_admin_pass_hash')) ||
      DEFAULT_PASSWORD_HASH;

    if (oldHash !== savedHash) {
      return false;
    }

    const newHash = await hashString(newPass.trim());
    if (typeof window !== 'undefined') {
      localStorage.setItem('hb_admin_pass_hash', newHash);
    }
    return true;
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    const updated: PortfolioData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        ...info,
        stats: {
          ...data.personalInfo.stats,
          ...(info.stats || {}),
        },
        socials: {
          ...data.personalInfo.socials,
          ...(info.socials || {}),
        },
      },
    };
    persistData(updated);
  };

  const updateEducation = (edu: EducationItem[]) => {
    persistData({ ...data, education: edu });
  };

  const updateSkills = (skills: ComputerSkill[]) => {
    persistData({ ...data, skills });
  };

  const updateLanguages = (langs: LanguageSkill[]) => {
    persistData({ ...data, languages: langs });
  };

  const updateHobbies = (hobbies: HobbyItem[]) => {
    persistData({ ...data, hobbies });
  };

  const updateHighlightCards = (cards: HighlightCard[]) => {
    persistData({ ...data, highlightCards: cards });
  };

  const saveAll = (newData: PortfolioData) => {
    persistData(newData);
  };

  const resetToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hb_portfolio_data');
    }
    setData(INITIAL_PORTFOLIO_DATA);
  };

  const exportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
        persistData(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdminLoggedIn,
        isLoginModalOpen,
        isAdminPanelOpen,
        setIsLoginModalOpen,
        setIsAdminPanelOpen,
        loginAdmin,
        logoutAdmin,
        changePassword,
        updatePersonalInfo,
        updateEducation,
        updateSkills,
        updateLanguages,
        updateHobbies,
        updateHighlightCards,
        saveAll,
        resetToDefault,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
