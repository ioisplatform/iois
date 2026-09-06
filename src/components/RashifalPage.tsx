import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Sparkles, 
  Share2, 
  Check, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Award, 
  Heart, 
  Briefcase, 
  DollarSign, 
  Compass, 
  HelpCircle,
  Sun
} from 'lucide-react';

interface RashifalPageProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

interface RashiData {
  id: string;
  nameHi: string;
  nameEn: string;
  symbol: string;
  icon: string;
  lord: string;
  element: string;
  luckyNum: number;
  luckyColor: string;
  luckyDir: string;
  forecast: {
    general: string;
    finance: string;
    career: string;
    family: string;
    health: string;
    remedy: string;
  };
}

const RASHIS: RashiData[] = [
  {
    id: 'aries',
    nameHi: 'मेष राशि',
    nameEn: 'Aries',
    symbol: '♈',
    icon: '🐏',
    lord: 'मंगल (Mars)',
    element: 'अग्नि (Fire)',
    luckyNum: 9,
    luckyColor: 'लाल एवं केसरिया',
    luckyDir: 'पूर्व दिशा (East)',
    forecast: {
      general: 'आज आपका आत्मविश्वास चरम पर रहेगा। रुके हुए सरकारी व व्यक्तिगत कार्यों में गति आएगी। पराक्रम में वृद्धि होगी और वरिष्ठजनों का सहयोग मिलेगा।',
      finance: 'आर्थिक स्थिति मजबूत बनेगी। पुराने निवेश या अटके हुए धन की प्राप्ति संभव है। अनावश्यक खर्चों पर नियंत्रण रखें।',
      career: 'कार्यक्षेत्र में नई जिम्मेदारी मिल सकती है। सहकर्मियों का पूरा साथ मिलेगा। यदि व्यापार में हैं तो नए सौदों से लाभ होगा।',
      family: 'पारिवारिक वातावरण सौहार्दपूर्ण रहेगा। जीवनसाथी के साथ सामंजस्य बढ़ेगा। बच्चों की ओर से शुभ समाचार मिल सकता है।',
      health: 'ऊर्जावान महसूस करेंगे। खानपान में संतुलन बनाए रखें और अधिक भागदौड़ से बचें।',
      remedy: 'हनुमान चालीसा का पाठ करें और तांबे के लोटे से सूर्यदेव को जल अर्पित करें।',
    },
  },
  {
    id: 'taurus',
    nameHi: 'वृषभ राशि',
    nameEn: 'Taurus',
    symbol: '♉',
    icon: '🐂',
    lord: 'शुक्र (Venus)',
    element: 'पृथ्वी (Earth)',
    luckyNum: 6,
    luckyColor: 'सफेद एवं हल्का गुलाबी',
    luckyDir: 'दक्षिण-पूर्व (South-East)',
    forecast: {
      general: 'सुख-सुविधाओं में वृद्धि का योग है। कलात्मक और रचनात्मक कार्यों में आपकी रुचि बढ़ेगी। मित्रों के साथ सुखद समय व्यतीत होगा।',
      finance: 'धन आगमन के नए स्रोत खुलेंगे। भौतिक सुख-साधनों की खरीदारी पर व्यय हो सकता है, जो संतोषप्रद रहेगा।',
      career: 'नौकरीपेशा लोगों को पदोन्नति या प्रशंसा मिल सकती है। साझेदारों के साथ विचार-विमर्श कर नया कदम उठाएं।',
      family: 'घर में शांति का माहौल रहेगा। माता-पिता का आशीर्वाद मिलेगा और पारिवारिक उत्सव की योजना बनेगी।',
      health: 'गले और कफ से संबंधित सावधानी बरतें। नियमित योग व प्राणायाम लाभ देगा।',
      remedy: 'कन्याओं को मिश्री या सफेद मिठाई खिलाएं और माता लक्ष्मी का स्मरण करें।',
    },
  },
  {
    id: 'gemini',
    nameHi: 'मिथुन राशि',
    nameEn: 'Gemini',
    symbol: '♊',
    icon: '👯',
    lord: 'बुध (Mercury)',
    element: 'वायु (Air)',
    luckyNum: 5,
    luckyColor: 'हरा एवं तोतिया',
    luckyDir: 'उत्तर दिशा (North)',
    forecast: {
      general: 'बौद्धिक क्षमता और संवाद कौशल से आप कठिन परिस्थितियों को भी अपने पक्ष में मोड़ लेंगे। आज का दिन सीखने और नेटवर्किंग के लिए श्रेष्ठ है।',
      finance: 'ऑनलाइन कार्य, कमीशन या डिजिटल प्लेटफॉर्म से अप्रत्याशित आर्थिक लाभ हो सकता है।',
      career: 'आईटी, संचार, लेखन और शिक्षण क्षेत्र से जुड़े लोगों के लिए आज का दिन अत्यंत फलदायी है। नए प्रोजेक्ट्स शुरू हो सकते हैं।',
      family: 'भाई-बहनों से मधुर संबंध रहेंगे। किसी पुराने मित्र से फोन पर बातचीत मन को प्रसन्न करेगी।',
      health: 'मानसिक तनाव से बचें। काम के बीच में उचित विश्राम अवश्य लें और पर्याप्त पानी पिएं।',
      remedy: 'गाय को हरा चारा या पालक खिलाएं और श्री गणेश जी को दूर्वा अर्पित करें।',
    },
  },
  {
    id: 'cancer',
    nameHi: 'कर्क राशि',
    nameEn: 'Cancer',
    symbol: '♋',
    icon: '🦀',
    lord: 'चंद्रमा (Moon)',
    element: 'जल (Water)',
    luckyNum: 2,
    luckyColor: 'दूधिया सफेद एवं चांदी',
    luckyDir: 'उत्तर-पश्चिम (North-West)',
    forecast: {
      general: 'भावनाओं में संतुलन बनाए रखने का दिन है। मन में सकारात्मक विचारों का संचार होगा। माता-पिता का विशेष सहयोग प्राप्त होगा।',
      finance: 'जमीन-जायदाद या बचत से संबंधित फैसले लाभप्रद सिद्ध होंगे। अचानक धन लाभ की संभावना है।',
      career: 'कार्यस्थल पर अपनी वाणी में विनम्रता रखें। सहकर्मियों के साथ मिलकर किए गए कार्यों में उत्कृष्ट परिणाम मिलेंगे।',
      family: 'दांपत्य जीवन में मिठास घुलेगी। घर के बुजुर्गों के स्वास्थ्य का ध्यान रखें और उनके साथ समय बिताएं।',
      health: 'मौसम के बदलाव से थोड़ी सुस्ती महसूस हो सकती है। रात्रि में हल्का सुपाच्य भोजन लें।',
      remedy: 'शिवलिंग पर कच्चा दूध और जल चढ़ाएं, "ॐ नमः शिवाय" का 108 बार जप करें।',
    },
  },
  {
    id: 'leo',
    nameHi: 'सिंह राशि',
    nameEn: 'Leo',
    symbol: '♌',
    icon: '🦁',
    lord: 'सूर्य (Sun)',
    element: 'अग्नि (Fire)',
    luckyNum: 1,
    luckyColor: 'सुनहरा, केसरिया एवं पीला',
    luckyDir: 'पूर्व दिशा (East)',
    forecast: {
      general: 'नेतृत्व क्षमता और मान-प्रतिष्ठा में वृद्धि होगी। सामाजिक मंचों पर आपका प्रभाव बढ़ेगा। अटके हुए काम उच्च अधिकारियों की मदद से हल होंगे।',
      finance: 'धन संचय के लिए दिन अनुकूल है। व्यापार में बिक्री बढ़ेगी और मुनाफा अप्रत्याशित रह सकता है।',
      career: 'प्रशासनिक व सरकारी कार्यों में सफलता मिलेगी। अपने निर्णयों पर भरोसा रखें, प्रगति के नए द्वार खुलेंगे।',
      family: 'पिता के साथ वैचारिक तालमेल अच्छा रहेगा। संतान के भविष्य को लेकर कोई सकारात्मक योजना बनेगी।',
      health: 'आँखों और सिरदर्द से थोड़ी परेशानी हो सकती है। स्क्रीन समय कम करें और सुबह धूप लें।',
      remedy: 'आदित्य हृदय स्तोत्र का पाठ करें और गायत्री मंत्र का 24 बार उच्चारण करें।',
    },
  },
  {
    id: 'virgo',
    nameHi: 'कन्या राशि',
    nameEn: 'Virgo',
    symbol: '♍',
    icon: '👧',
    lord: 'बुध (Mercury)',
    element: 'पृथ्वी (Earth)',
    luckyNum: 7,
    luckyColor: 'गहरा हरा एवं नीला',
    luckyDir: 'दक्षिण दिशा (South)',
    forecast: {
      general: 'तर्क और विश्लेषण की शक्ति से हर समस्या का समाधान खोज लेंगे। आज योजनाबद्ध तरीके से काम करना सबसे उत्तम रहेगा।',
      finance: 'खर्चों में संतुलन बनेगा। बैंक या ऋण से संबंधित मामलों में राहत मिल सकती है। अनावश्यक उधारी से बचें।',
      career: 'डेटा, अकाउंट्स और रिसर्च के क्षेत्र में कार्यरत लोगों को विशेष उपलब्धि मिलेगी। वरिष्ठ आपकी बारीकियों की सराहना करेंगे।',
      family: 'पारिवारिक सलाह आपके बहुत काम आएगी। किसी रिश्तेदार के आने से घर में खुशी का माहौल बनेगा।',
      health: 'पाचन तंत्र का विशेष ख्याल रखें। बाहर के तीखे व तले हुए भोजन से परहेज रखें।',
      remedy: 'पक्षियों को दाना डालें और तुलसी के पौधे में शुद्ध जल अर्पित कर दीपक जलाएं।',
    },
  },
  {
    id: 'libra',
    nameHi: 'तुला राशि',
    nameEn: 'Libra',
    symbol: '♎',
    icon: '⚖️',
    lord: 'शुक्र (Venus)',
    element: 'वायु (Air)',
    luckyNum: 6,
    luckyColor: 'क्रीम, सफेद एवं आसमानी',
    luckyDir: 'पश्चिम दिशा (West)',
    forecast: {
      general: 'न्यायप्रियता और संतुलन आपके व्यवहार में दिखेगा। मित्रों और साझेदारों से सहयोग मिलेगा। कोई नई रचनात्मक योजना शुरू कर सकते हैं।',
      finance: 'आय के साधन बढ़ेंगे। व्यापार में नया निवेश करने का मन बन सकता है जो आगे चलकर बड़ा फायदा देगा।',
      career: 'पब्लिक डीलिंग और मार्केटिंग में शानदार सफलता मिलेगी। अपने लक्ष्य के प्रति एकाग्र रहें।',
      family: 'जीवनसाथी के साथ सामंजस्य बढ़ेगा। प्रेम संबंधों में प्रगाढ़ता आएगी और गलतफहमियां दूर होंगी।',
      health: 'पीठ और कमर में खिंचाव हो सकता है। भारी वजन उठाने से बचें और हल्का व्यायाम करें।',
      remedy: 'श्री सूक्त का पाठ करें अथवा छोटी कन्या को सफेद वस्त्र या फल भेंट करें।',
    },
  },
  {
    id: 'scorpio',
    nameHi: 'वृश्चिक राशि',
    nameEn: 'Scorpio',
    symbol: '♏',
    icon: '🦂',
    lord: 'मंगल (Mars)',
    element: 'जल (Water)',
    luckyNum: 8,
    luckyColor: 'लाल, मैरून एवं नारंगी',
    luckyDir: 'उत्तर दिशा (North)',
    forecast: {
      general: 'रहस्यमयी और गुप्त बातों को समझने में आपकी रुचि बढ़ेगी। दृढ़ संकल्प के साथ किए गए कार्य निश्चित सफलता दिलाएंगे।',
      finance: 'गुप्त धन या पैतृक संपत्ति से लाभ की संभावना है। जोखिम भरे निवेश में सावधानी अवश्य बरतें।',
      career: 'प्रतिस्पर्धी आपसे पीछे रहेंगे। नई तकनीक और डिजिटल टूल्स का उपयोग कार्य में भारी तेजी लाएगा।',
      family: 'घर के सदस्यों से खुलकर बातचीत करें। गुस्से और जल्दबाजी पर संयम रखना आज आवश्यक है।',
      health: 'रक्तचाप और मौसमी बुखार से बचाव रखें। नियमित टहलना लाभकारी रहेगा।',
      remedy: 'मंगलवार को सुंदरकांड का पाठ करें या हनुमान जी को सिंदूर व चमेली का तेल चढ़ाएं।',
    },
  },
  {
    id: 'sagittarius',
    nameHi: 'धनु राशि',
    nameEn: 'Sagittarius',
    symbol: '♐',
    icon: '🏹',
    lord: 'बृहस्पति (Jupiter)',
    element: 'अग्नि (Fire)',
    luckyNum: 3,
    luckyColor: 'पीला एवं हल्का नारंगी',
    luckyDir: 'ईशान कोण (North-East)',
    forecast: {
      general: 'धार्मिक और आध्यात्मिक कार्यों में रुचि बढ़ेगी। किसी तीर्थ यात्रा या धार्मिक आयोजन में शामिल होने का योग बन सकता है।',
      finance: 'धन का प्रवाह सुचारु रहेगा। उच्च शिक्षा, कोचिंग या ज्ञानवर्धन में किया गया निवेश भविष्य में अत्यधिक फलदायी होगा।',
      career: 'मार्गदर्शन देने और सलाहकारी भूमिका में आप सबसे आगे रहेंगे। छात्रों को परीक्षा में अनुकूल परिणाम मिलेंगे।',
      family: 'गुरुजनों और बुजुर्गों का आशीर्वाद मिलेगा। संतान पक्ष से गर्व महसूस कराने वाला समाचार प्राप्त होगा।',
      health: 'स्वास्थ्य उत्तम रहेगा। पैरों में हल्का दर्द संभव है, पर्याप्त विश्राम लें।',
      remedy: 'माथे पर केसर अथवा चंदन का तिलक लगाएं और ॐ बृं बृहस्पतये नमः मंत्र का जप करें।',
    },
  },
  {
    id: 'capricorn',
    nameHi: 'मकर राशि',
    nameEn: 'Capricorn',
    symbol: '♑',
    icon: '🐐',
    lord: 'शनि (Saturn)',
    element: 'पृथ्वी (Earth)',
    luckyNum: 4,
    luckyColor: 'नीला, आसमानी एवं स्लेटी',
    luckyDir: 'दक्षिण दिशा (South)',
    forecast: {
      general: 'कर्म और परिश्रम का उचित फल मिलने का समय आ गया है। आपकी निरंतरता ही आपकी सबसे बड़ी ताकत बनेगी।',
      finance: 'दीर्घकालिक वित्तीय योजनाओं पर विचार करें। जमीन, मशीनरी या वाहन संबंधी कार्यों में धन लग सकता है।',
      career: 'कार्यक्षेत्र में आपकी मेहनत को पहचाना जाएगा। नए अनुबंध मिलने के योग हैं। जिम्मेदारियों से न घबराएं।',
      family: 'पारिवारिक उत्तरदायित्वों को पूरा करने में व्यस्त रहेंगे। जीवनसाथी का पूर्ण सहयोग प्राप्त होगा।',
      health: 'जोड़ों के दर्द व हड्डियों की देखभाल करें। सुबह धूप में थोड़ा समय बिताएं।',
      remedy: 'शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं और जरूरतमंद को दान करें।',
    },
  },
  {
    id: 'aquarius',
    nameHi: 'कुंभ राशि',
    nameEn: 'Aquarius',
    symbol: '♒',
    icon: '🏺',
    lord: 'शनि (Saturn)',
    element: 'वायु (Air)',
    luckyNum: 8,
    luckyColor: 'गहरा नीला एवं जामुनी',
    luckyDir: 'पश्चिम दिशा (West)',
    forecast: {
      general: 'नए और अनोखे विचार मन में आएंगे। सामाजिक कल्याण व समाजसेवा के कार्यों से आत्मसंतुष्टि मिलेगी। मित्र मंडली से लाभ होगा।',
      finance: 'आर्थिक स्थिति में सुधार आएगा। डिजिटल माध्यमों या ऑनलाइन प्रोजेक्ट्स से आय में वृद्धि के स्पष्ट संकेत हैं।',
      career: 'टीम वर्क में किए गए काम में भारी सफलता मिलेगी। नए संपर्कों से भविष्य के अवसर सृजित होंगे।',
      family: 'घर में हंसी-खुशी का माहौल रहेगा। मित्रों के साथ कहीं घूमने जाने का कार्यक्रम बन सकता है।',
      health: 'आँखों और नींद का ध्यान रखें। सोने से पहले मोबाइल का अत्यधिक प्रयोग न करें।',
      remedy: 'शनि चालीसा का पाठ करें और काले तिल का दान करें।',
    },
  },
  {
    id: 'pisces',
    nameHi: 'मीन राशि',
    nameEn: 'Pisces',
    symbol: '♓',
    icon: '🐟',
    lord: 'बृहस्पति (Jupiter)',
    element: 'जल (Water)',
    luckyNum: 3,
    luckyColor: 'पीला, सुनहरा एवं बादामी',
    luckyDir: 'उत्तर-पूर्व (North-East)',
    forecast: {
      general: 'अंतर्मन की प्रेरणा से लिए गए निर्णय सही सिद्ध होंगे। किसी पुराने संकट से मुक्ति मिलने के संकेत हैं। मन शांत रहेगा।',
      finance: 'रुके हुए पैसे मिलने से राहत महसूस करेंगे। दान-पुण्य और सेवा कार्यों में धन व्यय करने का मन बनेगा।',
      career: 'कला, शिक्षा, चिकित्सा और परामर्श क्षेत्र से जुड़े लोगों को मान-सम्मान व पुरस्कार मिल सकता है।',
      family: 'पारिवारिक रिश्ते प्रगाढ़ होंगे। किसी दूर के रिश्तेदार से शुभ समाचार की प्राप्ति होगी।',
      health: 'पैरों और तलवों में हल्की थकावट रह सकती है। ध्यान और शांत संगीत सुनें।',
      remedy: 'विष्णु सहस्रनाम का श्रवण या पाठ करें और केले के वृक्ष में जल अर्पित करें।',
    },
  },
];

