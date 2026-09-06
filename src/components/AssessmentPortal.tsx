import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS, PLANS, OFFICIAL_FORM_URL } from '../data/plansData';
import { 
  CheckCircle2, 
  Brain, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface AssessmentPortalProps {
  onAskAI: (query: string) => void;
}

export const AssessmentPortal: React.FC<AssessmentPortalProps> = ({ onAskAI }) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastSelectedOption, setLastSelectedOption] = useState<number | null>(null);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentStep];

  const handleStart = () => {
    setHasStarted(true);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setLastSelectedOption(null);
  };

  const handleSelectOption = (optionIndex: number) => {
    setLastSelectedOption(optionIndex);
    const updatedAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentStep + 1 < totalQuestions) {
        setCurrentStep(currentStep + 1);
        setLastSelectedOption(null);
      } else {
        setIsCompleted(true);
      }
    }, 350);
  };

  const handleReset = () => {
    setHasStarted(false);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setLastSelectedOption(null);
  };

  // Calculate recommendation based on answers
  const calculateResult = () => {
    let totalScore = 0;
    let highPlanHintCount = 0;

    selectedAnswers.forEach((ansIdx, qIdx) => {
      const q = ASSESSMENT_QUESTIONS[qIdx];
      if (q && q.options[ansIdx]) {
        totalScore += q.options[ansIdx].score;
        if ((q.options[ansIdx].planHint || 0) >= 6) {
          highPlanHintCount++;
        }
      }
    });

    if (totalScore >= 220 || highPlanHintCount >= 3) {
      return PLANS[6]; // Plan 07 Master
    } else if (totalScore >= 160) {
      return PLANS[4]; // Plan 05 Student Elite
    } else if (totalScore >= 110) {
      return PLANS[2]; // Plan 03 Career
    } else if (totalScore >= 70) {
      return PLANS[1]; // Plan 02 Youth Skill
    } else {
      return PLANS[0]; // Plan 01 Bal Vikas
    }
  };

  const recommendedPlan = calculateResult();
  const progressPercent = Math.round(((currentStep) / totalQuestions) * 100);

  return (
    <section id="interview-portal" className="glass-card-premium border-2 border-amber-500/35 p-6 sm:p-10 relative overflow-hidden">
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          <Brain className="w-3.5 h-3.5 text-amber-400" />
          <span>डिजिटल स्किल एवं विजन असेसमेंट</span>
        </div>
        <h2 className="gold-metallic-text text-2xl sm:text-4xl md:text-5xl uppercase tracking-wide">
          Interactive Skill Assessment
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          यह 10 प्रश्नों का विश्लेषण यह समझने में मदद करेगा कि आपकी वर्तमान रुचि, समय और लक्ष्य के अनुसार कौन सा डिजिटल प्लान आपके लिए सबसे अधिक फलदायी रहेगा।
        </p>
      </div>

      <div className="max-w-3xl mx-auto min-h-[420px] flex flex-col justify-center">
        {/* State 1: Intro / Not Started */}
        {!hasStarted && !isCompleted && (
          <div id="interview-intro" className="text-center py-8 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 border-2 border-amber-500/50 flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-white text-2xl sm:text-3xl font-black">
                आपकी डिजिटल प्राथमिकताओं का सरल विश्लेषण
              </h3>
              <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                कोई भी कठिन या तकनीकी सवाल नहीं है। बस अपनी रुचि के अनुसार सबसे सही विकल्प चुनें।
              </p>
            </div>

            <div className="pt-2">
              <button
                id="start-interview-btn"
                onClick={handleStart}
                className="btn-gold-gradient text-base sm:text-lg px-8 sm:px-10 py-4 shadow-xl cursor-pointer"
              >
                <span>असेसमेंट शुरू करें</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* State 2: Active Questions */}
        {hasStarted && !isCompleted && currentQ && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-amber-400">प्रश्न {currentStep + 1} / {totalQuestions}</span>
                <span className="text-slate-400">{progressPercent}% पूर्ण</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-amber-500/30 space-y-3">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">
                सवाल {currentStep + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {currentQ.question}
              </h3>
              {currentQ.subtitle && (
                <p className="text-slate-400 text-xs italic">
                  {currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isChosen = lastSelectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    id={`opt-btn-q${currentStep}-o${optIdx}`}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isChosen
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 transform scale-[1.01]'
                        : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/60 hover:bg-slate-800/80 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm sm:text-base font-bold leading-relaxed">
                        {opt.text}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* State 3: Final Completion & Recommendation */}
        {isCompleted && (
          <div id="final-welcome" className="space-y-8 animate-fadeIn">
            {/* Congratulatory Result Card */}
            <div className="text-center p-8 sm:p-12 bg-slate-900/90 border-2 border-green-500/60 rounded-[36px] shadow-[0_0_80px_rgba(34,197,94,0.15)] space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-green-400 text-2xl sm:text-4xl font-black">
                बधाई हो! आपका असेसमेंट सफलतापूर्वक पूर्ण हुआ!
              </h3>

              <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                आपकी प्राथमिकताओं और सीखने के विजन के आधार पर सिस्टम ने आपके लिए सबसे अनुकूल मार्गदर्शन तैयार किया है।
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <span className="bg-slate-950 px-4 py-2 rounded-full border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>VERIFIED PROFILE READY</span>
                </span>
                <span className="bg-slate-950 px-4 py-2 rounded-full border border-green-500/40 text-green-300 font-bold text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>100% TRANSPARENCY MATCH</span>
                </span>
              </div>
            </div>

            {/* Custom Recommended Plan Showcase */}
            <div className="glass-card-premium border-2 border-amber-500 bg-gradient-to-br from-black via-slate-900 to-black p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
              <div className="inline-block gold-metallic-text text-xs font-black uppercase tracking-widest">
                YOUR RECOMMENDED PATHWAY
              </div>

              <h4 className="text-3xl sm:text-4xl font-black text-white">
                {recommendedPlan.code}: {recommendedPlan.name}
              </h4>

              <div className="text-4xl sm:text-5xl font-black text-amber-400">
                ₹{recommendedPlan.price}
              </div>

              <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                {recommendedPlan.description}
              </p>

              {/* Instant Payout Highlight */}
              <div className="p-5 rounded-2xl bg-green-500/10 border-2 border-green-500/40 max-w-md mx-auto space-y-1">
                <span className="text-xs text-green-300 font-bold uppercase block">
                  प्रत्येक रेफरल पर आपका इंसेंटिव (Instant Payout)
                </span>
                <div className="text-3xl font-black text-green-400">
                  ₹{recommendedPlan.instantPayout} ({recommendedPlan.percentage}%)
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={recommendedPlan.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-gradient w-full sm:w-auto px-8 py-4 text-sm tracking-wider"
                >
                  <span>अभी अपना पास एक्टिवेट करें</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-bold text-slate-300 bg-slate-900 border border-slate-700 hover:border-amber-400 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>पुनः असेसमेंट करें</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
