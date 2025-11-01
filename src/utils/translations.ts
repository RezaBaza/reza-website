export type Language = 'en' | 'sv' | 'fa';

export interface Translations {
  nav: {
    home: string;
    posts: string;
    resume: string;
  };
  home: {
    title: string;
    subtitle: string;
    chatButton: string;
    intro: string;
    leadership: string;
    advisory: string;
    innovation: string;
    teamDev: string;
    stakeholder: string;
    technicalSkills: string;
    advancedAnalytics: string;
    businessIntelligence: string;
    marketingTech: string;
    readPosts: string;
    viewResume: string;
    basedIn: string;
  };
  resume: {
    title: string;
    tagline: string;
    resumeTitle: string;
    description: string;
    skills: string;
    languages: string;
    frameworks: string;
    biViz: string;
    leadership: string;
    experience: string;
    download: string;
    downloadText: string;
    downloadEN: string;
    downloadSV: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      posts: 'Posts',
      resume: 'Resume',
    },
    home: {
      title: "Hi, I'm Reza Bazargan 👋",
      subtitle: 'Data Strategist & Analyst · AI specialist · PhD in Mathematics',
      chatButton: "Chat with Reza's AI Assistant",
      intro: 'Senior Data Analytics Leader with 10+ years of experience transforming business operations through advanced analytics across Nordic markets. Proven track records in:',
      leadership: 'Data Science and Analytics Leadership: Built and led cross-functional analytics teams delivering multi-million revenue impact through ML models and predictive frameworks.',
      advisory: 'Client Advisory: Strategic C-suite consultation on data-driven initiatives, translating complex insights into actionable business recommendations.',
      innovation: 'Technical Innovation: Design and implementation of scalable ML solutions for customer behavior analysis and revenue optimization.',
      teamDev: 'Team Development: Mentored high-performing analytics teams, establishing data-driven culture across multiple organizations.',
      stakeholder: 'Stakeholder Management: Successfully led cross-functional projects involving product, sales, marketing and executive stakeholders.',
      technicalSkills: 'Technical Skills',
      advancedAnalytics: 'Advanced Analytics',
      businessIntelligence: 'Business Intelligence',
      marketingTech: 'Marketing Tech Stack',
      readPosts: 'Read My Posts',
      viewResume: 'View My Resume',
      basedIn: 'Based in Stockholm |',
    },
    resume: {
      title: 'Reza Bazargan – Resume',
      tagline: 'Data Strategist · AI Specialist · PhD in Mathematics',
      resumeTitle: 'Resume',
      description: "I'm an experienced data strategist, PhD in mathematics, and AI transformation leader. My work bridges technical excellence with real-world organizational value.",
      skills: 'Skills',
      languages: 'Languages',
      frameworks: 'Frameworks',
      biViz: 'BI & Visualization',
      leadership: 'Leadership',
      experience: 'Experience',
      download: 'Download',
      downloadText: 'Download CV (PDF)',
      downloadEN: 'Download CV in English',
      downloadSV: 'Download CV in Swedish',
    },
  },
  sv: {
    nav: {
      home: 'Hem',
      posts: 'Inlägg',
      resume: 'CV',
    },
    home: {
      title: 'Hej, jag heter Reza Bazargan 👋',
      subtitle: 'Data Strategist & Analytiker · AI specialist · Doktor i Matematik',
      chatButton: 'Chatta med Rezas AI-assistent',
      intro: 'Senior Data Analytics Ledare med 10+ års erfarenhet av att transformera affärsverksamhet genom avancerad analys över nordiska marknader. Bevisad meritlista inom:',
      leadership: 'Data Science och Analytics Ledarskap: Byggt och lett tvärfunktionella analysgrupper som levererar flera miljoner intäktspåverkan genom ML-modeller och prediktiva ramverk.',
      advisory: 'Kundrådgivning: Strategisk C-suite konsultation om datadrivna initiativ, översätter komplexa insikter till handlingsbara affärsrekommendationer.',
      innovation: 'Teknisk Innovation: Design och implementation av skalbara ML-lösningar för kundbeteendeanalys och intäktsoptimering.',
      teamDev: 'Teamutveckling: Mentorerat högpresterande analysgrupper, etablerat datadriven kultur över flera organisationer.',
      stakeholder: 'Intressenthantering: Framgångsrikt lett tvärfunktionella projekt som involverar produkt, försäljning, marknadsföring och verkställande intressenter.',
      technicalSkills: 'Tekniska Färdigheter',
      advancedAnalytics: 'Avancerad Analys',
      businessIntelligence: 'Business Intelligence',
      marketingTech: 'Marketing Tech Stack',
      readPosts: 'Läs Mina Inlägg',
      viewResume: 'Visa Mitt CV',
      basedIn: 'Baserad i Stockholm |',
    },
    resume: {
      title: 'Reza Bazargan – CV',
      tagline: 'Data Strategist · AI Specialist · Doktor i Matematik',
      resumeTitle: 'CV',
      description: 'Jag är en erfaren datastrateg, doktor i matematik och AI-transformationsledare. Mitt arbete kopplar samman teknisk excellens med värde för organisationer i verkligheten.',
      skills: 'Färdigheter',
      languages: 'Språk',
      frameworks: 'Ramverk',
      biViz: 'BI & Visualisering',
      leadership: 'Ledarskap',
      experience: 'Erfarenhet',
      download: 'Ladda ner',
      downloadText: 'Ladda ner CV (PDF)',
      downloadEN: 'Ladda ner CV på engelska',
      downloadSV: 'Ladda ner CV på svenska',
    },
  },
  fa: {
    nav: {
      home: 'خانه',
      posts: 'پست‌ها',
      resume: 'رزومه',
    },
    home: {
      title: 'سلام، من رضا بازرگان هستم 👋',
      subtitle: 'استراتژیست داده و تحلیلگر · متخصص هوش مصنوعی · دکترای ریاضی',
      chatButton: 'چت با دستیار هوش مصنوعی رضا',
      intro: 'رهبر ارشد داده و تحلیل با بیش از ۱۰ سال تجربه در تحول عملیات کسب‌وکار از طریق تحلیل پیشرفته در بازارهای نوردیک. سوابق اثبات شده در:',
      leadership: 'رهبری علوم داده و تحلیل: ساخت و رهبری تیم‌های تحلیل چندعملکردی که تاثیر درآمد چند میلیونی از طریق مدل‌های یادگیری ماشین و چارچوب‌های پیش‌بینی ارائه می‌دهند.',
      advisory: 'مشاوره به مشتریان: مشاوره استراتژیک سطح C-suite در ابتکارات داده‌محور، ترجمه بینش‌های پیچیده به توصیه‌های عملی کسب‌وکار.',
      innovation: 'نوآوری فنی: طراحی و پیاده‌سازی راه‌حل‌های مقیاس‌پذیر یادگیری ماشین برای تحلیل رفتار مشتری و بهینه‌سازی درآمد.',
      teamDev: 'توسعه تیم: مربیگری تیم‌های تحلیل با عملکرد بالا، ایجاد فرهنگ داده‌محور در چندین سازمان.',
      stakeholder: 'مدیریت ذینفعان: رهبری موفق پروژه‌های چندعملکردی شامل محصول، فروش، بازاریابی و ذینفعان اجرایی.',
      technicalSkills: 'مهارت‌های فنی',
      advancedAnalytics: 'تحلیل پیشرفته',
      businessIntelligence: 'هوش تجاری',
      marketingTech: 'پشته فناوری بازاریابی',
      readPosts: 'خواندن پست‌های من',
      viewResume: 'مشاهده رزومه من',
      basedIn: 'مستقر در استکهلم |',
    },
    resume: {
      title: 'رضا بازرگان – رزومه',
      tagline: 'استراتژیست داده · متخصص هوش مصنوعی · دکترای ریاضی',
      resumeTitle: 'رزومه',
      description: 'من یک استراتژیست داده با تجربه، دکترای ریاضیات، و رهبر تحول هوش مصنوعی هستم. کار من تعالی فنی را با ارزش سازمانی در دنیای واقعی متصل می‌کند.',
      skills: 'مهارت‌ها',
      languages: 'زبان‌ها',
      frameworks: 'چارچوب‌ها',
      biViz: 'هوش تجاری و تجسم',
      leadership: 'رهبری',
      experience: 'تجربه',
      download: 'دانلود',
      downloadText: 'دانلود رزومه (PDF)',
      downloadEN: 'دانلود رزومه به انگلیسی',
      downloadSV: 'دانلود رزومه به سوئدی',
    },
  },
};

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/fa')) return 'fa';
  if (pathname.startsWith('/sv')) return 'sv';
  return 'en';
}

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}

export function getAlternatePath(currentPath: string, targetLang: Language): string {
  const isSwedish = currentPath.startsWith('/sv');
  const isFarsi = currentPath.startsWith('/fa');
  
  // Remove current language prefix
  let basePath = currentPath;
  if (isSwedish) basePath = basePath.replace('/sv', '') || '/';
  if (isFarsi) basePath = basePath.replace('/fa', '') || '/';
  
  // Add target language prefix
  if (targetLang === 'sv') {
    return `/sv${basePath === '/' ? '' : basePath}`;
  } else if (targetLang === 'fa') {
    return `/fa${basePath === '/' ? '' : basePath}`;
  } else {
    return basePath;
  }
}

