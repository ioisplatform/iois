import React, { useState } from 'react';
import { PLANS, OFFICIAL_FORM_URL, OFFICIAL_TELEGRAM_URL } from '../data/plansData';
import { Plan } from '../types';
import { Check, ArrowRight, Zap, Sparkles, BookOpen, Crown, ExternalLink } from 'lucide-react';

interface PlansGridProps {
  onAskAI: (question: string) => void;
}

export const PlansGrid: React.FC<PlansGridProps> = ({ onAskAI }) => {
  const [filter, setFilter] = useState<'all' | 'starter' | 'pro' | 'master'>('all');

  const filteredPlans = PLANS.filter((plan) => {
    if (filter === 'starter') return plan.id <= 2;
    if (filter === 'pro') return plan.id >= 3 && plan.id <= 5;
    if (filter === 'master') return plan.id >= 6;
    return true;
  });

  return (
    <section id="plans" className="space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>स्वदेशी डिजिटल स्वावलंबन नेटवर्क</span>
        </div>
        <h2 className="gold-metallic-text text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
          IOIS 7 Dynamic Master Plans
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          हर योजना एक नई संभावना है। अपनी आवश्यकता और लक्ष्य के अनुसार सही प्लान का चयन करें और डिजिटल कौशल के साथ तत्काल आय प्राप्त करें।
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[
            { key: 'all', label: 'सभी 7 प्लान (All Plans)' },
            { key: 'starter', label: 'शुरुआती प्लान (₹10 - ₹49)' },
            { key: 'pro', label: 'कैरियर व छात्र (₹99 - ₹299)' },
            { key: 'master', label: 'रीसेलर व मास्टर (₹499 - ₹999)' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer border ${
                filter === item.key
                  ? 'bg-amber-500 text-black border-amber-400 font-black shadow-md'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredPlans.map((plan) => {
          const isMasterTier = plan.id === 7;

          if (isMasterTier) {
            // Special Wide Layout for Master Plan 07
            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className="glass-card-premium border-2 border-amber-400 col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between space-y-8"
              >
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black px-4 py-1 rounded-full shadow-xl uppercase tracking-widest">
                  👑 MASTER TIER ACCESS
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                      ELITE LIFETIME OWNERSHIP
                    </span>
                    <h3 className="gold-metallic-text text-3xl sm:text-5xl font-black uppercase mt-1">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="text-5xl sm:text-6xl font-black text-amber-400">
                      ₹{plan.price}
                    </div>
                    <span className="text-slate-400 text-xs sm:text-sm">
                      (आजीवन एकमुश्त निवेश / Lifetime License)
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-4xl">
                    {plan.description}
                  </p>

                  {/* Instant Payout Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-green-500/15 border-2 border-green-400/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-green-300 font-bold uppercase block">
                        प्रत्येक मास्टर रेफरल पर सीधा इंसेंटिव (Instant Payout)
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-green-400">
                        ₹{plan.instantPayout} प्रति सदस्य ({plan.percentage}%)
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 font-semibold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-green-500/30">
                      ✓ सभी 6 प्लान्स शामिल
                    </span>
                  </div>

                  {/* Included Resources */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 pt-2">
                    {plan.resources.map((res, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>

                  {/* Success Story */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border-l-4 border-amber-400 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400 font-bold block mb-1">
                      {plan.storyTitle} ({plan.storyPerson}):
                    </strong>
                    <p className="italic">{plan.storyDescription}</p>
                  </div>
                </div>

                {/* Master Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <a
                    href={plan.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-gradient w-full sm:w-2/3 py-4 sm:py-5 text-lg sm:text-xl tracking-wider"
                  >
                    <span>UNLOCK EVERYTHING @ ₹{plan.price}</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </a>

                  <button
                    onClick={() => onAskAI(`मास्टर प्लान 07 (₹999) से मुझे क्या-क्या लाभ मिलेंगे और ₹499 का इंस्टेंट पेआउट कैसे मिलता है?`)}
                    className="w-full sm:w-1/3 py-4 rounded-full text-xs font-bold text-amber-300 bg-slate-900 border border-amber-500/40 hover:border-amber-400 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>AI से मास्टर प्लान की जानकारी लें</span>
                  </button>
                </div>
              </div>
            );
          }

          // Regular Tier Cards (Plan 01 to Plan 06)
          return (
            <div
              key={plan.id}
              id={`plan-card-${plan.id}`}
              className={`glass-card-premium border-t-4 ${plan.borderColor} flex flex-col justify-between p-6 space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-400 tracking-wider uppercase">
                    {plan.code}
                  </span>
                  <span className="bg-slate-900 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800">
                    {plan.tagline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {plan.name}
                </h3>

                <div className="text-4xl font-black text-amber-400">
                  ₹{plan.price}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                {/* Instant Payout Badge */}
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                  <span className="text-[10px] text-green-300 uppercase font-bold block">
                    Instant Payout per Referral
                  </span>
                  <div className="text-lg font-black text-green-400">
                    ₹{plan.instantPayout} ({plan.percentage}%)
                  </div>
                </div>

                {/* Mini Features List */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {plan.resources.slice(0, 3).map((res, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-[11px]">{res}</span>
                    </div>
                  ))}
                </div>

                {/* Story Snippet */}
                <div className="p-3 bg-slate-950/70 border-l-2 border-amber-400 rounded-r-xl text-[11px] text-slate-300 italic leading-relaxed">
                  <span className="text-amber-400 font-bold block not-italic text-[10px]">
                    {plan.storyTitle}:
                  </span>
                  {plan.storyDescription}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="space-y-2 pt-2">
                <a
                  href={plan.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-gradient text-xs w-full py-3 tracking-wider justify-center"
                >
                  <span>ACTIVATE @ ₹{plan.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>

                <button
                  onClick={() => onAskAI(`${plan.code} (${plan.name} - ₹${plan.price}) के बारे में विस्तृत विवरण और कमाई की संभावना बताएं।`)}
                  className="w-full py-1.5 rounded-full text-[10px] font-bold text-slate-400 hover:text-amber-300 bg-slate-950/50 hover:bg-slate-900 border border-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI से पूछें</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
