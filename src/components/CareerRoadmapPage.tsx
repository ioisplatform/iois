import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  GraduationCap, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Laptop, 
  Briefcase, 
  ArrowRight, 
  Award, 
  HelpCircle, 
  Clock, 
  IndianRupee, 
  FileText 
} from 'lucide-react';

interface CareerRoadmapPageProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

export const CareerRoadmapPage: React.FC<CareerRoadmapPageProps> = ({ onNavigate, onAskAI }) => {
  // Interactive Career Quiz State
  const [currentEdu, setCurrentEdu] = useState<string>('10th');
  const [interest, setInterest] = useState<string>('gov-job');
  const [timeline, setTimeline] = useState<string>('short-term');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleCalculateCareer = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* 1. Page Header & Warm Welcome */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-green-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>भविष्य मार्गदर्शन पोर्टल &bull; Future Career & Course Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
          10वीं व 12वीं के बाद क्या करें? अपने भविष्य की सही राह चुनें
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          नमस्ते विद्यार्थी एवं अभिभावक! 🙏 अधिकतर छात्र 10वीं या 12वीं के बाद सही जानकारी के अभाव में गलत दिशा चुन लेते हैं। IOIS का यह विशेष मार्गदर्शन पेज आपको ADCA, DCA, सरकारी नौकरी, प्राइवेट जॉब और कंप्यूटर कोर्सेज की पूरी सच्चाई और सही रणनीति समझाता है।
        </p>
      </div>

      {/* 2. Interactive Future Career Quiz */}
      <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              स्मार्ट करियर नेविगेटर: 3 प्रश्नों में अपनी सटीक मंजिल जानें
            </h2>
            <p className="text-xs text-slate-400">
              अपनी वर्तमान स्थिति बताएं, सिस्टम आपको सबसे उपयुक्त कोर्स और प्लान सजेस्ट करेगा
            </p>
          </div>
        </div>

        <form onSubmit={handleCalculateCareer} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Question 1: Current Status */}
          <div className="space-y-2">
            <label className="text-xs font-black text-amber-300 uppercase tracking-wider block">
              1. आपकी वर्तमान योग्यता क्या है?
            </label>
            <select
              value={currentEdu}
              onChange={(e) => setCurrentEdu(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs sm:text-sm font-semibold focus:border-amber-400 focus:outline-none"
            >
              <option value="10th">10वीं कक्षा (पास या पढ़ रहे हैं)</option>
              <option value="12th-arts">12वीं आर्ट्स (Arts)</option>
              <option value="12th-science">12वीं साइंस (PCM / PCB)</option>
              <option value="12th-commerce">12वीं कॉमर्स (Commerce)</option>
              <option value="graduate">ग्रेजुएट / बीए / बीएससी / बीकॉम</option>
              <option value="dropout">पढ़ाई छूट गई / बेसिक नॉलेज चाहिए</option>
            </select>
          </div>

          {/* Question 2: Primary Goal */}
          <div className="space-y-2">
            <label className="text-xs font-black text-amber-300 uppercase tracking-wider block">
              2. आप भविष्य में क्या बनना या करना चाहते हैं?
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs sm:text-sm font-semibold focus:border-amber-400 focus:outline-none"
            >
              <option value="gov-job">सरकारी नौकरी (SSC, Railway, Police, Defense, BPSC)</option>
              <option value="computer-office">कंप्यूटर ऑपरेटर / ऑफिस जॉब / डेटा एंट्री</option>
              <option value="it-tech">सॉफ्टवेयर / वेब डेवलपर / आईटी करियर</option>
              <option value="accounting">एकाउंटिंग / टैली / बैंकिंग / बिजनेस</option>
              <option value="freelance">ऑनलाइन वर्क-फ्रॉम-होम / कंटेंट क्रिएटर / डिजाइनिंग</option>
            </select>
          </div>

          {/* Question 3: Timeframe */}
          <div className="space-y-2">
            <label className="text-xs font-black text-amber-300 uppercase tracking-wider block">
              3. आप कितना समय देना चाहते हैं?
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs sm:text-sm font-semibold focus:border-amber-400 focus:outline-none"
            >
              <option value="short-term">3 से 6 महीने में त्वरित जॉब स्किल (DCA / Tally)</option>
              <option value="medium-term">1 वर्ष का संपूर्ण डिप्लोमा (ADCA / ITI)</option>
              <option value="long-term">3-4 साल की डिग्री (BCA / B.Tech / Graduation)</option>
            </select>
          </div>

          <div className="md:col-span-3 pt-2">
            <button
              type="submit"
              className="btn-gold-gradient text-xs sm:text-sm px-8 py-3.5 font-black uppercase tracking-wider w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>मेरे लिए सर्वश्रेष्ठ करियर व कोर्स रिपोर्ट तैयार करें</span>
            </button>
          </div>
        </form>

        {/* Calculation Result */}
        {hasCalculated && (
          <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-green-500/15 border-2 border-amber-400/50 rounded-2xl p-6 sm:p-8 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>आपकी व्यक्तिगत करियर सिफारिश तैयार है (Personalized Career Report)</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                अनुशंसित कोर्स: {interest === 'computer-office' || currentEdu === '10th' ? 'ADCA (1 वर्ष) + CCC सर्टिफिकेट' : interest === 'accounting' ? 'Tally Prime with GST + DCA' : interest === 'it-tech' ? 'Full-Stack Web Development + Python' : 'ADCA कंप्यूटर डिप्लोमा + सामान्य प्रतियोगी परीक्षा तैयारी'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                आपकी योग्यता ({currentEdu.toUpperCase()}) और लक्ष्य को देखते हुए सबसे पहला कदम यह होना चाहिए कि आप बुनियादी कंप्यूटर और ऑफिस टूल्स में पारंगत हों। सरकारी नौकरियों (जैसे SSC, रेलवे, राज्य पुलिस, सचिवालय) में भी अब कंप्यूटर सर्टिफिकेट (CCC/ADCA) अनिवार्य या वरीयता में रहता है।
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('plans')}
                className="btn-gold-gradient text-xs px-5 py-2 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>IOIS Plan 03 (Career Access ₹99) देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onAskAI(`मेरी योग्यता ${currentEdu} है और मैं ${interest} में करियर बनाना चाहता हूँ। मुझे कौन से कदम उठाने चाहिए?`)}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>IOIS AI से पूरी रणनीति पूछें</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Deep Dive: 10वीं के बाद क्या करें? */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            विस्तृत गाइड &bull; Class 10th Roadmap
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            10वीं के बाद सही विषय और करियर का चुनाव कैसे करें?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            10वीं पास करने के बाद विद्यार्थियों के सामने मुख्यतः 4 रास्ते होते हैं। प्रत्येक रास्ते के फायदे और अवसर नीचे समझें:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Path 1: Science */}
          <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
              1
            </div>
            <h3 className="text-base font-black text-blue-300">साइंस स्ट्रीम (Science)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>PCM (Physics, Chem, Math):</strong> इंजीनियरिंग (IIT/NIT), डिफेंस (NDA), नेवी, मर्चेंट नेवी, आर्किटेक्चर।<br />
              <strong>PCB (Biology):</strong> डॉक्टर (NEET), नर्सिंग, फार्मेसी, लैब टेक्नीशियन।
            </p>
            <div className="text-[11px] text-amber-400 font-bold">मेहनत अधिक, लेकिन अवसर सर्वाधिक।</div>
          </div>

          {/* Path 2: Commerce */}
          <div className="bg-slate-900/90 border border-green-500/30 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center font-black">
              2
            </div>
            <h3 className="text-base font-black text-green-300">कॉमर्स स्ट्रीम (Commerce)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>विषय:</strong> Accounts, Business Studies, Economics, Math।<br />
              <strong>करियर:</strong> CA (चार्टर्ड एकाउंटेंट), CS, बैंकिंग (PO/Clerk), स्टॉक मार्केट, फाइनेंस मैनेजर, B.Com, MBA।
            </p>
            <div className="text-[11px] text-amber-400 font-bold">बिजनेस और बैंकिंग क्षेत्र के लिए सर्वोत्तम।</div>
          </div>

          {/* Path 3: Arts */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              3
            </div>
            <h3 className="text-base font-black text-amber-300">आर्ट्स स्ट्रीम (Arts/Humanities)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>विषय:</strong> History, Pol Science, Geography, Psychology।<br />
              <strong>करियर:</strong> UPSC सिविल सेवा (IAS/IPS), राज्य लोक सेवा (BPSC/UPPSC), वकालत (Law/CLAT), पत्रकारिता, अध्यापन।
            </p>
            <div className="text-[11px] text-amber-400 font-bold">प्रशासनिक व सरकारी सेवा के लिए सबसे अनुकूल।</div>
          </div>

          {/* Path 4: Polytechnic & ITI */}
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
              4
            </div>
            <h3 className="text-base font-black text-purple-300">पॉलिटेक्निक डिप्लोमा एवं ITI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>पॉलिटेक्निक (3 वर्ष):</strong> जूनियर इंजीनियर (JE) रेलवे, पीडब्ल्यूडी, बिजली विभाग में सीधी भर्ती।<br />
              <strong>ITI (1-2 वर्ष):</strong> इलेक्ट्रीशियन, फिटर, वेल्डर, COPA (रेलवे लोको पायलट में भारी मांग)।
            </p>
            <div className="text-[11px] text-amber-400 font-bold">कम बजट में सबसे जल्दी तकनीकी नौकरी।</div>
          </div>
        </div>
      </div>

      {/* 4. Complete Computer Courses Compendium */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-green-400 uppercase tracking-widest bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
            कंप्यूटर कोर्सेज का महाकोष &bull; Computer Courses Directory
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ADCA और अन्य महत्वपूर्ण कंप्यूटर कोर्सेज का पूरा विवरण
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            आज के डिजिटल युग में बिना कंप्यूटर ज्ञान के कोई भी सरकारी या प्राइवेट नौकरी मिलना असंभव है। नीचे सभी लोकप्रिय कोर्सेज की अवधि, सिलेबस और वेतन का विवरण देखें:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Course 1: ADCA */}
          <div className="bg-slate-900/95 border-2 border-amber-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase">
                सर्वाधिक लोकप्रिय (Top Pick)
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> 1 वर्ष (12 माह)
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">ADCA (Advanced Diploma in Computer Applications)</h3>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">योग्यता: 10वीं या 12वीं पास</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">सिलेबस (What you learn):</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>कंप्यूटर फंडामेंटल्स एवं विंडोज OS</li>
                <li>MS Office (Word, Advanced Excel, PowerPoint, Access)</li>
                <li>इंटरनेट, साइबर सुरक्षा, ईमेलिंग, ऑनलाइन फॉर्म भरना</li>
                <li>Tally Prime with GST एकाउंटिंग</li>
                <li>Photoshop एवं बेसिक ग्राफिक डिजाइनिंग</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित सैलरी:</span>
              <span className="text-green-400">₹15,000 - ₹30,000/माह</span>
            </div>
          </div>

          {/* Course 2: DCA */}
          <div className="bg-slate-900/95 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-xl transition">
            <div className="flex items-center justify-between">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs px-3 py-1 rounded-full uppercase">
                शॉर्ट टर्म डिप्लोमा
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> 6 माह
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">DCA (Diploma in Computer Applications)</h3>
              <p className="text-xs text-blue-300 font-semibold mt-0.5">योग्यता: 10वीं पास</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">सिलेबस:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>कंप्यूटर परिचय, हार्डवेयर व सॉफ्टवेयर बेसिक</li>
                <li>MS Office पैकेज (Word, Excel, PPT)</li>
                <li>इंटरनेट सर्फिंग एवं डेटा एंट्री स्किल्स</li>
                <li>हिंदी एवं अंग्रेजी टाइपिंग बेसिक्स</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित सैलरी:</span>
              <span className="text-green-400">₹12,000 - ₹20,000/माह</span>
            </div>
          </div>

          {/* Course 3: Tally Prime + GST */}
          <div className="bg-slate-900/95 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-xl transition">
            <div className="flex items-center justify-between">
              <span className="bg-green-500/20 text-green-300 border border-green-500/30 font-bold text-xs px-3 py-1 rounded-full uppercase">
                एकाउंटिंग स्पेशल
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-green-400" /> 3 से 4 माह
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Tally Prime with GST & e-Way Bill</h3>
              <p className="text-xs text-green-300 font-semibold mt-0.5">योग्यता: 10वीं / 12वीं (कॉमर्स या अन्य)</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">सिलेबस:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>लेजर बनाना, वाउचर एंट्री, इन्वेंट्री मैनेजमेंट</li>
                <li>GST कैलकुलेशन (CGST, SGST, IGST)</li>
                <li>प्रॉफिट & लॉस शीट, बैलेंस शीट तैयार करना</li>
                <li>बैंक रिकॉन्सिलेशन एवं बिलिंग सॉफ्टवेयर</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित सैलरी:</span>
              <span className="text-green-400">₹18,000 - ₹35,000/माह</span>
            </div>
          </div>

          {/* Course 4: Web Development */}
          <div className="bg-slate-900/95 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-xl transition">
            <div className="flex items-center justify-between">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs px-3 py-1 rounded-full uppercase">
                हाई इनकम टेक करियर
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-purple-400" /> 6 से 9 माह
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Full-Stack Web Development</h3>
              <p className="text-xs text-purple-300 font-semibold mt-0.5">योग्यता: 12वीं पास / कोडिंग रुचि</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">सिलेबस:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>HTML5, CSS3, Tailwind CSS, Responsive Design</li>
                <li>JavaScript, React.js, Node.js, Express</li>
                <li>डेटाबेस मैनेजमेंट (MongoDB, SQL, Firebase)</li>
                <li>लाइव वेबसाइट होस्टिंग और फ्रीलांसिंग प्रोजेक्ट्स</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित सैलरी:</span>
              <span className="text-green-400">₹30,000 - ₹80,000+/माह</span>
            </div>
          </div>

          {/* Course 5: Graphic Design & Video Editing */}
          <div className="bg-slate-900/95 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-xl transition">
            <div className="flex items-center justify-between">
              <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold text-xs px-3 py-1 rounded-full uppercase">
                क्रिएटिव एवं फ्रीलांस
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-pink-400" /> 3 से 6 माह
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Graphic Designing & Video Editing</h3>
              <p className="text-xs text-pink-300 font-semibold mt-0.5">योग्यता: 10वीं या 12वीं पास</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">सिलेबस:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Adobe Photoshop, Illustrator, Canva Pro</li>
                <li>Adobe Premiere Pro, After Effects, CapCut</li>
                <li>सोशल मीडिया थंबनेल, पोस्टर, विज्ञापन बनाना</li>
                <li>यूट्यूब व रील्स एडिटिंग, फ्रीलांसिंग क्लाइंट्स</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित सैलरी:</span>
              <span className="text-green-400">₹20,000 - ₹50,000/माह</span>
            </div>
          </div>

          {/* Course 6: CCC (Course on Computer Concepts) */}
          <div className="bg-slate-900/95 border border-slate-700 hover:border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-xl transition">
            <div className="flex items-center justify-between">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs px-3 py-1 rounded-full uppercase">
                सरकारी परीक्षा स्पेशल
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> 3 माह (NIELIT)
              </span>
            </div>
            <div>
              <h3 className="text-lg font-black text-white">CCC (Course on Computer Concepts)</h3>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">योग्यता: कोई भी नागरिक / 10वीं पास</p>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="font-bold text-slate-200">महत्व (Why Essential):</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>RO/ARO, पुलिस क्लर्क, यूपीएसएसएससी, बैंकिंग भर्ती में अनिवार्य</li>
                <li>सरकारी मान्यता प्राप्त राष्ट्रीय सर्टिफिकेट (NIELIT)</li>
                <li>लिब्रे ऑफिस (Writer, Calc, Impress) व ई-गवर्नेंस टूल्स</li>
                <li>डिजिटल वित्तीय सेवाएं (UPI, नेट बैंकिंग, AEPS)</li>
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-black">
              <span className="text-slate-400">संभावित लाभ:</span>
              <span className="text-green-400">सरकारी भर्ती में योग्यता प्रमाण</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Call to Action */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xl">
        <h3 className="text-xl sm:text-3xl font-black text-white">
          अभी भी अपने करियर को लेकर भ्रमित हैं?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          IOIS AI असिस्टेंट और हमारे करियर विशेषज्ञों से सीधे निःशुल्क सलाह लें। हम आपकी रुचि और आर्थिक स्थिति के अनुसार सबसे सही रास्ता चुनने में आपकी मदद करेंगे।
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onAskAI('नमस्ते! मुझे अपने करियर के बारे में मार्गदर्शन चाहिए। कृपया मुझे बताएं कि 10वीं और 12वीं के बाद सही दिशा कैसे चुनें?')}
            className="btn-gold-gradient text-xs sm:text-sm px-6 py-3 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI करियर असिस्टेंट से बात करें</span>
          </button>
          <a
            href="https://wa.me/918877490845?text=Hello%20IOIS%20Team,%20mujhe%20career%20guidance%20chahiye"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white text-xs sm:text-sm font-black px-6 py-3 rounded-full flex items-center gap-2 transition shadow-lg"
          >
            <span>व्हाट्सएप पर एक्सपर्ट सलाह लें</span>
          </a>
        </div>
      </div>
    </div>
  );
};
