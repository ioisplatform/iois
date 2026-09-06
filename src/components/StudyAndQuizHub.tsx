import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ExternalLink, 
  Download, 
  Award, 
  Layers, 
  Clock 
} from 'lucide-react';

interface StudyAndQuizHubProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_QUIZ: QuizItem[] = [
  {
    id: 1,
    question: 'कंप्यूटर का जनक (Father of Computer) किसे कहा जाता है?',
    options: ['एलन ट्यूरिंग', 'चार्ल्स बैबेज', 'बिल गेट्स', 'टिम बर्नर्स ली'],
    correctIndex: 1,
    explanation: 'चार्ल्स बैबेज को एनालिटिकल इंजन की खोज के कारण कंप्यूटर का जनक कहा जाता है।',
  },
  {
    id: 2,
    question: 'बिहार के वर्तमान मुख्यमंत्री कौन हैं और बिहार दिवस कब मनाया जाता है?',
    options: ['नीतीश कुमार, 22 मार्च', 'तेजस्वी यादव, 15 अगस्त', 'संजय झा, 26 जनवरी', 'सम्राट चौधरी, 1 मई'],
    correctIndex: 0,
    explanation: 'बिहार दिवस हर वर्ष 22 मार्च को मनाया जाता है, जिस दिन 1912 में बिहार बंगाल से अलग हुआ था।',
  },
  {
    id: 3,
    question: 'MS Excel में कुल कितने कॉलम (Columns) होते हैं?',
    options: ['10,48,576', '16,384', '256', '65,536'],
    correctIndex: 1,
    explanation: 'Excel 2007 और बाद के वर्जनों में 16,384 कॉलम (A से XFD) तथा 10,48,576 पंक्तियाँ (Rows) होती हैं।',
  },
  {
    id: 4,
    question: 'भारत के संविधान के जनक (Chief Architect of Constitution) कौन हैं?',
    options: ['महात्मा गांधी', 'डॉ. भीमराव आंबेडकर', 'डॉ. राजेंद्र प्रसाद', 'पंडित जवाहरलाल नेहरू'],
    correctIndex: 1,
    explanation: 'डॉ. भीमराव आंबेडकर प्रारूप समिति के अध्यक्ष थे और उन्हें भारतीय संविधान का निर्माता कहा जाता है।',
  },
  {
    id: 5,
    question: 'इंटरनेट पर किसी वेबसाइट के पते को तकनीकी रूप से क्या कहा जाता है?',
    options: ['HTTP', 'URL (Uniform Resource Locator)', 'IP Address', 'HTML'],
    correctIndex: 1,
    explanation: 'URL वेब पते की पहचान करता है, जैसे https://serviceonline.bihar.gov.in।',
  },
];

