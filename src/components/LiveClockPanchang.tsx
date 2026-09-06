import React, { useState, useEffect } from 'react';
import { Clock, Sun, Sparkles, Tv, Calendar } from 'lucide-react';

export const LiveClockPanchang: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const digitalTimeStr = time.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const hindiDateStr = time.toLocaleDateString('hi-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="live-utilities" className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* 1. Live System Analog & Digital Clock */}
      <div className="glass-card-premium text-center p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h3 className="gold-metallic-text font-black uppercase text-sm sm:text-base tracking-wider">
            Live System Clock
          </h3>
        </div>

        {/* Dial with Upright Straight Digits */}
        <div className="clock-container my-2">
          <div className="clock-numbers">
            <span className="n1">1</span>
            <span className="n2">2</span>
            <span className="n3">3</span>
            <span className="n4">4</span>
            <span className="n5">5</span>
            <span className="n6">6</span>
            <span className="n7">7</span>
            <span className="n8">8</span>
            <span className="n9">9</span>
            <span className="n10">10</span>
            <span className="n11">11</span>
            <span className="n12">12</span>
          </div>
          <div className="center-dot" />
          <div
            className="clock-hand hour-hand"
            style={{ transform: `rotate(${hourDeg}deg)` }}
          />
          <div
            className="clock-hand min-hand"
            style={{ transform: `rotate(${minDeg}deg)` }}
          />
          <div
            className="clock-hand sec-hand"
            style={{ transform: `rotate(${secDeg}deg)` }}
          />
        </div>

        <div>
          <div id="live-digital-clock" className="text-3xl sm:text-4xl font-mono font-black text-white tracking-wider">
            {digitalTimeStr}
          </div>
          <div className="text-[11px] text-amber-400 mt-2 font-bold uppercase tracking-wide flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{hindiDateStr}</span>
          </div>
        </div>
      </div>

      {/* 2. Daily Panchang Card */}
      <div className="glass-card-premium p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-center gap-2 text-center">
          <Sun className="w-4 h-4 text-amber-400" />
          <h3 className="gold-metallic-text font-black uppercase text-sm sm:text-base tracking-wider">
            दैनिक पंचांग एवं शुभ मुहूर्त
          </h3>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <span className="text-slate-400 font-medium">शुभ मुहूर्त:</span>
            <strong className="text-emerald-400 font-black">08:15 AM - 10:30 AM</strong>
          </div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <span className="text-slate-400 font-medium">शुभ रंग:</span>
            <strong className="text-amber-400 font-black">पीला, केसरिया, सफेद</strong>
          </div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <span className="text-slate-400 font-medium">आज का नक्षत्र:</span>
            <strong className="text-sky-300 font-black">पुष्य नक्षत्र (सफलता के लिए श्रेष्ठ)</strong>
          </div>

          <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-amber-500/20 mt-4 text-xs text-slate-300 leading-relaxed space-y-1">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ज्योतिष एवं सफलता सूत्र:</span>
            </div>
            <p className="italic">
              आज डिजिटल स्किल और ज्ञान पर किया गया छोटा निवेश भविष्य में 100 गुना फल और आत्मनिर्भरता प्रदान करेगा।
            </p>
          </div>
        </div>
      </div>

      {/* 3. IOIS Smart TV Video Player */}
      <div className="glass-card-premium p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-center gap-2 text-center">
          <Tv className="w-4 h-4 text-amber-400" />
          <h3 className="gold-metallic-text font-black uppercase text-sm sm:text-base tracking-wider">
            IOIS SMART TV
          </h3>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0gYd3mIxksc"
            title="IOIS Official Training"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-[11px] text-slate-400 text-center italic">
          आधिकारिक ट्यूटोरियल्स और लाइव सिस्टम ट्रेनिंग यहाँ देखें।
        </p>
      </div>
    </section>
  );
};
