import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PageId } from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  Bot, 
  User, 
  ExternalLink,
  Minimize2,
  Maximize2,
  Share2,
  Copy,
  Check,
  Navigation,
  Compass,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  currentPage?: PageId;
  onNavigate?: (page: PageId) => void;
}

interface PageAction {
  pageId: PageId;
  label: string;
}

const PAGE_META: Record<PageId, { name: string; icon: string; desc: string }> = {
  home: { name: 'मुख्य होम', icon: '🏠', desc: 'नेविगेशन, इंटेंट फाइंडर व मुख्य सेवाएं' },
  plans: { name: '7 मास्टर प्लान्स', icon: '💼', desc: '₹10 से ₹999 व 70% इंस्टेंट पेआउट' },
  weather: { name: 'लाइव मौसम व वर्षा', icon: '🌤️', desc: 'Open-Meteo लाइव मौसम, वर्षा अलर्ट व कृषि सलाह' },
  compressor: { name: 'फोटो कंप्रेसर', icon: '📸', desc: 'RTPS/सरकारी फॉर्म हेतु 20KB-50KB टूल' },
  services: { name: 'RTPS व सरकारी सेवा', icon: '🏛️', desc: 'जातीय, आय, आवासीय, आधार व फ्री बायोडाटा' },
  'career-guide': { name: 'करियर गाइडेंस', icon: '🎓', desc: '10वीं/12वीं के बाद क्या करें, ADCA/DCA कोर्स' },
  'study-hub': { name: 'स्टडी मैटेरियल व टेस्ट', icon: '📚', desc: 'NCERT बुक्स Class 6-12 व दैनिक ऑनलाइन क्विज' },
  entertainment: { name: 'Smart TV & कम्युनिटी', icon: '📺', desc: 'वीडियो प्लेयर, लाइव कम्युनिटी चैट व फोटो गैलरी' },
  panchang: { name: 'दैनिक वैदिक पंचांग', icon: '🕉️', desc: 'तिथि, शुभ मुहूर्त, राहुकाल व चौघड़िया' },
  rashifal: { name: '12 राशियों का राशिफल', icon: '🔮', desc: 'दैनिक करियर, स्वास्थ्य व शुभ अंक/रंग' },
  'jobs-news': { name: 'जॉब अलर्ट्स व रिजल्ट्स', icon: '📢', desc: 'सरकारी भर्ती, एडमिट कार्ड व परिणाम' },
  contact: { name: 'संपर्क व सहायता केंद्र', icon: '📞', desc: 'व्हाट्सएप +91 8877490845 व पता' },
  utilities: { name: 'डिजिटल टूल्स', icon: '🛠️', desc: 'कैलकुलेटर व जरूरी डिजिटल टूल्स' },
  'parent-guide': { name: 'अभिभावक गाइड', icon: '👨‍👩‍👧', desc: 'माता-पिता व छात्र परामर्श' },
  about: { name: 'IOIS के बारे में', icon: 'ℹ️', desc: 'मिशन व विजन' },
  privacy: { name: 'प्राइवेसी पॉलिसी', icon: '🔒', desc: 'गोपनीयता नीति' },
  terms: { name: 'नियम व शर्तें', icon: '📜', desc: 'उपयोग की शर्तें' },
  disclaimer: { name: 'डिस्क्लेमर', icon: '⚠️', desc: 'अस्वीकरण' },
  admin: { name: 'एडमिन पोर्टल', icon: '⚙️', desc: 'पोर्टल प्रबंधन' }
};

// Helper to parse [PAGE:pageId|label] from response
function parsePageActions(rawContent: string): { cleanText: string; pageActions: PageAction[] } {
  const pageActions: PageAction[] = [];
  const regex = /\[PAGE:([a-zA-Z0-9\-]+)\|([^\]]+)\]/g;
  let match;
  while ((match = regex.exec(rawContent)) !== null) {
    pageActions.push({
      pageId: match[1] as PageId,
      label: match[2].trim(),
    });
  }
  let cleanText = rawContent.replace(regex, '').trim();
  // Strip redundant navigation header phrases if present in text
  cleanText = cleanText
    .replace(/सीधे पेज या सेवा पर जाएं:?/gi, '')
    .replace(/सीधे पेज पर जाने हेतु:?/gi, '')
    .replace(/नीचे दिए गए बटन पर क्लिक करें:?/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { cleanText, pageActions };
}

