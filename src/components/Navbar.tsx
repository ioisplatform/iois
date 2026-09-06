import React, { useState } from 'react';
import { OFFICIAL_FORM_URL, OFFICIAL_WHATSAPP_URL, OFFICIAL_TELEGRAM_URL } from '../data/plansData';
import { ShieldCheck, MessageSquareText, Sparkles, Send, Share2, Copy, Check } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onScrollTo }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShareOrCopy = async () => {
    const liveUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IOIS Platform - Indian Online Income Supporting System',
          text: 'IOIS प्लेटफॉर्म पर 7 मास्टर प्लांस और इंस्टेंट पेआउट सिस्टम देखें:',
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

  return (
    <header id="main-header" className="bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 py-3.5 px-4 sm:px-6 sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollTo('hero')}>
          <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-500 via-yellow-400 to-green-500 p-0.5 shadow-lg flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-black text-amber-400 leading-none">IOIS</span>
              <span className="text-[7px] text-green-400 font-bold leading-none mt-0.5">INDIA</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="tiranga-text text-xl sm:text-2xl md:text-3xl font-black tracking-tight">IOIS PLATFORM</h1>
              <span className="hidden sm:inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                VERIFIED 2026
              </span>
            </div>
            <p className="gold-metallic-text text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold">
              Indian Online Income Supporting System
            </p>
          </div>
        </div>

        {/* Quick Nav & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-300 mr-2">
            <button onClick={() => onScrollTo('about-iois')} className="hover:text-amber-400 transition cursor-pointer">
              IOIS परिचय
            </button>
            <button onClick={() => onScrollTo('plans')} className="hover:text-amber-400 transition cursor-pointer">
              7 मास्टर प्लान
            </button>
            <button onClick={() => onScrollTo('interview-portal')} className="hover:text-amber-400 transition cursor-pointer">
              असेसमेंट
            </button>
            <button onClick={() => onScrollTo('calculator')} className="hover:text-amber-400 transition cursor-pointer">
              पेआउट कैलकुलेटर
            </button>
            <button onClick={() => onScrollTo('parents')} className="hover:text-amber-400 transition cursor-pointer">
              सुरक्षा पोर्टल
            </button>
          </nav>

          {/* Quick Share / Copy Link Button */}
          <button
            id="nav-share-btn"
            onClick={handleShareOrCopy}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-amber-400 text-slate-200 px-3 py-2 rounded-full text-xs font-bold shadow-md transition cursor-pointer"
            title="लिंक कॉपी या शेयर करें"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{copied ? 'कॉपी हो गया!' : 'शेयर लिंक'}</span>
          </button>

          {/* AI Chat Button */}
          <button
            id="nav-ai-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/50 hover:border-amber-400 text-amber-300 px-3 py-2 rounded-full text-xs font-bold shadow-md transition cursor-pointer"
            title="Ask AI Chatbot"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">AI असिस्टेंट</span>
          </button>

          {/* Verified Pass Primary Button */}
          <a
            id="nav-verified-pass-btn"
            href={OFFICIAL_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-xs shadow-lg hover:shadow-amber-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>GET VERIFIED PASS</span>
          </a>
        </div>
      </div>
    </header>
  );
};
