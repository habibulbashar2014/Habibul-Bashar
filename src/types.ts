export interface EducationItem {
  degree: string;
  institution: string;
  boardOrUniversity: string;
  result: string;
  year: string;
  type: 'higher' | 'secondary' | 'school';
  details?: string;
}

export interface ComputerSkill {
  name: string;
  category: 'OS' | 'Office' | 'Web & Tools' | 'Hardware & Support';
  description: string;
  tags: string[];
  icon: string;
}

export interface LanguageSkill {
  language: string;
  nativeName?: string;
  status: string;
  levels: {
    reading: 'High' | 'Medium' | 'Basic';
    writing: 'High' | 'Medium' | 'Basic';
    speaking: 'High' | 'Medium' | 'Basic';
  };
  note?: string;
}

export interface HobbyItem {
  name: string;
  icon: string;
  description: string;
  tag: string;
}

export interface HighlightCard {
  title: string;
  description: string;
  icon: string;
  stats?: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  initials: string;
  tagline: string;
  headline: string;
  shortIntro: string;
  aboutText: string;
  careerObjective: string;
  email: string;
  location: string;
  homeDistrict: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  avatarUrl?: string;
  stats: {
    graduationYear: string;
    skillsCount: string;
    nuCgpa: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
    github?: string;
  };
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  highlightCards: HighlightCard[];
  education: EducationItem[];
  skills: ComputerSkill[];
  languages: LanguageSkill[];
  hobbies: HobbyItem[];
}