// Helper to render inline formatted text without stray asterisks and with badges for numbers/helplines
function renderFormattedInline(str: string): React.ReactNode {
  // Strip any accidental leading or trailing asterisks from the string segment
  const sanitized = str
    .replace(/^[\*]+/, '')
    .replace(/[\*]+$/, '');

  // Split by **bold text**
  const parts = sanitized.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2).trim();
      // Check if it's a helpline/phone, metric, percentage, or price like 1033, 139, 112, ₹999, 70%
      const isBadge = /^(\d+|₹\d+|[0-9%]+|[A-Z0-9\-]+)$/.test(boldText);
      return (
        <strong
          key={index}
          className={
            isBadge
              ? 'font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40 font-mono inline-block mx-0.5 text-[11px]'
              : 'font-bold text-amber-200'
          }
        >
          {boldText}
        </strong>
      );
    }
    // Remove any remaining stray single * asterisks
    const cleanPart = part.replace(/\*/g, '');
    return <span key={index}>{cleanPart}</span>;
  });
}

// Component to render chat text with clean typography, list formatting, and no extra symbols
const FormattedChatContent: React.FC<{ content: string; isAssistant: boolean }> = ({ content, isAssistant }) => {
  if (!isAssistant) {
    return <div className="leading-relaxed whitespace-pre-wrap">{content}</div>;
  }

  // Split content by lines
  const rawLines = content.split('\n');

  // Filter out any lines that are just redundant navigation headers or prompt leakage
  const lines = rawLines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return true; // keep empty lines for paragraph rhythm
    if (/^सीधे पेज या सेवा पर जाएं:?$/i.test(trimmed)) return false;
    if (/^सीधे पेज पर जाने हेतु:?$/i.test(trimmed)) return false;
    if (/^नीचे दिए गए बटन पर क्लिक करें:?$/i.test(trimmed)) return false;
    return true;
  });

  return (
    <div className="space-y-1.5 text-xs text-slate-100">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Check if line is a bullet item or list item: •, -, *, 1., 2. etc.
        const bulletMatch = line.match(/^(\s*)([•\-\*]|\d+\.)\s*(.*)$/);
        if (bulletMatch) {
          const indent = bulletMatch[1] || '';
          const rawBullet = bulletMatch[2];
          const bulletText = bulletMatch[3];
          const isNested = indent.length >= 2;

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 py-0.5 ${isNested ? 'ml-3.5' : 'ml-0.5'}`}
            >
              <span className="text-amber-400 font-bold shrink-0 mt-0.5 text-xs select-none">
                {rawBullet.endsWith('.') ? rawBullet : '•'}
              </span>
              <div className="flex-1 text-slate-200 leading-relaxed">
                {renderFormattedInline(bulletText)}
              </div>
            </div>
          );
        }

        // Check if line is a Header/Title line (starts with emoji, or has no leading bullets and ends with colons)
        const isHeader =
          idx === 0 ||
          /^[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(trimmed) ||
          (trimmed.startsWith('**') && trimmed.endsWith(':**')) ||
          (trimmed.endsWith(':') && trimmed.length < 80);

        if (isHeader) {
          // Clean asterisks from header
          const cleanHeader = trimmed.replace(/\*\*/g, '').replace(/\*/g, '').trim();
          return (
            <div
              key={idx}
              className="text-amber-300 font-bold text-xs sm:text-[13px] tracking-wide pt-0.5 pb-1 border-b border-amber-500/20 leading-snug"
            >
              {cleanHeader}
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={idx} className="text-slate-200 leading-relaxed">
            {renderFormattedInline(line)}
          </p>
        );
      })}
    </div>
  );
};

export const AIChatBot: React.FC<AIChatBotProps> = ({ 
  isOpen, 
  onClose, 
  initialQuery,
  currentPage: rawPage = 'home',
  onNavigate
}) => {
  const currentPage: PageId = rawPage as PageId;
  const currentPageInfo = PAGE_META[currentPage] || PAGE_META['home'];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `नमस्ते! 🙏 मैं **IOIS Live AI Assistant** हूँ।\n\nमैं प्लेटफॉर्म के सभी पेजों और सेवाओं की सटीक लाइव जानकारी देने के साथ-साथ आपको सही पेज और लिंक पर भी तुरंत भेज सकता हूँ।\n\n🌤️ **मौसम व वर्षा** | 🌾 **कृषि व फसल** | 🚗 **यात्रा सुरक्षा** | 📚 **परीक्षा तैयारी** | 💼 **7 मास्टर प्लान** | 📸 **फोटो कंप्रेसर**\n\nआप किसी भी सवाल को पूछें या नीचे दिए गए त्वरित प्रश्नों पर क्लिक करें!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pageSuggestions: [
        { pageId: 'plans', label: '💼 7 मास्टर प्लान' },
        { pageId: 'weather', label: '🌤️ लाइव मौसम रिपोर्ट' },
        { pageId: 'compressor', label: '📸 फोटो कंप्रेसर' },
        { pageId: 'entertainment', label: '📺 Smart TV' }
      ]
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState<boolean>(false);
  const [activeChipCategory, setActiveChipCategory] = useState<string>('current');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Handle incoming query if provided externally
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '') {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pageContext: currentPage
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'msg-welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      let replyContent = '';

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageContent,
            history: historyPayload,
            currentPage: currentPage || 'home'
          })
        });

        if (res.ok) {
          const data = await res.json();
          replyContent = data.reply;
        }
      } catch (networkErr) {
        console.warn('Network call to /api/chat failed:', networkErr);
      }

      // Client-side fallback if offline
      if (!replyContent) {
        const lower = messageContent.toLowerCase();
        if (lower.includes('मौसम') || lower.includes('barish') || lower.includes('weather') || lower.includes('बारिश')) {
          replyContent = `🌤️ **IOIS लाइव मौसम व वर्षा परामर्श:**\n\n• वर्तमान में उत्तर व मध्य भारत में मौसम सामान्यतः परिवर्तनशील है।\n• वर्षा के समय पेड़ों व बिजली के तारों से दूर रहें।\n• सटीक लाइव तापमान व 7 दिन का पूर्वानुमान देखने के लिए 'लाइव मौसम' पेज पर जाएं!\n\n[PAGE:weather|🌤️ लाइव मौसम रिपोर्ट खोलें]`;
        } else if (lower.includes('खेती') || lower.includes('किसान') || lower.includes('फसल') || lower.includes('धान')) {
          replyContent = `🌾 **IOIS किसान व कृषि परामर्श:**\n\n• धान व खरीफ फसलों में कीट नियंत्रण हेतु 5ml नीम तेल प्रति लीटर पानी का छिड़काव करें।\n• बारिश की संभावना देखकर ही सिंचाई करें।\n• पीएम किसान व कृषि योजनाओं की जानकारी हेतु सरकारी सेवा पेज देखें।\n\n[PAGE:weather|🌾 वर्षा रिपोर्ट व कृषि सलाह]\n[PAGE:services|🏛️ सरकारी किसान योजनाएं]`;
        } else if (lower.includes('photo') || lower.includes('फोटो') || lower.includes('compress') || lower.includes('20kb') || lower.includes('50kb')) {
          replyContent = `📸 **IOIS 100% फ्री फोटो व सिग्नेचर कंप्रेसर टूल:**\n\n• RTPS बिहार, BPSC व सरकारी फॉर्म हेतु फोटो का साइज 20KB से 50KB और हस्ताक्षर 10KB से 20KB के बीच होना चाहिए।\n• यह टूल सीधे आपके ब्राउज़र में काम करता है और फोटो 100% सुरक्षित रहती है!\n\n[PAGE:compressor|📸 फोटो कंप्रेसर टूल खोलें]`;
        } else if (lower.includes('plan') || lower.includes('प्लान') || lower.includes('payout') || lower.includes('कमाई')) {
          replyContent = `💼 **IOIS के 7 मास्टर डिजिटल इनकम प्लांस:**\n\n1. Plan 01 (₹10): ₹7 इंस्टेंट पेआउट (70%)\n2. Plan 02 (₹49): ₹34 इंस्टेंट पेआउट (70%)\n3. Plan 03 (₹99): ₹64 इंस्टेंट पेआउट (65%)\n4. Plan 04 (₹199): ₹119 इंस्टेंट पेआउट (60%)\n5. Plan 05 (₹299): ₹179 इंस्टेंट पेआउट (60%)\n6. Plan 06 (₹499): ₹274 इंस्टेंट पेआउट (55%)\n7. Plan 07 (₹999): ₹499 इंस्टेंट पेआउट (50%)\n\n[PAGE:plans|💼 7 मास्टर डिजिटल प्लान देखें]`;
        } else {
          replyContent = `धन्यवाद! आपकी सहायता के लिए IOIS AI सदैव तत्पर है। आप हमारे 7 प्लांस, लाइव मौसम, फ्री फोटो कंप्रेसर, RTPS सरकारी सेवाओं या स्मार्ट टीवी के बारे में जान सकते हैं।\n\n[PAGE:plans|💼 7 मास्टर प्लान] [PAGE:weather|🌤️ मौसम रिपोर्ट] [PAGE:compressor|📸 फोटो कंप्रेसर]`;
        }
      }

      const { cleanText, pageActions } = parsePageActions(replyContent);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: cleanText,
        pageSuggestions: pageActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat Error:', err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'सॉरी, नेटवर्क या सर्वर से जुड़ने में समस्या हुई। कृपया पुनः प्रयास करें या हमारे आधिकारिक व्हाट्सएप हेल्पलाइन +91 8877490845 पर संपर्क करें।',
        pageSuggestions: [{ pageId: 'contact', label: '📞 संपर्क व सहायता केंद्र' }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `नमस्ते! चैट रीसेट हो गई है। वर्तमान पेज (${currentPageInfo.name}) या IOIS की किसी भी सेवा के बारे में नया प्रश्न पूछें।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pageSuggestions: [
          { pageId: currentPage, label: `${currentPageInfo.icon} ${currentPageInfo.name} देखें` }
        ]
      }
    ]);
  };

  // WhatsApp Share Function
  const handleShareWhatsApp = (content: string, actions?: PageAction[]) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://iois.in';
    const targetPage = actions && actions.length > 0 ? actions[0].pageId : currentPage;
    const directLink = `${origin}/#${targetPage}`;

    // Clean up content for WhatsApp: strip PAGE tags, redundant filler phrases, and convert markdown **bold** to WhatsApp *bold*
    let waContent = content
      .replace(/\[PAGE:([a-zA-Z0-9\-]+)\|([^\]]+)\]/g, '')
      .replace(/सीधे पेज या सेवा पर जाएं:?/gi, '')
      .replace(/सीधे पेज पर जाने हेतु:?/gi, '')
      .replace(/नीचे दिए गए बटन पर क्लिक करें:?/gi, '')
      .replace(/\*\*([^*]+)\*\*/g, '*$1*') // convert markdown bold to WhatsApp bold
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Clean any stray double asterisks
    waContent = waContent.replace(/\*\*/g, '*');

    const textToShare = `*IOIS प्लेटफॉर्म सेवा व परामर्श जानकारी*\n\n${waContent}\n\n🌐 *सीधे इस सेवा पर जाने हेतु लिंक:* \n${directLink}\n\n📞 *हेल्पलाइन:* +91 8877490845`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy text function
  const handleCopyText = (msgId: string, content: string, actions?: PageAction[]) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://iois.in';
    const targetPage = actions && actions.length > 0 ? actions[0].pageId : currentPage;
    const directLink = `${origin}/#${targetPage}`;

    // Clean text completely for clipboard: strip tags and all asterisks so text is pristine plain Hindi
    const cleanPlainContent = content
      .replace(/\[PAGE:([a-zA-Z0-9\-]+)\|([^\]]+)\]/g, '')
      .replace(/सीधे पेज या सेवा पर जाएं:?/gi, '')
      .replace(/सीधे पेज पर जाने हेतु:?/gi, '')
      .replace(/नीचे दिए गए बटन पर क्लिक करें:?/gi, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1') // remove bold asterisks
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\*/g, '') // remove any leftover stray asterisks
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    const fullText = `${cleanPlainContent}\n\n🔗 सेवा लिंक: ${directLink}\n📞 हेल्पलाइन: +91 8877490845`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Quick Chips logic based on category
  const getCategoryChips = () => {
    if (activeChipCategory === 'current') {
      if (currentPage === 'weather') {
        return [
          '🌤️ आज का मौसम व बारिश पूर्वानुमान',
          '🌾 बारिश अनुसार कृषि व सिंचाई सलाह',
          '🚗 मौसम अनुसार यात्रा सुरक्षा निर्देश',
          '7 दिन का मौसम पूर्वानुमान कैसे देखें?'
        ];
      }
      if (currentPage === 'compressor') {
        return [
          '📸 RTPS फोटो 20KB-50KB कैसे करें?',
          '✍️ सिग्नेचर साइज 10KB-20KB कैसे घटाएं?',
          'सरकारी फॉर्म फोटो नियम क्या हैं?',
          'क्या यह फोटो कंप्रेसर 100% सेफ है?'
        ];
      }
      if (currentPage === 'plans') {
        return [
          'Plan 01 ₹10 की पूरी डिटेल व लाभ',
          'Plan 07 ₹999 में ₹499 पेआउट कैसे मिलता है?',
          'संजय 20-लीडर रेफरल फॉर्मूले से ₹9,980 कैसे कमाएं?',
          'वेरिफिकेशन पास फॉर्म का लिंक दें'
        ];
      }
      if (currentPage === 'entertainment') {
        return [
          'Smart TV में यूट्यूब वीडियो कैसे चलाएं?',
          '🔊 वीडियो की आवाज़ कैसे चालू करें?',
          'कम्युनिटी चैट में मैसेज कैसे भेजें?',
          '15+ फोटो एल्बम गैलरी कैसे देखें?'
        ];
      }
      if (currentPage === 'services') {
        return [
          'RTPS बिहार से जातीय/आय/आवासीय कैसे अप्लाई करें?',
          '2 मिनट में फ्री बायोडाटा (CV) कैसे बनाएं?',
          'आधार कार्ड सुधार प्रक्रिया क्या है?',
          'नया पैन कार्ड ऑनलाइन कैसे बनाएं?'
        ];
      }
      if (currentPage === 'career-guide') {
        return [
          '10वीं के बाद क्या करें: साइंस, कॉमर्स या ITI?',
          'ADCA vs DCA: कौन सा कंप्यूटर कोर्स बेस्ट है?',
          'रेलवे व BPSC की तैयारी कैसे शुरू करें?',
          'कंप्यूटर कोर्स के बाद कितनी सैलरी मिलती है?'
        ];
      }
      if (currentPage === 'study-hub') {
        return [
          'Class 6-12 NCERT पुस्तकें कैसे डाउनलोड करें?',
          'डेली ऑनलाइन टेस्ट और क्विज कैसे दें?',
          'प्रतियोगी परीक्षा के लिए बेस्ट स्टडी रूटीन',
          'पिछले 5 वर्षों के प्रश्नपत्र कैसे हल करें?'
        ];
      }
      if (currentPage === 'panchang' || currentPage === 'rashifal') {
        return [
          'आज का अभिजित मुहूर्त समय क्या है?',
          'आज का राहुकाल समय कब से कब तक है?',
          'आज का चौघड़िया मुहूर्त बताएं',
          'आज का संपूर्ण दैनिक राशिफल बताएं'
        ];
      }
      return [
        '🌤️ आज का मौसम व बारिश सलाह',
        '🌾 किसानों हेतु कृषि व फसल सलाह',
        '🚗 यात्रा व मार्ग सुरक्षा निर्देश',
        '💼 7 मास्टर प्लान और इंस्टेंट पेआउट',
        '📸 फ्री फोटो व सिग्नेचर कंप्रेसर',
        '📺 IOIS Smart TV कैसे चलाएं?'
      ];
    }
    if (activeChipCategory === 'weather') {
      return [
        'आज बारिश होगी या तेज धूप?',
        'किसानों के लिए खाद व सिंचाई सलाह',
        'हाईवे पर बारिश व कोहरे में यात्रा सुरक्षा',
        'आंधी-तूफान के समय क्या सावधानी रखें?'
      ];
    }
    if (activeChipCategory === 'plans') {
      return [
        'Plan 01 ₹10 से शुरुआत कैसे करें?',
        'Plan 07 ₹999 में ₹499 का 50% पेआउट',
        'संजय 20-लीडर रेफरल फॉर्मूला क्या है?',
        'पेआउट कितने समय में खाते में आता है?'
      ];
    }
    if (activeChipCategory === 'tools') {
      return [
        'फोटो का साइज 20KB से 50KB कैसे करें?',
        'सिग्नेचर 10KB से 20KB कैसे घटाएं?',
        'फ्री में प्रोफेशनल बायोडाटा (CV) कैसे बनाएं?',
        'RTPS बिहार आवासीय प्रमाण पत्र कैसे बनाएं?'
      ];
    }
    if (activeChipCategory === 'tv') {
      return [
        'Smart TV में यूट्यूब प्लेलिस्ट कैसे चलाएं?',
        'बिना रीडायरेक्ट कोई भी वीडियो कैसे देखें?',
        'कम्युनिटी चैट में बातचीत कैसे करें?',
        '15+ फोटो गैलरी की तस्वीरें कैसे देखें?'
      ];
    }
    return [
      'आज का शुभ मुहूर्त व राहुकाल',
      '12 राशियों का आज का राशिफल',
      'BPSC व SSC की तैयारी का सिलेबस',
      'व्हाट्सएप हेल्पलाइन नंबर क्या है?'
    ];
  };

  if (!isOpen) return null;

  return (
    <div
      id="ai-chatbot-drawer"
      className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[470px] max-w-[490px] shadow-2xl rounded-3xl overflow-hidden border-2 border-amber-500/70 bg-slate-950/95 backdrop-blur-2xl flex flex-col transition-all duration-300 animate-fadeIn font-sans"
      style={{ height: isMinimized ? '64px' : '650px', maxHeight: '88vh' }}
    >
      {/* 1. Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 px-4 py-3 border-b border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-white font-black text-xs sm:text-sm leading-none">IOIS Live AI Assistant</h4>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            {/* Current Page Context Badge */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-slate-400">पेज संदर्भ:</span>
              <button
                onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                className="inline-flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer"
                title="सभी पेजों की सूची देखें"
              >
                <span>{currentPageInfo.icon} {currentPageInfo.name}</span>
                {isQuickMenuOpen ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="चैट साफ करें"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title={isMinimized ? 'बड़ा करें' : 'छोटा करें'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Collapsible Quick Page Navigator Menu */}
      {isQuickMenuOpen && !isMinimized && (
        <div className="bg-slate-900 border-b border-amber-500/30 p-3 max-h-48 overflow-y-auto animate-fadeIn text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              IOIS के सभी प्रमुख पेज व सेवाएं:
            </span>
            <span className="text-[9px] text-slate-400">एक क्लिक में जाएं</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(
              [
                'weather',
                'compressor',
                'plans',
                'entertainment',
                'services',
                'career-guide',
                'study-hub',
                'panchang',
                'rashifal',
                'jobs-news',
                'contact'
              ] as PageId[]
            ).map((pageKey) => {
              const info = PAGE_META[pageKey];
              const isCurrent = currentPage === pageKey;
              return (
                <button
                  key={pageKey}
                  onClick={() => {
                    if (onNavigate) onNavigate(pageKey);
                    setIsQuickMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-left transition cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                      : 'bg-slate-950/70 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-sm">{info.icon}</span>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold truncate">{info.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Chat Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs scrollbar-thin scrollbar-thumb-slate-800 bg-slate-950/80">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-2xl p-3 space-y-2 shadow-md ${
                      isAssistant
                        ? 'bg-slate-900 text-slate-100 border border-slate-800'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-medium'
                    }`}
                  >
                    <FormattedChatContent content={msg.content} isAssistant={isAssistant} />

                    {/* Interactive Page Navigation Buttons (One Click Jump to Service) */}
                    {isAssistant && msg.pageSuggestions && msg.pageSuggestions.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 mt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {msg.pageSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (onNavigate) {
                                  onNavigate(suggestion.pageId);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[11px] shadow-sm transition transform hover:scale-102 active:scale-95 cursor-pointer"
                              title={`${suggestion.label} खोलें`}
                            >
                              <span>{suggestion.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Row: WhatsApp Share, Copy, and Timestamp */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[9px]">
                      {isAssistant ? (
                        <div className="flex items-center gap-2">
                          {/* Share on WhatsApp */}
                          <button
                            onClick={() => handleShareWhatsApp(msg.content, msg.pageSuggestions)}
                            className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 font-bold transition cursor-pointer"
                            title="व्हाट्सएप पर शेयर करें"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>व्हाट्सएप शेयर</span>
                          </button>

                          {/* Copy Text */}
                          <button
                            onClick={() => handleCopyText(msg.id, msg.content, msg.pageSuggestions)}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-white font-medium transition cursor-pointer"
                            title="कॉपी करें"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-green-400" />
                                <span className="text-green-400">कॉपी हुआ!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>कॉपी</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-900/70 font-semibold">आप</span>
                      )}

                      <span className={`${isAssistant ? 'text-slate-500' : 'text-slate-900/80'} font-medium`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="text-[11px] text-amber-300/90 ml-2 font-medium">लाइव जानकारी संकलित हो रही है...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. Quick Category Filters for Preset Chips */}
          <div className="px-2.5 py-1.5 bg-slate-900 border-t border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px]">
            {[
              { id: 'current', label: `🎯 वर्तमान पेज (${currentPageInfo.name})` },
              { id: 'weather', label: '🌤️ मौसम व कृषि' },
              { id: 'plans', label: '💼 7 प्लांस व पेआउट' },
              { id: 'tools', label: '📸 कंप्रेसर व RTPS' },
              { id: 'tv', label: '📺 Smart TV & चैट' },
              { id: 'more', label: '🕉️ पंचांग व परीक्षा' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveChipCategory(cat.id)}
                className={`px-2 py-0.5 rounded-full shrink-0 font-bold transition cursor-pointer ${
                  activeChipCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 5. Quick Preset Questions Chips */}
          <div className="px-2.5 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {getCategoryChips().map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-200 px-2.5 py-1 rounded-full shrink-0 transition cursor-pointer hover:border-amber-400 whitespace-nowrap shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* 6. Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-slate-950 border-t border-amber-500/20 flex items-center gap-2"
          >
            <input
              id="ai-chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="कोई भी सवाल पूछें या सेवा का नाम लिखें..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400 transition"
              disabled={isLoading}
            />
            <button
              id="ai-chatbot-send-btn"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black flex items-center justify-center shrink-0 disabled:opacity-50 transition shadow-md cursor-pointer"
              title="भेजें"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
