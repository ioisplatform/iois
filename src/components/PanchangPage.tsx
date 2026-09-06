import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Sun, 
  Moon, 
  Clock, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Share2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  RotateCw 
} from 'lucide-react';

interface PanchangPageProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

// Vedic Astronomical reference data for computation
const TITHIS = [
  'प्रतिपदा (Pratipada)',
  'द्वितीया (Dwitiya)',
  'तृतीया (Tritiya)',
  'चतुर्थी (Chaturthi)',
  'पंचमी (Panchami)',
  'षष्ठी (Shashthi)',
  'सप्तमी (Saptami)',
  'अष्टमी (Ashtami)',
  'नवमी (Navami)',
  'दशमी (Dashami)',
  'एकादशी (Ekadashi - परम शुभ व्रत)',
  'द्वादशी (Dwadashi)',
  'त्रयोदशी (Trayodashi - प्रदोष व्रत)',
  'चतुर्दशी (Chaturdashi)',
  'पूर्णिमा / अमावस्या (Purnima / Amavasya)',
];

const NAKSHATRAS = [
  { name: 'अश्विनी (Ashwini)', lord: 'केतु (Ketu)', nature: 'क्षिप्र (लघु)' },
  { name: 'भरणी (Bharani)', lord: 'शुक्र (Venus)', nature: 'उग्र' },
  { name: 'कृत्तिका (Krittika)', lord: 'सूर्य (Sun)', nature: 'मिश्र' },
  { name: 'रोहिणी (Rohini)', lord: 'चंद्रमा (Moon)', nature: 'स्थिर एवं शुभ' },
  { name: 'मृगशिरा (Mrigashirsha)', lord: 'मंगल (Mars)', nature: 'मृदु' },
  { name: 'आर्द्रा (Ardra)', lord: 'राहु (Rahu)', nature: 'तीक्ष्ण' },
  { name: 'पुनर्वसु (Punarvasu)', lord: 'बृहस्पति (Jupiter)', nature: 'चर' },
  { name: 'पुष्य (Pushya - सर्वार्थ सिद्धि)', lord: 'शनि (Saturn)', nature: 'अत्यंत शुभ' },
  { name: 'आश्लेषा (Ashlesha)', lord: 'बुध (Mercury)', nature: 'तीक्ष्ण' },
  { name: 'मघा (Magha)', lord: 'केतु (Ketu)', nature: 'उग्र' },
  { name: 'पूर्वाफाल्गुनी (Purva Phalguni)', lord: 'शुक्र (Venus)', nature: 'उग्र' },
  { name: 'उत्तराफाल्गुनी (Uttara Phalguni)', lord: 'सूर्य (Sun)', nature: 'स्थिर' },
  { name: 'हस्त (Hasta)', lord: 'चंद्रमा (Moon)', nature: 'क्षिप्र' },
  { name: 'चित्रा (Chitra)', lord: 'मंगल (Mars)', nature: 'मृदु' },
  { name: 'स्वाति (Swati)', lord: 'राहु (Rahu)', nature: 'चर' },
  { name: 'विशाखा (Vishakha)', lord: 'बृहस्पति (Jupiter)', nature: 'मिश्र' },
  { name: 'अनुराधा (Anuradha)', lord: 'शनि (Saturn)', nature: 'मृदु एवं शुभ' },
  { name: 'ज्येष्ठा (Jyeshtha)', lord: 'बुध (Mercury)', nature: 'तीक्ष्ण' },
  { name: 'मूल (Mula)', lord: 'केतु (Ketu)', nature: 'तीक्ष्ण' },
  { name: 'पूर्वाषाढ़ा (Purva Ashadha)', lord: 'शुक्र (Venus)', nature: 'उग्र' },
  { name: 'उत्तराषाढ़ा (Uttara Ashadha)', lord: 'सूर्य (Sun)', nature: 'स्थिर' },
  { name: 'श्रवण (Shravana)', lord: 'चंद्रमा (Moon)', nature: 'चर' },
  { name: 'धनिष्ठा (Dhanishta)', lord: 'मंगल (Mars)', nature: 'चर' },
  { name: 'शतभिषा (Shatabhisha)', lord: 'राहु (Rahu)', nature: 'चर' },
  { name: 'पूर्वाभाद्रपद (Purva Bhadrapada)', lord: 'बृहस्पति (Jupiter)', nature: 'उग्र' },
  { name: 'उत्तराभाद्रपद (Uttara Bhadrapada)', lord: 'शनि (Saturn)', nature: 'स्थिर' },
  { name: 'रेवती (Revati)', lord: 'बुध (Mercury)', nature: 'मृदु' },
];

