import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  HeartHandshake, 
  Layers, 
  GraduationCap, 
  FileCheck2, 
  Image as ImageIcon 
} from 'lucide-react';

interface HomeIntentFinderProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    planTag: string;
    pageTarget: PageId;
  }[];
}

const INTENT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: '1. आप IOIS प्लेटफॉर्म पर मुख्य रूप से क्यों आए हैं?',
    subtitle: 'आपके उद्देश्य के अनुसार हम आपको सबसे सही मार्गदर्शन और सुविधाएं दिखाएंगे:',
    options: [
      {
        label: 'ऑनलाइन डिजिटल इनकम एवं इंस्टेंट पेआउट कमाना',
        description: '7 मास्टर प्लांस के जरिए रेफरल इंसेंटिव और डिजिटल लर्निंग',
        planTag: 'Plan 01 (₹10) / Plan 02 (₹49)',
        pageTarget: 'plans',
      },
      {
        label: 'सरकारी सेवा व फॉर्म (RTPS, आधार, पैन, वोटर) की जानकारी',
        description: 'जातीय, आवासीय, आय ऑनलाइन अप्लाई गाइड व ऑफिशियल पोर्टल',
        planTag: 'फ्री सरकारी सेवा हब',
        pageTarget: 'services',
      },
      {
        label: '10वीं/12वीं के बाद करियर व कंप्यूटर कोर्स मार्गदर्शन',
        description: 'ADCA, DCA, सरकारी परीक्षा, भविष्य में क्या करें की संपूर्ण गाइड',
        planTag: 'Plan 03: Career & Job Access',
        pageTarget: 'career-guide',
      },
      {
        label: 'फ्री फोटो कंप्रेसर, बायोडाटा मेकर या स्टडी नोट्स',
        description: 'RTPS फोटो 50KB में कंप्रेस करना, CV बनाना, फ्री GK व क्विज',
        planTag: 'फ्री डिजिटल टूल्स हब',
        pageTarget: 'compressor',
      },
    ],
  },
  {
    id: 2,
    question: '2. आपकी वर्तमान शैक्षणिक योग्यता या स्थिति क्या है?',
    subtitle: 'ताकि हम आपकी योग्यता के अनुरूप उपयुक्त अवसर प्रदान कर सकें:',
    options: [
      {
        label: '10वीं पास या हाई स्कूल छात्र',
        description: 'शुरुआती स्तर के डिजिटल स्किल, NCERT बुक्स व बाल विकास प्लान',
        planTag: 'Plan 01: Bal Vikas Access (₹10)',
        pageTarget: 'plans',
      },
      {
        label: '12वीं पास / कॉलेज विद्यार्थी / प्रतियोगी परीक्षा अभ्यर्थी',
        description: 'प्रोफेशनल रिज्यूमे, करियर गाइड, AI प्रॉम्प्ट्स व स्टूडेंट प्लान',
        planTag: 'Plan 02 (₹49) / Plan 05 (₹299)',
        pageTarget: 'career-guide',
      },
      {
        label: 'ग्रेजुएट / नौकरी या वर्क-फ्रॉम-होम की तलाश में युवा',
        description: 'उन्नत डिजिटल टूल्स, रीसेलिंग हब व लाइफटाइम मास्टर एक्सेस',
        planTag: 'Plan 06 (₹499) / Plan 07 (₹999)',
        pageTarget: 'plans',
      },
      {
        label: 'अभिभावक / गृहिणी / व्यवसायी',
        description: 'पारिवारिक सुरक्षा, डिजिटल जागरूकता व फैमिली वीआईपी प्लान',
        planTag: 'Plan 04: Family VIP Access (₹199)',
        pageTarget: 'parent-guide',
      },
    ],
  },
  {
    id: 3,
    question: '3. आप IOIS (Indian Online Income Supporting System) को किस रूप में समझ रहे हैं?',
    subtitle: 'प्लेटफॉर्म के बारे में आपकी क्या धारणा है:',
    options: [
      {
        label: 'एक 100% पारदर्शी डिजिटल स्किल व डायरेक्ट इंस्टेंट पेआउट सिस्टम',
        description: 'जहाँ हर रेफरल पर 50% से 70% तक सुरक्षित कमीशन मिलता है',
        planTag: 'इंस्टेंट पेआउट सिस्टम',
        pageTarget: 'plans',
      },
      {
        label: 'विद्यार्थियों व युवाओं का बहुउद्देश्यीय शिक्षा व सहायता पोर्टल',
        description: 'जहाँ स्टडी नोट्स, करियर गाइड और टूल्स एक जगह मिलते हैं',
        planTag: 'शिक्षा व सहायता हब',
        pageTarget: 'study-hub',
      },
      {
        label: 'सरकारी ऑनलाइन सेवाओं व टूल्स का फ्री केंद्र',
        description: 'जहाँ RTPS, कंप्रेसर और फॉर्म भरने की सुविधा मिलती है',
        planTag: 'डिजिटल सेवा केंद्र',
        pageTarget: 'services',
      },
      {
        label: 'मैं पहली बार आया हूँ, मुझे अभी विस्तार से समझना है',
        description: 'प्लेटफॉर्म को आसान भाषा में समझने और शुरुआत करने हेतु',
        planTag: 'IOIS परिचय',
        pageTarget: 'about',
      },
    ],
  },
  {
    id: 4,
    question: '4. आप प्रतिदिन डिजिटल लर्निंग या कार्य में कितना समय दे सकते हैं?',
    subtitle: 'आपके उपलब्ध समय के अनुसार योजना बनाना आसान होगा:',
    options: [
      {
        label: '30 मिनट से 1 घंटा (शुरुआती / पार्ट-टाइम)',
        description: 'दैनिक 1-2 रेफरल या बुनियादी जानकारी सीखने के लिए पर्याप्त',
        planTag: 'Plan 01 या Plan 02',
        pageTarget: 'plans',
      },
      {
        label: '1 से 2 घंटे (नियमित अभ्यास व ग्रोथ)',
        description: 'करियर कोर्सेज व व्यवस्थित इनकम बनाने के लिए आदर्श',
        planTag: 'Plan 03 या Plan 05',
        pageTarget: 'plans',
      },
      {
        label: '3 घंटे से अधिक (फुल-टाइम डिजिटल वर्क)',
        description: 'एजेंसी रीसेलर हब और मास्टर एक्सेस के साथ बड़ा बिजनेस',
        planTag: 'Plan 06 या Plan 07',
        pageTarget: 'plans',
      },
      {
        label: 'केवल आवश्यकता पड़ने पर टूल्स इस्तेमाल करना है',
        description: 'जब फॉर्म भरना हो या फोटो कंप्रेस/रिज्यूमे बनाना हो',
        planTag: 'फ्री टूल्स पोर्टल',
        pageTarget: 'compressor',
      },
    ],
  },
  {
    id: 5,
    question: '5. IOIS में आपकी पहली शुरुआत किस प्रकार से होगी?',
    subtitle: 'अपनी प्राथमिकता का चयन करें:',
    options: [
      {
        label: 'सबसे छोटे प्लान (Plan 01 ₹10 या Plan 02 ₹49) से शुरुआत करके देखना',
        description: 'न्यूनतम शुल्क में सिस्टम को लाइव परखें और ₹7 से ₹34 कमाएं',
        planTag: 'Bal Vikas / Youth Skill',
        pageTarget: 'plans',
      },
      {
        label: 'करियर व स्टूडेंट प्लान (Plan 03 ₹99 या Plan 05 ₹299)',
        description: 'स्टडी नोट्स, AI प्रॉम्ट्स और उच्च इंसेंटिव प्राप्त करें',
        planTag: 'Career / Student Elite',
        pageTarget: 'plans',
      },
      {
        label: 'लाइफटाइम मास्टर एक्सेस (Plan 07 ₹999)',
        description: 'सभी 6 प्लांस का बंडल, रीसेलिंग राइट्स और ₹499 इंस्टेंट पेआउट',
        planTag: 'Master Lifetime',
        pageTarget: 'plans',
      },
      {
        label: 'अभी केवल फ्री सेवाओं (RTPS, कंप्रेसर, करियर गाइड) का लाभ लेना',
        description: 'बिना किसी शुल्क के प्लेटफॉर्म की सुविधाओं का उपयोग करें',
        planTag: 'फ्री सर्विसेज',
        pageTarget: 'services',
      },
    ],
  },
];

