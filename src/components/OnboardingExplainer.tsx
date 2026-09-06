import React, { useState } from 'react';
import { PLANS } from '../data/plansData';
import { Plan } from '../types';
import { 
  Sparkles, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Wallet, 
  GraduationCap, 
  Users, 
  Award,
  Zap,
  BookOpen
} from 'lucide-react';

interface OnboardingExplainerProps {
  onStartAssessment: () => void;
  onAskAI: (question: string) => void;
  onSelectPlan: (plan: Plan) => void;
}

export const OnboardingExplainer: React.FC<OnboardingExplainerProps> = ({
  onStartAssessment,
  onAskAI,
  onSelectPlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number>(1);
  const [userQuickQuestion, setUserQuickQuestion] = useState<string>('');

  const activePlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];

  const handleQuickQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuickQuestion.trim()) return;
    onAskAI(userQuickQuestion);
    setUserQuickQuestion('');
  };

  return (
    <section id="about-iois" className="space-y-8">
      {/* 1. Core Platform Overview Banner */}
      <div className="glass-card-premium border-2 border-amber-500/40 p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>नए उपयोगकर्ताओं के लिए संपूर्ण गाइड</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            <span className="tiranga-text">IOIS प्लेटफॉर्म</span> क्या है और यह कैसे काम करता है?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
            <strong className="text-amber-400 font-bold">IOIS (Indian Online Income Supporting System)</strong> एक पारदर्शी डिजिटल लर्निंग एवं सपोर्टिंग इकोसिस्टम है। यहाँ छात्रों, युवाओं, अभिभावकों और डिजिटल उद्यमियों के लिए उच्च गुणवत्ता वाली ई-बुक्स, करियर गाइड, AI प्रॉम्ट्स और बिजनेस ऑटोमेशन टूल्स उपलब्ध हैं। जब आप उपयोगी सामग्री दूसरों के साथ साझा करते हैं, तो सिस्टम आपको <strong className="text-green-400 font-bold">50% से 70% तक का सीधा इंस्टेंट पेआउट</strong> प्रदान करता है।
          </p>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-white font-black text-sm mb-1">1. डिजिटल सामग्री</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                NCERT नोट्स, करियर गाइड, रिज्यूमे टेम्प्लेट्स, और प्रतियोगी परीक्षा सामग्री।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-white font-black text-sm mb-1">2. स्मार्ट इंस्टेंट पेआउट</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                रेफरल वेरिफिकेशन होते ही पेआउट सीधे आपके खाते/वॉलेट में तुरंत क्रेडिट।
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-white font-black text-sm mb-1">3. 100% सुरक्षा व पारदर्शिता</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                256-Bit एन्क्रिप्शन, पेरेंट्स सेफ्टी पोर्टल, और 24x7 लाइव सहायता सपोर्ट।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive 7 Plans Analysis with Direct Exploration */}
      <div className="glass-card-premium p-6 sm:p-10 border-2 border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-block gold-metallic-text text-xs font-black uppercase tracking-widest">
            COMPREHENSIVE PLAN BREAKDOWN
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            IOIS के <span className="text-amber-400">7 मुख्य प्लान</span> का विश्लेषण
          </h3>
          <p className="text-slate-400 text-sm">
            नीचे दिए गए किसी भी प्लान पर क्लिक करके उसका विवरण, संसाधन और पेआउट संरचना देखें:
          </p>
        </div>

        {/* Plan Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-amber-500">
          {PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                id={`plan-selector-btn-${plan.id}`}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs shrink-0 transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-400 shadow-lg scale-105'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{plan.code}</span>
                <span className="opacity-90">(₹{plan.price})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Plan In-depth Card */}
        <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border-2 border-amber-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-amber-500/20 border border-amber-500/50 text-amber-300 font-black text-xs px-3 py-1 rounded-full">
                {activePlan.code}
              </span>
              <span className="bg-green-500/20 border border-green-500/40 text-green-400 font-black text-xs px-3 py-1 rounded-full">
                {activePlan.percentage}% INSTANT PAYOUT
              </span>
              <span className="text-slate-400 text-xs font-semibold">
                उपयुक्त: {activePlan.recommendedFor}
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-white">
              {activePlan.name} <span className="text-slate-400 text-lg font-normal">| {activePlan.tagline}</span>
            </h4>

            <p className="text-slate-300 text-sm leading-relaxed">
              {activePlan.description}
            </p>

            {/* Practical Scenario */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> व्यावहारिक कार्यप्रणाली:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activePlan.realWorldScenario}
              </p>
            </div>

            {/* Resources List */}
            <div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">
                प्लान में शामिल प्रमुख संसाधन:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {activePlan.resources.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Instant Payout Card Box */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 text-center space-y-6">
            <div>
              <span className="text-xs text-slate-400 uppercase font-black tracking-widest block mb-1">
                एक्टिवेशन शुल्क (One Time)
              </span>
              <div className="text-5xl font-black text-amber-400">
                ₹{activePlan.price}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30">
              <span className="text-[11px] text-green-300 uppercase font-bold block mb-1">
                प्रत्येक सफल रेफरल पर आपको मिलेगा
              </span>
              <div className="text-3xl sm:text-4xl font-black text-green-400">
                ₹{activePlan.instantPayout}
              </div>
              <span className="text-[10px] text-green-200 mt-1 block">
                (तुरंत क्रेडिट - Instant Payout)
              </span>
            </div>

            <div className="space-y-3">
              <a
                href={activePlan.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-gradient w-full py-3.5 text-sm tracking-wider"
              >
                <span>{activePlan.code} एक्टिवेट करें</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onAskAI(`${activePlan.name} (Plan ${activePlan.id}) के बारे में विस्तार से बताएं और इससे मैं कैसे कमाई शुरू करूँ?`)}
                className="w-full py-2.5 rounded-full text-xs font-bold text-amber-300 bg-slate-950 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>इस प्लान के बारे में AI से पूछें</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Direct Ask AI Prompt Section */}
      <div className="glass-card-premium p-6 sm:p-8 border-2 border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>मन में कोई भी सवाल है? सीधे पूछें</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              IOIS AI असिस्टेंट से अपना प्रश्न पूछें
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              प्लान, पेआउट, रजिस्ट्रेशन, करियर सलाह या किसी भी सामान्य ज्ञान के सवाल का तुरंत सटीक व स्पष्ट उत्तर पाएं।
            </p>
          </div>

          <form onSubmit={handleQuickQuestionSubmit} className="w-full md:w-auto flex-1 max-w-md flex items-center gap-2">
            <input
              id="onboarding-quick-ai-input"
              type="text"
              value={userQuickQuestion}
              onChange={(e) => setUserQuickQuestion(e.target.value)}
              placeholder="उदा. ₹10 वाले प्लान से कैसे शुरुआत करें?..."
              className="w-full bg-slate-900 border border-amber-500/40 rounded-full px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
            />
            <button
              id="onboarding-quick-ai-submit"
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-3 rounded-full font-black text-xs shrink-0 transition flex items-center gap-1 cursor-pointer"
            >
              <span>पूछें</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-center md:justify-start pt-2 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-500 font-bold">त्वरित प्रश्न:</span>
          {[
            'Plan 01 और Plan 07 में क्या अंतर है?',
            'क्या पेआउट सच में तुरंत मिलता है?',
            'छात्रों के लिए कौन सा प्लान बेस्ट है?',
            'शुरुआत करने के लिए क्या करना होगा?'
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => onAskAI(q)}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 px-3 py-1 rounded-full transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Action Banner to Transition to Assessment */}
      <div className="text-center py-4">
        <button
          id="start-assessment-cta"
          onClick={onStartAssessment}
          className="btn-gold-gradient text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 shadow-2xl tracking-wider cursor-pointer"
        >
          <span>अब अपना असेसमेंट शुरू करें</span>
          <ArrowRight className="w-5 h-5 ml-1" />
        </button>
        <p className="text-slate-400 text-xs mt-3">
          10 सरल प्रश्नों के उत्तर देकर जानें कि आपके लिए कौन सा डिजिटल प्लान सबसे उपयुक्त है।
        </p>
      </div>
    </section>
  );
};