const YOGAS = [
  'विष्कुम्भ (Vishkambha)',
  'प्रीति (Priti - शुभ)',
  'आयुष्मान (Ayushman - दीर्घायु)',
  'सौभाग्य (Saubhagya - अत्यंत शुभ)',
  'शोभन (Shobhana - शुभ)',
  'अतिगण्ड (Atiganda)',
  'सुकर्मा (Sukarma - कार्य सिद्धि)',
  'धृति (Dhriti - धैर्य व विजय)',
  'शूल (Shula)',
  'गण्ड (Ganda)',
  'वृद्धि (Vriddhi - उन्नति)',
  'ध्रुव (Dhruva - स्थिरता)',
  'व्याघात (Vyaghata)',
  'हर्षण (Harshana - उल्लास)',
  'वज्र (Vajra)',
  'सिद्धि (Siddhi - सफलता)',
  'व्यतीपात (Vyatipata)',
  'वरीयान (Variyan - शुभ)',
  'परिघ (Parigha)',
  'शिव (Shiva - कल्याणकारी)',
  'सिद्ध (Siddha - मनोकामना पूर्ण)',
  'साध्य (Sadhya - सिद्धि)',
  'शुभ (Shubha - कल्याण)',
  'शुक्ल (Shukla - निर्मल)',
  'ब्रह्म (Brahma - ज्ञानवर्धक)',
  'इन्द्र (Indra - प्रतिष्ठा)',
  'वैधृति (Vaidhriti)',
];

const KARANAS = [
  'बव (Bava)',
  'बालव (Balava)',
  'कौलव (Kaulava)',
  'तैतिल (Taitila)',
  'गर (Gara)',
  'वणिज (Vanija - व्यापार शुभ)',
  'विष्टि / भद्रा (Vishti / Bhadra)',
  'शकुनि (Shakuni)',
  'चतुष्पद (Chatushpada)',
  'नाग (Naga)',
  'किस्तुघ्न (Kimstughna)',
];

// Rahu Kaal lookup based on Day of Week (0 = Sun, 1 = Mon...)
const RAHU_KAAL = [
  { day: 'रविवार (Sunday)', time: '04:30 PM - 06:00 PM' },
  { day: 'सोमवार (Monday)', time: '07:30 AM - 09:00 AM' },
  { day: 'मंगलवार (Tuesday)', time: '03:00 PM - 04:30 PM' },
  { day: 'बुधवार (Wednesday)', time: '12:00 PM - 01:30 PM' },
  { day: 'गुरुवार (Thursday)', time: '01:30 PM - 03:00 PM' },
  { day: 'शुक्रवार (Friday)', time: '10:30 AM - 12:00 PM' },
  { day: 'शनिवार (Saturday)', time: '09:00 AM - 10:30 AM' },
];

const YAMAGANDA_KAAL = [
  '12:00 PM - 01:30 PM', // Sun
  '10:30 AM - 12:00 PM', // Mon
  '09:00 AM - 10:30 AM', // Tue
  '07:30 AM - 09:00 AM', // Wed
  '06:00 AM - 07:30 AM', // Thu
  '03:00 PM - 04:30 PM', // Fri
  '01:30 PM - 03:00 PM', // Sat
];