export const HomeIntentFinder: React.FC<HomeIntentFinderProps> = ({ onNavigate, onAskAI }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...answers, optionIndex];
    setAnswers(updated);

    if (currentStep < INTENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Determine Recommendation
  const primaryGoal = answers[0] ?? 0;
  const qualification = answers[1] ?? 0;

  let recommendedPlanTitle = 'Plan 01: Bal Vikas Access (₹10)';
  let recommendedPlanDesc = 'शुरुआत के लिए सर्वश्रेष्ठ। मात्र ₹10 में NCERT बुक्स, वर्कशीट व ₹7 इंस्टेंट पेआउट प्रति रेफरल।';
  let targetPage: PageId = 'plans';

  if (primaryGoal === 1) {
    recommendedPlanTitle = 'फ्री सरकारी सेवा व RTPS पोर्टल';
    recommendedPlanDesc = 'जातीय, आवासीय, आय प्रमाण पत्र, आधार सुधार व नया पैन कार्ड बनाने की संपूर्ण प्रक्रिया एवं लिंक्स।';
    targetPage = 'services';
  } else if (primaryGoal === 2 || qualification === 1) {
    recommendedPlanTitle = 'भविष्य मार्गदर्शन एवं कंप्यूटर कोर्स हब';
    recommendedPlanDesc = '10वीं व 12वीं के बाद क्या करें? ADCA, DCA, Tally, वेब डेवलपमेंट की पूरी गाइडेंस एवं प्लान 03 (₹99)।';
    targetPage = 'career-guide';
  } else if (primaryGoal === 3) {
    recommendedPlanTitle = '100% फ्री ऑनलाइन टूल्स (फोटो कंप्रेसर व CV बिल्डर)';
    recommendedPlanDesc = 'RTPS के लिए 50KB फोटो कंप्रेस करें, 2 मिनट में जॉब रिज्यूमे बनाएं और फ्री मॉक टेस्ट दें।';
    targetPage = 'compressor';
  } else if (qualification === 2) {
    recommendedPlanTitle = 'Plan 07: Master Lifetime Access (₹999)';
    recommendedPlanDesc = 'सभी 6 प्लांस का कॉम्बिनेशन, लाइफटाइम एक्सेस और हर सफल रेफरल पर ₹499 का डायरेक्ट इंस्टेंट पेआउट!';
    targetPage = 'plans';
  }

  const q = INTENT_QUESTIONS[currentStep];

  return (
    <section className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl relative overflow-hidden bg-slate-950/80 shadow-2xl">
      {/* Decorative ambient aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-green-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>स्मार्ट यूज़र प्रोफाइलिंग &bull; 5 सरल प्रश्न</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tiranga-text tracking-tight">
          IOIS प्लेटफॉर्म आपके लिए क्या कर सकता है?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          कृपया 5 छोटे प्रश्नों का उत्तर दें। सिस्टम आपकी जरूरत समझकर आपको बिल्कुल सही प्लान, फ्री टूल्स और स्वागत मार्गदर्शन प्रदान करेगा।
        </p>
      </div>

      {!isCompleted ? (
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-amber-400">
              <span>प्रश्न {currentStep + 1} / 5</span>
              <span>{Math.round(((currentStep + 1) / 5) * 100)}% पूर्ण</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {q.question}
              </h3>
              <p className="text-xs text-slate-400">{q.subtitle}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="text-left p-4 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-amber-500/10 hover:border-amber-400 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-amber-300 group-hover:text-amber-200">
                      {opt.label}
                    </span>
                    <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full font-bold">
                      चुनें
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed group-hover:text-slate-300">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Result & Personalized Welcome Card */
        <div className="relative z-10 max-w-3xl mx-auto bg-gradient-to-b from-slate-900/95 to-slate-950/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>विश्लेषण पूर्ण &bull; आपका व्यक्तिगत स्वागत पत्र</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              नमस्ते! IOIS परिवार में आपका हार्दिक स्वागत है 🙏
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              आपके उत्तरों के आधार पर हमने आपके लिए सबसे अनुकूल मार्गदर्शन, उपयुक्त प्लान और आवश्यक टूल्स शॉर्टकट तैयार किए हैं:
            </p>
          </div>

          {/* Highlighted Match Box */}
          <div className="bg-amber-500/10 border border-amber-400/40 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>आपके लिए सबसे उपयुक्त सिफारिश (Recommended For You)</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              {recommendedPlanTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {recommendedPlanDesc}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onNavigate(targetPage)}
                className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>इस पेज पर सीधे जाएं</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onAskAI(`नमस्ते, मैंने IOIS पर 5 प्रश्नों का उत्तर दिया है और मुझे ${recommendedPlanTitle} की सिफारिश मिली है। कृपया मुझे इसके बारे में और विस्तार से बताएं।`)}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs font-black px-4 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI से और समझें</span>
              </button>
            </div>
          </div>

          {/* Quick Shortcuts Based on Needs */}
          <div className="space-y-3">
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              अन्य महत्वपूर्ण पेज शॉर्टकट (1-क्लिक एक्सेस):
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => onNavigate('plans')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400 mb-1" />
                <div className="text-xs font-black text-white">7 मास्टर प्लान</div>
                <div className="text-[10px] text-slate-400">₹10 से ₹999</div>
              </button>
              <button
                onClick={() => onNavigate('career-guide')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-green-400 mb-1" />
                <div className="text-xs font-black text-white">करियर गाइड</div>
                <div className="text-[10px] text-slate-400">10वीं/12वीं के बाद</div>
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-blue-400 mb-1" />
                <div className="text-xs font-black text-white">सरकारी सेवा हब</div>
                <div className="text-[10px] text-slate-400">RTPS, आधार, पैन</div>
              </button>
              <button
                onClick={() => onNavigate('compressor')}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-purple-400 mb-1" />
                <div className="text-xs font-black text-white">फोटो कंप्रेसर</div>
                <div className="text-[10px] text-slate-400">50KB RTPS साइज</div>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>पुनः प्रश्नोत्तरी शुरू करें (Retake Questions)</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
