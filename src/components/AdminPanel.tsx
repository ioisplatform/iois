import React, { useState, useEffect, useCallback } from 'react';
import { PageId, SliderItem, CustomQAItem, RegisteredUserRecord, GalleryPhoto, SmartTvBroadcast } from '../types';
import { 
  Lock, 
  Unlock, 
  Sliders, 
  MessageSquarePlus, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  LogOut, 
  RefreshCw, 
  Tv, 
  Image as ImageIcon, 
  Upload, 
  Play, 
  Eye, 
  Video,
  Layers
} from 'lucide-react';
import { convertToEmbedUrl } from './EntertainmentHub';

interface AdminPanelProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'smart-tv' | 'gallery' | 'sliders' | 'qa' | 'users'>('smart-tv');

  // Smart TV Broadcast State
  const [broadcastUrl, setBroadcastUrl] = useState<string>('');
  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastDesc, setBroadcastDesc] = useState<string>('');
  const [currentBroadcast, setCurrentBroadcast] = useState<SmartTvBroadcast | null>(null);

  // Gallery Photos State
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [photoInputUrl, setPhotoInputUrl] = useState<string>('');
  const [photoTitle, setPhotoTitle] = useState<string>('');
  const [photoCategory, setPhotoCategory] = useState<string>('आयोजन व सम्मान');
  const [photoDescription, setPhotoDescription] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  // Sliders State
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [newSliderUrl, setNewSliderUrl] = useState<string>('');
  const [newSliderTitle, setNewSliderTitle] = useState<string>('');
  const [newSliderSubtitle, setNewSliderSubtitle] = useState<string>('');
  const [newSliderTarget, setNewSliderTarget] = useState<PageId>('plans');
  const [sliderPreview, setSliderPreview] = useState<string>('');

  // Q&A State
  const [customQAList, setCustomQAList] = useState<CustomQAItem[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newKeywords, setNewKeywords] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  // Users State
  const [users, setUsers] = useState<RegisteredUserRecord[]>([]);

  // Status message
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 4500);
  };

  const fetchAdminData = useCallback(async (pass: string) => {
    setIsLoading(true);
    try {
      // 1. Fetch Smart TV Broadcast
      const tvRes = await fetch('/api/smart-tv');
      if (tvRes.ok) {
        const tvData = await tvRes.json();
        if (tvData.broadcast) {
          setCurrentBroadcast(tvData.broadcast);
          setBroadcastUrl(tvData.broadcast.videoUrl || '');
          setBroadcastTitle(tvData.broadcast.title || '');
          setBroadcastDesc(tvData.broadcast.description || '');
        }
      }

      // 2. Fetch Gallery Photos
      const gRes = await fetch('/api/gallery');
      if (gRes.ok) {
        const gData = await gRes.json();
        if (Array.isArray(gData.photos)) setGalleryPhotos(gData.photos);
      }

      // 3. Fetch Sliders
      const sRes = await fetch('/api/admin/sliders', {
        headers: { 'x-admin-password': pass },
      });
      if (sRes.ok) {
        const sData = await sRes.json();
        if (Array.isArray(sData.sliders)) setSliders(sData.sliders);
      }

      // 4. Fetch Q&A
      const qRes = await fetch('/api/admin/qa', {
        headers: { 'x-admin-password': pass },
      });
      if (qRes.ok) {
        const qData = await qRes.json();
        if (Array.isArray(qData.customQA)) setCustomQAList(qData.customQA);
      }

      // 5. Fetch Users
      const uRes = await fetch('/api/admin/users', {
        headers: { 'x-admin-password': pass },
      });
      if (uRes.ok) {
        const uData = await uRes.json();
        if (Array.isArray(uData.users)) setUsers(uData.users);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('iois_admin_pass');
    if (savedToken === 'IOISSYSTEM') {
      setIsAuthenticated(true);
      fetchAdminData(savedToken);
    }
  }, [fetchAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (password.trim() === 'IOISSYSTEM') {
      setIsAuthenticated(true);
      sessionStorage.setItem('iois_admin_pass', password.trim());
      fetchAdminData(password.trim());
      showNotification('एडमिन पैनल में आपका स्वागत है!');
    } else {
      setAuthError('गलत पासवर्ड! केवल अधिकृत व्यवस्थापक (IOISSYSTEM) ही लॉगिन कर सकते हैं।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('iois_admin_pass');
    setPassword('');
  };

  // 1. Save Smart TV Broadcast
  const handleSaveBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastUrl.trim()) return;

    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch('/api/admin/smart-tv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': currentPass,
        },
        body: JSON.stringify({
          videoUrl: broadcastUrl.trim(),
          title: broadcastTitle.trim() || 'IOIS ऑफिशियल ब्रॉडकास्ट',
          description: broadcastDesc.trim() || 'एडमिन द्वारा लाइव प्रदर्शित वीडियो',
          isLive: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentBroadcast(data.broadcast);
        showNotification('स्मार्ट टीवी का ब्रॉडकास्ट लिंक सफलतापूर्वक अपडेट कर दिया गया!');
      } else {
        showNotification('अपडेट करने में समस्या आई।');
      }
    } catch (err) {
      console.error(err);
      showNotification('नेटवर्क त्रुटि आई।');
    }
  };

  // 2. Handle Image File Selection (Convert to Base64) for Gallery
  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('कृपया 8MB से छोटी फोटो चुनें।');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const base64Str = loadEvt.target?.result as string;
        setPhotoInputUrl(base64Str);
        setPhotoPreview(base64Str);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Add Photo to Gallery (IOIS Album 15+ Photos)
  const handleAddGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoInputUrl.trim() || !photoTitle.trim()) return;

    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': currentPass,
        },
        body: JSON.stringify({
          url: photoInputUrl.trim(),
          title: photoTitle.trim(),
          category: photoCategory,
          description: photoDescription.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGalleryPhotos((prev) => [data.photo, ...prev]);
        setPhotoInputUrl('');
        setPhotoPreview('');
        setPhotoTitle('');
        setPhotoDescription('');
        showNotification('फोटो सफलतापूर्वक IOIS एल्बम में जोड़ दी गई!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Gallery Photo
  const handleDeleteGalleryPhoto = async (id: string) => {
    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': currentPass },
      });
      if (res.ok) {
        setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
        showNotification('फोटो हटा दी गई!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Handle Slider File Selection
  const handleSliderFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('कृपया 8MB से छोटी फोटो चुनें।');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const base64Str = loadEvt.target?.result as string;
        setNewSliderUrl(base64Str);
        setSliderPreview(base64Str);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Slider (Up to 15+)
  const handleAddSlider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSliderUrl.trim() || !newSliderTitle.trim()) return;

    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch('/api/admin/sliders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': currentPass,
        },
        body: JSON.stringify({
          url: newSliderUrl.trim(),
          title: newSliderTitle.trim(),
          subtitle: newSliderSubtitle.trim(),
          targetPage: newSliderTarget,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSliders((prev) => [data.slide, ...prev]);
        setNewSliderUrl('');
        setSliderPreview('');
        setNewSliderTitle('');
        setNewSliderSubtitle('');
        showNotification('स्लाइडर बैनर सफलतापूर्वक जोड़ दिया गया!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Slider Active
  const handleToggleSlider = async (id: string) => {
    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch(`/api/admin/sliders/${id}/toggle`, {
        method: 'PUT',
        headers: { 'x-admin-password': currentPass },
      });
      if (res.ok) {
        setSliders((prev) =>
          prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
        );
        showNotification('स्लाइडर स्थिति बदली गई!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Slider
  const handleDeleteSlider = async (id: string) => {
    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': currentPass },
      });
      if (res.ok) {
        setSliders((prev) => prev.filter((s) => s.id !== id));
        showNotification('स्लाइडर हटा दिया गया!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Add Custom Q&A
  const handleAddQA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch('/api/admin/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': currentPass,
        },
        body: JSON.stringify({
          question: newQuestion.trim(),
          keywords: newKeywords,
          answer: newAnswer.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCustomQAList((prev) => [data.qa, ...prev]);
        setNewQuestion('');
        setNewKeywords('');
        setNewAnswer('');
        showNotification('AI चैटबॉट को नया प्रश्न-उत्तर सिखा दिया गया!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Custom Q&A
  const handleDeleteQA = async (id: string) => {
    const currentPass = sessionStorage.getItem('iois_admin_pass') || 'IOISSYSTEM';
    try {
      const res = await fetch(`/api/admin/qa/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': currentPass },
      });
      if (res.ok) {
        setCustomQAList((prev) => prev.filter((q) => q.id !== id));
        showNotification('प्रश्न-उत्तर हटा दिया गया!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 animate-in fade-in duration-300">
        <div className="glass-card-premium p-8 sm:p-10 border-2 border-amber-500/40 rounded-3xl bg-slate-950/90 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">IOIS एडमिन पैनल</h1>
            <p className="text-xs text-slate-400">
              स्मार्ट टीवी लाइव लिंक, 15 फोटो एल्बम, स्लाइडर एवं स्थायी डेटाबेस
            </p>
          </div>

          {authError && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-3 rounded-xl flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                एडमिन पासवर्ड दर्ज करें:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="पासवर्ड यहाँ लिखें"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm font-semibold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-gold-gradient text-xs sm:text-sm px-6 py-3 font-black uppercase tracking-wider w-full flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>एडमिन पैनल में प्रवेश करें</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const broadcastMeta = convertToEmbedUrl(broadcastUrl);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="glass-card-premium p-6 border-2 border-amber-500/30 rounded-3xl bg-slate-950/90 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-xs font-black text-green-400 uppercase tracking-wider">
              स्थायी डेटाबेस सक्रिय &bull; Permanent Database Online
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            IOIS मास्टर कंट्रोल एडमिन कंसोल
          </h1>
          <p className="text-xs text-slate-400">
            स्मार्ट टीवी स्पेशल लिंक, 15 फोटो एल्बम, होम स्लाइडर और AI बॉट ट्रेनिंग
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAdminData('IOISSYSTEM')}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            title="डेटा रीफ्रेश करें"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>लॉगआउट</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div className="bg-green-500/20 border border-green-500/40 text-green-300 text-xs p-3.5 rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('smart-tv')}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'smart-tv'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>स्मार्ट टीवी ब्रॉडकास्ट कंट्रोल</span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'gallery'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>IOIS फोटो एल्बम ({galleryPhotos.length} फोटो)</span>
        </button>

        <button
          onClick={() => setActiveTab('sliders')}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'sliders'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>होम स्लाइडर ({sliders.length}/15)</span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'qa'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>बॉट Q&A ज्ञानकोश ({customQAList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
              : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>रजिस्टर्ड यूज़र्स ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: SMART TV BROADCAST CONTROL */}
      {activeTab === 'smart-tv' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="glass-card-premium p-6 border-2 border-amber-500/30 rounded-3xl bg-slate-950/80 space-y-4">
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-black text-white">
                स्मार्ट टीवी स्पेशल वीडियो लिंक (Featured Broadcast)
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              यहाँ आप जो भी यूट्यूब, यूट्यूब शॉर्ट्स या MP4 वीडियो लिंक सेट करेंगे, वह सीधे IOIS SMART TV पेज पर सभी विज़िटर्स को मुख्य स्क्रीन पर दिखाई देगा और वे बिना रीडायरेक्ट हुए उसी पेज पर आनंद उठा सकेंगे।
            </p>

            <form onSubmit={handleSaveBroadcast} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="md:col-span-2">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  वीडियो लिंक (YouTube / Vimeo / MP4 URL) *
                </label>
                <input
                  type="text"
                  required
                  value={broadcastUrl}
                  onChange={(e) => setBroadcastUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... या https://youtu.be/..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setBroadcastUrl('https://youtube.com/playlist?list=PLKB7inGcWpEY&si=9EfMw-ZVI6QLAMly');
                    setBroadcastTitle('IOIS ऑफिशियल वीडियो प्लेलिस्ट');
                    setBroadcastDesc('IOIS निरंतर लाइव प्लेलिस्ट: जब तक कोई यूजर कोई अन्य वीडियो लिंक न चलाए, यह प्लेलिस्ट स्वतः चलती रहेगी।');
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline cursor-pointer mt-1.5 inline-flex items-center gap-1 font-semibold"
                >
                  <span>⭐ IOIS ऑफिशियल प्लेलिस्ट लिंक ऑटो-फिल करें</span>
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  ब्रॉडकास्ट शीर्षक (Broadcast Title)
                </label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="उदा. IOIS डिजिटल स्किल & इनकम मास्टरक्लास"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  संक्षिप्त विवरण (Description)
                </label>
                <input
                  type="text"
                  value={broadcastDesc}
                  onChange={(e) => setBroadcastDesc(e.target.value)}
                  placeholder="उदा. एडमिन द्वारा सभी विज़िटर्स के लिए विशेष रूप से सेट किया गया वीडियो"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="btn-gold-gradient text-xs px-6 py-3 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>स्मार्ट टीवी पर लाइव ब्रॉडकास्ट सेट करें</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('entertainment')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>स्मार्ट टीवी पेज देखें</span>
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview of the Video in Admin */}
          {broadcastUrl && (
            <div className="glass-card-premium p-6 border border-slate-800 rounded-3xl bg-slate-950/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">वीडियो लाइव पूर्वावलोकन (Preview):</span>
                <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded">
                  विज़िटर को यही दिखाई देगा
                </span>
              </div>
              <div className="aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-black">
                {broadcastMeta.type === 'youtube' || broadcastMeta.type === 'vimeo' ? (
                  <iframe
                    src={broadcastMeta.embedUrl}
                    title="Admin Preview"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : (
                  <video src={broadcastMeta.embedUrl} controls className="w-full h-full object-contain" />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IOIS PHOTO ALBUM (15+ Photos History) */}
      {activeTab === 'gallery' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Upload New Photo Form */}
          <div className="glass-card-premium p-6 border border-amber-500/30 rounded-3xl bg-slate-950/80 space-y-4">
            <h2 className="text-base font-black text-amber-300 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>IOIS एल्बम में नई फोटो अपलोड करें (कुल {galleryPhotos.length} तस्वीरें)</span>
            </h2>

            <form onSubmit={handleAddGalleryPhoto} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method 1: Upload from device */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-amber-400 block flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>डिवाइस (मोबाइल / कंप्यूटर) से फोटो चुनें:</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryFileSelect}
                    className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                </div>

                {/* Method 2: Paste URL */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    अथवा इमेज URL पेस्ट करें:
                  </label>
                  <input
                    type="text"
                    value={photoInputUrl.startsWith('data:') ? '' : photoInputUrl}
                    onChange={(e) => {
                      setPhotoInputUrl(e.target.value);
                      setPhotoPreview(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {photoPreview && (
                <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <img src={photoPreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-slate-700" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-green-400">फोटो चुनी गई!</span> नीचे शीर्षक व विवरण लिखकर सहेजें।
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">फोटो का शीर्षक *</label>
                  <input
                    type="text"
                    required
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="उदा. डिजिटल लर्निंग सेमिनार पटना"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">श्रेणी (Category)</label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  >
                    <option value="डिजिटल लर्निंग">डिजिटल लर्निंग</option>
                    <option value="सफलता की कहानियां">सफलता की कहानियां</option>
                    <option value="आयोजन व सम्मान">आयोजन व सम्मान</option>
                    <option value="कार्यालय व टीम">कार्यालय व टीम</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">संक्षिप्त विवरण</label>
                  <input
                    type="text"
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder="उदा. छात्रों को प्रमाण पत्र वितरण"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!photoInputUrl || !photoTitle}
                className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>एल्बम में फोटो सहेजें</span>
              </button>
            </form>
          </div>

          {/* Photo Grid in Admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg p-3 space-y-2">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-black/40 relative">
                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                  <span className="absolute top-1.5 left-1.5 bg-black/70 text-amber-300 text-[9px] px-2 py-0.5 rounded font-bold">
                    {photo.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{photo.title}</h4>
                  {photo.description && (
                    <p className="text-[10px] text-slate-400 line-clamp-1">{photo.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteGalleryPhoto(photo.id)}
                  className="w-full py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-bold border border-red-500/40 flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>फोटो हटाएं</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SLIDERS (15 Photos with File Upload / URL) */}
      {activeTab === 'sliders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Add Slider Form */}
          <div className="glass-card-premium p-6 border border-amber-500/30 rounded-3xl bg-slate-950/80 space-y-4">
            <h2 className="text-base font-black text-amber-300 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>नया स्लाइडर बैनर जोड़ें (15 फोटो तक)</span>
            </h2>

            <form onSubmit={handleAddSlider} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method 1: Upload from device */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-amber-400 block flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>डिवाइस से स्लाइडर इमेज अपलोड करें:</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSliderFileSelect}
                    className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                </div>

                {/* Method 2: Paste URL */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    अथवा इमेज URL पेस्ट करें:
                  </label>
                  <input
                    type="text"
                    value={newSliderUrl.startsWith('data:') ? '' : newSliderUrl}
                    onChange={(e) => {
                      setNewSliderUrl(e.target.value);
                      setSliderPreview(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {sliderPreview && (
                <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <img src={sliderPreview} alt="Slider Preview" className="w-28 h-16 object-cover rounded-xl border border-slate-700" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-green-400">स्लाइडर इमेज तैयार!</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">मुख्य शीर्षक (Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. 10वीं/12वीं के बाद सही करियर"
                    value={newSliderTitle}
                    onChange={(e) => setNewSliderTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">उप-शीर्षक (Subtitle)</label>
                  <input
                    type="text"
                    placeholder="उदा. ADCA व DCA कोर्स की पूरी जानकारी"
                    value={newSliderSubtitle}
                    onChange={(e) => setNewSliderSubtitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">क्लिक करने पर लक्ष्य पेज</label>
                  <select
                    value={newSliderTarget}
                    onChange={(e) => setNewSliderTarget(e.target.value as PageId)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  >
                    <option value="entertainment">स्मार्ट टीवी & मनोरंजन</option>
                    <option value="plans">7 मास्टर प्लान</option>
                    <option value="career-guide">करियर व कोर्स गाइड</option>
                    <option value="services">सरकारी सेवा हब (RTPS)</option>
                    <option value="compressor">फोटो कंप्रेसर</option>
                    <option value="study-hub">स्टडी व क्विज हब</option>
                    <option value="jobs-news">जॉब व रिजल्ट अलर्ट</option>
                    <option value="panchang">दैनिक पंचांग व मुहूर्त</option>
                    <option value="rashifal">दैनिक राशिफल</option>
                    <option value="weather">लाइव मौसम रिपोर्ट</option>
                    <option value="contact">संपर्क पेज</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={sliders.length >= 20 || !newSliderUrl || !newSliderTitle}
                className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>स्लाइडर सुरक्षित करें ({sliders.length}/15)</span>
              </button>
            </form>
          </div>

          {/* Existing Sliders List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sliders.map((s, idx) => (
              <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3 p-4">
                <div className="aspect-16/9 w-full rounded-xl overflow-hidden bg-black/40 relative">
                  <img src={s.url} alt={s.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${s.active ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                    {s.active ? 'सक्रिय (Active)' : 'निष्क्रिय (Hidden)'}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                    क्रम #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-black text-white line-clamp-1">{s.title}</h3>
                  {s.subtitle && <p className="text-[11px] text-slate-400 line-clamp-1">{s.subtitle}</p>}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleToggleSlider(s.id)}
                    className="text-[11px] font-bold text-amber-400 hover:underline cursor-pointer"
                  >
                    {s.active ? 'छिपाएं (Deactivate)' : 'दिखाएं (Activate)'}
                  </button>

                  <button
                    onClick={() => handleDeleteSlider(s.id)}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
                    title="हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Q&A BOT KNOWLEDGE BASE */}
      {activeTab === 'qa' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="glass-card-premium p-6 border border-amber-500/30 rounded-3xl bg-slate-950/80 space-y-4">
            <h2 className="text-base font-black text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI चैटबॉट को नया प्रश्न व उत्तर सिखाएं</span>
            </h2>

            <form onSubmit={handleAddQA} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    उपयोगकर्ता का प्रश्न (Question) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. प्लान 03 में क्या-क्या मिलता है?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    कीवर्ड्स (Keywords, कॉमा से अलग करें)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. plan 3, 99 rs, career plan"
                    value={newKeywords}
                    onChange={(e) => setNewKeywords(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  बॉट का सटीक उत्तर (Bot Answer) *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="बॉट इस प्रश्न का क्या उत्तर देगा..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>बॉट को सिखाएं (Train AI)</span>
              </button>
            </form>
          </div>

          {/* List of Custom Q&As */}
          <div className="space-y-3">
            {customQAList.map((qa) => (
              <div key={qa.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black text-amber-300">Q: {qa.question}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {qa.keywords.map((kw, i) => (
                        <span key={i} className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteQA(qa.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 whitespace-pre-line bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {qa.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REGISTERED USERS */}
      {activeTab === 'users' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-white">
              पंजीकृत उपयोगकर्ता व इंक्वायरी सूची ({users.length})
            </h2>
            <span className="text-xs text-green-400 font-bold">
              डेटाबेस में स्थायी रूप से सुरक्षित
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">नाम</th>
                  <th className="p-3">मोबाइल नंबर</th>
                  <th className="p-3">ईमेल</th>
                  <th className="p-3">पसंदीदा प्लान</th>
                  <th className="p-3">राज्य</th>
                  <th className="p-3">तारीख</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      अभी तक कोई नया यूजर पंजीकृत नहीं हुआ है। जैसे ही कोई फॉर्म भरेगा, डेटा यहाँ दिखाई देगा।
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3 font-bold text-white">{u.name}</td>
                      <td className="p-3 font-mono text-amber-300">{u.phone}</td>
                      <td className="p-3 text-slate-400">{u.email || '-'}</td>
                      <td className="p-3 text-emerald-400 font-semibold">{u.selectedPlan || '-'}</td>
                      <td className="p-3">{u.state || '-'}</td>
                      <td className="p-3 text-slate-500 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString('hi-IN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
