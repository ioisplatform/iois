import React, { useState } from 'react';
import { PageId } from '../types';
import { OFFICIAL_FORM_URL } from '../data/plansData';
import { HeaderClock } from './HeaderClock';
import { 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  Check, 
  Menu, 
  X, 
  Lock, 
  Sun, 
  CloudSun, 
  Briefcase,
  Calendar,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenChat: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenChat,
  onOpenRegister 
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleShareOrCopy = async () => {
    const liveUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IOIS Platform - Indian Online Income Supporting System',
          text: 'IOIS प्लेटफॉर्म पर 7 मास्टर प्लांस, दैनिक पंचांग, राशिफल, मौसम, करियर गाइड व RTPS सेवाएं देखें:',
          url: liveUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const navItems: { id: PageId; label: string; icon?: any }[] = [
    { id: 'home', label: 'होम' },
    { id: 'entertainment', label: 'स्मार्ट टीवी' },
    { id: 'panchang', label: 'पंचांग व मुहूर्त' },
    { id: 'rashifal', label: 'राशिफल' },
    { id: 'weather', label: 'लाइव मौसम' },
    { id: 'jobs-news', label: 'जॉब अलर्ट्स' },
    { id: 'plans', label: '7 मास्टर प्लान' },
    { id: 'career-guide', label: 'करियर गाइड' },
    { id: 'services', label: 'सरकारी सेवा (RTPS)' },
    { id: 'compressor', label: 'फोटो कंप्रेसर' },
    { id: 'study-hub', label: 'स्टडी व क्विज' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/20 py-2.5 px-3 sm:px-6 sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* 1. Brand / Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-500 via-yellow-400 to-green-500 p-0.5 shadow-lg flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-black text-amber-400 leading-none">IOIS</span>
              <span className="text-[7px] text-green-400 font-bold leading-none mt-0.5">INDIA</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="tiranga-text text-base sm:text-xl font-black tracking-tight leading-none">IOIS PLATFORM</h1>
              <span className="hidden md:inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-[8px] font-black px-1.5 py-0.5 rounded-full">
                VERIFIED 2026
              </span>
            </div>
            <p className="gold-metallic-text text-[7px] sm:text-[8px] uppercase tracking-widest font-semibold mt-0.5">
              Indian Online Income Supporting System
            </p>
          </div>
        </div>

        {/* 2. Premium Small Digital & Analog Clock in Header */}
        <div className="flex items-center">
          <HeaderClock onNavigate={onNavigate} />
        </div>

        {/* 3. Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2 text-xs font-bold text-slate-300">
          {navItems.slice(0, 8).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition cursor-pointer px-2 py-1 rounded-lg text-[11px] whitespace-nowrap ${
                currentPage === item.id
                  ? 'text-amber-400 font-black border-b-2 border-amber-400 bg-amber-500/10'
                  : 'hover:text-amber-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 4. Quick Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Share */}
          <button
            id="nav-share-btn"
            onClick={handleShareOrCopy}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-200 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-bold shadow-md transition cursor-pointer"
            title="पोर्टल शेयर करें"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden lg:inline">{copied ? 'कॉपी हुआ!' : 'शेयर'}</span>
          </button>

          {/* AI Chat Button */}
          <button
            id="nav-ai-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-amber-500/50 hover:border-amber-400 text-amber-300 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-bold shadow-md transition cursor-pointer"
            title="Ask AI Chatbot"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden lg:inline">AI असिस्टेंट</span>
          </button>

          {/* Admin Login Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`p-2 rounded-full border transition cursor-pointer ${
              currentPage === 'admin'
                ? 'bg-amber-400 text-black border-amber-400'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400 hover:text-amber-300'
            }`}
            title="एडमिन पैनल"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* Registration / Join Now Primary Button (Direct Google Form Link) */}
          <a
            id="nav-join-now-btn"
            href={OFFICIAL_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-white/40 shrink-0 transition transform hover:scale-105 active:scale-95 cursor-pointer"
            title="रजिस्ट्रेशन / Join Now (गूगल फॉर्म)"
          >
            <UserPlus className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span className="font-black whitespace-nowrap">रजिस्ट्रेशन / Join Now</span>
          </a>

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in duration-200">
          {/* Prominent Join Now in Drawer */}
          <a
            href={OFFICIAL_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 p-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg mb-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>रजिस्ट्रेशन / Join Now (गूगल फॉर्म) - यहाँ क्लिक करें</span>
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-xs font-bold p-2.5 rounded-xl border transition cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-amber-400 text-black border-amber-400 font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('parent-guide')}
              className={`text-left text-xs font-bold p-2.5 rounded-xl border transition cursor-pointer ${
                currentPage === 'parent-guide'
                  ? 'bg-amber-400 text-black border-amber-400 font-black'
                  : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              अभिभावक सुरक्षा गाइड
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left text-xs font-bold p-2.5 rounded-xl border transition cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-amber-400 text-black border-amber-400 font-black'
                  : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              संपर्क केंद्र
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
