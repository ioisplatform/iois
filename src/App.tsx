import React, { useState, useEffect } from 'react';
import { PageId, Plan } from './types';
import { Navbar } from './components/Navbar';
import { TickerBar } from './components/TickerBar';
import { QuickNavShortcuts } from './components/QuickNavShortcuts';
import { TopBannerSlider } from './components/TopBannerSlider';
import { HomeIntentFinder } from './components/HomeIntentFinder';
import { CareerRoadmapPage } from './components/CareerRoadmapPage';
import { GovtServicesHub } from './components/GovtServicesHub';
import { ImageCompressorHub } from './components/ImageCompressorHub';
import { StudyAndQuizHub } from './components/StudyAndQuizHub';
import { LiveNewsJobsHub } from './components/LiveNewsJobsHub';
import { PanchangPage } from './components/PanchangPage';
import { RashifalPage } from './components/RashifalPage';
import { WeatherPage } from './components/WeatherPage';
import { PolicyPages } from './components/PolicyPages';
import { AdminPanel } from './components/AdminPanel';
import { AssessmentPortal } from './components/AssessmentPortal';
import { PlansGrid } from './components/PlansGrid';
import { PayoutCalculator } from './components/PayoutCalculator';
import { ParentsPortal } from './components/ParentsPortal';
import { ContactFaq } from './components/ContactFaq';
import { Footer } from './components/Footer';
import { AIChatBot } from './components/AIChatBot';
import { EntertainmentHub } from './components/EntertainmentHub';
import { AdSenseBanner } from './components/AdSenseBanner';
import { RegistrationModal } from './components/RegistrationModal';
import { StudentMobileBottomBar } from './components/StudentMobileBottomBar';
import { 
  Sparkles, 
  Layers, 
  GraduationCap, 
  FileCheck2, 
  Image as ImageIcon, 
  BookOpen, 
  Briefcase, 
  Sun,
  CloudSun,
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Award,
  Users,
  Compass,
  Tv
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerInitialPlanId, setRegisterInitialPlanId] = useState<number | undefined>(undefined);

  const handleOpenRegister = (planId?: number) => {
    setRegisterInitialPlanId(planId);
    setIsRegisterOpen(true);
  };

  // Synchronize hash with page state for browser history & shareable URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'entertainment',
        'panchang',
        'rashifal',
        'weather',
        'jobs-news',
        'plans',
        'career-guide',
        'services',
        'compressor',
        'study-hub',
        'utilities',
        'parent-guide',
        'about',
        'privacy',
        'terms',
        'disclaimer',
        'contact',
        'admin',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic document title for Google AdSense & SEO crawlers per page
  useEffect(() => {
    const titles: Record<PageId, string> = {
      'home': 'Remix IOIS Platform | Indian Online Income Supporting System',
      'plans': '7 मास्टर डिजिटल प्लान एवं इंसेंटेंट पेआउट | IOIS Platform',
      'weather': 'लाइव मौसम एवं वर्षा रिपोर्ट | IOIS Platform',
      'compressor': 'फ्री फोटो व सिग्नेचर कंप्रेसर टूल (50KB/20KB) | IOIS Platform',
      'services': 'RTPS बिहार व सरकारी योजना सेवा केंद्र | IOIS Platform',
      'career-guide': 'करियर मार्गदर्शन व डिजिटल कोर्सेज | IOIS Platform',
      'study-hub': 'NCERT डिजिटल लाइब्रेरी व करेंट अफेयर्स क्विज | IOIS Platform',
      'entertainment': 'IOIS Smart TV & Live Chat | IOIS Platform',
      'panchang': 'आज का संपूर्ण पंचांग व शुभ मुहूर्त | IOIS Platform',
      'rashifal': 'दैनिक राशिफल 2026 | IOIS Platform',
      'jobs-news': 'सरकारी नौकरी अलर्ट एवं ताजा खबरें | IOIS Platform',
      'utilities': 'डिजिटल जनोपयोगी टूल्स | IOIS Platform',
      'parent-guide': 'अभिभावक डिजिटल गाइड | IOIS Platform',
      'about': 'संस्था परिचय | About IOIS Platform',
      'privacy': 'गोपनीयता नीति | Privacy Policy - IOIS Platform',
      'terms': 'नियम एवं शर्तें | Terms of Service - IOIS Platform',
      'disclaimer': 'अस्वीकरण सूचना | Official Disclaimer - IOIS Platform',
      'contact': 'संपर्क केंद्र | Contact Us - IOIS Platform',
      'admin': 'एडमिन पैनल | IOIS Platform',
    };
    if (titles[currentPage]) {
      document.title = titles[currentPage];
    }
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans">
      {/* 1. Header with Clock & Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenChat={() => {
          setChatInitialQuery('');
          setIsChatOpen(true);
        }}
        onOpenRegister={() => handleOpenRegister()}
      />

      {/* 2. Controlled Live Ticker */}
      <TickerBar onOpenRegister={handleOpenRegister} />

      {/* 3. Quick Navigation Sticky Shortcuts Bar */}
      <QuickNavShortcuts 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        onOpenRegister={() => handleOpenRegister()}
      />

      {/* 4. Main Multi-Page Content Area */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 pb-20 lg:pb-12">
        {/* ================= PAGE: HOME ================= */}
        {currentPage === 'home' && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
            {/* Top Carousel Slider */}
            <TopBannerSlider onNavigate={navigateTo} />

            {/* Personalized Intent Finder: 5 Questions with Tailored Welcome */}
            <HomeIntentFinder onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />

            {/* Quick Explore Service Bento Cards - Only Essential & Clean */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  सभी प्रमुख सेवाएं &bull; Explore Dedicated Services
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  IOIS प्लेटफॉर्म के प्रमुख अनुभाग
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                  अपनी जरूरत अनुसार किसी भी अनुभाग पर एक क्लिक में जाएं:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 0. IOIS Smart TV & Entertainment */}
                <div
                  onClick={() => navigateTo('entertainment')}
                  className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-2xl group relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition border border-amber-500/30">
                      <Tv className="w-6 h-6" />
                    </div>
                    <span className="bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      स्मार्ट टीवी
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    IOIS स्मार्ट टीवी & कम्युनिटी रूम
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    मनपसंद वीडियो बिना रीडायरेक्ट हुए उसी स्क्रीन पर देखें, लाइव चैट करें, वीडियो कॉल और 15+ तस्वीरों का फोटो एल्बम एक्सप्लोर करें।
                  </p>
                  <div className="pt-2 text-xs font-black text-amber-400 flex items-center gap-1">
                    <span>स्मार्ट टीवी शुरू करें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 1. Panchang & Shubh Muhurat */}
                <div
                  onClick={() => navigateTo('panchang')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    दैनिक पंचांग एवं शुभ मुहूर्त
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    तिथि, नक्षत्र, योग, करण, अभिजीत मुहूर्त, राहुकाल और चौघड़िया का संपूर्ण वैदिक काल-गणना विवरण।
                  </p>
                  <div className="pt-2 text-xs font-black text-amber-400 flex items-center gap-1">
                    <span>आज का पंचांग देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Daily Rashifal */}
                <div
                  onClick={() => navigateTo('rashifal')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-purple-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition">
                    दैनिक राशिफल (12 राशियां)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    मेष से मीन तक सभी राशियों का दैनिक करियर, धन, स्वास्थ्य फल, शुभ रंग-अंक और ऑडियो वाचन।
                  </p>
                  <div className="pt-2 text-xs font-black text-purple-400 flex items-center gap-1">
                    <span>अपनी राशि का फल जानें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Live Weather Forecast */}
                <div
                  onClick={() => navigateTo('weather')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-sky-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition">
                    <CloudSun className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-sky-300 transition">
                    लाइव मौसम पूर्वानुमान (Live Weather)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Open-Meteo लाइव डेटा द्वारा तापमान, आर्द्रता, वायु गति, प्रति घंटा व 7 दिवसीय मौसम रिपोर्ट।
                  </p>
                  <div className="pt-2 text-xs font-black text-sky-400 flex items-center gap-1">
                    <span>मौसम पूर्वानुमान देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 4. Jobs & News Alerts */}
                <div
                  onClick={() => navigateTo('jobs-news')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-emerald-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition">
                    सरकारी नौकरी व रिजल्ट अलर्ट्स
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    SSC, रेलवे RRB, बिहार पुलिस, BPSC, UPSC एवं डिजिटल वर्क अवसर की नियमित ऑटो-अपडेट सूची।
                  </p>
                  <div className="pt-2 text-xs font-black text-emerald-400 flex items-center gap-1">
                    <span>जॉब अलर्ट्स खोलें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 5. 7 Master Plans */}
                <div
                  onClick={() => navigateTo('plans')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    7 मास्टर प्लान एवं पेआउट
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ₹10 से ₹999 तक के प्रमाणित डिजिटल लर्निंग प्लांस, 50% से 70% तक इंस्टेंट रेफरल पेआउट।
                  </p>
                  <div className="pt-2 text-xs font-black text-amber-400 flex items-center gap-1">
                    <span>7 प्लांस देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 6. Career Guide */}
                <div
                  onClick={() => navigateTo('career-guide')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-green-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-green-300 transition">
                    10वीं/12वीं के बाद क्या करें?
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    ADCA, DCA, Tally, ITI, पॉलिटेक्निक और सरकारी भर्ती की संपूर्ण करियर गाइडेंस।
                  </p>
                  <div className="pt-2 text-xs font-black text-green-400 flex items-center gap-1">
                    <span>करियर गाइड खोलें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 7. RTPS Bihar Govt Services */}
                <div
                  onClick={() => navigateTo('services')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-blue-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition">
                    सरकारी सेवा हब (RTPS & आधार)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    जातीय, आवासीय, आय प्रमाण पत्र ऑनलाइन गाइड, आधार सुधार, पैन कार्ड और फ्री बायोडाटा मेकर।
                  </p>
                  <div className="pt-2 text-xs font-black text-blue-400 flex items-center gap-1">
                    <span>सेवा हब देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 8. Free Photo Compressor */}
                <div
                  onClick={() => navigateTo('compressor')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-rose-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-rose-300 transition">
                    फ्री फोटो कंप्रेसर टूल (50KB)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    RTPS और सरकारी फॉर्म के लिए फोटो 50KB तथा हस्ताक्षर 20KB में कंप्रेस करें और डाउनलोड करें।
                  </p>
                  <div className="pt-2 text-xs font-black text-rose-400 flex items-center gap-1">
                    <span>फोटो कंप्रेस करें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 9. NCERT & Study Hub */}
                <div
                  onClick={() => navigateTo('study-hub')}
                  className="bg-slate-900/90 border border-slate-800 hover:border-yellow-400/50 p-6 rounded-3xl space-y-3 cursor-pointer transition transform hover:-translate-y-1 shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-yellow-300 transition">
                    NCERT लाइब्रेरी व डेली क्विज
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    कक्षा 6 से 12 तक आधिकारिक पुस्तकें, आज का सामान्य ज्ञान और तत्काल स्कोर वाला ऑनलाइन टेस्ट।
                  </p>
                  <div className="pt-2 text-xs font-black text-yellow-400 flex items-center gap-1">
                    <span>स्टडी हब खोलें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </section>

            {/* Why IOIS Platform - Transparent & Verified Summary */}
            <section className="glass-card-premium p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-slate-950/80 shadow-2xl">
              <div className="max-w-4xl mx-auto space-y-6 text-center">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/40 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span>प्रमाणित एवं सुरक्षित डिजिटल प्लेटफार्म 2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  IOIS (Indian Online Income Supporting System) का लक्ष्य
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  हमारा उद्देश्य भारतीय छात्रों, युवाओं और परिवारों को डिजिटल शिक्षा, करियर मार्गदर्शन, निशुल्क सरकारी सेवा सहायता और नैतिक इनकम सपोर्ट प्रदान करना है। यहाँ कोई छिपे हुए नियम नहीं हैं—सभी प्लांस, पेआउट प्रतिशत और सेवाएं पूरी तरह पारदर्शी हैं।
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">7</div>
                    <div className="text-[11px] text-slate-400 font-bold mt-1">मास्टर प्लांस</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xl sm:text-2xl font-black text-green-400 font-mono">70%</div>
                    <div className="text-[11px] text-slate-400 font-bold mt-1">अधिकतम पेआउट</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">100%</div>
                    <div className="text-[11px] text-slate-400 font-bold mt-1">फ्री जनोपयोगी टूल्स</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">24/7</div>
                    <div className="text-[11px] text-slate-400 font-bold mt-1">AI एवं सपोर्ट सहायता</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PAGE: ENTERTAINMENT & SMART TV ================= */}
        {currentPage === 'entertainment' && (
          <EntertainmentHub onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: PANCHANG ================= */}
        {currentPage === 'panchang' && (
          <PanchangPage onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: RASHIFAL ================= */}
        {currentPage === 'rashifal' && (
          <RashifalPage onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: WEATHER ================= */}
        {currentPage === 'weather' && (
          <WeatherPage onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: JOBS & ALERTS ================= */}
        {currentPage === 'jobs-news' && (
          <LiveNewsJobsHub onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: PLANS ================= */}
        {currentPage === 'plans' && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>IOIS 7 मास्टर प्लांस &bull; 100% पारदर्शी डिजिटल लर्निंग</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
                IOIS के 7 प्रमाणित मास्टर प्लांस एवं इंस्टेंट पेआउट
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
                ₹10 से लेकर ₹999 तक के प्रत्येक प्लान में वास्तविक डिजिटल रिसोर्सेज, ई-बुक्स और उच्च कमीशन पेआउट शामिल हैं।
              </p>
            </div>

            {/* Complete Plans Grid */}
            <PlansGrid onAskAI={handleOpenChatWithQuery} onOpenRegister={handleOpenRegister} />

            {/* Assessment Portal */}
            <AssessmentPortal onAskAI={handleOpenChatWithQuery} />

            {/* Instant Calculator */}
            <PayoutCalculator />
          </div>
        )}

        {/* ================= PAGE: CAREER ROADMAP & COURSES ================= */}
        {currentPage === 'career-guide' && (
          <CareerRoadmapPage onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: GOVT SERVICES & RESUME ================= */}
        {currentPage === 'services' && (
          <GovtServicesHub onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: PHOTO COMPRESSOR ================= */}
        {currentPage === 'compressor' && (
          <ImageCompressorHub onNavigate={navigateTo} />
        )}

        {/* ================= PAGE: STUDY & QUIZ HUB ================= */}
        {currentPage === 'study-hub' && (
          <StudyAndQuizHub onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: UTILITIES ================= */}
        {currentPage === 'utilities' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <PanchangPage onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
          </div>
        )}

        {/* ================= PAGE: PARENT GUIDANCE ================= */}
        {currentPage === 'parent-guide' && (
          <ParentsPortal onNavigate={navigateTo} onAskAI={handleOpenChatWithQuery} />
        )}

        {/* ================= PAGE: ABOUT US ================= */}
        {currentPage === 'about' && (
          <PolicyPages type="about" onNavigate={navigateTo} />
        )}

        {/* ================= PAGE: PRIVACY POLICY ================= */}
        {currentPage === 'privacy' && (
          <PolicyPages type="privacy" onNavigate={navigateTo} />
        )}

        {/* ================= PAGE: TERMS & CONDITIONS ================= */}
        {currentPage === 'terms' && (
          <PolicyPages type="terms" onNavigate={navigateTo} />
        )}

        {/* ================= PAGE: DISCLAIMER ================= */}
        {currentPage === 'disclaimer' && (
          <PolicyPages type="disclaimer" onNavigate={navigateTo} />
        )}

        {/* ================= PAGE: CONTACT US ================= */}
        {currentPage === 'contact' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <PolicyPages type="contact" onNavigate={navigateTo} />
            <ContactFaq onAskAI={handleOpenChatWithQuery} />
          </div>
        )}

        {/* ================= PAGE: ADMIN PANEL ================= */}
        {currentPage === 'admin' && (
          <AdminPanel onNavigate={navigateTo} />
        )}

        {/* Google AdSense Compliant Banner Slot */}
        {currentPage !== 'admin' && (
          <div className="pt-6">
            <AdSenseBanner className="max-w-4xl mx-auto" />
          </div>
        )}
      </main>

      {/* 5. Official AdSense-Compliant Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 5.5. Student Friendly Mobile & Tablet Bottom Navigation Bar */}
      <StudentMobileBottomBar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenRegister={() => handleOpenRegister()}
        onOpenChat={() => {
          setChatInitialQuery('');
          setIsChatOpen(true);
        }}
      />

      {/* 6. Floating AI Assistant Launcher Button */}
      <button
        id="floating-ai-chat-launcher"
        onClick={() => {
          setChatInitialQuery('');
          setIsChatOpen(true);
        }}
        className="fixed bottom-16 sm:bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 transition transform hover:scale-108 active:scale-95 cursor-pointer border-2 border-white/40"
        title="Open Live AI Assistant"
      >
        <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s' }} />
        <span className="hidden sm:inline">Ask IOIS AI</span>
        <span className="sm:hidden">AI</span>
      </button>

      {/* 7. Live AI Chatbot Modal / Drawer */}
      <AIChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* 8. Student Registration / Join Now Modal with UPI Warning & Sponsor ID */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialPlanId={registerInitialPlanId}
      />
    </div>
  );
}
