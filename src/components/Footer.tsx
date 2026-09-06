import React from 'react';
import { PageId } from '../types';
import { OFFICIAL_TELEGRAM_URL, OFFICIAL_WHATSAPP_URL } from '../data/plansData';
import { Send, MessageSquare, ShieldCheck, Heart, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 py-12 sm:py-16 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-amber-400 bg-slate-900 flex items-center justify-center font-black text-amber-400 text-xs">
                IOIS
              </div>
              <span className="tiranga-text font-black text-lg tracking-tight">IOIS PLATFORM</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Indian Online Income Supporting System &bull; भारतीय युवाओं, छात्रों और नागरिकों के लिए समर्पित डिजिटल साक्षरता, करियर गाइडेंस, सरकारी सेवा हब और आत्मनिर्भरता मंच।
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={OFFICIAL_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 hover:text-sky-300 hover:border-sky-500/50 transition"
                title="Official Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={OFFICIAL_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-green-400 hover:text-green-300 hover:border-green-500/50 transition"
                title="Official WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Main Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              मुख्य अनुभाग (Main Sections)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition cursor-pointer">
                  मुख्य पृष्ठ (Home Page)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-400 transition cursor-pointer">
                  7 मास्टर प्लान (Master Plans)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-guide')} className="hover:text-amber-400 transition cursor-pointer">
                  10वीं/12वीं करियर व ADCA गाइड
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition cursor-pointer">
                  सरकारी सेवा हब (RTPS Bihar)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compressor')} className="hover:text-amber-400 transition cursor-pointer">
                  फ्री फोटो कंप्रेसर (50KB / 20KB)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-hub')} className="hover:text-amber-400 transition cursor-pointer">
                  NCERT बुक्स, डेली GK व मॉक टेस्ट
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs-news')} className="hover:text-amber-400 transition cursor-pointer">
                  सरकारी नौकरी व भर्ती अलर्ट्स
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('entertainment')} className="hover:text-amber-400 transition cursor-pointer">
                  स्मार्ट टीवी & फोटो एल्बम (Smart TV)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('panchang')} className="hover:text-amber-400 transition cursor-pointer">
                  दैनिक पंचांग एवं शुभ मुहूर्त
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rashifal')} className="hover:text-amber-400 transition cursor-pointer">
                  दैनिक राशिफल (12 राशियां)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('weather')} className="hover:text-amber-400 transition cursor-pointer">
                  लाइव मौसम पूर्वानुमान (Live Weather)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & AdSense Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              नीतियां एवं नियम (Legal & Policies)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition cursor-pointer">
                  हमारे बारे में (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition cursor-pointer">
                  गोपनीयता नीति (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition cursor-pointer">
                  नियम एवं शर्तें (Terms of Service)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-amber-400 transition cursor-pointer">
                  अस्वीकरण सूचना (Disclaimer)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition cursor-pointer">
                  संपर्क करें (Contact Us)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('parent-guide')} className="hover:text-amber-400 transition cursor-pointer">
                  अभिभावक सुरक्षा मार्गदर्शन
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-slate-500 hover:text-amber-400 transition cursor-pointer">
                  व्यवस्थापक लॉगिन (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              हेल्पलाइन व कार्यालय
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <a href="tel:+918877490845" className="text-slate-300 hover:text-white font-bold">
                  +91 8877490845
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:ioisplatform@gmail.com" className="text-slate-300 hover:text-white">
                  ioisplatform@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  IOIS डिजिटल हब, गांधी मैदान रोड, पटना, बिहार - 800001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="border-t border-slate-900 pt-6 text-[11px] text-slate-500 leading-relaxed text-center max-w-4xl mx-auto space-y-1">
          <p>
            <strong>अस्वीकरण:</strong> IOIS एक स्वतंत्र गैर-सरकारी डिजिटल शैक्षणिक एवं जन-जागरूकता पोर्टल है। यह किसी भी सरकारी विभाग का आधिकारिक पोर्टल नहीं है। आधिकारिक सरकारी फॉर्म (RTPS, आधार, पैन, वोटर) हमेशा संबंधित विभागों की आधिकारिक वेबसाइटों पर ही भरे जाते हैं।
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900/80 pt-6 text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider text-center flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 IOIS National Platform. सर्वाधिकार सुरक्षित (All Rights Reserved).</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-slate-500">
            डिजिटल इंडिया और आत्मनिर्भर युवा अभियान
          </span>
        </div>
      </div>
    </footer>
  );
};

