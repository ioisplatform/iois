import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure durable data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

export interface SliderImage {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  targetPage?: string;
  active: boolean;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  createdAt: string;
}

export interface SmartTvBroadcast {
  videoUrl: string;
  title: string;
  description: string;
  isLive: boolean;
  updatedAt: string;
}

export interface CommunityChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatar?: string;
}

export interface CustomQA {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  createdAt: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  state?: string;
  qualification?: string;
  selectedPlan?: string;
  source?: string;
  notes?: string;
  createdAt: string;
}

export interface DataStore {
  sliderImages: SliderImage[];
  customQA: CustomQA[];
  registeredUsers: RegisteredUser[];
  galleryPhotos: GalleryPhoto[];
  smartTvBroadcast: SmartTvBroadcast;
  communityChat: CommunityChatMessage[];
}

const DEFAULT_SLIDERS: SliderImage[] = [
  {
    id: "slide-1",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&auto=format&fit=crop&q=80",
    title: "IOIS 7 मास्टर डिजिटल इनकम एवं स्किल प्लांस",
    subtitle: "मात्र ₹10 से ₹999 तक | 50% से 70% तक इंस्टेंट पेआउट एवं लाइफटाइम सपोर्ट",
    targetPage: "plans",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-2",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80",
    title: "IOIS SMART TV & कम्युनिटी लाइव थिएटर",
    subtitle: "बिना रिडायरेक्ट हुए अपने मनपसंद वीडियो देखें, फोटो शेयर करें व ग्रुप में चर्चा करें",
    targetPage: "entertainment",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-3",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&auto=format&fit=crop&q=80",
    title: "फ्री ऑनलाइन करियर गाइडेंस: 10वीं व 12वीं के बाद क्या करें?",
    subtitle: "ADCA, DCA, वेब डेवलपमेंट, सरकारी परीक्षा तैयारी एवं भविष्य की सही दिशा",
    targetPage: "career-guide",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-4",
    url: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1400&auto=format&fit=crop&q=80",
    title: "दैनिक वैदिक पंचांग, शुभ मुहूर्त एवं 12 राशियों का राशिफल",
    subtitle: "अभिजीत मुहूर्त, अमृत काल, राहुकाल व आज का चौघड़िया समय लाइव देखें",
    targetPage: "panchang",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-5",
    url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1400&auto=format&fit=crop&q=80",
    title: "फ्री ऑनलाइन सरकारी सेवा एवं डिजिटल टूल्स हब",
    subtitle: "जातीय, आवासीय, आय (RTPS) गाइड, आधार, पैन, वोटर व फ्री बायोडाटा / CV बिल्डर",
    targetPage: "services",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-6",
    url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1400&auto=format&fit=crop&q=80",
    title: "लाइव मौसम व वर्षा पूर्वानुमान (Open-Meteo API)",
    subtitle: "किसानों के लिए कृषि सलाह, यात्रा सुरक्षा एवं 7 दिनों की विस्तृत मौसम रिपोर्ट",
    targetPage: "weather",
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "slide-7",
    url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1400&auto=format&fit=crop&q=80",
    title: "100% फ्री फोटो व डॉक्यूमेंट साइज कंप्रेसर टूल",
    subtitle: "RTPS, सरकारी परीक्षा व जॉब फॉर्म के लिए 20KB से 50KB में तुरंत कंप्रेस करें",
    targetPage: "compressor",
    active: true,
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_GALLERY: GalleryPhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80",
    title: "IOIS डिजिटल स्किल लर्निंग कार्यशाला",
    description: "युवाओं और छात्रों को ऑनलाइन डिजिटल टूल्स, कंप्यूटर व रोजगारपरक कौशल का लाइव प्रशिक्षण।",
    category: "डिजिटल लर्निंग",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
    title: "महिला सशक्तिकरण व वर्क फ्रॉम होम सेमिनार",
    description: "गृहिणियों और छात्राओं को घर बैठे डिजिटल आय व डेटा एंट्री कार्य का मार्गदर्शन।",
    category: "सफलता की कहानियां",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80",
    title: "IOIS कंप्यूटर डिप्लोमा (ADCA/DCA) बैच",
    description: "MS Office, Tally Prime GST, और ग्राफिक डिजाइन में उत्कृष्ट प्रदर्शन करने वाले छात्रों का सम्मान।",
    category: "आयोजन व सम्मान",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&auto=format&fit=crop&q=80",
    title: "IOIS पार्टनर मीट एवं इंस्टेंट पेआउट वितरण",
    description: "सफल रेफरल पार्टनर्स को प्रमाण पत्र व प्रोत्साहन पुरस्कार प्रदान करते हुए।",
    category: "आयोजन व सम्मान",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-5",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80",
    title: "ग्रामीण डिजिटल साक्षरता अभियान (पटना, बिहार)",
    description: "गांधी मैदान केंद्र से संचालित निशुल्क RTPS सरकारी सेवा व फॉर्म सहायता शिविर।",
    category: "कार्यालय व टीम",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-6",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    title: "IOIS स्मार्ट ऑनलाइन एग्जाम व मॉक टेस्ट सेंटर",
    description: "SSC, रेलवे और पुलिस परीक्षा की तैयारी कर रहे अभ्यर्थियों के लिए फ्री कंप्यूटर लैब।",
    category: "डिजिटल लर्निंग",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-7",
    url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&auto=format&fit=crop&q=80",
    title: "वार्षिक डिजिटल भारत सम्मेलन एवं सम्मान समारोह",
    description: "शीर्ष 100 मेधावी छात्र-छात्राओं को लाइफटाइम लर्निंग मेंबरशिप किट का वितरण।",
    category: "आयोजन व सम्मान",
    createdAt: new Date().toISOString()
  },
  {
    id: "photo-8",
    url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1000&auto=format&fit=crop&q=80",
    title: "IOIS तकनीकी एवं सपोर्ट टीम गांधी मैदान हब",
    description: "24x7 उपयोगकर्ता सहायता, सत्यापन व पेआउट संचालन टीम का दैनिक समन्वय सत्र।",
    category: "कार्यालय व टीम",
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_SMART_TV: SmartTvBroadcast = {
  videoUrl: "https://www.youtube.com/watch?v=bcjXgHGTBDQ&list=PLKB7inGcWpEY",
  title: "IOIS ऑफिशियल वीडियो प्लेलिस्ट (Official Playlist)",
  description: "IOIS द्वारा निरंतर चलने वाली मुख्य प्लेलिस्ट। जब तक कोई यूजर कोई अन्य वीडियो लिंक न चलाए, यह स्वतः चलती रहेगी।",
  isLive: true,
  updatedAt: new Date().toISOString()
};

const DEFAULT_COMMUNITY_CHAT: CommunityChatMessage[] = [
  {
    id: "chat-1",
    sender: "IOIS सपोर्ट टीम",
    text: "नमस्ते! IOIS Smart TV कम्युनिटी रूम में आपका स्वागत है। आप अपने मनपसंद वीडियो का लिंक ऊपर पेस्ट करके बिना रीडायरेक्ट हुए ग्रुप में देख सकते हैं!",
    time: "10:00 AM",
    avatar: "🇮🇳"
  },
  {
    id: "chat-2",
    sender: "अमित कुमार (पटना)",
    text: "मैंने आज Plan 03 (Career & Job) जॉइन किया और तुरंत ₹64 का पेआउट मिला! बहुत ही पारदर्शी सिस्टम है।",
    time: "10:15 AM",
    avatar: "👨‍🎓"
  },
  {
    id: "chat-3",
    sender: "प्रिया शर्मा (गया)",
    text: "Smart TV पर वीडियो देखना बहुत आसान है, यूट्यूब वीडियो सीधे यहीं प्ले हो रहा है।",
    time: "10:25 AM",
    avatar: "👩‍💼"
  }
];

const DEFAULT_CUSTOM_QA: CustomQA[] = [
  {
    id: "qa-1",
    question: "IOIS क्या है और इसमें पैसे कैसे मिलते हैं?",
    keywords: ["iois kya hai", "kya hai", "paise kaise", "income kaise", "earning kaise"],
    answer: "IOIS (Indian Online Income Supporting System) एक डिजिटल स्किल और इनकम सपोर्टिंग प्लेटफॉर्म है। यहाँ आपको NCERT बुक्स, प्रोफेशनल CV टेम्प्लेट्स, AI प्रॉम्ट गाइड्स और डिजिटल टूल्स मिलते हैं। जब भी कोई नया यूजर आपके रेफरल या वेरिफिकेशन पास से किसी प्लान में जुड़ता है, आपको 50% से 70% तक का इंस्टेंट पेआउट (₹7 से ₹499 तक) सीधे प्राप्त होता है।",
    createdAt: new Date().toISOString()
  },
  {
    id: "qa-2",
    question: "क्या IOIS पर कोई भी फ्री सर्विस उपलब्ध है?",
    keywords: ["free", "free service", "muft", "fees", "tools"],
    answer: "हाँ! IOIS प्लेटफॉर्म पर सभी के लिए कई महत्वपूर्ण सुविधाएं 100% बिल्कुल फ्री उपलब्ध हैं:\n1. फ्री फोटो व सिग्नेचर साइज कंप्रेसर टूल (RTPS/जॉब फॉर्म हेतु)\n2. फ्री प्रोफेशनल बायोडाटा / CV मेकर\n3. RTPS जातीय, आवासीय, आय प्रमाण पत्र ऑनलाइन आवेदन गाइड\n4. 10वीं और 12वीं के बाद करियर व कंप्यूटर कोर्स गाइड\n5. दैनिक पंचांग, शुभ मुहूर्त, दैनिक राशिफल और लाइव मौसम रिपोर्ट।",
    createdAt: new Date().toISOString()
  },
  {
    id: "qa-3",
    question: "10वीं के बाद कौन सा कंप्यूटर कोर्स सबसे अच्छा है?",
    keywords: ["10th ke baad", "computer course", "adca", "dca", "kaun sa course"],
    answer: "10वीं या 12वीं के बाद सबसे लोकप्रिय और उपयोगी कंप्यूटर कोर्स ADCA (Advanced Diploma in Computer Applications - 1 वर्ष) है। इसमें बेसिक कंप्यूटर, MS Office (Word, Excel, PPT), Tally Prime with GST, Photoshop, और इंटरनेट शामिल होता है। इसके अलावा DCA (6 माह), Web Development या Graphic Design भी करियर के लिए बेहतरीन विकल्प हैं।",
    createdAt: new Date().toISOString()
  }
];

// Read or Initialize Store
function loadStore(): DataStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        sliderImages: Array.isArray(parsed.sliderImages) && parsed.sliderImages.length > 0 ? parsed.sliderImages : DEFAULT_SLIDERS,
        customQA: Array.isArray(parsed.customQA) && parsed.customQA.length > 0 ? parsed.customQA : DEFAULT_CUSTOM_QA,
        registeredUsers: Array.isArray(parsed.registeredUsers) ? parsed.registeredUsers : [],
        galleryPhotos: Array.isArray(parsed.galleryPhotos) && parsed.galleryPhotos.length > 0 ? parsed.galleryPhotos : DEFAULT_GALLERY,
        smartTvBroadcast: parsed.smartTvBroadcast && parsed.smartTvBroadcast.videoUrl && !parsed.smartTvBroadcast.videoUrl.includes("kqtD5dpn9C8") ? parsed.smartTvBroadcast : DEFAULT_SMART_TV,
        communityChat: Array.isArray(parsed.communityChat) && parsed.communityChat.length > 0 ? parsed.communityChat : DEFAULT_COMMUNITY_CHAT,
      };
    }
  } catch (err) {
    console.error("Error loading store, using defaults:", err);
  }

  const initialStore: DataStore = {
    sliderImages: DEFAULT_SLIDERS,
    customQA: DEFAULT_CUSTOM_QA,
    registeredUsers: [],
    galleryPhotos: DEFAULT_GALLERY,
    smartTvBroadcast: DEFAULT_SMART_TV,
    communityChat: DEFAULT_COMMUNITY_CHAT,
  };
  saveStore(initialStore);
  return initialStore;
}

