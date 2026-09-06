import {
  EducationItem,
  ComputerSkill,
  LanguageSkill,
  HobbyItem,
  HighlightCard,
  PersonalInfo,
  PortfolioData,
} from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Md. Habibul Bashar',
  shortName: 'Habibul Bashar',
  initials: 'HB',
  tagline: 'Professional | Computer & Technology Enthusiast | Continuous Learner',
  headline: "Hi, I'm Md. Habibul Bashar",
  shortIntro:
    'I am a motivated and dedicated professional who is passionate about developing my knowledge, technical skills and building a successful career through sincerity, hard work and continuous learning.',
  aboutText:
    'I am Md. Habibul Bashar. I am a motivated individual looking for opportunities to enhance my knowledge, skills and professional capabilities. I believe in dedication, sincerity, hard work and continuous learning.',
  careerObjective:
    'To pursue a challenging and dynamic career in a progressive organization where I can leverage my academic background, technical proficiencies in computer operations, and relentless drive for continuous learning to add tangible value to organizational growth while evolving as a high-performing professional.',
  email: 'habibulbashar2018@gmail.com',
  location: 'Gaibandha, Bangladesh',
  homeDistrict: 'Gaibandha',
  dateOfBirth: '06 December 2001',
  nationality: 'Bangladeshi',
  maritalStatus: 'Single',
  avatarUrl:
    'https://res.cloudinary.com/cvbxk5vv/image/upload/v1788674181/WhatsApp_Image_2026-09-06_at_11.08.54_AM.jpg',
  stats: {
    graduationYear: '2022',
    skillsCount: '7+',
    nuCgpa: '2.92',
  },
  socials: {
    facebook: 'https://www.facebook.com/habibulbashar.2014',
    instagram: 'https://www.instagram.com/habibul_bashar_2014',
    linkedin: 'https://www.linkedin.com/in/habibul-bashar-2018himu',
    whatsapp: 'https://wa.me/8801518477577',
    github: '',
  },
};

export const HIGHLIGHT_CARDS: HighlightCard[] = [
  {
    title: 'Career Focus',
    description:
      'Committed to professional excellence with a disciplined approach to workplace responsibilities, accuracy, and team collaboration.',
    icon: 'target',
    stats: 'Dedicated & Driven',
  },
  {
    title: 'Computer Skills',
    description:
      'Solid command of Microsoft Office Suite, multiple Windows OS environments, computer hardware setup, and system troubleshooting.',
    icon: 'laptop',
    stats: 'Practical Proficiency',
  },
  {
    title: 'Continuous Learning',
    description:
      'Eager learner continuously upskilling in modern technologies, administrative tools, digital workflows, and problem solving.',
    icon: 'book-open',
    stats: 'Growth Mindset',
  },
  {
    title: 'Professional Growth',
    description:
      'Seeking impactful organizational opportunities to contribute dedication, sincerity, and technical expertise toward mutual success.',
    icon: 'rocket',
    stats: 'Long-term Value',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor's / Honours",
    institution: 'Gaibandha Govt. College',
    boardOrUniversity: 'National University',
    result: '2.92 out of 4',
    year: '2022',
    type: 'higher',
    details: 'Completed undergraduate degree under National University, developing strong analytical thinking, discipline, and academic diligence.',
  },
  {
    degree: 'Higher Secondary Certificate (H.S.C.)',
    institution: 'Nakaihat Degree College',
    boardOrUniversity: 'Dinajpur Board',
    result: '3.44 out of 5',
    year: '2018',
    type: 'secondary',
    details: 'Completed higher secondary education under the Board of Intermediate and Secondary Education, Dinajpur.',
  },
  {
    degree: 'Secondary School Certificate (S.S.C.)',
    institution: 'Krorgachha BL High School',
    boardOrUniversity: 'Dinajpur Board',
    result: '4.44 out of 5',
    year: '2016',
    type: 'school',
    details: 'Completed secondary school certificate with high distinction under Dinajpur Education Board.',
  },
];