export const StudyAndQuizHub: React.FC<StudyAndQuizHubProps> = ({ onNavigate, onAskAI }) => {
  const [activeTab, setActiveTab] = useState<'gk' | 'quiz' | 'ncert'>('gk');
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  const handleSelectAnswer = (optionIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuizIndex] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < SAMPLE_QUIZ.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswers([null, null, null, null, null]);
    setShowQuizResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    SAMPLE_QUIZ.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 via-amber-500/20 to-blue-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-green-400" />
          <span>विद्यार्थी अध्ययन हब &bull; NCERT Notes, Daily GK & Live Mock Quiz</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
          निःशुल्क अध्ययन सामग्री, सामान्य ज्ञान एवं दैनिक क्विज
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          प्रतियोगी परीक्षाओं (SSC, BPSC, रेलवे, पुलिस) और स्कूली छात्रों (कक्षा 6वीं से 12वीं) के लिए ताजा दैनिक करेंट अफेयर्स, NCERT आधिकारिक पाठ्यपुस्तकें और लाइव ऑनलाइन क्विज टेस्ट।
        </p>
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setActiveTab('gk')}
          className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'gk'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>दैनिक GK व करेंट अफेयर्स</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>लाइव मॉक टेस्ट / क्विज</span>
        </button>

        <button
          onClick={() => setActiveTab('ncert')}
          className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'ncert'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>NCERT डिजिटल लाइब्रेरी (Class 6-12)</span>
        </button>
      </div>

      {/* Tab 1: Daily GK & Current Affairs */}
      {activeTab === 'gk' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>आज का अपडेट &bull; {new Date().toLocaleDateString('hi-IN', { dateStyle: 'full' })}</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                दैनिक करेंट अफेयर्स एवं महत्वपूर्ण सामान्य ज्ञान
              </h2>
            </div>
            <button
              onClick={() => onAskAI('कृपया मुझे आज के ताजा 10 महत्वपूर्ण सामान्य ज्ञान और राष्ट्रीय करेंट अफेयर्स बताएं।')}
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI से और GK पूछें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-black text-amber-300">1. राष्ट्रीय एवं अंतर्राष्ट्रीय घटनाक्रम</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-300 leading-relaxed">
                <li><strong>डिजिटल इंडिया:</strong> भारत में UPI लेनदेन ने विश्व रिकॉर्ड बनाया, 50% से अधिक वैश्विक रियल-टाइम भुगतान भारत में होते हैं।</li>
                <li><strong>इसरो (ISRO):</strong> गगनयान मिशन और आगामी चंद्र अन्वेषण कार्यक्रमों की तीव्र प्रगति।</li>
                <li><strong>G20 & ब्रिक्स:</strong> वैश्विक कूटनीति और आर्थिक विकास में भारत की केंद्रीय भूमिका।</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-black text-green-300">2. बिहार विशेष एवं राज्य सामान्य ज्ञान</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-300 leading-relaxed">
                <li><strong>राजधानी:</strong> पटना (प्राचीन नाम पाटलिपुत्र)।</li>
                <li><strong>प्रमुख नदियां:</strong> गंगा, कोसी, गंडक, सोन, बूढ़ी गंडक।</li>
                <li><strong>ऐतिहासिक स्थल:</strong> नालंदा विश्वविद्यालय (प्राचीन विश्व धरोहर), बोधगया (महाबोधि मंदिर), राजगीर।</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-black text-blue-300">3. कंप्यूटर एवं डिजिटल टेक्नोलॉजी GK</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-300 leading-relaxed">
                <li><strong>RAM vs ROM:</strong> RAM अस्थाई (Volatile) मेमोरी है जबकि ROM स्थाई मेमोरी होती है।</li>
                <li><strong>Shortcut Keys:</strong> Ctrl + C (Copy), Ctrl + V (Paste), Ctrl + Z (Undo), Ctrl + S (Save)।</li>
                <li><strong>Cloud Storage:</strong> इंटरनेट पर डेटा सुरक्षित रखने की तकनीक (उदा. Google Drive, OneDrive)।</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-black text-purple-300">4. सामान्य विज्ञान (General Science)</h3>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-300 leading-relaxed">
                <li><strong>मानव शरीर:</strong> वयस्क मनुष्य में 206 हड्डियां तथा सामान्य रक्तचाप 120/80 mmHg होता है।</li>
                <li><strong>विटामिन:</strong> विटामिन C की कमी से स्कर्वी रोग और विटामिन D धूप से संश्लेषित होता है।</li>
                <li><strong>प्रकाश वर्ष (Light Year):</strong> खगोलीय दूरी मापने की इकाई है, समय की नहीं।</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Mock Quiz */}
      {activeTab === 'quiz' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
          {!showQuizResult ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  प्रश्न {currentQuizIndex + 1} / {SAMPLE_QUIZ.length}
                </span>
                <span className="text-xs text-slate-400">
                  प्रतियोगी परीक्षा अभ्यास टेस्ट
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                  {SAMPLE_QUIZ[currentQuizIndex].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SAMPLE_QUIZ[currentQuizIndex].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuizIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(optIdx)}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-bold transition cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-400 shadow-lg'
                            : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <span className="inline-block w-6 font-black">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  {selectedAnswers[currentQuizIndex] !== null ? 'उत्तर चयनित' : 'कृपया एक विकल्प चुनें'}
                </span>
                <button
                  onClick={handleNextQuiz}
                  disabled={selectedAnswers[currentQuizIndex] === null}
                  className={`btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider cursor-pointer ${
                    selectedAnswers[currentQuizIndex] === null ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                >
                  <span>{currentQuizIndex === SAMPLE_QUIZ.length - 1 ? 'रिजल्ट देखें' : 'अगला प्रश्न'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  क्विज संपन्न! आपका स्कोर: <span className="text-amber-400">{calculateScore()} / {SAMPLE_QUIZ.length}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {calculateScore() >= 4
                    ? 'शानदार प्रदर्शन! आपका सामान्य ज्ञान एवं कंप्यूटर ज्ञान बहुत अच्छा है।'
                    : 'अच्छा प्रयास! नियमित अध्ययन से आप और बेहतर अंक ला सकते हैं।'}
                </p>
              </div>

              {/* Explanations Review */}
              <div className="text-left space-y-3 max-w-2xl mx-auto pt-4">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  उत्तर एवं व्याख्या (Review Answers):
                </h4>
                {SAMPLE_QUIZ.map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      {selectedAnswers[idx] === item.correctIndex ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span className="font-bold text-white">{item.question}</span>
                    </div>
                    <p className="text-green-400 font-semibold pl-6">
                      सही उत्तर: {item.options[item.correctIndex]}
                    </p>
                    <p className="text-slate-400 text-[11px] pl-6">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-black px-6 py-2.5 rounded-full border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>पुनः क्विज दें</span>
                </button>
                <button
                  onClick={() => onNavigate('plans')}
                  className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider cursor-pointer"
                >
                  <span>Student Elite Plan (₹299) देखें</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: NCERT Digital Library */}
      {activeTab === 'ncert' && (
        <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-0.5 rounded-full mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ePathshala एवं आधिकारिक NCERT पोर्टल लिंक्स</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                NCERT पाठ्यपुस्तकें एवं समाधान (Class 6 to 12)
              </h2>
            </div>
            <a
              href="https://ncert.nic.in/textbook.php"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-gradient text-xs px-5 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <span>ऑफिशियल NCERT पोर्टल</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-base font-black text-amber-300">कक्षा 6 से 8 (माध्यमिक आधार)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                गणित, विज्ञान, सामाजिक विज्ञान (इतिहास, भूगोल, नागरिक शास्त्र) की मूल अवधारणाएं।
              </p>
              <a
                href="https://ncert.nic.in/textbook.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 font-bold flex items-center gap-1 hover:underline"
              >
                <span>डाउनलोड ई-बुक्स</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-base font-black text-blue-300">कक्षा 9 व 10 (मैट्रिक बोर्ड)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                बोर्ड परीक्षा और प्रतियोगी परीक्षाओं (NDA, NTSE) के लिए आवश्यक विज्ञान एवं गणित की मानक पुस्तकें।
              </p>
              <a
                href="https://ncert.nic.in/textbook.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 font-bold flex items-center gap-1 hover:underline"
              >
                <span>डाउनलोड ई-बुक्स</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-base font-black text-green-300">कक्षा 11 व 12 (इंटरमीडिएट / NEET / JEE)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                भौतिकी, रसायन, जीव विज्ञान, इतिहास और अर्थशास्त्र की संपूर्ण राष्ट्रीय पाठ्यपुस्तकें।
              </p>
              <a
                href="https://ncert.nic.in/textbook.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-400 font-bold flex items-center gap-1 hover:underline"
              >
                <span>डाउनलोड ई-बुक्स</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
