import React, { useState, useEffect } from 'react';
import { PageId } from '../types';

interface HeaderClockProps {
  onNavigate?: (page: PageId) => void;
}

export const HeaderClock: React.FC<HeaderClockProps> = ({ onNavigate }) => {
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

  // Hand angles
  const secAngle = seconds * 6; // 360 / 60
  const minAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const digitalTimeStr = time.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const shortDateStr = time.toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  });

  // Dial geometry (radius = 32, center = 36,36; total SVG size = 72x72)
  const cx = 36;
  const cy = 36;
  const dialRadius = 33;
  const numberRadius = 23.5;

  // All 12 straight, upright numbers (1 to 12)
  const numbers = [
    { num: 12, angle: 0 },
    { num: 1, angle: 30 },
    { num: 2, angle: 60 },
    { num: 3, angle: 90 },
    { num: 4, angle: 120 },
    { num: 5, angle: 150 },
    { num: 6, angle: 180 },
    { num: 7, angle: 210 },
    { num: 8, angle: 240 },
    { num: 9, angle: 270 },
    { num: 10, angle: 300 },
    { num: 11, angle: 330 },
  ];

  return (
    <div
      onClick={() => onNavigate && onNavigate('panchang')}
      title="IOIS India लाइव एनालॉग व डिजिटल घड़ी (पंचांग व शुभ मुहूर्त देखने के लिए क्लिक करें)"
      className="flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border-2 border-amber-400/60 hover:border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition cursor-pointer group select-none shrink-0"
    >
      {/* 1. Precision Analog Dial with Straight 12 Digits & Clear Needles */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 72 72"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Premium Gold Metallic Dial Outer Ring Gradient */}
            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="35%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Inner Dial Face Radial Gradient */}
            <radialGradient id="dialFace" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="85%" stopColor="#020617" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>

            {/* Gold Hour Hand Gradient */}
            <linearGradient id="hourHandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Outer Gold Border Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={dialRadius}
            fill="none"
            stroke="url(#goldRing)"
            strokeWidth="2.5"
          />

          {/* Inner Thin Border Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={dialRadius - 2.5}
            fill="url(#dialFace)"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* 60 Minute / Second Tick Marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHour = i % 5 === 0;
            const angleRad = (i * 6 * Math.PI) / 180;
            const r1 = dialRadius - 3.2;
            const r2 = isHour ? dialRadius - 5.5 : dialRadius - 4.2;
            const x1 = cx + r1 * Math.sin(angleRad);
            const y1 = cy - r1 * Math.cos(angleRad);
            const x2 = cx + r2 * Math.sin(angleRad);
            const y2 = cy - r2 * Math.cos(angleRad);
            return (
              <line
                key={`tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHour ? '#F59E0B' : '#64748B'}
                strokeWidth={isHour ? '1' : '0.5'}
              />
            );
          })}

          {/* IOIS INDIA Inscriptions inside Dial */}
          <text
            x={cx}
            y={cy - 8.5}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#D4AF37"
            fontSize="5.2"
            fontWeight="900"
            letterSpacing="0.8"
          >
            IOIS
          </text>
          <text
            x={cx}
            y={cy + 9.5}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#22C55E"
            fontSize="3.8"
            fontWeight="800"
            letterSpacing="0.5"
          >
            INDIA
          </text>

          {/* All 12 STRAIGHT (Upright) Digits */}
          {numbers.map(({ num, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const nx = cx + numberRadius * Math.sin(rad);
            const ny = cy - numberRadius * Math.cos(rad);
            return (
              <text
                key={`num-${num}`}
                x={nx}
                y={ny}
                textAnchor="middle"
                dominantBaseline="central"
                fill={num === 12 || num === 3 || num === 6 || num === 9 ? '#FDE68A' : '#E2E8F0'}
                fontSize={num === 12 || num === 3 || num === 6 || num === 9 ? '6.8' : '5.8'}
                fontWeight={num === 12 || num === 3 || num === 6 || num === 9 ? '900' : '700'}
                style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
              >
                {num}
              </text>
            );
          })}

          {/* Hour Hand (Clear, Elegant, Tapered, Gold) */}
          <g transform={`rotate(${hourAngle} ${cx} ${cy})`}>
            {/* Hour hand body */}
            <polygon
              points={`${cx - 1.8},${cy + 2.5} ${cx - 1.2},${cy - 14} ${cx},${cy - 16} ${cx + 1.2},${cy - 14} ${cx + 1.8},${cy + 2.5}`}
              fill="url(#hourHandGrad)"
              stroke="#78350F"
              strokeWidth="0.4"
            />
          </g>

          {/* Minute Hand (Clear, Crisp, Silver/White) */}
          <g transform={`rotate(${minAngle} ${cx} ${cy})`}>
            {/* Minute hand body */}
            <polygon
              points={`${cx - 1.3},${cy + 3} ${cx - 0.9},${cy - 21} ${cx},${cy - 23} ${cx + 0.9},${cy - 21} ${cx + 1.3},${cy + 3}`}
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="0.4"
            />
          </g>

          {/* Second Hand (Clear, Thin, Saffron/Red needle with counter-tail) */}
          <g transform={`rotate(${secAngle} ${cx} ${cy})`}>
            <line
              x1={cx}
              y1={cy + 6}
              x2={cx}
              y2={cy - 26}
              stroke="#FF9933"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            {/* Counterweight circle */}
            <circle cx={cx} cy={cy + 3.5} r="1.3" fill="#FF9933" />
          </g>

          {/* Center Jewel / Pin */}
          <circle cx={cx} cy={cy} r="2.2" fill="#D4AF37" stroke="#000" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="0.9" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 2. Small Digital Display Alongside Analog Clock */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-black tracking-wider text-amber-400 uppercase">
            IOIS INDIA
          </span>
        </div>
        <div className="font-mono text-xs sm:text-sm font-black text-white tracking-wider">
          {digitalTimeStr}
        </div>
        <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
          <span className="text-amber-300">{shortDateStr}</span>
          <span className="text-[8px] bg-slate-800 text-slate-300 px-1 rounded">IST</span>
        </div>
      </div>
    </div>
  );
};