export const COMPUTER_SKILLS_DATA: ComputerSkill[] = [
  {
    name: 'Microsoft Word',
    category: 'Office',
    description: 'Document drafting, formal reporting, formatting, tables, official correspondence, and document layout design.',
    tags: ['Documentation', 'Formatting', 'Reporting'],
    icon: 'file-text',
  },
  {
    name: 'Microsoft Excel',
    category: 'Office',
    description: 'Spreadsheet management, data entry, formulas, records organization, sorting, and tabular calculations.',
    tags: ['Data Management', 'Spreadsheets', 'Formulas'],
    icon: 'table',
  },
  {
    name: 'Microsoft PowerPoint',
    category: 'Office',
    description: 'Slide presentations, visual deck creation, formatting, transitions, and professional briefings.',
    tags: ['Presentations', 'Visual Slides', 'Briefings'],
    icon: 'presentation',
  },
  {
    name: 'Windows 7 / 8 / 8.1 / 10',
    category: 'OS',
    description: 'Versatile experience navigating, configuring, updating, and operating multiple generations of Windows operating systems.',
    tags: ['OS Navigation', 'File Systems', 'Configuration'],
    icon: 'layout-grid',
  },
  {
    name: 'Hardware Setup & Setting',
    category: 'Hardware & Support',
    description: 'Desktop computer peripheral connection, monitor and cable setups, printer configuration, and hardware assembly settings.',
    tags: ['Peripherals', 'PC Assembly', 'Settings'],
    icon: 'cpu',
  },
  {
    name: 'Windows Troubleshooting',
    category: 'Hardware & Support',
    description: 'Diagnosing common system errors, driver issues, boot problems, application crashes, and system optimization.',
    tags: ['Diagnostics', 'Driver Setup', 'System Repair'],
    icon: 'wrench',
  },
  {
    name: 'Internet Browsing & Research',
    category: 'Web & Tools',
    description: 'Efficient online searching, research, digital communications, web-based tools, email management, and digital safety.',
    tags: ['Web Research', 'Email Management', 'Digital Tools'],
    icon: 'globe',
  },
];

export const LANGUAGE_SKILLS_DATA: LanguageSkill[] = [
  {
    language: 'Bangla (Bengali)',
    nativeName: 'বাংলা',
    status: 'Native Language',
    levels: {
      reading: 'High',
      writing: 'High',
      speaking: 'High',
    },
    note: 'Complete fluency in native spoken, academic, and written Bengali.',
  },
  {
    language: 'English',
    nativeName: 'English',
    status: 'Professional Working',
    levels: {
      reading: 'High',
      writing: 'High',
      speaking: 'Medium',
    },
    note: 'Strong comprehension, accurate reading and professional written correspondence with effective verbal communication.',
  },
];

export const HOBBIES_DATA: HobbyItem[] = [
  {
    name: 'Cricket',
    icon: 'cricket',
    description: 'Passion for the gentleman’s game, appreciating tactical teamwork, focus, and competitive spirit.',
    tag: 'Team Sport',
  },
  {
    name: 'Football',
    icon: 'football',
    description: 'Enjoys the energy, coordination, stamina, and strategic passing play of football matches.',
    tag: 'Athletics',
  },
  {
    name: 'Badminton',
    icon: 'badminton',
    description: 'Fast-paced outdoor and court game fostering quick reflexes, agility, and concentration.',
    tag: 'Active Sport',
  },
  {
    name: 'Reading Books',
    icon: 'book',
    description: 'Enthusiastic reader exploring literature, informational articles, and self-improvement materials.',
    tag: 'Knowledge',
  },
  {
    name: 'Cycling',
    icon: 'bike',
    description: 'Active outdoor cycling promoting physical endurance, healthy lifestyle, and mindful recreation.',
    tag: 'Fitness & Outdoors',
  },
];

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: PERSONAL_INFO,
  highlightCards: HIGHLIGHT_CARDS,
  education: EDUCATION_DATA,
  skills: COMPUTER_SKILLS_DATA,
  languages: LANGUAGE_SKILLS_DATA,
  hobbies: HOBBIES_DATA,
};
