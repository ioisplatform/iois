import React, { useState } from 'react';
import { PageId, ResumeData } from '../types';
import { 
  FileCheck2, 
  ExternalLink, 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  UserCheck, 
  CheckCircle2, 
  Building2, 
  Info 
} from 'lucide-react';

interface GovtServicesHubProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

const DEFAULT_RESUME: ResumeData = {
  fullName: 'राहुल कुमार शर्मा',
  title: 'कंप्यूटर ऑपरेटर एवं डेटा एंट्री एग्जीक्यूटिव',
  phone: '+91 9876543210',
  email: 'rahul.sharma@email.com',
  address: 'पटना, बिहार (पिन: 800001)',
  objective: 'एक कर्मठ, अनुशासित एवं तकनीकी रूप से सक्षम पेशेवर के रूप में संस्था के लक्ष्यों की प्राप्ति में योगदान देना और अपने कंप्यूटर एवं प्रबंधन कौशल का सर्वश्रेष्ठ प्रदर्शन करना।',
  education: '1. स्नातक (B.A. - पाटलिपुत्र विश्वविद्यालय, 2024 - 68%)\n2. 12वीं (इंटरमीडिएट - BSEB पटना, 2021 - 72%)\n3. 10वीं (मैट्रिक - BSEB पटना, 2019 - 75%)',
  skills: 'MS Office (Word, Advanced Excel, PowerPoint), Tally Prime with GST, हिंदी एवं अंग्रेजी टाइपिंग (35 WPM), इंटरनेट ब्राउजिंग, डेटा एंट्री, RTPS व ई-गवर्नेंस पोर्टल संचालन।',
  experience: '1. 1 वर्ष का अनुभव कंप्यूटर ऑपरेटर के रूप में (स्थानीय सीएससी केंद्र एवं निजी फर्म)।\n2. ऑनलाइन फॉर्म, जीएसटी इनवॉइस एवं दैनिक बिलिंग प्रबंधन का व्यावहारिक अनुभव।',
  languages: 'हिंदी (उत्कृष्ट), अंग्रेजी (सामान्य बोलचाल एवं कार्य-योग्य)'
};

