import React from 'react';
import { OFFICIAL_TELEGRAM_URL, OFFICIAL_WHATSAPP_URL } from '../data/plansData';
import { Send, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 py-12 sm:py-16 text-center text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 space-y-8">
        {/* Social / Helpline Links */}
        <div className="flex justify-center items-center gap-6 sm:gap-10">
          <a
            href={OFFICIAL_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 hover:text-sky-300 hover:scale-110 hover:border-sky-500/50 transition shadow-lg"
            title="Official Telegram"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            href={OFFICIAL_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-green-400 hover:text-green-300 hover:scale-110 hover:border-green-500/50 transition shadow-lg"
            title="Official WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>

        {/* Branding & Mission Statement */}
        <div className="space-y-2">
          <p className="gold-metallic-text text-xl sm:text-2xl font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">
            IOIS PLATFORM
          </p>
          <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-widest font-bold">
            Indian Online Income Supporting System
          </p>
          <p className="text-slate-500 text-xs max-w-xl mx-auto pt-2">
            डिजिटल शिक्षा, आत्मनिर्भर भारत और पारदर्शी इंस्टेंट इंसेंटिव सपोर्ट प्रणाली।
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900/80 pt-6 text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 IOIS National Infrastructure Project. All Rights Reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-slate-500">
            <span>Made with precision for Digital India</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
