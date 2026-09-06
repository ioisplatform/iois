import React from 'react';
import { PageId } from '../types';
import { OFFICIAL_FORM_URL } from '../data/plansData';
import { 
  Home, 
  Layers, 
  Image as ImageIcon, 
  UserPlus, 
  Sparkles, 
  Tv, 
  Sun,
  FileCheck2
} from 'lucide-react';

interface StudentMobileBottomBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenRegister?: () => void;
  onOpenChat: () => void;
}

export const StudentMobileBottomBar: React.FC<StudentMobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  onOpenRegister,
  onOpenChat,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/30 px-2 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.7)] lg:hidden">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            currentPage === 'home'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[9px]">होम</span>
        </button>

        {/* 2. 7 Plans */}
        <button
          onClick={() => onNavigate('plans')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            currentPage === 'plans'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[9px]">7 प्लान्स</span>
        </button>

        {/* 3. CENTER HERO: JOIN NOW / रजिस्ट्रेशन (Opens Google Form) */}
        <a
          href={OFFICIAL_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-4 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black p-2.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-white/60 active:scale-95 transition transform hover:scale-105 cursor-pointer min-w-[62px]"
          title="रजिस्ट्रेशन / Join Now (गूगल फॉर्म)"
        >
          <UserPlus className="w-5 h-5 mb-0.5 stroke-[2.5]" />
          <span className="text-[9px] uppercase tracking-tighter leading-none font-black">
            Join Now
          </span>
        </a>

        {/* 4. Photo Compressor (Essential for Students) */}
        <button
          onClick={() => onNavigate('compressor')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition cursor-pointer min-w-[56px] ${
            currentPage === 'compressor'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4 mb-0.5" />
          <span className="text-[9px]">कंप्रेसर</span>
        </button>

        {/* 5. AI Assistant */}
        <button
          onClick={onOpenChat}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-amber-300 hover:text-amber-200 transition cursor-pointer min-w-[56px]"
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-amber-400 animate-pulse" />
          <span className="text-[9px]">AI चैट</span>
        </button>
      </div>
    </div>
  );
};
