import React from 'react';
import { PageId } from '../types';
import { 
  Home, 
  Layers, 
  GraduationCap, 
  FileCheck2, 
  Image as ImageIcon, 
  BookOpen, 
  Briefcase, 
  HeartHandshake, 
  Mail, 
  Sun,
  Sparkles,
  CloudSun,
  Tv
} from 'lucide-react';

interface QuickNavShortcutsProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const QuickNavShortcuts: React.FC<QuickNavShortcutsProps> = ({ currentPage, onNavigate }) => {
  const links: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'मुख्य पृष्ठ', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'entertainment', label: 'स्मार्ट टीवी', icon: <Tv className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'panchang', label: 'दैनिक पंचांग', icon: <Sun className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'rashifal', label: 'राशिफल', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'weather', label: 'लाइव मौसम', icon: <CloudSun className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'jobs-news', label: 'जॉब अलर्ट्स', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'plans', label: '7 मास्टर प्लान', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'career-guide', label: 'करियर गाइड', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'सरकारी सेवा (RTPS)', icon: <FileCheck2 className="w-3.5 h-3.5" /> },
    { id: 'compressor', label: 'फोटो कंप्रेसर 50KB', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'study-hub', label: 'स्टडी व क्विज', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'parent-guide', label: 'अभिभावक गाइड', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'संपर्क', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full bg-slate-950/90 border-y border-amber-500/20 py-2.5 px-3 sm:px-6 backdrop-blur-md sticky top-[68px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 shrink-0 hidden sm:inline-block pr-2 border-r border-slate-800">
          त्वरित मेन्यू:
        </span>
        {links.map((link) => {
          const isActive = currentPage === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-black'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
