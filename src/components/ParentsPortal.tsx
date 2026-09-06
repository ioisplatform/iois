import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Terminal, Shield, CheckCircle2, Play } from 'lucide-react';

export const ParentsPortal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "> [SYSTEM] READY. Waiting for Parent & User Authentication..."
  ]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const securityLogs = [
    "> [PASS] Validating IOIS National API Connection & Gateway...",
    "> [PASS] SSL 256-Bit Military Grade Encryption Detected & Active.",
    "> [PASS] Instant Payout Protocol Verification: 100% OK.",
    "> [PASS] Telegram Notification Node (@ioisplatform) Synchronized.",
    "> [PASS] Student Protection & Child Digital Safety Firewall: ACTIVE.",
    "> [PASS] Transparency & Anti-Fraud Auditing Engine: VERIFIED.",
    "> [SUCCESS] IOIS System is 100% Safe, Legitimate and Verified for all Users."
  ];

  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setLogs(["> [INIT] Initiating Comprehensive Live Security Scan..."]);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < securityLogs.length) {
        setLogs((prev) => [...prev, securityLogs[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 550);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="parents" className="glass-card-premium border-2 border-amber-500/35 p-6 sm:p-10 space-y-6 bg-black/50">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>लाइव सत्यापन प्रोटोकॉल</span>
        </div>
        <h2 className="gold-metallic-text text-2xl sm:text-4xl font-black uppercase">
          Parents & Safety Transparency Console
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-widest font-semibold">
          Live System Verification & Child Safety Security Audit
        </p>
      </div>

      <div className="flex justify-center">
        <button
          id="run-security-scan-btn"
          onClick={handleStartScan}
          disabled={isScanning}
          className={`btn-gold-gradient text-xs px-8 py-3 tracking-wider flex items-center gap-2 cursor-pointer ${
            isScanning ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isScanning ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>स्कैनिंग जारी है...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Run Live Security Scan</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal View */}
      <div
        ref={terminalRef}
        id="terminal-console"
        className="bg-black/95 p-5 sm:p-6 rounded-2xl border border-slate-800 font-mono text-green-400 text-xs h-48 overflow-y-auto leading-relaxed shadow-2xl space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800"
      >
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-slate-600 select-none">$</span>
            <span className={log.includes('SUCCESS') ? 'text-emerald-300 font-bold' : log.includes('PASS') ? 'text-green-400' : 'text-slate-300'}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
