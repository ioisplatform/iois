import React, { useState } from 'react';
import { PLANS, OFFICIAL_FORM_URL } from '../data/plansData';
import { Calculator, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const PayoutCalculator: React.FC = () => {
  const [selectedPlanPayout, setSelectedPlanPayout] = useState<number>(499);
  const [referralsCount, setReferralsCount] = useState<number>(10);

  const selectedPlan = PLANS.find((p) => p.instantPayout === selectedPlanPayout) || PLANS[6];
  const totalEarnings = selectedPlanPayout * referralsCount;

  return (
    <section id="calculator" className="glass-card-premium p-6 sm:p-10 space-y-8 border-2 border-amber-500/35">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>लाइव इंसेंटिव कैलकुलेटर</span>
        </div>
        <h3 className="gold-metallic-text text-2xl sm:text-4xl font-black uppercase tracking-wider">
          Instant Payout Received Calculator
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
          अपनी योजना और अनुमानित साथियों की संख्या चुनें और देखें कि आप कितना तत्काल पेआउट प्राप्त कर सकते हैं।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Controls Column */}
        <div className="space-y-6">
          <div>
            <label className="text-xs text-slate-300 font-black uppercase block mb-2 tracking-wide">
              सक्रिय प्लान चुनें (Select Target Active Plan):
            </label>
            <select
              id="calc-plan-select"
              value={selectedPlanPayout}
              onChange={(e) => setSelectedPlanPayout(Number(e.target.value))}
              className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 sm:p-5 text-white outline-none focus:border-amber-500 transition font-bold text-sm sm:text-base cursor-pointer"
            >
              {PLANS.map((plan) => (
                <option key={plan.id} value={plan.instantPayout}>
                  {plan.code}: {plan.name} (₹{plan.price}) ➔ ₹{plan.instantPayout} Instant Payout ({plan.percentage}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs text-slate-300 font-black uppercase tracking-wide">
                रेफरल साथियों की संख्या (Success Referrals):
              </label>
              <span className="text-amber-400 font-mono font-black text-xl bg-slate-900 px-3 py-1 rounded-xl border border-amber-500/40">
                {referralsCount} व्यक्ति
              </span>
            </div>

            <input
              id="calc-referrals-slider"
              type="range"
              min="1"
              max="100"
              value={referralsCount}
              onChange={(e) => setReferralsCount(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-black uppercase">
              <span>1 व्यक्ति</span>
              <span>50 व्यक्ति</span>
              <span>100 व्यक्ति</span>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">चुना हुआ प्लान: <strong className="text-white">{selectedPlan.name}</strong></span>
            <span className="text-amber-400 font-bold">₹{selectedPlanPayout}/रेफरल</span>
          </div>
        </div>

        {/* Wealth Output Card */}
        <div className="text-center p-8 sm:p-12 bg-slate-950/90 rounded-[36px] border-2 border-amber-500/40 shadow-[inset_0_0_50px_rgba(212,175,55,0.1)] space-y-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-black">
            Total Instant Wealth Received
          </p>

          <div id="calc-total-display" className="text-5xl sm:text-7xl md:text-8xl font-black text-green-400 tracking-tight">
            ₹{totalEarnings.toLocaleString('en-IN')}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-black uppercase tracking-wider animate-pulse pt-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Instant Credit Verified to Smart Wallet</span>
          </div>

          <div className="pt-4">
            <a
              href={OFFICIAL_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient px-8 py-3 text-xs tracking-wider"
            >
              <span>इस प्लान से अभी शुरुआत करें</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