export const GovtServicesHub: React.FC<GovtServicesHubProps> = ({ onNavigate, onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'rtps' | 'aadhaar' | 'pan' | 'voter' | 'resume'>('rtps');
  const [resume, setResume] = useState<ResumeData>(DEFAULT_RESUME);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-green-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4 text-amber-400" />
          <span>100% निःशुल्क जनसेवा एवं डिजिटल टूल्स हब &bull; Free Online Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
          सरकारी सेवा पोर्टल, प्रमाण पत्र गाइड एवं फ्री रिज्यूमे मेकर
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          जातीय, आवासीय, आय प्रमाण पत्र (RTPS), आधार कार्ड सुधार, नया पैन कार्ड व वोटर आईडी की आधिकारिक जानकारी और डायरेक्ट लिंक। साथ ही नौकरी के लिए 2 मिनट में प्रोफेशनल बायोडाटा (CV) बनाएं और फ्री डाउनलोड करें।
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setActiveTab('rtps')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'rtps'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/40'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>RTPS बिहार (जातीय, आय, आवासीय)</span>
        </button>

        <button
          onClick={() => setActiveTab('aadhaar')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'aadhaar'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/40'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>आधार कार्ड सेवाएं (UIDAI)</span>
        </button>

        <button
          onClick={() => setActiveTab('pan')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'pan'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/40'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>पैन कार्ड सेवाएं (NSDL/UTI)</span>
        </button>

        <button
          onClick={() => setActiveTab('voter')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'voter'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400/40'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>वोटर आईडी (ECI)</span>
        </button>

        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'resume'
              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-green-500 text-black shadow-lg'
              : 'bg-slate-900 border border-amber-500/50 text-amber-300 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>फ्री रिज्यूमे / CV मेकर</span>
        </button>
      </div>

      {/* Tab 1: RTPS Bihar Services */}
      {activeTab === 'rtps' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>आधिकारिक सर्विस प्लस (Service Plus) गाइड</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                RTPS बिहार: जातीय, आवासीय एवं आय प्रमाण पत्र ऑनलाइन आवेदन
              </h2>
            </div>
            <a
              href="https://serviceonline.bihar.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>ऑफिशियल RTPS पोर्टल खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Caste Certificate */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
                1
              </div>
              <h3 className="text-base font-black text-white">जातीय प्रमाण पत्र (Caste Certificate)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                SC, ST, EBC (BC-1), BC (BC-2) एवं सामान्य वर्ग के लिए। सरकारी नौकरी, छात्रवृत्ति एवं आरक्षण हेतु अनिवार्य।
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <p><strong>दस्तावेज:</strong> आधार कार्ड, पासपोर्ट फोटो (50KB से कम), राशन कार्ड/खतियान।</p>
                <p><strong>जारी स्तर:</strong> राजस्व अधिकारी (RO) / SDO / DM स्तर।</p>
              </div>
            </div>

            {/* Residence Certificate */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-base font-black text-white">आवासीय / निवास प्रमाण पत्र (Domicile)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                यह प्रमाणित करता है कि आवेदक बिहार का स्थायी निवासी है। किसी भी राज्य स्तरीय भर्ती, स्कूल-कॉलेज एडमिशन में आवश्यक।
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <p><strong>दस्तावेज:</strong> आधार कार्ड, आवेदक की स्वयं की फोटो (कम साइज)।</p>
                <p><strong>समय:</strong> 10 से 14 कार्य दिवस में ऑनलाइन डाउनलोड।</p>
              </div>
            </div>

            {/* Income Certificate */}
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-base font-black text-white">आय प्रमाण पत्र (Income Certificate)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                परिवार की वार्षिक आय (कृषि, व्यवसाय, वेतन, अन्य स्रोत) का आधिकारिक प्रमाण। छात्रवृत्ति, राशन कार्ड, EWS के लिए अनिवार्य।
              </p>
              <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <p><strong>दस्तावेज:</strong> आधार कार्ड, फोटो, आय का स्व-घोषणा पत्र।</p>
                <p><strong>वैधता:</strong> जारी होने की तिथि से 1 वित्तीय वर्ष।</p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>RTPS पर ऑनलाइन आवेदन करने के 5 आसान चरण:</span>
            </h4>
            <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>आधिकारिक वेबसाइट <strong>serviceonline.bihar.gov.in</strong> पर जाएं।</li>
              <li>बाईं ओर <strong>'लोक सेवाओं का अधिकार (RTPS)'</strong> सेक्शन में सामान्य प्रशासन विभाग पर क्लिक करें।</li>
              <li>जातीय, आवासीय या आय प्रमाण पत्र में से जिस पर आवेदन करना है, <strong>'राजस्व अधिकारी स्तर (RO Level)'</strong> चुनें।</li>
              <li>फॉर्म में अपना नाम, पिता/माता का नाम, पता, आधार नंबर और फोटो (50KB से कम) अपलोड करें। (फोटो कंप्रेस करने के लिए हमारा <button onClick={() => onNavigate('compressor')} className="text-amber-400 underline font-bold cursor-pointer">फोटो कंप्रेसर टूल</button> प्रयोग करें)।</li>
              <li>ओटीपी या आधार सत्यापन के बाद सबमिट करें और <strong>अकनॉलेजमेंट रसीद (पावती)</strong> डाउनलोड कर सुरक्षित रख लें।</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 2: Aadhaar Services */}
      {activeTab === 'aadhaar' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>UIDAI MyAadhaar पोर्टल सेवाएं</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                आधार कार्ड ऑनलाइन सुधार एवं महत्वपूर्ण सेवाएं
              </h2>
            </div>
            <a
              href="https://myaadhaar.uidai.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>MyAadhaar पोर्टल पर जाएं</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-amber-300">1. आधार में पता (Address) ऑनलाइन बदलना</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                यदि आपके आधार में मोबाइल नंबर लिंक है, तो आप घर बैठे MyAadhaar पोर्टल पर लॉगिन करके बिजली बिल, निवास प्रमाण पत्र, या रेंट एग्रीमेंट अपलोड कर 48 घंटों में पता अपडेट कर सकते हैं।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-blue-300">2. ई-आधार (e-Aadhaar) PDF डाउनलोड</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                आधार नंबर और रजिस्टर्ड मोबाइल ओटीपी से तुरंत मूल आधार कार्ड डाउनलोड करें। पासवर्ड आपके नाम के पहले 4 अक्षर (CAPITAL) और जन्म का वर्ष (उदा. RAHU1998) होता है।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-green-300">3. ओरिजिनल PVC प्लास्टिक कार्ड मंगाना</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                मात्र ₹50 के सरकारी शुल्क में स्पीड पोस्ट द्वारा वॉटरप्रूफ, होलोग्राम युक्त असली पीवीसी आधार कार्ड सीधे आपके घर के पते पर मंगवाएं।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-purple-300">4. मोबाइल नंबर एवं बायोमेट्रिक सुधार</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                नाम, जन्मतिथि, मोबाइल नंबर या फिंगरप्रिंट अपडेट कराने के लिए नजदीकी आधार सेवा केंद्र या बैंक/डाकघर केंद्र पर ₹50 देकर तुरंत बायोमेट्रिक सुधार करवाएं।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PAN Card Services */}
      {activeTab === 'pan' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>NSDL / UTIITSL / आयकर विभाग</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                पैन कार्ड ऑनलाइन आवेदन एवं सुधार सेवाएं
              </h2>
            </div>
            <a
              href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>NSDL पैन पोर्टल खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-amber-300">10 मिनट में फ्री e-PAN (Instant)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                आयकर विभाग (Income Tax e-Filing) पोर्टल पर केवल आधार ओटीपी से तुरंत निःशुल्क डिजिटल पैन कार्ड जनरेट करें।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-blue-300">नया फिजिकल कार्ड (Form 49A)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ₹107 के शुल्क में घर पर डाक द्वारा आने वाला प्लास्टिक पैन कार्ड आवेदन। छात्र एवं वयस्क दोनों के लिए।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-green-300">पैन में नाम / DOB सुधार</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                यदि पैन कार्ड में पिता का नाम, स्पेलिंग या जन्मतिथि गलत है, तो NSDL पोर्टल पर करेक्शन फॉर्म भरें।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Voter ID Services */}
      {activeTab === 'voter' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>ECI Voters' Service Portal</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                वोटर आईडी कार्ड: नया रजिस्ट्रेशन एवं सुधार
              </h2>
            </div>
            <a
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>Voters ECI पोर्टल खोलें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-amber-300">नया वोटर कार्ड (Form 6)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                18 वर्ष की आयु पूरी करने वाले भारतीय नागरिक पहली बार मतदाता सूची में नाम जुड़वाने के लिए ऑनलाइन फॉर्म 6 भरें।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-blue-300">वोटर कार्ड में सुधार (Form 8)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                नाम, फोटो, पता, मोबाइल नंबर या विधानसभा क्षेत्र बदलने हेतु फॉर्म 8 भरकर नया रंगीन वोटर कार्ड मंगवाएं।
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2.5">
              <h3 className="text-base font-black text-green-300">डिजिटल e-EPIC डाउनलोड</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                मोबाइल नंबर लिंक होने पर अपना आधिकारिक डिजिटल वोटर कार्ड 1 मिनट में सुरक्षित पीडीएफ फॉर्मेट में डाउनलोड करें।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Free Interactive Resume / CV Builder */}
      {activeTab === 'resume' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/40 rounded-3xl bg-slate-950/90 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>100% फ्री &bull; नो वॉटरमार्क &bull; लाइव प्रिंट / सेव</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                प्रोफेशनल रिज्यूमे / बायोडाटा (CV) मेकर
              </h2>
              <p className="text-xs text-slate-400">
                अपनी जानकारी भरें, दाईं ओर लाइव प्रीव्यू देखें और सीधे प्रिंट या PDF में सेव करें।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintResume}
                className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>प्रिंट / PDF सेव करें</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Controls */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                1. व्यक्तिगत व संपर्क विवरण दर्ज करें:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">पूरा नाम (Full Name)</label>
                  <input
                    type="text"
                    value={resume.fullName}
                    onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">पद / उद्देश्य (Job Title)</label>
                  <input
                    type="text"
                    value={resume.title}
                    onChange={(e) => setResume({ ...resume, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">मोबाइल नंबर (Phone)</label>
                  <input
                    type="text"
                    value={resume.phone}
                    onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">ईमेल (Email ID)</label>
                  <input
                    type="email"
                    value={resume.email}
                    onChange={(e) => setResume({ ...resume, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">स्थायी पता (Address)</label>
                <input
                  type="text"
                  value={resume.address}
                  onChange={(e) => setResume({ ...resume, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">कैरियर उद्देश्य (Objective / Summary)</label>
                <textarea
                  rows={2}
                  value={resume.objective}
                  onChange={(e) => setResume({ ...resume, objective: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">शैक्षणिक योग्यता (Education Qualifications)</label>
                <textarea
                  rows={3}
                  value={resume.education}
                  onChange={(e) => setResume({ ...resume, education: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">कंप्यूटर एवं मुख्य स्किल्स (Key Skills)</label>
                <textarea
                  rows={2}
                  value={resume.skills}
                  onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">कार्य अनुभव (Work Experience / Projects)</label>
                <textarea
                  rows={2}
                  value={resume.experience}
                  onChange={(e) => setResume({ ...resume, experience: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">भाषा ज्ञान (Languages Known)</label>
                <input
                  type="text"
                  value={resume.languages}
                  onChange={(e) => setResume({ ...resume, languages: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Live Document Preview */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-green-400 uppercase tracking-wider">
                  2. लाइव बायोडाटा प्रीव्यू (Printable Preview):
                </h3>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                  A4 फॉर्मेट तैयार
                </span>
              </div>

              {/* White Paper Mockup */}
              <div
                id="printable-resume-paper"
                className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-200 min-h-[500px] text-xs space-y-4 font-sans select-text"
              >
                {/* Resume Header */}
                <div className="border-b-2 border-slate-900 pb-3 text-center space-y-1">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide uppercase">
                    {resume.fullName || 'आपका नाम'}
                  </h1>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {resume.title || 'पद का नाम'}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {resume.phone} &bull; {resume.email} &bull; {resume.address}
                  </p>
                </div>

                {/* Career Objective */}
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-300 pb-0.5 tracking-wider">
                    कैरियर उद्देश्य / Career Objective
                  </h2>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {resume.objective}
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-300 pb-0.5 tracking-wider">
                    शैक्षणिक योग्यता / Education
                  </h2>
                  <div className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">
                    {resume.education}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-300 pb-0.5 tracking-wider">
                    कंप्यूटर एवं तकनीकी कौशल / Technical Skills
                  </h2>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {resume.skills}
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-300 pb-0.5 tracking-wider">
                    कार्य अनुभव / Work Experience
                  </h2>
                  <div className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">
                    {resume.experience}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-1">
                  <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-300 pb-0.5 tracking-wider">
                    भाषा ज्ञान / Languages
                  </h2>
                  <p className="text-[11px] text-slate-700">
                    {resume.languages}
                  </p>
                </div>

                {/* Declaration */}
                <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between items-end">
                  <div>
                    <p>दिनांक: {new Date().toLocaleDateString('hi-IN')}</p>
                    <p>स्थान: {resume.address.split(',')[0] || 'पटना'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">({resume.fullName})</p>
                    <p>हस्ताक्षर</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={handlePrintResume}
                  className="btn-gold-gradient text-xs px-8 py-3 font-black uppercase tracking-wider flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>यह बायोडाटा अभी प्रिंट / PDF डाउनलोड करें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
