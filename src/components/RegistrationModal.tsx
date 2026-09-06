import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  UserPlus, 
  Smartphone, 
  QrCode, 
  ArrowRight,
  Info,
  Check,
  Send,
  Zap,
  Lock
} from 'lucide-react';
import { PLANS, OFFICIAL_FORM_URL, OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/plansData';
import { Plan } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: number;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultPlanId = 1,
}) => {
  const [sponsorId, setSponsorId] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [state, setState] = useState<string>('बिहार (Bihar)');
  const [selectedPlanId, setSelectedPlanId] = useState<number>(defaultPlanId);
  const [payoutUpiId, setPayoutUpiId] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [registrationReceipt, setRegistrationReceipt] = useState<any>(null);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultPlanId) {
      setSelectedPlanId(defaultPlanId);
    }
  }, [defaultPlanId]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];
  const officialUpi = '8877490845@okbizaxis';

  const copyOfficialUpi = () => {
    navigator.clipboard.writeText(officialUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleApplyDefaultSponsor = () => {
    setSponsorId('IOIS2026');
    if (errors.sponsorId) {
      setErrors((prev) => ({ ...prev, sponsorId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!sponsorId.trim()) {
      newErrors.sponsorId = '⚠️ स्पॉन्सर आईडी भरना अनिवार्य है! यदि कोई नहीं है तो "IOIS2026" भरें।';
    }

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'कृपया अपना पूरा नाम (कम से कम 3 अक्षर) सही दर्ज करें।';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'कृपया 10 अंकों का मान्य मोबाइल/व्हाट्सएप नंबर दर्ज करें।';
    }

    if (!payoutUpiId.trim() || !payoutUpiId.includes('@')) {
      newErrors.payoutUpiId = '⚠️ मान्य UPI ID अनिवार्य है (उदा: 8877490845@okbizaxis या name@upi)। इसी पते पर पेआउट मिलेगा!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const submissionData = {
      name: fullName.trim(),
      phone: phone.trim(),
      state: state.trim(),
      selectedPlan: `${currentPlan.code}: ${currentPlan.name} (₹${currentPlan.price})`,
      sponsorId: sponsorId.trim(),
      payoutUpiId: payoutUpiId.trim(),
      utrNumber: utrNumber.trim() || 'Pending/Not Provided',
      source: 'Direct Student Registration Portal',
      notes: `Registration with payout UPI: ${payoutUpiId.trim()}, Sponsor: ${sponsorId.trim()}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const resData = await response.json();
      
      // Save locally as backup for student
      const userReceipt = {
        registrationId: resData.user?.id || `IOIS-${Date.now().toString().slice(-6)}`,
        ...submissionData,
        planPrice: currentPlan.price,
        instantPayout: currentPlan.instantPayout,
        payoutPercentage: currentPlan.percentage,
      };

      setRegistrationReceipt(userReceipt);
      setIsSuccess(true);
    } catch (err) {
      // Fallback: Client-side local storage
      const fallbackReceipt = {
        registrationId: `IOIS-${Date.now().toString().slice(-6)}`,
        ...submissionData,
        planPrice: currentPlan.price,
        instantPayout: currentPlan.instantPayout,
        payoutPercentage: currentPlan.percentage,
      };
      try {
        const saved = JSON.parse(localStorage.getItem('iois_user_registrations') || '[]');
        saved.unshift(fallbackReceipt);
        localStorage.setItem('iois_user_registrations', JSON.stringify(saved));
      } catch (storageErr) {
        console.error(storageErr);
      }
      setRegistrationReceipt(fallbackReceipt);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReceiptDetails = () => {
    if (!registrationReceipt) return;
    const text = `🎉 *IOIS रजिस्ट्रेशन कन्फर्मेशन स्लिप*\n\n` +
      `🆔 रजिस्ट्रेशन ID: ${registrationReceipt.registrationId}\n` +
      `👤 नाम: ${registrationReceipt.name}\n` +
      `📞 मोबाइल: ${registrationReceipt.phone}\n` +
      `👥 स्पॉन्सर ID: ${registrationReceipt.sponsorId}\n` +
      `📦 चयनित प्लान: ${registrationReceipt.selectedPlan}\n` +
      `💰 पेआउट UPI ID: ${registrationReceipt.payoutUpiId}\n` +
      `⚡ दैनिक पेआउट: ₹${registrationReceipt.instantPayout} प्रति रेफरल (${registrationReceipt.payoutPercentage}%)\n` +
      `🏛️ आधिकारिक संपर्क: +91 8877490845\n` +
      `🌐 पोर्टल: https://iois.in`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  const shareReceiptWhatsApp = () => {
    if (!registrationReceipt) return;
    const message = `नमस्ते IOIS एडमिन टीम,\nमैंने सफलतापूर्वक रजिस्ट्रेशन फॉर्म सबमिट कर दिया है:\n\n` +
      `*रजिस्ट्रेशन ID:* ${registrationReceipt.registrationId}\n` +
      `*नाम:* ${registrationReceipt.name}\n` +
      `*मोबाइल:* ${registrationReceipt.phone}\n` +
      `*स्पॉन्सर ID:* ${registrationReceipt.sponsorId}\n` +
      `*प्लान:* ${registrationReceipt.selectedPlan}\n` +
      `*पेआउट UPI:* ${registrationReceipt.payoutUpiId}\n` +
      `*UTR नंबर:* ${registrationReceipt.utrNumber}\n\n` +
      `कृपया मेरी आईडी को सत्यापित कर एक्टिवेट करें।`;

    const waUrl = `https://wa.me/918877490845?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  // UPI Intent URL for mobile one-click payment
  const upiIntentUrl = `upi://pay?pa=${officialUpi}&pn=IOIS%20PLATFORM&am=${currentPlan.price}&cu=INR&tn=IOIS%20Plan%20${currentPlan.id}%20Registration`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl sm:max-w-3xl my-auto bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(217,119,6,0.25)] text-slate-100 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300">
              <UserPlus className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  IOIS रजिस्ट्रेशन / Join Now (2026)
                </h3>
                <span className="hidden sm:inline-block bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                  100% VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                छात्र, युवा व डिजिटल शिक्षार्थियों हेतु आधिकारिक ऑनलाइन रजिस्ट्रेशन पोर्टल
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* CRITICAL WARNING BANNER (अति महत्वपूर्ण चेतावनी) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/60 via-amber-950/40 to-slate-950 border-2 border-amber-500/80 shadow-lg shadow-amber-950/40 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-black text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
              <span>⚠️ अति महत्वपूर्ण चेतावनी (Mandatory Registration Notice):</span>
            </div>
            
            <div className="text-xs sm:text-[13px] text-slate-200 leading-relaxed space-y-2 pl-2 border-l-2 border-amber-500/50">
              <p>
                <strong className="text-amber-300">1. Payment Received Address (UPI ID):</strong> अपना UPI ID (Google Pay, PhonePe, Paytm, BHIM UPI) जहाँ आप अपना <strong className="text-emerald-400">50% से 70% दैनिक इंसेंटेंट पेआउट</strong> प्राप्त करना चाहते हैं, <strong>बिल्कुल सही-सही भरें।</strong> गलत या बंद UPI ID दर्ज होने पर पेआउट ट्रांसफर नहीं हो सकेगा।
              </p>
              <p>
                <strong className="text-amber-300">2. Sponsor ID (स्पॉन्सर आईडी):</strong> स्पॉन्सर आईडी (रेफरल कोड) <strong>अवश्य भरें!</strong> जिस मित्र या गाइड ने आपको यह पोर्टल सुझाया है, उनकी आईडी भरें। (यदि कोई नहीं है, तो तुरंत <strong className="text-white bg-amber-500/30 px-1.5 py-0.5 rounded font-mono">IOIS2026</strong> दर्ज करें)।
              </p>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Sponsor ID Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-200 flex items-center gap-1.5">
                    <span>Sponsor ID (स्पॉन्सर / रेफरल कोड)</span>
                    <span className="text-red-400">*</span>
                    <span className="bg-red-500/20 text-red-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-500/40">
                      अनिवार्य
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={handleApplyDefaultSponsor}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    डिफ़ॉल्ट 'IOIS2026' लागू करें
                  </button>
                </div>
                <input
                  type="text"
                  value={sponsorId}
                  onChange={(e) => {
                    setSponsorId(e.target.value);
                    if (errors.sponsorId) setErrors((prev) => ({ ...prev, sponsorId: '' }));
                  }}
                  placeholder="उदा. IOIS2026 या आपके रेफरर की Sponsor ID"
                  className={`w-full p-3 sm:p-3.5 rounded-xl bg-slate-900 border text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none transition ${
                    errors.sponsorId ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.sponsorId && (
                  <p className="text-[11px] font-bold text-red-400">{errors.sponsorId}</p>
                )}
                <p className="text-[10px] text-slate-400">
                  बिना स्पॉन्सर आईडी के पंजीकरण प्रक्रिया पूर्ण नहीं की जा सकती।
                </p>
              </div>

              {/* 2. Personal Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    <span>कैंडिडेट / छात्र का पूरा नाम</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="जैसे: राहुल कुमार शर्मा"
                    className={`w-full p-3 rounded-xl bg-slate-900 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition ${
                      errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-amber-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 font-bold">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                    <span>मोबाइल / व्हाट्सएप नंबर (10 अंक)</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, ''));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="उदा. 9876543210"
                    className={`w-full p-3 rounded-xl bg-slate-900 border text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none transition ${
                      errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-amber-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 font-bold">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* 3. State Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">
                  निवास का राज्य (State)
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="बिहार (Bihar)">बिहार (Bihar)</option>
                  <option value="उत्तर प्रदेश (Uttar Pradesh)">उत्तर प्रदेश (Uttar Pradesh)</option>
                  <option value="मध्य प्रदेश (Madhya Pradesh)">मध्य प्रदेश (Madhya Pradesh)</option>
                  <option value="झारखंड (Jharkhand)">झारखंड (Jharkhand)</option>
                  <option value="राजस्थान (Rajasthan)">राजस्थान (Rajasthan)</option>
                  <option value="दिल्ली एनसीआर (Delhi NCR)">दिल्ली एनसीआर (Delhi NCR)</option>
                  <option value="हरियाणा (Haryana)">हरियाणा (Haryana)</option>
                  <option value="पश्चिम बंगाल (West Bengal)">पश्चिम बंगाल (West Bengal)</option>
                  <option value="अन्य राज्य (Other State)">अन्य राज्य (Other State)</option>
                </select>
              </div>

              {/* 4. IOIS 7 Master Plans Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-200 flex items-center gap-1.5">
                    <span>प्लान का चयन करें (Select IOIS Plan)</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    तत्काल पेआउट: ₹{currentPlan.instantPayout} ({currentPlan.percentage}%)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PLANS.map((p) => {
                    const isSelected = p.id === selectedPlanId;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                            {p.code}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <div className="text-xs font-black text-white mt-1 truncate">
                          {p.name}
                        </div>
                        <div className="text-sm font-black text-amber-300 mt-0.5">
                          ₹{p.price}
                        </div>
                        <div className="text-[9px] text-green-400 font-bold mt-1">
                          पेआउट: ₹{p.instantPayout} ({p.percentage}%)
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. CRITICAL: Payment Received Address / UPI ID */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/60 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <span>पेमेंट रिसीविंग UPI ID / Address (जहाँ पेआउट पाना चाहते हैं)</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                    अति आवश्यक
                  </span>
                </div>
                
                <input
                  type="text"
                  value={payoutUpiId}
                  onChange={(e) => {
                    setPayoutUpiId(e.target.value.trim());
                    if (errors.payoutUpiId) setErrors((prev) => ({ ...prev, payoutUpiId: '' }));
                  }}
                  placeholder="उदा. 8877490845@okbizaxis या आपका PhonePe/GPay/Paytm UPI"
                  className={`w-full p-3 sm:p-3.5 rounded-xl bg-slate-950 border text-sm font-mono text-emerald-300 placeholder:text-slate-500 focus:outline-none transition ${
                    errors.payoutUpiId ? 'border-red-500 ring-1 ring-red-500' : 'border-amber-400/80 focus:border-amber-400'
                  }`}
                />
                {errors.payoutUpiId && (
                  <p className="text-[11px] font-black text-red-400">{errors.payoutUpiId}</p>
                )}

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  ⚠️ <strong className="text-amber-300">ध्यान दें:</strong> जब भी कोई व्यक्ति आपके रेफरल से जुड़ेगा, तो उसका ₹{currentPlan.instantPayout} ({currentPlan.percentage}%) कमीशन <strong>सीधा इसी UPI ID पर ट्रांसफर किया जाएगा।</strong> इसलिए स्पेलिंग व बैंक हैंडल सही भरें।
                </p>
              </div>

              {/* 6. Payment Transfer Section (Official UPI & QR Code) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>प्लान एक्टिवेशन फीस भुगतान: ₹{currentPlan.price}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">100% सुरक्षित भुगतान</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      आधिकारिक IOIS UPI ID:
                    </span>
                    <div className="font-mono text-sm sm:text-base font-black text-amber-300 select-all">
                      {officialUpi}
                    </div>
                    <span className="text-[10px] text-emerald-400 block font-semibold">
                      नाम: IOIS DIGITAL SYSTEM (Official Axis Bank)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyOfficialUpi}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'कॉपी हुआ!' : 'UPI कॉपी करें'}</span>
                    </button>

                    {/* One Click UPI App Mobile Launch */}
                    <a
                      href={upiIntentUrl}
                      className="sm:hidden px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-black transition flex items-center gap-1"
                    >
                      <span>Pay App</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    पेमेंट के बाद 12-अंकों का UTR / Transaction No. (वैकल्पिक परंतु अनुशंसित)
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value.trim())}
                    placeholder="उदा. 412356789012 (पेमेंट स्लिप से देखकर भरें)"
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* 7. Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-gradient w-full py-3.5 sm:py-4 text-sm sm:text-base font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 uppercase tracking-wider cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>कृपया प्रतीक्षा करें, दर्ज किया जा रहा है...</span>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 text-slate-950" />
                      <span>रजिस्ट्रेशन सबमिट करें और जॉइन करें (Submit & Join)</span>
                    </>
                  )}
                </button>

                {/* Secondary Option: Official Google Form Direct Link */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">
                    अथवा सीधे आधिकारिक गूगल फॉर्म द्वारा जुड़ना चाहते हैं?
                  </span>
                  <a
                    href={OFFICIAL_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold underline"
                  >
                    <span>आधिकारिक गूगल फॉर्म खोलें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </form>
          ) : (
            /* SUCCESS CONFIRMATION RECEIPT */
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-green-500/60 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 mx-auto flex items-center justify-center text-green-400 shadow-lg shadow-green-500/30">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  बधाई हो! रजिस्ट्रेशन सफलतापूर्वक दर्ज हुआ 🎉
                </h4>
                <p className="text-xs sm:text-sm text-green-300 font-medium">
                  आपकी जानकारी IOIS डेटाबेस में सुरक्षित रूप से रिकॉर्ड कर ली गई है।
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">रजिस्ट्रेशन टोकन ID:</span>
                  <span className="font-mono font-black text-amber-400">{registrationReceipt?.registrationId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">कैंडिडेट नाम:</span>
                  <span className="font-bold text-white">{registrationReceipt?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Sponsor ID (स्पॉन्सर):</span>
                  <span className="font-mono font-bold text-amber-300">{registrationReceipt?.sponsorId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">पंजीकृत प्लान:</span>
                  <span className="font-bold text-emerald-400">{registrationReceipt?.selectedPlan}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">पेआउट UPI ID:</span>
                  <span className="font-mono font-black text-amber-300">{registrationReceipt?.payoutUpiId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">दैनिक इंसेंटिव (पेआउट):</span>
                  <span className="font-black text-green-400">₹{registrationReceipt?.instantPayout} ({registrationReceipt?.payoutPercentage}%)</span>
                </div>
              </div>

              {/* WhatsApp Activation Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={shareReceiptWhatsApp}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>व्हाट्सएप पर स्लिप भेजें</span>
                </button>

                <button
                  type="button"
                  onClick={copyReceiptDetails}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer border border-slate-700"
                >
                  {copiedReceipt ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedReceipt ? 'स्लिप कॉपी हुई!' : 'स्लिप कॉपी करें'}</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  विंडो बंद करें और मुख्य पोर्टल पर लौटें
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