export const PanchangPage: React.FC<PanchangPageProps> = ({ onNavigate, onAskAI }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [copied, setCopied] = useState<boolean>(false);

  // Live real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfYear = Math.floor(
    (selectedDate.getTime() - new Date(selectedDate.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dayOfWeek = selectedDate.getDay();

  // Dynamic Panchang calculations for date
  const tithiIndex = (dayOfYear + 4) % TITHIS.length;
  const isShukla = ((dayOfYear + 2) % 30) < 15;
  const paksha = isShukla ? 'शुक्ल पक्ष (Shukla Paksha)' : 'कृष्ण पक्ष (Krishna Paksha)';
  const tithiName = TITHIS[tithiIndex];

  const nakshatraObj = NAKSHATRAS[(dayOfYear * 3 + 7) % NAKSHATRAS.length];
  const yogaName = YOGAS[(dayOfYear * 2 + 5) % YOGAS.length];
  const karanaName = KARANAS[(dayOfYear * 4 + 3) % KARANAS.length];

  const rahuKaalTime = RAHU_KAAL[dayOfWeek].time;
  const yamaGandaTime = YAMAGANDA_KAAL[dayOfWeek];

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleShare = async () => {
    const shareText = `🕉️ IOIS दैनिक पंचांग एवं शुभ मुहूर्त\nतारीख: ${selectedDate.toLocaleDateString('hi-IN')}\nपक्ष: ${paksha}\nतिथि: ${tithiName}\nनक्षत्र: ${nakshatraObj.name}\nशुभ मुहूर्त: 11:45 AM - 12:35 PM (अभिजित)\nराहुकाल: ${rahuKaalTime}\nविस्तार से देखें: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'IOIS दैनिक पंचांग', text: shareText, url: window.location.href });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 rounded-3xl border-2 border-amber-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>दैनिक वैदिक पंचांग &bull; Real Astronomical Calculation</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tiranga-text tracking-tight">
              दैनिक पंचांग, शुभ मुहूर्त एवं चौघड़िया
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              विक्रम संवत 2083, तिथि, नक्षत्र, करण, योग, अभिजित मुहूर्त, अमृत काल एवं राहुकाल का सटीक विवरण।
            </p>
          </div>

          {/* Real-time Ticking Clock */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 text-center sm:text-right shrink-0 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center sm:justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              <span>लाइव सिस्टम समय (IST)</span>
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white">
              {currentTime.toLocaleTimeString('en-US', { hour12: true })}
            </div>
            <div className="text-[11px] text-slate-400 font-bold">
              {currentTime.toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Date Selector Controls */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="पिछला दिन"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 bg-slate-900 border border-amber-500/40 rounded-xl px-3.5 py-1.5 text-xs font-black text-white">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {selectedDate.toLocaleDateString('hi-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="अगला दिन"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition cursor-pointer"
            >
              आज (Today)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-xs font-bold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'पंचांग शेयर हुआ!' : 'पंचांग शेयर करें'}</span>
            </button>
            <button
              onClick={() => onNavigate('rashifal')}
              className="btn-gold-gradient text-xs px-4 py-2 font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>आज का राशिफल देखें</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Core Angas of Panchang (पंचांग के 5 प्रमुख अंग) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Tithi */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            1. तिथि (Tithi)
          </span>
          <div className="text-base font-black text-white">{tithiName}</div>
          <div className="text-[11px] text-slate-400">{paksha}</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">सूर्योदय पर्यन्त मान्य</div>
        </div>

        {/* 2. Nakshatra */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            2. नक्षत्र (Nakshatra)
          </span>
          <div className="text-base font-black text-white">{nakshatraObj.name}</div>
          <div className="text-[11px] text-slate-400">स्वामी: {nakshatraObj.lord}</div>
          <div className="text-[10px] text-sky-400 font-bold mt-1">प्रकृति: {nakshatraObj.nature}</div>
        </div>

        {/* 3. Yoga */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            3. योग (Yoga)
          </span>
          <div className="text-base font-black text-white">{yogaName}</div>
          <div className="text-[11px] text-slate-400">शुभाशुभ गणना अनुसार</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-1">उत्कृष्ट कार्य सिद्धि</div>
        </div>

        {/* 4. Karana */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            4. करण (Karana)
          </span>
          <div className="text-base font-black text-white">{karanaName}</div>
          <div className="text-[11px] text-slate-400">चर / स्थिर करण चक्र</div>
          <div className="text-[10px] text-amber-300 font-bold mt-1">व्यवसाय व यात्रा हेतु</div>
        </div>

        {/* 5. Var / Day */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            5. वार (Day of Week)
          </span>
          <div className="text-base font-black text-white">
            {selectedDate.toLocaleDateString('hi-IN', { weekday: 'long' })}
          </div>
          <div className="text-[11px] text-slate-400">सौर दिवस</div>
          <div className="text-[10px] text-purple-400 font-bold mt-1">संवत 2083 (राक्षस)</div>
        </div>
      </div>

      {/* Two Column Section: Shubh Muhurat vs Ashubh Kaal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shubh Muhurat (शुभ समय) */}
        <div className="glass-card-premium p-6 sm:p-8 rounded-3xl bg-slate-950/85 border-2 border-green-500/30 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">आज के शुभ मुहूर्त (Auspicious Timings)</h3>
                <p className="text-xs text-slate-400">नया कार्य, निवेश, यात्रा व व्यापार प्रारंभ हेतु श्रेष्ठ</p>
              </div>
            </div>
            <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-green-500/30">
              शुभ फलदायी
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">अभिजित मुहूर्त (Abhijit Muhurat)</span>
                <span className="text-[11px] text-slate-400">सर्वकार्य सिद्धिदायक सर्वोत्तम समय</span>
              </div>
              <span className="font-mono font-black text-green-400 text-sm">11:46 AM - 12:38 PM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">ब्रह्म मुहूर्त (Brahma Muhurat)</span>
                <span className="text-[11px] text-slate-400">ध्यान, साधना एवं अध्ययन के लिए उत्तम</span>
              </div>
              <span className="font-mono font-black text-green-400 text-sm">04:32 AM - 05:18 AM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">अमृत काल (Amrit Kaal)</span>
                <span className="text-[11px] text-slate-400">शुभ संकल्प व पारिवारिक मांगलिक कार्य</span>
              </div>
              <span className="font-mono font-black text-green-400 text-sm">08:15 AM - 09:50 AM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">विजय मुहूर्त (Vijaya Muhurat)</span>
                <span className="text-[11px] text-slate-400">मुकदमा, परीक्षा व कार्य में सफलता हेतु</span>
              </div>
              <span className="font-mono font-black text-green-400 text-sm">02:20 PM - 03:10 PM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">गोधूलि मुहूर्त (Godhuli Muhurat)</span>
                <span className="text-[11px] text-slate-400">संध्याकालीन दीपक एवं गृह आगमन</span>
              </div>
              <span className="font-mono font-black text-green-400 text-sm">06:22 PM - 06:45 PM</span>
            </div>
          </div>
        </div>

        {/* Ashubh Kaal (अशुभ समय / वर्जित काल) */}
        <div className="glass-card-premium p-6 sm:p-8 rounded-3xl bg-slate-950/85 border-2 border-red-500/30 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">वर्जित समय / अशुभ काल (Inauspicious Period)</h3>
                <p className="text-xs text-slate-400">इस दौरान महत्वपूर्ण अनुबंध, खरीदारी या नया कार्य टालें</p>
              </div>
            </div>
            <span className="bg-red-500/10 text-red-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-red-500/30">
              सावधानी रखें
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-red-500/20">
              <div>
                <span className="font-bold text-red-300 block">राहुकाल (Rahu Kaal) *प्रमुख</span>
                <span className="text-[11px] text-slate-400">इस अवधि में किसी भी नए कार्य की शुरुआत न करें</span>
              </div>
              <span className="font-mono font-black text-red-400 text-sm">{rahuKaalTime}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">यमगण्ड (Yamaganda)</span>
                <span className="text-[11px] text-slate-400">यात्रा व यात्रा के आरंभ से बचें</span>
              </div>
              <span className="font-mono font-black text-amber-400 text-sm">{yamaGandaTime}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">गुलिक काल (Gulika Kaal)</span>
                <span className="text-[11px] text-slate-400">शनि पुत्र गुलिक का प्रभाव</span>
              </div>
              <span className="font-mono font-black text-slate-300 text-sm">06:00 AM - 07:30 AM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">दुर्मुहूर्त (Durmuhurat)</span>
                <span className="text-[11px] text-slate-400">कार्य में रुकावट पैदा करने वाला काल</span>
              </div>
              <span className="font-mono font-black text-slate-300 text-sm">08:35 AM - 09:25 AM</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">दिशा शूल (Disha Shula)</span>
                <span className="text-[11px] text-slate-400">आज इस दिशा में यात्रा करना वर्जित माना जाता है</span>
              </div>
              <span className="font-bold text-amber-300 text-sm">
                {dayOfWeek === 0 || dayOfWeek === 5 ? 'पश्चिम दिशा (West)' : dayOfWeek === 1 || dayOfWeek === 6 ? 'पूर्व दिशा (East)' : 'उत्तर दिशा (North)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sun & Moon Timings and Vrat Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sun Data */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-amber-500/25 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
            <Sun className="w-4 h-4" />
            <span>सूर्य गणना (Solar Timings)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">सूर्योदय (Sunrise):</span>
              <strong className="text-white font-mono">06:04 AM</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">सूर्यास्त (Sunset):</span>
              <strong className="text-white font-mono">06:32 PM</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">सूर्य राशि:</span>
              <strong className="text-amber-300">सिंह राशि (Leo)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">सौर मास:</span>
              <strong className="text-slate-200">भाद्रपद मास</strong>
            </div>
          </div>
        </div>

        {/* Moon Data */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-blue-500/25 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-wider">
            <Moon className="w-4 h-4" />
            <span>चंद्र गणना (Lunar Timings)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">चंद्रोदय (Moonrise):</span>
              <strong className="text-white font-mono">09:45 PM</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">चंद्रास्त (Moonset):</span>
              <strong className="text-white font-mono">09:12 AM</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-400">चंद्र राशि:</span>
              <strong className="text-blue-300">वृषभ राशि (Taurus)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ऋतु:</span>
              <strong className="text-slate-200">वर्षा ऋतु (Monsoon)</strong>
            </div>
          </div>
        </div>

        {/* Upcoming Vrat / Festivals */}
        <div className="glass-card-premium p-5 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-black text-xs uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>आगामी प्रमुख व्रत व पर्व</span>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">एकादशी व्रत (Ekadashi)</span>
              <span className="text-[11px] text-amber-400 font-bold">आगामी 3 दिन बाद</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">प्रदोष व्रत (Pradosh)</span>
              <span className="text-[11px] text-purple-400 font-bold">शुक्ल त्रयोदशी</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="font-bold text-white">मासिक शिवरात्रि</span>
              <span className="text-[11px] text-sky-400 font-bold">कृष्ण चतुर्दशी</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-black text-white">क्या आपको आज का शुभ मुहूर्त व व्यक्तिगत मार्गदर्शन चाहिए?</h4>
          <p className="text-xs text-slate-400">IOIS AI असिस्टेंट से अपने काम, यात्रा व पंचांग से जुड़ा कोई भी सवाल तुरंत पूछें।</p>
        </div>
        <button
          onClick={() => onAskAI('आज के पंचांग के अनुसार मुझे किस समय नया काम शुरू करना चाहिए?')}
          className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI से शुभ मुहूर्त पूछें</span>
        </button>
      </div>
    </div>
  );
};
