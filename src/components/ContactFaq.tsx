import React from 'react';
import { 
  OFFICIAL_PHONE, 
  OFFICIAL_WHATSAPP_URL, 
  OFFICIAL_TELEGRAM_URL, 
  OFFICIAL_EMAIL,
  OFFICIAL_FORM_URL 
} from '../data/plansData';
import { MessageSquare, Send, Mail, HelpCircle, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactFaqProps {
  onAskAI: (question: string) => void;
}

export const ContactFaq: React.FC<ContactFaqProps> = ({ onAskAI }) => {
  return (
    <section id="contact-hub" className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
      {/* 1. Official Support Hub */}
      <div className="glass-card-premium p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
            24X7 VERIFIED HELPLINE
          </span>
          <h2 className="gold-metallic-text text-2xl sm:text-3xl font-black uppercase">
            Official Support Hub
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* WhatsApp */}
          <a
            href={OFFICIAL_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-green-500/50 rounded-2xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold">Whatsapp Support</span>
              <div className="text-white text-base sm:text-lg font-black">{OFFICIAL_PHONE}</div>
            </div>
          </a>

          {/* Telegram */}
          <a
            href={OFFICIAL_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold">Official Telegram</span>
              <div className="text-white text-base sm:text-lg font-black">@ioisplatform</div>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${OFFICIAL_EMAIL}`}
            className="flex items-center gap-4 p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-bold">Official Email</span>
              <div className="text-white text-sm sm:text-base font-bold">{OFFICIAL_EMAIL}</div>
            </div>
          </a>
        </div>
      </div>

      {/* 2. Frequently Asked Questions (FAQ) */}
      <div className="glass-card-premium p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
            CLEAR ANSWERS & CLARITY
          </span>
          <h2 className="gold-metallic-text text-2xl sm:text-3xl font-black uppercase">
            Common Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <details className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 transition open:border-amber-500/40 group">
            <summary className="cursor-pointer font-bold text-amber-300 uppercase text-xs flex justify-between items-center list-none select-none">
              <span>क्या पेआउट सच में तुरंत (Instant) मिलता है?</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition transform" />
            </summary>
            <p className="text-slate-300 mt-3 leading-relaxed border-t border-slate-800 pt-2.5">
              हाँ, IOIS का आर्किटेक्चर <strong>"Smart Payout Protocol"</strong> पर कार्य करता है। जैसे ही आपके रेफरल से कोई यूजर वेरिफाई होता है, उसका निर्धारित इंसेंटिव (जैसे Plan 01 में ₹7, Plan 07 में ₹499) तुरंत आपके खाते/वॉलेट में ट्रांसफर हो जाता है।
            </p>
          </details>

          <details className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 transition open:border-amber-500/40 group">
            <summary className="cursor-pointer font-bold text-amber-300 uppercase text-xs flex justify-between items-center list-none select-none">
              <span>क्या मैं किसी भी समय उच्च प्लान में अपग्रेड कर सकता हूँ?</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition transform" />
            </summary>
            <p className="text-slate-300 mt-3 leading-relaxed border-t border-slate-800 pt-2.5">
              बिल्कुल! आप ₹10 के Bal Vikas Pass से शुरुआत करके किसी भी समय अपनी सुविधानुसार उच्च प्लान जैसे Plan 03 (₹99) या Lifetime Master Access (₹999) पर अपग्रेड कर सकते हैं।
            </p>
          </details>

          <details className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 transition open:border-amber-500/40 group">
            <summary className="cursor-pointer font-bold text-amber-300 uppercase text-xs flex justify-between items-center list-none select-none">
              <span>क्या इसके लिए किसी विशेष तकनीकी ज्ञान की आवश्यकता है?</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition transform" />
            </summary>
            <p className="text-slate-300 mt-3 leading-relaxed border-t border-slate-800 pt-2.5">
              नहीं, सारा मटेरियल और सिस्टम अत्यंत सरल हिंदी और डिजिटल फॉर्मेट में तैयार किया गया है। साथ ही 24x7 AI असिस्टेंट आपके हर सवाल का मार्गदर्शन करने के लिए तैयार है।
            </p>
          </details>

          <div className="pt-2">
            <button
              onClick={() => onAskAI('मुझे IOIS के बारे में और अधिक जानकारी चाहिए, कृपया मार्गदर्शन करें।')}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>क्या आपका कोई अलग सवाल है? AI से पूछें</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