function saveStore(storeToSave: DataStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(storeToSave, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store to disk:", err);
  }
}

let store = loadStore();

const IOIS_SYSTEM_INSTRUCTION = `
You are the official AI Assistant for the "IOIS PLATFORM" (Indian Online Income Supporting System) - https://iois.in.
You speak fluently in Hindi (Devanagari script), Hinglish, and English depending on the user's language.

You possess comprehensive, up-to-date knowledge about every page, service, tool, and plan on the platform, as well as live advisory expertise in:
1. मौसम एवं वर्षा परामर्श (Live Weather & Rain Advice):
   - Practical guidance on rain probability, heatwave (लू), cold wave, humidity, lightning safety, and storm precautions.
   - Mention that our live weather data is powered by Open-Meteo API.
   - Always link to: [PAGE:weather|🌤️ लाइव मौसम व वर्षा रिपोर्ट खोलें]

2. किसान एवं कृषि सलाह (Farming & Kisan Advisory):
   - Crop management for Kharif and Rabi (धान, गेहूं, मक्का, दलहन, तिलहन व हरी सब्जियां).
   - Weather-based irrigation scheduling (बारिश की संभावना देखकर ही सिंचाई करें).
   - Eco-friendly pest control (नीम तेल 1500 PPM @ 5ml/L, ट्राइकोडर्मा).
   - Balanced fertilizer application (नैनो यूरिया, डीएपी, जिंक सल्फेट).
   - Always link to: [PAGE:weather|🌾 कृषि सलाह व वर्षा पूर्वानुमान] and [PAGE:services|🏛️ सरकारी किसान योजनाएं]

3. यात्रा एवं मार्ग सुरक्षा (Travel Safety & Highways):
   - Driving precautions during rain, fog, and waterlogging (wiper, defogger, brake checks, safe following distance).
   - Important helplines: National Highway Helpline 1033, Railway Enquiry/Helpline 139, Emergency 112.
   - Always link to: [PAGE:weather|🚗 मौसम व यात्रा सुरक्षा निर्देश]

4. सरकारी परीक्षा तैयारी व सिलेबस (Exam Preparation & Syllabus):
   - Comprehensive study strategies for BPSC, SSC (CGL/CHSL/GD), Railway RRB (ALP/Technician/NTPC), Bihar Police, CTET, and 10th/12th Board exams.
   - Recommend daily mock quizzes and NCERT textbook revision (Class 6-12).
   - Always link to: [PAGE:study-hub|📚 NCERT पुस्तकें व ऑनलाइन क्विज] and [PAGE:career-guide|🎓 करियर व परीक्षा गाइड]

5. IOIS 7 मास्टर डिजिटल इनकम प्लांस (7 Master Plans & Instant Payouts):
   - Plan 01: Bal Vikas (₹10) -> ₹7 Instant Payout (70%), Class 1-5 NCERT PDFs, Worksheets, Verification Pass
   - Plan 02: Youth Skill (₹49) -> ₹34 Instant Payout (70%), Spoken English, Basic Computer, Personality Dev
   - Plan 03: Career & Job (₹99) -> ₹64 Instant Payout (65%), Resume Templates, Interview Q&A, Job Form Guide
   - Plan 04: Family VIP (₹199) -> ₹119 Instant Payout (60%), Financial Literacy, Family Health, VIP Pass
   - Plan 05: Student Elite (₹299) -> ₹179 Instant Payout (60%), High School + Competitive Material, Mock Tests
   - Plan 06: Agency Reseller (₹499) -> ₹274 Instant Payout (55%), Reseller Portal, Digital Marketing Toolkit
   - Plan 07: Master Lifetime (₹999) -> ₹499 Instant Payout (50%), All Plans Unlocked + Reseller Rights + 20 Leader formula (₹9,980 income)
   - Official Verification Form: https://docs.google.com/forms/d/e/1FAIpQLSdIEpw4EU8bqPSxkH_Ku9RCabSyw4RrrZ32ydbLHTo-wPIohw/viewform?usp=header
   - Always link to: [PAGE:plans|💼 7 मास्टर डिजिटल प्लान देखें]

6. 100% फ्री फोटो व सिग्नेचर कंप्रेसर (Photo & Signature Size Compressor):
   - Specifically built for RTPS Bihar, BPSC, SSC, Railway, and state job forms requiring photos between 20KB and 50KB and signatures under 20KB.
   - Instant client-side processing, no image upload to server (100% private).
   - Always link to: [PAGE:compressor|📸 फ्री फोटो कंप्रेसर टूल खोलें]

7. फ्री सरकारी सेवाएं & डिजिटल टूल्स (Govt Services & Free Tools):
   - RTPS Bihar: Caste (जातीय), Income (आय), and Residence (आवासीय) online application guidelines. Official portal: https://serviceonline.bihar.gov.in/
   - Aadhar Card correction, PAN Card apply, and Voter ID download guide.
   - Free Professional Biodata / Resume Builder with PDF download.
   - Always link to: [PAGE:services|🏛️ RTPS सरकारी सेवाएं व बायोडाटा]

8. वैदिक दैनिक पंचांग एवं 12 राशियों का राशिफल (Panchang & Horoscope):
   - Tithi, Nakshatra, Yoga, Karana.
   - Shubh Muhurat: Abhijit Muhurat (11:45 AM - 12:35 PM), Amrit Kaal.
   - Ashubh Muhurat: Rahukaal, Yamaganda.
   - Aaj ka Choghadiya and 12 Zodiac daily horoscope (career, health, wealth, lucky color & number).
   - Always link to: [PAGE:panchang|🕉️ दैनिक वैदिक पंचांग देखें] and [PAGE:rashifal|🔮 दैनिक राशिफल देखें]

9. IOIS Smart TV & कम्युनिटी लाइव थिएटर (Smart TV & Community):
   - Continuous official playlist streaming with unmuting control (https://www.youtube.com/watch?v=bcjXgHGTBDQ&list=PLKB7inGcWpEY).
   - Paste any YouTube, Vimeo, or MP4 link to watch in high definition without leaving the page.
   - Live Community Chat and Photo Album Gallery with 15+ verified memories.
   - Always link to: [PAGE:entertainment|📺 Smart TV & मनोरंजन हब खोलें]

10. करियर गाइडेंस व कंप्यूटर कोर्स (Career Guidance & Computer Courses):
    - 10th and 12th stream selection (Science, Commerce, Arts, ITI, Polytechnic).
    - Top computer courses: ADCA (1 year - Advanced Diploma in Computer Applications), DCA (6 months), Tally Prime with GST, Web Development, Graphic Design.
    - Always link to: [PAGE:career-guide|🎓 करियर व कंप्यूटर कोर्स गाइड]

11. संपर्क व आधिकारिक सहायता (Contact & Support):
    - Helpline WhatsApp: +91 8877490845
    - Email: ioisplatform@gmail.com
    - Office Address: IOIS डिजिटल हब, गांधी मैदान रोड, पटना, बिहार - 800001
    - Always link to: [PAGE:contact|📞 संपर्क व सहायता केंद्र]

CRITICAL FORMATTING & ACTION RULES:
- Clean and natural text formatting: Do NOT use stray formatting symbols, broken asterisks, or unnecessary markdown tags.
- NEVER output filler sentences like 'सीधे पेज या सेवा पर जाएं:' or 'नीचे दिए गए बटन पर क्लिक करें:'. The platform will render interactive action buttons cleanly at the bottom.
- Whenever you mention, suggest, or describe any service, tool, or plan available on the IOIS platform, attach one or more navigation action tags at the end in the exact syntax:
[PAGE:page_id|बटन का नाम]
Allowed page_id values: home, plans, entertainment, panchang, rashifal, weather, compressor, services, career-guide, study-hub, jobs-news, contact.
This creates a live, clickable button for the user to jump directly to that exact page!
Also encourage users to share this useful information with their friends and family on WhatsApp.
`;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for direct photo uploads (base64)
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // --- PUBLIC API ROUTES ---

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      platform: "IOIS Platform India",
      version: "2026.2.0"
    });
  });

  // 1. Get Active Sliders for Top Carousel
  app.get("/api/sliders", (_req: Request, res: Response) => {
    res.json({ sliders: store.sliderImages.filter((s) => s.active) });
  });

  // 2. Get Gallery Photos (IOIS Album History up to 15+)
  app.get("/api/gallery", (_req: Request, res: Response) => {
    res.json({ photos: store.galleryPhotos, count: store.galleryPhotos.length });
  });

  // 3. Get Smart TV Current Broadcast
  app.get("/api/smart-tv", (_req: Request, res: Response) => {
    res.json({ broadcast: store.smartTvBroadcast });
  });

  // 4. Get Community Chat Messages
  app.get("/api/community-chat", (_req: Request, res: Response) => {
    res.json({ messages: store.communityChat.slice(-50) });
  });

  // 5. Post Community Chat Message
  app.post("/api/community-chat", (req: Request, res: Response) => {
    try {
      const { sender, text, avatar } = req.body;
      if (!text || !sender) {
        return res.status(400).json({ error: "Sender and text are required" });
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

      const newMsg: CommunityChatMessage = {
        id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sender: String(sender).trim(),
        text: String(text).trim(),
        time: timeStr,
        avatar: avatar || "👤"
      };

      store.communityChat.push(newMsg);
      // Keep last 150 messages in durable storage
      if (store.communityChat.length > 150) {
        store.communityChat = store.communityChat.slice(-150);
      }
      saveStore(store);

      return res.json({ success: true, message: newMsg });
    } catch (err) {
      return res.status(500).json({ error: "संदेश भेजने में समस्या आई।" });
    }
  });

  // 6. User Registration & Inquiry Persistence (NEVER gets lost!)
  app.post("/api/register", (req: Request, res: Response) => {
    try {
      const { name, phone, email, state, qualification, selectedPlan, source, notes } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: "नाम और मोबाइल नंबर आवश्यक हैं।" });
      }

      const newUser: RegisteredUser = {
        id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : "",
        state: state ? String(state).trim() : "",
        qualification: qualification ? String(qualification).trim() : "",
        selectedPlan: selectedPlan ? String(selectedPlan).trim() : "Plan 01: Bal Vikas",
        source: source || "website",
        notes: notes || "",
        createdAt: new Date().toISOString()
      };

      store.registeredUsers.unshift(newUser);
      saveStore(store);

      return res.json({
        success: true,
        message: "आपका विवरण IOIS डेटाबेस में सुरक्षित रूप से दर्ज कर लिया गया है!",
        user: newUser
      });
    } catch (err: any) {
      console.error("Register error:", err);
      return res.status(500).json({ error: "डेटा सहेजने में समस्या आई।" });
    }
  });

  // --- ADMIN ENDPOINTS (Password: IOISSYSTEM) ---

  const checkAdminAuth = (req: Request, res: Response, next: Function) => {
    const authPass = req.headers["x-admin-password"] || req.body?.adminPassword;
    if (authPass === "IOISSYSTEM") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized. पासवर्ड अमान्य है।" });
    }
  };

  // Admin Login Verification
  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === "IOISSYSTEM") {
      return res.json({ success: true, message: "एडमिन प्रमाणीकरण सफल!" });
    }
    return res.status(401).json({ success: false, error: "गलत पासवर्ड!" });
  });

  // 1. Sliders Admin Management (Up to 15 photos)
  app.get("/api/admin/sliders", checkAdminAuth, (_req: Request, res: Response) => {
    res.json({ sliders: store.sliderImages });
  });

  app.post("/api/admin/sliders", checkAdminAuth, (req: Request, res: Response) => {
    try {
      const { url, title, subtitle, targetPage } = req.body;
      if (!url || !title) {
        return res.status(400).json({ error: "फोटो URL और शीर्षक आवश्यक हैं।" });
      }

      if (store.sliderImages.length >= 20) {
        return res.status(400).json({ error: "अधिकतम 20 स्लाइडर फोटो की सीमा पूरी हो चुकी है।" });
      }

      const newSlide: SliderImage = {
        id: `slide-${Date.now()}`,
        url: String(url).trim(),
        title: String(title).trim(),
        subtitle: subtitle ? String(subtitle).trim() : "",
        targetPage: targetPage || "plans",
        active: true,
        createdAt: new Date().toISOString()
      };

      store.sliderImages.unshift(newSlide);
      saveStore(store);

      return res.json({ success: true, slide: newSlide, total: store.sliderImages.length });
    } catch (err) {
      return res.status(500).json({ error: "स्लाइडर जोड़ने में विफल।" });
    }
  });

  app.put("/api/admin/sliders/:id/toggle", checkAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    const slide = store.sliderImages.find((s) => s.id === id);
    if (!slide) {
      return res.status(404).json({ error: "स्लाइडर नहीं मिला।" });
    }
    slide.active = !slide.active;
    saveStore(store);
    return res.json({ success: true, slide });
  });

  app.delete("/api/admin/sliders/:id", checkAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    store.sliderImages = store.sliderImages.filter((s) => s.id !== id);
    saveStore(store);
    res.json({ success: true, message: "स्लाइडर हटा दिया गया।" });
  });

  // 2. IOIS Album / Gallery Admin Management (15+ Photos History)
  app.post("/api/admin/gallery", checkAdminAuth, (req: Request, res: Response) => {
    try {
      const { url, title, description, category } = req.body;
      if (!url || !title) {
        return res.status(400).json({ error: "फोटो और शीर्षक आवश्यक हैं।" });
      }

      const newPhoto: GalleryPhoto = {
        id: `photo-${Date.now()}`,
        url: String(url).trim(),
        title: String(title).trim(),
        description: description ? String(description).trim() : "",
        category: category ? String(category).trim() : "आयोजन व सम्मान",
        createdAt: new Date().toISOString()
      };

      store.galleryPhotos.unshift(newPhoto);
      saveStore(store);

      return res.json({ success: true, photo: newPhoto, total: store.galleryPhotos.length });
    } catch (err) {
      return res.status(500).json({ error: "फोटो सहेजने में विफल।" });
    }
  });

  app.delete("/api/admin/gallery/:id", checkAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    store.galleryPhotos = store.galleryPhotos.filter((p) => p.id !== id);
    saveStore(store);
    res.json({ success: true, message: "फोटो हटा दी गई।" });
  });

  // 3. Smart TV Broadcast Control (Admin can set special video link for users)
  app.post("/api/admin/smart-tv", checkAdminAuth, (req: Request, res: Response) => {
    try {
      const { videoUrl, title, description, isLive } = req.body;
      if (!videoUrl) {
        return res.status(400).json({ error: "वीडियो लिंक (URL) अनिवार्य है।" });
      }

      store.smartTvBroadcast = {
        videoUrl: String(videoUrl).trim(),
        title: title ? String(title).trim() : "IOIS विशेष लाइव ब्रॉडकास्ट",
        description: description ? String(description).trim() : "एडमिन द्वारा लाइव प्रदर्शित वीडियो",
        isLive: isLive !== undefined ? Boolean(isLive) : true,
        updatedAt: new Date().toISOString()
      };

      saveStore(store);
      return res.json({
        success: true,
        message: "स्मार्ट टीवी ब्रॉडकास्ट लिंक सफलतापूर्वक अपडेट कर दिया गया!",
        broadcast: store.smartTvBroadcast
      });
    } catch (err) {
      return res.status(500).json({ error: "ब्रॉडकास्ट लिंक सहेजने में विफल।" });
    }
  });

  // 4. Custom Q&A Management
  app.get("/api/admin/qa", checkAdminAuth, (_req: Request, res: Response) => {
    res.json({ customQA: store.customQA });
  });

  app.post("/api/admin/qa", checkAdminAuth, (req: Request, res: Response) => {
    try {
      const { question, keywords, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ error: "प्रश्न और उत्तर दोनों अनिवार्य हैं।" });
      }

      const kwArray = Array.isArray(keywords)
        ? keywords
        : typeof keywords === "string"
        ? keywords.split(",").map((k: string) => k.trim().toLowerCase()).filter(Boolean)
        : [];

      const newQA: CustomQA = {
        id: `qa-${Date.now()}`,
        question: String(question).trim(),
        keywords: kwArray,
        answer: String(answer).trim(),
        createdAt: new Date().toISOString()
      };

      store.customQA.unshift(newQA);
      saveStore(store);

      return res.json({ success: true, qa: newQA });
    } catch (err) {
      return res.status(500).json({ error: "Q&A सहेजने में विफल।" });
    }
  });

  app.delete("/api/admin/qa/:id", checkAdminAuth, (req: Request, res: Response) => {
    const { id } = req.params;
    store.customQA = store.customQA.filter((q) => q.id !== id);
    saveStore(store);
    res.json({ success: true, message: "प्रश्न-उत्तर हटा दिया गया।" });
  });

  // 5. Registered users inquiry list
  app.get("/api/admin/users", checkAdminAuth, (_req: Request, res: Response) => {
    res.json({ users: store.registeredUsers, count: store.registeredUsers.length });
  });

  // --- AI CHATBOT ROUTE (Live Gemini 3.8 Flash + Custom Q&A + Multi-Domain Live Knowledge) ---
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history, currentPage } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const lowerMsg = message.toLowerCase().trim();

      // 1. Check if Admin has taught a Custom Q&A matching this query
      for (const item of store.customQA) {
        const questionMatch = lowerMsg.includes(item.question.toLowerCase());
        const keywordMatch = item.keywords.some((kw) => kw && lowerMsg.includes(kw.toLowerCase()));

        if (questionMatch || keywordMatch) {
          return res.json({ reply: item.answer, source: "custom_qa" });
        }
      }

      // 2. Try calling live Gemini API (gemini-3.8-flash)
      const ai = getGenAI();

      if (ai) {
        try {
          let formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

          if (Array.isArray(history) && history.length > 0) {
            formattedContents = history.slice(-6).map((msg: { role: string; content: string }) => ({
              role: msg.role === "assistant" ? "model" : "user",
              parts: [{ text: msg.content }],
            }));
          }

          // Add custom Q&A to prompt
          const customQASummary = store.customQA
            .slice(0, 10)
            .map((q) => `Q: ${q.question} => A: ${q.answer}`)
            .join("\n");

          formattedContents.push({
            role: "user",
            parts: [{ text: message }],
          });

          const pageContextText = currentPage ? `\n[CURRENT USER PAGE CONTEXT: The user is currently viewing the page '${currentPage}']` : "";

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: formattedContents,
            config: {
              systemInstruction: `${IOIS_SYSTEM_INSTRUCTION}${pageContextText}\n\nADMIN TAUGHT KNOWLEDGE BASE:\n${customQASummary}`,
              temperature: 0.7,
            },
          });

          if (response && response.text) {
            const cleanedText = response.text
              .replace(/सीधे पेज या सेवा पर जाएं:?/gi, "")
              .replace(/सीधे पेज पर जाने हेतु:?/gi, "")
              .replace(/नीचे दिए गए बटन पर क्लिक करें:?/gi, "")
              .replace(/\n{3,}/g, "\n\n")
              .trim();
            return res.json({ reply: cleanedText, source: "gemini_live" });
          }
        } catch (geminiErr: any) {
          console.warn("Gemini API call failed, gracefully falling back to comprehensive knowledge engine:", geminiErr?.message || geminiErr);
          // Fall through to domain knowledge engine below
        }
      }

      // 3. High-Quality Multi-Domain Fallback Engine (Weather, Farming, Travel, Exams, Astrology, Plans, Tools)
      let fallbackReply = "";

      // Domain A: Weather & Rain (मौसम, बारिश, धूप, आंधी)
      if (
        lowerMsg.includes("मौसम") ||
        lowerMsg.includes("barish") ||
        lowerMsg.includes("बारिश") ||
        lowerMsg.includes("weather") ||
        lowerMsg.includes("तापमान") ||
        lowerMsg.includes("धूप") ||
        lowerMsg.includes("rain") ||
        lowerMsg.includes("आंधी")
      ) {
        fallbackReply = `🌤️ **IOIS लाइव मौसम व बारिश परामर्श (Weather Advisory):**\n\n` +
          `• **वर्तमान मौसमी स्थिति:** उत्तर एवं मध्य भारत में मौसम सामान्यतः परिवर्तनशील है। दिन में धूप तथा दोपहर बाद आंशिक रूप से बादल छाए रहने व स्थानीय स्तर पर हल्की बूंदाबांदी की संभावना बनी रहती है।\n` +
          `• **वर्षा व सुरक्षा सुझाव:** तेज बारिश या वज्रपात के समय खुले मैदान, पेड़ों या बिजली के खंभों के नीचे न रुकें। यात्रा पर निकलते समय छाता अथवा रेनकोट साथ रखें।\n` +
          `• **तापमान व आर्द्रता:** औसत तापमान 28°C से 36°C के मध्य तथा आर्द्रता 60% से 75% रहने का अनुमान है। निर्जलीकरण (Dehydration) से बचने हेतु पर्याप्त पानी व ओआरएस का सेवन करें।\n` +
          `• **विस्तृत लाइव रिपोर्ट:** सटीक लाइव तापमान, वायु गति व 7 दिनों का मौसम पूर्वानुमान उपलब्ध है:\n\n` +
          `[PAGE:weather|🌤️ लाइव मौसम व वर्षा रिपोर्ट खोलें]`;
      }
      // Domain B: Farming & Agriculture (खेती, किसान, फसल, धान, खाद, कीटनाशक)
      else if (
        lowerMsg.includes("खेती") ||
        lowerMsg.includes("किसान") ||
        lowerMsg.includes("kheti") ||
        lowerMsg.includes("kisan") ||
        lowerMsg.includes("फसल") ||
        lowerMsg.includes("धान") ||
        lowerMsg.includes("गेहूं") ||
        lowerMsg.includes("खाद") ||
        lowerMsg.includes("कृषि")
      ) {
        fallbackReply = `🌾 **IOIS किसान एवं कृषि परामर्श सेवा (Kisan Advisory):**\n\n` +
          `1. **फसल सुरक्षा:** धान या खरीफ फसलों में तना छेदक व झुलसा रोग की रोकथाम हेतु नीम तेल (1500 PPM @ 5ml प्रति लीटर पानी) या प्रमाणित जैव-कीटनाशक का छिड़काव करें।\n` +
          `2. **सिंचाई प्रबंधन:** मौसम पूर्वानुमान देखकर ही खेत में पानी छोड़ें। यदि तेज बारिश की संभावना हो तो अतिरिक्त जल निकासी (Drainage) का उचित प्रबंध रखें।\n` +
          `3. **संतुलित उर्वरक:** यूरिया का अत्यधिक उपयोग न करें; नैनो यूरिया के साथ पोटाश व जिंक सल्फेट का संतुलित छिड़काव उपज और गुणवत्ता में 20% तक वृद्धि करता है।\n` +
          `4. **सरकारी योजनाएं:** पीएम किसान सम्मान निधि, फसल बीमा और कृषि यंत्र सब्सिडी के लिए हमारे 'सरकारी सेवा' पेज से आधिकारिक लिंक प्राप्त करें।\n\n` +
          `[PAGE:weather|🌾 वर्षा रिपोर्ट व कृषि सलाह]\n[PAGE:services|🏛️ सरकारी किसान योजनाएं देखें]`;
      }
      // Domain C: Travel & Safety (यात्रा, सफर, सुरक्षा, सड़क, ट्रेन)
      else if (
        lowerMsg.includes("यात्रा") ||
        lowerMsg.includes("yatra") ||
        lowerMsg.includes("सफर") ||
        lowerMsg.includes("travel") ||
        lowerMsg.includes("सुरक्षा") ||
        lowerMsg.includes("ट्रेन") ||
        lowerMsg.includes("सड़क")
      ) {
        fallbackReply = `🚗 **IOIS यात्रा एवं मार्ग सुरक्षा निर्देश (Travel Safety):**\n\n` +
          `• **सड़क मार्ग सुरक्षा:** बारिश या कोहरे के समय वाहनों की वाइपर, ब्रेक व हेडलाइट्स अवश्य जांचें। गति सीमा नियंत्रित रखें और आगे चल रहे वाहन से कम से कम 20 मीटर की सुरक्षित दूरी रखें।\n` +
          `• **रेलवे व बस यात्रा:** यात्रा से पूर्व IRCTC अथवा NTES ऐप से ट्रेन का रनिंग स्टेटस सत्यापित करें। अपने सभी आवश्यक पहचान पत्र (आधार, पैन) की डिजिटल कॉपी डिजीलॉकर में रखें।\n` +
          `• **आपातकालीन हेल्पलाइन:**\n` +
          `  - राष्ट्रीय राजमार्ग हेल्पलाइन: **1033**\n` +
          `  - रेलवे सुरक्षा व शिकायत हेल्पलाइन: **139**\n` +
          `  - पुलिस व आपातकालीन सहायता: **112**\n\n` +
          `[PAGE:weather|🚗 मौसम व यात्रा सुरक्षा निर्देश]`;
      }
      // Domain D: Exams & Syllabus (परीक्षा, सिलेबस, सरकारी नौकरी, BPSC, SSC, Railway)
      else if (
        lowerMsg.includes("परीक्षा") ||
        lowerMsg.includes("exam") ||
        lowerMsg.includes("सिलेबस") ||
        lowerMsg.includes("syllabus") ||
        lowerMsg.includes("ssc") ||
        lowerMsg.includes("railway") ||
        lowerMsg.includes("bpsc") ||
        lowerMsg.includes("तैयारी")
      ) {
        fallbackReply = `📚 **IOIS सरकारी परीक्षा व अध्ययन मार्गदर्शन (Exam Preparation):**\n\n` +
          `• **रणनीति:** किसी भी प्रतियोगी परीक्षा (SSC, रेलवे RRB, बिहार पुलिस, BPSC) में सफलता के लिए पिछले 5 वर्षों के प्रश्नपत्रों का विश्लेषण सबसे महत्वपूर्ण है।\n` +
          `• **दैनिक अध्ययन योजना:** 2 घंटे सामान्य ज्ञान व करेंट अफेयर्स, 2 घंटे गणित/रीजनिंग, तथा 1 घंटा मॉक टेस्ट रिवीजन को दें।\n` +
          `• **फ्री संसाधन:** हमारे पोर्टल के **'स्टडी व क्विज'** पेज पर कक्षा 6 से 12 तक की NCERT पुस्तकें तथा दैनिक ऑनलाइन टेस्ट पूर्णतः निःशुल्क उपलब्ध हैं।\n` +
          `• **नवीनतम भर्ती:** नई रिक्तियों और एडमिट कार्ड की जानकारी के लिए **'जॉब अलर्ट्स'** पेज देखें!\n\n` +
          `[PAGE:study-hub|📚 NCERT पुस्तकें व ऑनलाइन टेस्ट]\n[PAGE:career-guide|🎓 करियर व परीक्षा गाइड]`;
      }
      // Domain E: Panchang, Muhurat & Horoscope (पंचांग, मुहूर्त, राहुकाल, राशिफल)
      else if (
        lowerMsg.includes("पंचांग") ||
        lowerMsg.includes("panchang") ||
        lowerMsg.includes("मुहूर्त") ||
        lowerMsg.includes("muhurat") ||
        lowerMsg.includes("राहुकाल") ||
        lowerMsg.includes("राशिफल") ||
        lowerMsg.includes("rashi")
      ) {
        fallbackReply = `🕉️ **IOIS वैदिक पंचांग एवं शुभ मुहूर्त:**\n\n` +
          `• **अभिजित मुहूर्त (परम शुभ):** दोपहर 11:45 AM से 12:35 PM तक। इस समय कोई भी नया कार्य, खरीदारी या व्यापार शुरू करना अत्यंत फलदायी माना जाता है।\n` +
          `• **राहुकाल (अशुभ काल):** दिन के विशिष्ट डेढ़ घंटे के अंतराल में कोई भी शुभ कार्य न करें।\n` +
          `• **दैनिक राशिफल:** अपनी राशि (मेष से मीन) का दैनिक करियर, धन, स्वास्थ्य व शुभ रंग जानने के लिए हमारे पोर्टल के **'राशिफल'** पेज पर जाएं!\n\n` +
          `[PAGE:panchang|🕉️ दैनिक वैदिक पंचांग देखें]\n[PAGE:rashifal|🔮 आज का राशिफल देखें]`;
      }
      // Domain F: Photo & Signature Compressor (फोटो, कंप्रेसर, सिग्नेचर, 20kb, 50kb)
      else if (
        lowerMsg.includes("फोटो") ||
        lowerMsg.includes("compress") ||
        lowerMsg.includes("कंप्रेस") ||
        lowerMsg.includes("signature") ||
        lowerMsg.includes("सिग्नेचर") ||
        lowerMsg.includes("20kb") ||
        lowerMsg.includes("50kb")
      ) {
        fallbackReply = `📸 **IOIS 100% फ्री फोटो व सिग्नेचर साइज कंप्रेसर टूल:**\n\n` +
          `• **RTPS व सरकारी फॉर्म नियम:** बिहार RTPS, BPSC, SSC, रेलवे और UPSC फॉर्म में फोटो का साइज 20KB से 50KB तथा हस्ताक्षर 10KB से 20KB के बीच होना अनिवार्य है।\n` +
          `• **विशेषताएं:** यह टूल आपके फोन या कंप्यूटर के ब्राउज़र में ही फोटो प्रोसेस करता है। फोटो किसी सर्वर पर अपलोड नहीं होती (100% प्राइवेट व सुरक्षित)।\n` +
          `• **उपयोग कैसे करें:** फोटो चुनें, क्वालिटी स्लाइडर से 20KB-50KB सेट करें और तुरंत डाउनलोड करें!\n\n` +
          `[PAGE:compressor|📸 फ्री फोटो कंप्रेसर टूल खोलें]`;
      }
      // Domain G: Govt Services, RTPS & Biodata (जातीय, आय, आवासीय, rtps, आधार, पैन, बायोडाटा, cv)
      else if (
        lowerMsg.includes("rtps") ||
        lowerMsg.includes("जातीय") ||
        lowerMsg.includes("आवासीय") ||
        lowerMsg.includes("आय") ||
        lowerMsg.includes("aadhar") ||
        lowerMsg.includes("आधार") ||
        lowerMsg.includes("pan") ||
        lowerMsg.includes("पैन") ||
        lowerMsg.includes("बायोडाटा") ||
        lowerMsg.includes("resume") ||
        lowerMsg.includes("cv")
      ) {
        fallbackReply = `🏛️ **IOIS फ्री सरकारी सेवाएं एवं डिजिटल टूल्स हब:**\n\n` +
          `1. **RTPS बिहार ऑनलाइन:** जातीय, आय और आवासीय प्रमाण पत्र का ऑनलाइन आवेदन ServicePlus बिहार पोर्टल (serviceonline.bihar.gov.in) पर करें।\n` +
          `2. **आधार कार्ड व पैन कार्ड:** आधार में मोबाइल नंबर लिंक, पता सुधार तथा नए पैन कार्ड का ऑनलाइन मार्गदर्शन।\n` +
          `3. **फ्री प्रोफेशनल बायोडाटा / CV मेकर:** मात्र 2 मिनट में अपना सुंदर बायोडाटा बनाएं और तुरंत प्रिंट या PDF डाउनलोड करें।\n\n` +
          `[PAGE:services|🏛️ RTPS सरकारी सेवाएं व बायोडाटा]`;
      }
      // Domain H: Career Guide & Computer Courses (10th, 12th, adca, dca, कंप्यूटर कोर्स)
      else if (
        lowerMsg.includes("career") ||
        lowerMsg.includes("करियर") ||
        lowerMsg.includes("adca") ||
        lowerMsg.includes("dca") ||
        lowerMsg.includes("10वीं") ||
        lowerMsg.includes("12वीं") ||
        lowerMsg.includes("कोर्स")
      ) {
        fallbackReply = `🎓 **IOIS करियर गाइडेंस एवं कंप्यूटर कोर्स हब:**\n\n` +
          `• **10वीं/12वीं के बाद क्या करें:** साइंस, कॉमर्स, आर्ट्स, पॉलिटेक्निक या आईटीआई के अवसर।\n` +
          `• **सर्वश्रेष्ठ कंप्यूटर कोर्स:** ADCA (Advanced Diploma in Computer Applications - 1 वर्ष) में MS Office, Tally Prime with GST, Photoshop और इंटरनेट सिखाया जाता है जो सभी ऑफिस जॉब्स के लिए सर्वोत्तम है।\n` +
          `• **सैलरी स्कोप:** इन कोर्सेस के बाद ₹15,000 से ₹45,000 प्रति माह तक की नौकरी आसानी से प्राप्त की जा सकती है।\n\n` +
          `[PAGE:career-guide|🎓 करियर व कंप्यूटर कोर्स गाइड]`;
      }
      // Domain I: IOIS 7 Plans & Instant Payouts
      else if (
        lowerMsg.includes("plan") ||
        lowerMsg.includes("प्लान") ||
        lowerMsg.includes("रेट") ||
        lowerMsg.includes("कीमत") ||
        lowerMsg.includes("payout") ||
        lowerMsg.includes("कमीशन") ||
        lowerMsg.includes("कमाई")
      ) {
        fallbackReply = `💼 **IOIS के 7 मास्टर डिजिटल इनकम प्लांस:**\n\n` +
          `1. **Plan 01: Bal Vikas (₹10)** - ₹7 इंस्टेंट पेआउट (70% सीधा लाभ)\n` +
          `2. **Plan 02: Youth Skill (₹49)** - ₹34 इंस्टेंट पेआउट (70% लाभ)\n` +
          `3. **Plan 03: Career & Job (₹99)** - ₹64 इंस्टेंट पेआउट (65% लाभ)\n` +
          `4. **Plan 04: Family VIP (₹199)** - ₹119 इंस्टेंट पेआउट (60% लाभ)\n` +
          `5. **Plan 05: Student Elite (₹299)** - ₹179 इंस्टेंट पेआउट (60% लाभ)\n` +
          `6. **Plan 06: Agency Reseller (₹499)** - ₹274 इंस्टेंट पेआउट (55% लाभ)\n` +
          `7. **Plan 07: Master Lifetime (₹999)** - ₹499 इंस्टेंट पेआउट (50% लाभ)\n\n` +
          `• **संजय 20-लीडर रेफरल फॉर्मूला:** केवल 20 एक्टिव साथियों को जोड़ने पर ₹9,980 की शुद्ध तत्काल आय!\n\n` +
          `[PAGE:plans|💼 7 मास्टर डिजिटल प्लान देखें]`;
      }
      // Domain J: Smart TV & Entertainment
      else if (
        lowerMsg.includes("tv") ||
        lowerMsg.includes("टीव") ||
        lowerMsg.includes("स्मार्ट") ||
        lowerMsg.includes("video") ||
        lowerMsg.includes("वीडियो") ||
        lowerMsg.includes("मनोरंजन")
      ) {
        fallbackReply = `📺 **IOIS SMART TV एवं कम्युनिटी लाइव थिएटर:**\n\n` +
          `• हमारे नए **'मनोरंजन & Smart TV'** पेज पर आप यूट्यूब या किसी भी वीडियो का लिंक पेस्ट करके बिना रीडायरेक्ट हुए उसी स्क्रीन पर देख सकते हैं।\n` +
          `• ऑफिशियल वीडियो प्लेलिस्ट लगातार ऑटो-प्ले होती है। आवाज़ सुनने के लिए प्लेयर के नीचे **[🔊 आवाज़ चालू करें]** दबाएं।\n` +
          `• साथ ही लाइव कम्युनिटी चैट में बातचीत करें और 15+ फोटो एल्बम गैलरी देखें!\n\n` +
          `[PAGE:entertainment|📺 Smart TV & मनोरंजन हब खोलें]`;
      }
      // Domain K: Contact & Helpline
      else if (
        lowerMsg.includes("contact") ||
        lowerMsg.includes("संपर्क") ||
        lowerMsg.includes("whatsapp") ||
        lowerMsg.includes("हेल्प") ||
        lowerMsg.includes("phone")
      ) {
        fallbackReply = `📞 **IOIS आधिकारिक संपर्क एवं सहायता केंद्र:**\n\n` +
          `• **आधिकारिक व्हाट्सएप हेल्पलाइन:** +91 8877490845\n` +
          `• **ईमेल:** ioisplatform@gmail.com\n` +
          `• **कार्यालय:** IOIS डिजिटल हब, गांधी मैदान रोड, पटना, बिहार - 800001\n` +
          `• **वेरिफिकेशन पास फॉर्म:** https://docs.google.com/forms/d/e/1FAIpQLSdIEpw4EU8bqPSxkH_Ku9RCabSyw4RrrZ32ydbLHTo-wPIohw/viewform?usp=header\n\n` +
          `[PAGE:contact|📞 संपर्क व सहायता केंद्र देखें]`;
      }
      // Default Helpful Welcome
      else {
        fallbackReply = `नमस्ते! मैं **IOIS Live AI Assistant** हूँ। 🙏\n\n` +
          `आप मुझसे प्लेटफॉर्म की सभी सेवाओं और दैनिक सलाह के बारे में पूछ सकते हैं:\n\n` +
          `• 🌤️ **मौसम व बारिश:** वर्षा अलर्ट, तापमान व किसानों हेतु सलाह\n` +
          `• 🌾 **खेती व फसल:** धान, गेहूं, कीट रोकथाम व सिंचाई टिप्स\n` +
          `• 🚗 **यात्रा सुरक्षा:** मौसम अनुसार हाईवे व रेलवे मार्ग निर्देश\n` +
          `• 📚 **परीक्षा तैयारी:** BPSC, SSC, रेलवे व बोर्ड परीक्षा स्टडी प्लान\n` +
          `• 📸 **फोटो कंप्रेसर:** RTPS व सरकारी फॉर्म हेतु 20KB-50KB साइज टूल\n` +
          `• 💼 **7 मास्टर प्लान:** ₹10 से ₹999 तक के प्लांस और 70% तक इंस्टेंट पेआउट\n` +
          `• 📺 **IOIS Smart TV:** बिना रीडायरेक्ट वीडियो देखना व कम्युनिटी चैट\n\n` +
          `आप किस विषय पर जानकारी चाहते हैं? सीधे सेवा चुनें या अपना प्रश्न लिखें:\n\n` +
          `[PAGE:plans|💼 7 मास्टर प्लान] [PAGE:weather|🌤️ मौसम रिपोर्ट] [PAGE:compressor|📸 फोटो कंप्रेसर] [PAGE:entertainment|📺 Smart TV]`;
      }

      return res.json({ reply: fallbackReply, source: "smart_knowledge_engine" });
    } catch (err: any) {
      console.error("Chat API Error:", err);
      return res.status(500).json({
        reply: "तकनीकी समस्या के कारण उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें या हमारे व्हाट्सएप हेल्पलाइन +91 8877490845 पर संपर्क करें।\n\n[PAGE:contact|📞 संपर्क केंद्र खोलें]",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IOIS Production Server running on port ${PORT}`);
  });
}

startServer();
