import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface PolicyPagesProps {
  type: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact';
  onNavigate: (page: PageId) => void;
}

export const PolicyPages: React.FC<PolicyPagesProps> = ({ type, onNavigate }) => {
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
          source: 'Contact Page Inquiry',
          notes: contactMessage,
        }),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setContactName('');
        setContactPhone('');
        setContactEmail('');
        setContactMessage('');
      }
    } catch (err) {
      console.error('Contact submit error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
      {/* 1. ABOUT US PAGE */}
      {type === 'about' && (
        <div className="glass-card-premium p-6 sm:p-12 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>संस्था परिचय &bull; About IOIS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tiranga-text">
              IOIS (Indian Online Income Supporting System) के बारे में
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              भारत के युवाओं, छात्रों एवं परिवारों को डिजिटल कौशल एवं आत्मनिर्भरता प्रदान करने का अग्रणी मिशन।
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-amber-300">1. हमारा परिचय (Who We Are)</h2>
              <p>
                IOIS एक अग्रणी डिजिटल सशक्तिकरण एवं शैक्षणिक सहायता मंच है। हम भारत के ग्रामीण एवं शहरी क्षेत्रों के युवाओं को आधुनिक कंप्यूटर साक्षरता, सरकारी सेवाओं की आसान जानकारी, करियर मार्गदर्शन और निष्पक्ष डिजिटल अर्निंग मॉडल्स से जोड़ते हैं।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-amber-300">2. हमारा मिशन (Our Mission)</h2>
              <p>
                हमारा उद्देश्य प्रत्येक परिवार तक डिजिटल साक्षरता पहुंचाना है। 10वीं और 12वीं के बाद सही मार्गदर्शन के अभाव में भटकने वाले युवाओं को तकनीकी कोर्सेज (जैसे ADCA, DCA, Tally Prime, Web Development) की वास्तविक समझ प्रदान करना तथा उन्हें स्वावलंबी बनाना हमारा मुख्य लक्ष्य है।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-amber-300">3. 7 मास्टर प्लांस एवं पारदर्शिता</h2>
              <p>
                IOIS का सिस्टम 100% पारदर्शी और निष्पक्ष है। हमारे सभी 7 मास्टर प्लांस (मात्र ₹10 से ₹999 तक) में वास्तविक डिजिटल टूल्स, ई-बुक्स और रेफरल इंसेंटिव शामिल हैं, जिनका पेआउट उपयोगकर्ताओं को तुरंत प्राप्त होता है।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-amber-300">4. मुख्य सेवाएं (Our Key Services)</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li>RTPS बिहार एवं राष्ट्रीय ई-गवर्नेंस सेवाओं की स्टेप-बाय-स्टेप गाइड</li>
                <li>100% निःशुल्क ऑनलाइन फोटो व सिग्नेचर कंप्रेसर टूल (50KB & 20KB)</li>
                <li>प्रोफेशनल बायोडाटा (CV / Resume) मेकर विथ लाइव प्रिंटर</li>
                <li>NCERT कक्षा 6 से 12 तक निःशुल्क डिजिटल बुक्स एवं दैनिक करेंट अफेयर्स</li>
                <li>24/7 समर्पित AI चैटबॉट एवं व्हाट्सएप सपोर्ट टीम</li>
              </ul>
            </section>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('plans')}
              className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider cursor-pointer"
            >
              7 मास्टर प्लान देखें
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full border border-slate-700 cursor-pointer"
            >
              हमसे संपर्क करें
            </button>
          </div>
        </div>
      )}

      {/* 2. PRIVACY POLICY PAGE */}
      {type === 'privacy' && (
        <div className="glass-card-premium p-6 sm:p-12 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>गोपनीयता नीति &bull; Privacy Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p className="text-xs text-slate-400">
              अंतिम अद्यतन (Last Updated): {new Date().toLocaleDateString('hi-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">1. प्रस्तावना (Introduction)</h2>
              <p>
                IOIS (Indian Online Income Supporting System) पर हम अपने आगंतुकों एवं उपयोगकर्ताओं की गोपनीयता का पूर्ण सम्मान करते हैं। यह दस्तावेज़ बताता है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं, तो हम किस प्रकार की जानकारी एकत्र करते हैं और उसका कैसे उपयोग करते हैं।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">2. एकत्रित की जाने वाली जानकारी</h2>
              <p>
                जब आप हमारे प्लेटफॉर्म पर पंजीकरण करते हैं, संपर्क फॉर्म भरते हैं या हमारे करियर टूल्स का उपयोग करते हैं, तो हम आपका नाम, मोबाइल नंबर, ईमेल और राज्य की जानकारी एकत्र कर सकते हैं। हम कोई भी संवेदनशील बैंकिंग पासवर्ड या क्रेडिट/डेबिट कार्ड पिन कभी नहीं मांगते।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">3. Google AdSense एवं कुकीज (Cookies Policy)</h2>
              <p>
                हमारी वेबसाइट पर Google AdSense या अन्य थर्ड-पार्टी विज्ञापन भागीदारों द्वारा विज्ञापन दिखाए जा सकते हैं। Google अपने उपयोगकर्ताओं को उनकी पिछली ब्राउज़िंग के आधार पर प्रासंगिक विज्ञापन दिखाने के लिए DART कुकीज का उपयोग कर सकता है। आप चाहें तो Google Ad Settings पर जाकर व्यक्तिगत विज्ञापनों को ऑप्ट-आउट कर सकते हैं।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">4. लॉग फाइल्स (Log Files)</h2>
              <p>
                मानक वेब सर्वर प्रक्रियाओं के अनुसार, IOIS लॉग फ़ाइलों का उपयोग करता है। इनमें इंटरनेट प्रोटोकॉल (IP) पते, ब्राउज़र का प्रकार, इंटरनेट सेवा प्रदाता (ISP), दिनांक/समय स्टैम्प और रेफ़रिंग/एग्ज़िट पेज शामिल हैं। यह जानकारी किसी भी व्यक्तिगत रूप से पहचान योग्य जानकारी से लिंक नहीं होती है।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">5. बच्चों की गोपनीयता (Children's Information)</h2>
              <p>
                हम 13 वर्ष से कम आयु के बच्चों से जानबूझकर कोई भी व्यक्तिगत पहचान योग्य जानकारी एकत्र नहीं करते हैं। यदि किसी माता-पिता को लगता है कि उनके बच्चे ने ऐसी जानकारी दी है, तो कृपया तुरंत हमसे संपर्क करें, हम उसे रिकॉर्ड से तुरंत हटा देंगे।
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 3. TERMS & CONDITIONS PAGE */}
      {type === 'terms' && (
        <div className="glass-card-premium p-6 sm:p-12 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>नियम एवं शर्तें &bull; Terms & Conditions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              उपयोग के नियम एवं शर्तें (Terms of Service)
            </h1>
            <p className="text-xs text-slate-400">
              IOIS सेवाओं का उपयोग करने से पूर्व कृपया इन शर्तों को ध्यानपूर्वक पढ़ें।
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">1. नियमों की स्वीकृति</h2>
              <p>
                इस वेबसाइट का उपयोग करके आप इन नियमों और शर्तों का पूर्ण पालन करने के लिए बाध्य हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया सेवाओं का उपयोग न करें।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">2. शैक्षणिक एवं सूचनात्मक उद्देश्य</h2>
              <p>
                IOIS प्लेटफॉर्म पर उपलब्ध कराई गई सभी सामग्री, टूल्स, और करियर सुझाव केवल शैक्षणिक और सूचनात्मक मार्गदर्शन के लिए हैं। अंतिम परीक्षा परिणाम, सरकारी भर्ती चयन या कॉलेज प्रवेश संबंधित संस्थाओं के नियमों पर निर्भर करता है।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">3. प्लान्स एवं इंसेंटिव नियम</h2>
              <p>
                IOIS के डिजिटल प्लान्स में प्रदान किए गए रिसोर्सेज और रेफरल इंसेंटिव सिस्टम के नियम समय-समय पर अपडेट किए जा सकते हैं। किसी भी अनुचित गतिविधि, फेक रेफरल या सिस्टम से छेड़छाड़ पाए जाने पर खाता तत्काल निलंबित किया जा सकता है।
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-black text-amber-300">4. बौद्धिक संपदा अधिकार</h2>
              <p>
                वेबसाइट पर मौजूद सामग्री, टेक्स्ट, लोगो एवं टूल्स IOIS की बौद्धिक संपदा हैं। बिना पूर्व लिखित अनुमति के व्यावसायिक नकल पूर्णतः वर्जित है।
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 4. DISCLAIMER PAGE */}
      {type === 'disclaimer' && (
        <div className="glass-card-premium p-6 sm:p-12 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>अस्वीकरण &bull; Official Disclaimer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              अस्वीकरण सूचना (Disclaimer)
            </h1>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-2">
              <h2 className="text-base font-black text-amber-300">
                महत्वपूर्ण सूचना: गैर-सरकारी संस्था (Non-Governmental Entity)
              </h2>
              <p>
                <strong>IOIS (Indian Online Income Supporting System) एक स्वतंत्र, निजी शैक्षणिक एवं डिजिटल सुविधा प्लेटफॉर्म है। इसका केंद्र सरकार, बिहार सरकार या किसी भी राज्य सरकार अथवा सरकारी विभाग से कोई प्रत्यक्ष या अप्रत्यक्ष आधिकारिक संबंध नहीं है।</strong>
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="text-base font-black text-white">1. सरकारी फॉर्म एवं सेवाओं संबंधी स्पष्टीकरण</h3>
              <p>
                वेबसाइट पर RTPS बिहार (जातीय, आवासीय, आय), आधार कार्ड (UIDAI), पैन कार्ड (NSDL/UTI) एवं वोटर आईडी (ECI) के जो लिंक व विवरण दिए गए हैं, वे केवल आम नागरिकों एवं छात्रों की सुविधा हेतु सार्वजनिक रूप से उपलब्ध आधिकारिक वेबसाइटों के मार्गदर्शन हैं। उपयोगकर्ता अंतिम आवेदन संबंधित आधिकारिक सरकारी पोर्टल (उदा. serviceonline.bihar.gov.in) पर ही करते हैं।
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-black text-white">2. आय एवं रेफरल संबंधी अस्वीकरण</h3>
              <p>
                प्लेटफॉर्म पर उल्लिखित डिजिटल इंसेंटिव एवं पेआउट उपयोगकर्ता की व्यक्तिगत मेहनत, नेटवर्क और सिस्टम को सीखने पर आधारित हैं। हम किसी भी निश्चित या बिना काम किए रिटर्न का वादा नहीं करते।
              </p>
            </section>
          </div>
        </div>
      )}

      {/* 5. CONTACT US PAGE */}
      {type === 'contact' && (
        <div className="glass-card-premium p-6 sm:p-12 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-green-500/20 text-amber-300 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>संपर्क केंद्र &bull; Get in Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tiranga-text">
              IOIS टीम से संपर्क करें
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              किसी भी प्रश्न, तकनीकी सहायता या सुझाव के लिए हम सदैव आपकी सेवा में उपस्थित हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h2 className="text-base font-black text-amber-300 uppercase tracking-wider">
                  आधिकारिक संपर्क सूत्र
                </h2>

                <div className="flex items-start gap-3 text-xs">
                  <Phone className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-400 block">हेल्पलाइन नंबर:</span>
                    <a href="tel:+918877490845" className="text-white font-bold hover:text-amber-400">
                      +91 8877490845
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-400 block">आधिकारिक ईमेल:</span>
                    <a href="mailto:ioisplatform@gmail.com" className="text-white font-bold hover:text-amber-400">
                      ioisplatform@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-400 block">प्रधान कार्यालय पता:</span>
                    <p className="text-slate-300">
                      IOIS डिजिटल हब, गांधी मैदान रोड, पटना, बिहार - 800001 (भारत)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-5 space-y-2">
                <h3 className="text-xs font-black text-green-400 uppercase tracking-wider">
                  व्हाट्सएप सपोर्ट:
                </h3>
                <p className="text-xs text-slate-300">
                  सीधे व्हाट्सएप पर हमारी सपोर्ट टीम से चैट करें और त्वरित समाधान पाएं:
                </p>
                <a
                  href="https://wa.me/918877490845?text=Hello%20IOIS%20Support,%20mujhe%20sahayata%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider inline-flex items-center gap-2 mt-2"
                >
                  <span>व्हाट्सएप पर संदेश भेजें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-black text-white">संदेश भेजें (Quick Inquiry)</h2>

              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3 text-xs text-green-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>धन्यवाद! आपका संदेश प्राप्त हो गया है। हम जल्द आपसे संपर्क करेंगे।</span>
                </div>
              )}

              <form onSubmit={handleSubmitContact} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">आपका नाम *</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="अपना पूरा नाम दर्ज करें"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">मोबाइल नंबर *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">ईमेल पता (वैकल्पिक)</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">आपका संदेश / प्रश्न *</label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="आप किस सेवा या प्लान के बारे में जानना चाहते हैं?"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-gradient text-xs px-6 py-3 font-black uppercase tracking-wider w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'भेजा जा रहा है...' : 'संदेश सबमिट करें'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
