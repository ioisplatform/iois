import { Plan, AssessmentQuestion } from '../types';

export const OFFICIAL_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdIEpw4EU8bqPSxkH_Ku9RCabSyw4RrrZ32ydbLHTo-wPIohw/viewform?usp=header";
export const OFFICIAL_TELEGRAM_URL = "https://t.me/ioisplatform";
export const OFFICIAL_WHATSAPP_URL = "https://wa.me/918877490845";
export const OFFICIAL_PHONE = "+91 8877490845";
export const OFFICIAL_EMAIL = "ioisplatform@gmail.com";

export const PLANS: Plan[] = [
  {
    id: 1,
    code: "PLAN 01",
    name: "Bal Vikas Access",
    tagline: "Verification Pass & Basic Learning",
    price: 10,
    instantPayout: 7,
    percentage: 70,
    themeColor: "from-orange-500 to-amber-600",
    borderColor: "border-orange-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Class 1-5 NCERT Digital PDFs",
      "Interactive Worksheets & Activity Sheets",
      "Official System Verification Pass",
      "Direct Referral Dashboard Access",
      "₹7 Instant Payout Protocol"
    ],
    description: "शुरुआती स्तर के छात्रों और नए उपयोगकर्ताओं के लिए सबसे किफायती एंट्री पास। यह डिजिटल साक्षरता और बुनियादी अध्ययन सामग्री प्रदान करता है।",
    realWorldScenario: "कोई भी छात्र या अभिभावक मात्र ₹10 से जुड़कर उपयोगी NCERT सामग्री प्राप्त कर सकता है और दूसरों को जोड़कर तुरंत 70% इंसेंटिव पा सकता है।",
    storyTitle: "अमित की शुरुआत",
    storyPerson: "अमित (कॉलेज छात्र, बिहार)",
    storyDescription: "अमित ने सिर्फ ₹10 से शुरुआत की। उसने अपने मोहल्ले के 100 स्कूली बच्चों को डिजिटल नोट्स शेयर किए और ₹700 तुरंत कमाए। आज वह अपने छोटे खर्चे खुद उठा रहा है।",
    recommendedFor: "छात्र, शुरुआती यूजर और छोटे डिजिटल शिक्षार्थी",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 2,
    code: "PLAN 02",
    name: "Youth Skill Access",
    tagline: "Job Tools & AI Prompts",
    price: 49,
    instantPayout: 34,
    percentage: 70,
    themeColor: "from-sky-500 to-cyan-600",
    borderColor: "border-sky-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Pro Resume / CV Templates (ATS Friendly)",
      "Curated AI Prompt Engineering Guide",
      "Job Application Letter Formats",
      "Interview Preparation Checklist",
      "₹34 Instant Payout Protocol"
    ],
    description: "युवाओं और नौकरी की तलाश कर रहे छात्रों के लिए डिजाइन किया गया आधुनिक स्किल पैक, जिसमें प्रोफेशनल बायोडाटा और AI टूल्स शामिल हैं।",
    realWorldScenario: "नौकरी और फ्रीलांसिंग के लिए आवश्यक रिज्यूमे और AI प्रॉम्ट्स सीखें और अन्य युवाओं को शेयर कर प्रति सदस्य ₹34 तुरंत कमाएं।",
    storyTitle: "प्रिया का स्किल नेटवर्क",
    storyPerson: "प्रिया (ग्रेजुएट, इंदौर)",
    storyDescription: "प्रिया ने अपने 10 सहपाठियों को प्रोफेशनल CV बनाने में मदद की। उसने उसी दिन ₹340 तुरंत कमाए और अपनी पहली डिजिटल टीम तैयार की।",
    recommendedFor: "कॉलेज फ्रेशर्स, जॉब सीकर और फ्रीलांसर्स",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 3,
    code: "PLAN 03",
    name: "Career & Job Access",
    tagline: "Academic Mastery & Career Guide",
    price: 99,
    instantPayout: 64,
    percentage: 65,
    themeColor: "from-indigo-500 to-blue-600",
    borderColor: "border-indigo-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Class 6-12 Complete Digital Books & Solutions",
      "Career Roadmap & Stream Selection Guide",
      "Soft Skills & Communication Modules",
      "Government & Private Exam Calendar",
      "₹64 Instant Payout Protocol"
    ],
    description: "मिडिल और हायर सेकेंडरी के छात्रों के लिए पूर्ण शैक्षणिक और करियर मार्गदर्शन गाइड।",
    realWorldScenario: "कक्षा 6 से 12वीं तक की किताबें और स्ट्रीम चुनने के गाइड के साथ अध्ययन करें और दोस्तों को रेफर करके ₹64 तुरंत पाएं।",
    storyTitle: "राहुल का करियर काउंसिलिंग मॉडल",
    storyPerson: "राहुल (शिक्षक, वाराणसी)",
    storyDescription: "राहुल ने 20 ट्यूशन छात्रों को स्टडी मटेरियल और करियर काउंसिलिंग दी। ₹1280 का मुनाफा सीधे उसके बैंक खाते में तुरंत आया।",
    recommendedFor: "स्कूल छात्र (Class 6-12), शिक्षक और करियर आकांक्षी",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 4,
    code: "PLAN 04",
    name: "Family VIP Access",
    tagline: "Safety, Health & Parents Hub",
    price: 199,
    instantPayout: 119,
    percentage: 60,
    themeColor: "from-emerald-500 to-green-600",
    borderColor: "border-emerald-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Parents Digital Parenting & Screen Control Kit",
      "Family Health, Yoga & Daily Routine Guides",
      "Cyber Safety & Financial Fraud Prevention Tool",
      "Smart Household Budget Templates",
      "₹119 Instant Payout Protocol"
    ],
    description: "पारिवारिक डिजिटल सुरक्षा, अभिभावकों के लिए पेरेंटिंग टूल्स और स्वस्थ जीवन शैली का कम्पलीट पैक।",
    realWorldScenario: "परिवार के सदस्यों को ऑनलाइन फ्रॉड से बचाएं, बच्चों के स्क्रीन टाइम को मैनेज करें और अन्य परिवारों को जोड़कर ₹119 प्रति रेफरल पाएं।",
    storyTitle: "श्रीमती शर्मा की फैमिली अवेयरनेस",
    storyPerson: "अनीता शर्मा (गृहणी, जयपुर)",
    storyDescription: "श्रीमती शर्मा ने अपनी सोसाइटी के 5 परिवारों को डिजिटल सुरक्षा और पेरेंटिंग किट के बारे में बताया और ₹595 तुरंत इंसेंटिव कमाया।",
    recommendedFor: "अभिभावक, गृहणियां और परिवार के मुखिया",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 5,
    code: "PLAN 05",
    name: "Student Elite Access",
    tagline: "Competitive Exam Preparation",
    price: 299,
    instantPayout: 179,
    percentage: 60,
    themeColor: "from-purple-500 to-violet-600",
    borderColor: "border-purple-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Competitive Exam Notes (SSC, Railway, Banking, Police)",
      "Daily Current Affairs & Static GK Compendium",
      "Elite Telegram Study Circle & Doubt Clearing",
      "Speed Math & Reasoning Shortcuts",
      "₹179 Instant Payout Protocol"
    ],
    description: "प्रतियोगी परीक्षाओं की तैयारी कर रहे गंभीर अभ्यर्थियों के लिए एक्सक्लूसिव नोट्स और ग्रुप एक्सेस।",
    realWorldScenario: "सरकारी और प्रतियोगी परीक्षाओं के लिए प्रीमियम नोट्स प्राप्त करें और अपने कोचिंग साथियों के साथ शेयर कर प्रति सदस्य ₹179 तुरंत पाएं।",
    storyTitle: "विकास का स्टडी क्लब",
    storyPerson: "विकास (प्रतियोगी छात्र, प्रयागराज)",
    storyDescription: "विकास ने अपने स्टडी ग्रुप के 10 साथियों को नोट्स दिलाए और ₹1,790 कमाए। अब वह अपनी कोचिंग फीस और किताबों का खर्च खुद निकालता है।",
    recommendedFor: "प्रतियोगी छात्र, SSC/Banking/Railway अभ्यर्थी",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 6,
    code: "PLAN 06",
    name: "Agency Reseller Hub",
    tagline: "Digital Business & Automation",
    price: 499,
    instantPayout: 274,
    percentage: 55,
    themeColor: "from-amber-500 to-yellow-600",
    borderColor: "border-yellow-500",
    bgGradient: "bg-slate-900/90",
    resources: [
      "Digital Reselling License & Master Branding Kit",
      "WhatsApp Automation Scripts & Message Templates",
      "High-Converting Landing Page Frameworks",
      "Lead Generation & Social Media Growth Kit",
      "₹274 Instant Payout Protocol"
    ],
    description: "खुद का डिजिटल रीसेलिंग या एजेंसी बिजनेस शुरू करने के लिए संपूर्ण ऑटोमेशन और मार्केटिंग टूल्स।",
    realWorldScenario: "घर बैठे अपनी एजेंसी चलाएं, डिजिटल प्रोडक्ट्स को ऑटोमेशन के साथ रीसेल करें और हर एक्टिवेशन पर ₹274 सीधा पेआउट पाएं।",
    storyTitle: "राज का डिजिटल एजेंसी मॉडल",
    storyPerson: "राज मेहता (डिजिटल मार्केटर, सूरत)",
    storyDescription: "राज ने एजेंसी रीसेलर हब से अपना डिजिटल काम शुरू किया। उसने पहले महीने में 20 से अधिक रीसेलिंग की और ₹5,480 का सीधा मुनाफा हासिल किया।",
    recommendedFor: "डिजिटल मार्केटर, रीसेलर्स और स्टार्टअप्स",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  },
  {
    id: 7,
    code: "PLAN 07",
    name: "Lifetime Master Access",
    tagline: "Complete Platform Ownership & Legacy",
    price: 999,
    instantPayout: 499,
    percentage: 50,
    themeColor: "from-yellow-400 via-amber-500 to-green-500",
    borderColor: "border-amber-400",
    bgGradient: "bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950",
    resources: [
      "All 6 Lower Plans Complete Unlocked Access",
      "Lifetime Free Access to Future Courses & Upgrades",
      "VIP Direct Admin Mentorship & Master Leader Group",
      "Highest Tier ₹499 Instant Payout Protocol (50%)",
      "Master Reseller License & Automated Income Machine"
    ],
    description: "IOIS का सर्वोच्च और सबसे संपूर्ण प्लान। इसमें सभी 6 प्लान्स का अनलॉक्ड एक्सेस, आजीवन मुफ्त अपडेट्स और सबसे बड़ा इंस्टेंट पेआउट (₹499) मिलता है।",
    realWorldScenario: "एक बार निवेश करके आजीवन सभी डिजिटल रिसोर्सेज, कोर्स और अपडेट्स फ्री पाएं। अपने नेटवर्क में किसी को भी मास्टर एक्सेस देकर ₹499 का सीधा इंस्टेंट पेआउट पाएं।",
    storyTitle: "संजय का मास्टर साम्राज्य (The Sanjay Model)",
    storyPerson: "संजय वर्मा (सीनियर कम्युनिटी लीडर, लखनऊ)",
    storyDescription: "संजय ने मास्टर प्लान एक्टिवेट किया। उसने अपने नेटवर्क में मात्र 20 विजनरी साथियों को जोड़ा और तुरंत ₹9,980 कमाए। आज उसका पूरा नेटवर्क ऑटोमेशन पर रन कर रहा है और वह डिजिटल आजादी का आनंद ले रहा है।",
    recommendedFor: "विजनरी लीडर्स, कम्युनिटी बिल्डर्स, पैसिव इनकम आकांक्षी",
    formLink: OFFICIAL_FORM_URL,
    telegramLink: OFFICIAL_TELEGRAM_URL
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "आप अपने दैनिक समय में से डिजिटल स्किल और ऑनलाइन आय के लिए कितना समय दे सकते हैं?",
    subtitle: "समय प्रतिबद्धता का सही आकलन आपकी सीखने की गति तय करेगा।",
    options: [
      { text: "प्रतिदिन 1 से 2 घंटे (शुरुआती स्तर)", score: 10, planHint: 1, insight: "शुरुआती अध्ययन व बुनियादी डिजिटल ज्ञान के लिए पर्याप्त है।" },
      { text: "प्रतिदिन 2 से 4 घंटे (सक्रिय भागीदारी)", score: 20, planHint: 3, insight: "कैरियर और प्रतियोगी परीक्षा स्तर के अध्ययन के लिए आदर्श समय।" },
      { text: "पूर्ण समय / 4+ घंटे (मास्टर विजन)", score: 30, planHint: 7, insight: "एजेंसी और मास्टर लेवल पैसिव इनकम नेटवर्क के लिए सर्वश्रेष्ठ।" }
    ]
  },
  {
    id: 2,
    question: "आपकी वर्तमान मुख्य प्राथमिकता क्या है?",
    subtitle: "आपकी प्राथमिकता के आधार पर सही सामग्री चुनी जाएगी।",
    options: [
      { text: "बुनियादी डिजिटल शिक्षा और अध्ययन सामग्री प्राप्त करना", score: 10, planHint: 1, insight: "NCERT और वर्कशीट्स के साथ ठोस नींव बनाने में मदद करेगा।" },
      { text: "प्रोफेशनल रिज्यूमे बनाना और AI टूल्स सीखना", score: 15, planHint: 2, insight: "जॉब मार्केट में आगे रहने के लिए आधुनिक स्किल्स मिलेंगी।" },
      { text: "प्रतियोगी परीक्षा (SSC, Banking, Railway) की ठोस तैयारी", score: 20, planHint: 5, insight: "एक्सक्लूसिव नोट्स और करंट अफेयर्स आपके काम आएंगे।" },
      { text: "आजीवन पैसिव इनकम और डिजिटल बिजनेस नेटवर्क बनाना", score: 30, planHint: 7, insight: "मास्टर टियर आपके लिए सबसे उपयुक्त और लाभदायक रहेगा।" }
    ]
  },
  {
    id: 3,
    question: "क्या आप अपने परिवार को एक वित्तीय सुरक्षा और अतिरिक्त आय का सहारा देना चाहते हैं?",
    subtitle: "पारिवारिक समृद्धि हर जागरूक नागरिक का लक्ष्य है।",
    options: [
      { text: "हाँ, यह मेरा सबसे बड़ा सपना और लक्ष्य है", score: 25, planHint: 4, insight: "आपकी सोच परिवार केंद्रित और जिम्मेदार है।" },
      { text: "हाँ, मैं पार्ट-टाइम आय से परिवार की मदद करना चाहता हूँ", score: 15, planHint: 2, insight: "अतिरिक्त आय से जीवन की जरूरी जरूरतें पूरी हो सकती हैं।" },
      { text: "अभी मैं सिर्फ खुद की पढ़ाई और स्किल्स पर ध्यान देना चाहता हूँ", score: 10, planHint: 1, insight: "खुद की क्षमता बढ़ाने से भविष्य में बड़े अवसर मिलेंगे।" }
    ]
  },
  {
    id: 4,
    question: "जब कोई व्यक्ति आपके मार्गदर्शन से कोई स्किल या प्लान शुरू करता है, तो आप कैसा पेआउट पसंद करते हैं?",
    subtitle: "सिस्टम की पारदर्शिता और गति का महत्व।",
    options: [
      { text: "तुरंत (Instant Payout) सीधे वॉलेट या खाते में", score: 30, planHint: 7, insight: "IOIS का कोर स्मार्ट पेआउट प्रोटोकॉल तुरंत क्रेडिट सुनिश्चित करता है।" },
      { text: "साप्ताहिक या मासिक हिसाब-किताब के साथ", score: 15, planHint: 3, insight: "पारदर्शी डैशबोर्ड आपको हर ट्रांजैक्शन की पूरी जानकारी देता है।" }
    ]
  },
  {
    id: 5,
    question: "डिजिटल टूल्स और AI (कृत्रिम बुद्धिमत्ता) के उपयोग के प्रति आपका क्या दृष्टिकोण है?",
    subtitle: "भविष्य की तकनीक के साथ कदम मिलाना।",
    options: [
      { text: "मैं AI और आधुनिक ऑटोमेशन का पूरा फायदा उठाना चाहता हूँ", score: 30, planHint: 6, insight: "AI प्रॉम्ट्स और ऑटोमेशन आपको 10 गुना तेजी प्रदान करेंगे।" },
      { text: "मैं धीरे-धीरे सरल तरीकों से इसे सीखना चाहता हूँ", score: 15, planHint: 2, insight: "चरणबद्ध तरीके से सीखना सबसे टिकाऊ होता है।" },
      { text: "मुझे सिर्फ बुनियादी डिजिटल नोट्स की जरूरत है", score: 10, planHint: 1, insight: "शुरुआती सामग्री आपको बिना किसी उलझन के तैयार करेगी।" }
    ]
  },
  {
    id: 6,
    question: "आप अपने डिजिटल सफर की शुरुआत किस स्तर के बजट से करना सबसे सहज मानते हैं?",
    subtitle: "हर बजट के लिए उपयुक्त समाधान उपलब्ध है।",
    options: [
      { text: "₹10 से ₹49 (अत्यंत सरल और बिना किसी जोखिम के)", score: 10, planHint: 1, insight: "हर कोई ₹10 से विश्वास के साथ शुरुआत कर सकता है।" },
      { text: "₹99 से ₹299 (कैरियर, परिवार व प्रतियोगी परीक्षा सामग्री हेतु)", score: 20, planHint: 3, insight: "उचित मूल्य पर उच्च कोटि की शिक्षा व उपयोगी टूल्स।" },
      { text: "₹499 से ₹999 (पूर्ण रीसेलिंग राइट्स और आजीवन मास्टर लाइसेंस)", score: 30, planHint: 7, insight: "एक बार का निवेश जो जीवन भर रिटर्न और अनलॉक्ड एक्सेस देता है।" }
    ]
  },
  {
    id: 7,
    question: "दूसरों की मदद करने और उन्हें उपयोगी डिजिटल सामग्री साझा करने के बारे में आपकी क्या राय है?",
    subtitle: "समुदाय का विकास ही व्यक्तिगत विकास की कुंजी है।",
    options: [
      { text: "दूसरों को आगे बढ़ाने में मदद करना मुझे बहुत पसंद है", score: 25, planHint: 7, insight: "आप एक स्वाभाविक कम्युनिटी लीडर हैं।" },
      { text: "अगर सामग्री वास्तव में मददगार है, तो मैं जरूर शेयर करूँगा", score: 15, planHint: 3, insight: "गुणवत्ता पर आधारित विश्वास सबसे मजबूत होता है।" },
      { text: "पहले मैं खुद इस्तेमाल करके देखूँगा, फिर विचार करूँगा", score: 10, planHint: 1, insight: "समीक्षात्मक दृष्टिकोण आपको सही फैसला लेने में मदद करेगा।" }
    ]
  },
  {
    id: 8,
    question: "डिजिटल सुरक्षा और ऑनलाइन जागरूकता को लेकर आपका क्या विचार है?",
    subtitle: "सुरक्षित इंटरनेट अनुभव सबका अधिकार है।",
    options: [
      { text: "डिजिटल सुरक्षा सबसे महत्वपूर्ण है, इसके बिना आगे नहीं बढ़ा जा सकता", score: 20, planHint: 4, insight: "सुरक्षित प्लेटफॉर्म पर काम करना ही असली सफलता है।" },
      { text: "हाँ, सुरक्षा टूल्स और वैरिफाइड प्लेटफॉर्म ही चुनने चाहिए", score: 15, planHint: 1, insight: "IOIS 256-बिट सुरक्षा और पारदर्शी व्यवस्था प्रदान करता है।" }
    ]
  },
  {
    id: 9,
    question: "क्या आप चाहते हैं कि आपके सभी प्रश्नों का AI तुरंत सही-सही उत्तर दे सके?",
    subtitle: "24x7 तत्काल समाधान प्रणाली।",
    options: [
      { text: "हाँ, मुझे तुरंत और सटीक जानकारी चाहिए", score: 20, planHint: 2, insight: "हमारा लाइव AI असिस्टेंट किसी भी समय आपके सवालों के लिए तैयार है।" },
      { text: "हाँ, सरल हिंदी में स्पष्ट उत्तर मिलना बहुत आसान रहता है", score: 15, planHint: 1, insight: "मातृभाषा में स्पष्ट जानकारी सबसे अधिक प्रभावी होती है।" }
    ]
  },
  {
    id: 10,
    question: "क्या आप आज ही अपना वैरिफाइड पास लेकर इस डिजिटल प्लेटफॉर्म का प्रत्यक्ष अनुभव करना चाहते हैं?",
    subtitle: "सफलता की शुरुआत पहले कदम से होती है।",
    options: [
      { text: "हाँ, मैं पूरी तरह तैयार हूँ और आगे बढ़ना चाहता हूँ", score: 30, planHint: 7, insight: "बधाई! आपका उत्साह और निर्णय लेने की क्षमता प्रशंसनीय है।" },
      { text: "हाँ, मैं शुरुआत करके सिस्टम को लाइव देखना चाहता हूँ", score: 20, planHint: 1, insight: "पहला कदम ही आने वाले बड़े बदलाव की नींव रखता है।" }
    ]
  }
];