export const RashifalPage: React.FC<RashifalPageProps> = ({ onNavigate, onAskAI }) => {
  const [selectedRashiId, setSelectedRashiId] = useState<string>('aries');
  const [timeTab, setTimeTab] = useState<'today' | 'tomorrow' | 'weekly'>('today');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedRashi = RASHIS.find((r) => r.id === selectedRashiId) || RASHIS[0];

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${selectedRashi.nameHi} का आज का राशिफल। सामान्य भविष्यफल: ${selectedRashi.forecast.general} आर्थिक स्थिति: ${selectedRashi.forecast.finance} कार्यक्षेत्र: ${selectedRashi.forecast.career} शुभ अंक है ${selectedRashi.luckyNum} और शुभ रंग है ${selectedRashi.luckyColor}। आज का उपाय: ${selectedRashi.forecast.remedy}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    const text = `⭐ IOIS दैनिक राशिफल: ${selectedRashi.nameHi} (${selectedRashi.nameEn})\nशुभ अंक: ${selectedRashi.luckyNum} | शुभ रंग: ${selectedRashi.luckyColor}\nआज का फल: ${selectedRashi.forecast.general}\nआज का उपाय: ${selectedRashi.forecast.remedy}\nपूरा राशिफल पढ़ें: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${selectedRashi.nameHi} राशिफल`, text, url: window.location.href });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Page Title & Navigation Header */}
      <div className="glass-card-premium p-6 sm:p-8 rounded-3xl border-2 border-amber-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>दैनिक ज्योतिष एवं ग्रह गोचर &bull; 12 Rashis</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tiranga-text tracking-tight">
              दैनिक राशिफल एवं ग्रह फल (Daily Horoscope)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              वैदिक ज्योतिष गणना के अनुसार अपनी राशि चुनें और आज का करियर, आर्थिक, स्वास्थ्य, पारिवारिक फल एवं शुभ उपाय जानें।
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('panchang')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>आज का पंचांग देखें</span>
            </button>
            <button
              onClick={() => onNavigate('weather')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-sky-500/40 text-sky-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>लाइव मौसम</span>
            </button>
          </div>
        </div>

        {/* Time Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTimeTab('today')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                timeTab === 'today'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              आज का राशिफल (Today)
            </button>
            <button
              onClick={() => setTimeTab('tomorrow')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                timeTab === 'tomorrow'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              कल का राशिफल (Tomorrow)
            </button>
            <button
              onClick={() => setTimeTab('weekly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                timeTab === 'weekly'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              साप्ताहिक फल (Weekly)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isSpeaking
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isSpeaking ? 'ऑडियो रोकें' : 'राशिफल सुनें'}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-xs font-bold text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'शेयर हुआ!' : 'शेयर करें'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12 Rashi Selection Grid (Visual Zodiac Selector) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          <span>अपनी राशि का चयन करें (Select Your Zodiac Sign):</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {RASHIS.map((rashi) => {
            const isSelected = rashi.id === selectedRashiId;
            return (
              <button
                key={rashi.id}
                onClick={() => setSelectedRashiId(rashi.id)}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer group ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.03]'
                    : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="text-2xl group-hover:scale-110 transition">{rashi.icon}</div>
                <div className="text-xs font-black text-white">{rashi.nameHi}</div>
                <div className="text-[10px] text-slate-400">{rashi.nameEn} &bull; {rashi.symbol}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Rashi Detail View */}
      <div className="glass-card-premium p-6 sm:p-10 rounded-3xl bg-slate-950/90 border-2 border-amber-500/40 shadow-2xl space-y-8">
        {/* Top Info Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-3xl shrink-0">
              {selectedRashi.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedRashi.nameHi}</h2>
                <span className="text-base text-amber-400 font-bold font-mono">({selectedRashi.nameEn})</span>
              </div>
              <p className="text-xs text-slate-400">
                राशि स्वामी: <strong className="text-amber-300">{selectedRashi.lord}</strong> &bull; तत्व: <strong className="text-sky-300">{selectedRashi.element}</strong>
              </p>
            </div>
          </div>

          {/* Quick Numerology / Lucky metrics */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">शुभ अंक</span>
              <span className="font-mono text-sm font-black text-amber-400">{selectedRashi.luckyNum}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">शुभ रंग</span>
              <span className="text-xs font-bold text-white">{selectedRashi.luckyColor}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">शुभ दिशा</span>
              <span className="text-xs font-bold text-emerald-400">{selectedRashi.luckyDir}</span>
            </div>
          </div>
        </div>

        {/* General Summary */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>आज का मुख्य सार व ग्रह गोचर:</span>
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {selectedRashi.forecast.general}
          </p>
        </div>

        {/* 4 Pillars of Life (Finance, Career, Family, Health) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Finance */}
          <div className="glass-card-premium p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>आर्थिक स्थिति व धन लाभ (Finance)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRashi.forecast.finance}
            </p>
          </div>

          {/* 2. Career */}
          <div className="glass-card-premium p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>करियर व व्यापार (Career & Job)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRashi.forecast.career}
            </p>
          </div>

          {/* 3. Family */}
          <div className="glass-card-premium p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 text-xs font-black uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              <span>प्रेम व पारिवारिक जीवन (Family & Love)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRashi.forecast.family}
            </p>
          </div>

          {/* 4. Health */}
          <div className="glass-card-premium p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>स्वास्थ्य व ऊर्जा (Health & Wellness)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedRashi.forecast.health}
            </p>
          </div>
        </div>

        {/* Daily Remedy */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/40 space-y-2">
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>🪔 आज का सिद्ध उपाय व मंत्र (Auspicious Remedy)</span>
          </span>
          <p className="text-xs sm:text-sm text-white font-semibold">
            {selectedRashi.forecast.remedy}
          </p>
        </div>

        {/* AI Astrology Query CTA */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="text-xs font-black text-white">क्या आप अपनी कुंडली या करियर के बारे में पूछना चाहते हैं?</div>
            <div className="text-[11px] text-slate-400">IOIS AI असिस्टेंट से अपनी जन्मतिथि या प्रश्न साझा करें।</div>
          </div>
          <button
            onClick={() => onAskAI(`मेरी राशि ${selectedRashi.nameHi} है। कृपया मुझे करियर और सफलता के लिए मार्गदर्शन दें।`)}
            className="btn-gold-gradient text-xs px-5 py-2 font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI से ज्योतिष मार्गदर्शन लें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
