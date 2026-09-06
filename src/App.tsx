import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TickerBar } from './components/TickerBar';
import { OnboardingExplainer } from './components/OnboardingExplainer';
import { AssessmentPortal } from './components/AssessmentPortal';
import { LiveClockPanchang } from './components/LiveClockPanchang';
import { PlansGrid } from './components/PlansGrid';
import { PayoutCalculator } from './components/PayoutCalculator';
import { ParentsPortal } from './components/ParentsPortal';
import { ContactFaq } from './components/ContactFaq';
import { Footer } from './components/Footer';
import { AIChatBot } from './components/AIChatBot';
import { Plan } from './types';
import { Sparkles, MessageSquareText } from 'lucide-react';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartAssessment = () => {
    handleScrollTo('interview-portal');
  };

  const handleSelectPlan = (plan: Plan) => {
    handleScrollTo(`plan-card-${plan.id}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenChat={() => {
          setChatInitialQuery('');
          setIsChatOpen(true);
        }}
        onScrollTo={handleScrollTo}
      />

      {/* 2. Controlled Live News & Instant Payout Ticker */}
      <TickerBar />

      {/* 3. Main Content Container */}
      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16 sm:space-y-24 flex-1">
        {/* Section A: New User Onboarding & 7 Plans Analysis with Direct AI Q&A */}
        <OnboardingExplainer
          onStartAssessment={handleStartAssessment}
          onAskAI={handleOpenChatWithQuery}
          onSelectPlan={handleSelectPlan}
        />

        {/* Section B: Visionary Interactive Assessment */}
        <AssessmentPortal onAskAI={handleOpenChatWithQuery} />

        {/* Section C: Live Utilities (Upright Clock, Panchang, Smart TV) */}
        <LiveClockPanchang />

        {/* Section D: Complete 7 Master Plans */}
        <PlansGrid onAskAI={handleOpenChatWithQuery} />

        {/* Section E: Instant Payout Calculator */}
        <PayoutCalculator />

        {/* Section F: Parents Safety & Verification Console */}
        <ParentsPortal />

        {/* Section G: Official Contact Hub & FAQs */}
        <ContactFaq onAskAI={handleOpenChatWithQuery} />
      </main>

      {/* 4. Official Footer */}
      <Footer />

      {/* 5. Floating AI Chatbot Launcher Button */}
      <button
        id="floating-ai-chat-launcher"
        onClick={() => {
          setChatInitialQuery('');
          setIsChatOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black px-4 py-3.5 rounded-full font-black text-xs sm:text-sm shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 transition transform hover:scale-108 active:scale-95 cursor-pointer border-2 border-white/40"
        title="Open Live AI Assistant"
      >
        <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s' }} />
        <span>Ask IOIS AI</span>
      </button>

      {/* 6. Live AI Chatbot Modal / Drawer */}
      <AIChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
