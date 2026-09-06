import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, HeartHandshake, BookOpen, Clock, Lock, CheckCircle2, PhoneCall } from 'lucide-react';

interface ParentsPortalProps {
  onNavigate?: (page: PageId) => void;
  onAskAI?: (query: string) => void;
}

export const ParentsPortal: React.FC<ParentsPortalProps> = ({ onNavigate, onAskAI }) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 via-amber-500/20 to-blue-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4 text-green-400" />
          <span>अभिभावक एवं छात्र सुरक्षा मार्गदर्शन &bull; Parent & Student Safety Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
          अभिभावकों के लिए सुरक्षा एवं डिजिटल संस्कार नीति
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          IOIS (Indian Online Income Supporting System) प्लेटफॉर्म का उद्देश्य भारत के हर बच्चे और युवा को सुरक्षित, मर्यादित एवं लाभकारी डिजिटल वातावरण प्रदान करना है। यहाँ अभिभावकों के लिए महत्वपूर्ण सुझाव और दिशानिर्देश प्रस्तुत हैं।
        </p>
      </div>

      {/* Core Principles for Parents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-white">1. सुरक्षित डिजिटल वातावरण</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            IOIS पर सभी सामग्री 100% शैक्षणिक, रोजगारपरक और मर्यादित है। किसी भी प्रकार की अनुचित सामग्री या भ्रामक विज्ञापनों पर पूर्ण प्रतिबंध है।
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-white">2. स्क्रीन टाइम संतुलन</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            हम छात्रों को प्रतिदिन 1 से 2 घंटे से अधिक स्क्रीन पर समय न बिताने की सलाह देते हैं। डिजिटल स्किल सीखने के साथ शारीरिक खेल और नियमित स्कूली पढ़ाई अनिवार्य है।
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-white">3. वित्तीय साक्षरता (Financial Literacy)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            छात्रों को पैसे का मूल्य सिखाना, डिजिटल फ्रॉड से सतर्क रहना और मेहनत से आत्मनिर्भर बनने की समझ विकसित करना हमारा मुख्य उद्देश्य है।
          </p>
        </div>
      </div>

      {/* Parental Checklist */}
      <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-400" />
          <span>अभिभावकों के लिए 5 मुख्य जिम्मेदारियां:</span>
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">इंटरनेट उपयोग पर पारदर्शी बातचीत रखें</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                बच्चे से पूछें कि वह आज क्या नया सीख रहा है और उसने कौन से कंप्यूटर टूल्स या सामान्य ज्ञान का अभ्यास किया।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">ओटीपी और बैंकिंग पासवर्ड कभी साझा न करने दें</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                बच्चों को समझाएं कि किसी भी अनचाहे फोन कॉल या लॉटरी के झांसे में आकर बैंक विवरण या ओटीपी किसी को न दें।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">करियर मार्गदर्शन में बच्चे की रुचि का सम्मान करें</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                10वीं व 12वीं के बाद साइंस, आर्ट्स या कंप्यूटर डिप्लोमा चुनते समय बच्चे की व्यक्तिगत रुचि को प्राथमिकता दें।
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4">
          <div className="text-xs text-slate-400">
            अभिभावक सहायता संपर्क: <strong>+91 8877490845</strong> (सुबह 9 से शाम 7 बजे)
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider cursor-pointer"
            >
              संपर्क पेज देखें
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
