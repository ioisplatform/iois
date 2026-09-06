import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageId, GalleryPhoto, SmartTvBroadcast, CommunityChatMessage } from '../types';
import { 
  Tv, 
  Video, 
  Camera, 
  Mic, 
  MicOff, 
  VideoOff, 
  Play, 
  Send, 
  Image as ImageIcon, 
  Share2, 
  Check, 
  Sparkles, 
  Radio, 
  Users, 
  Film, 
  Maximize2, 
  Volume2, 
  VolumeX,
  ExternalLink,
  MessageSquare,
  Flame,
  ShieldCheck,
  Heart,
  RotateCw,
  RotateCcw,
  Clock,
  Eye
} from 'lucide-react';

interface EntertainmentHubProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

export const DEFAULT_OFFICIAL_PLAYLIST = 'https://www.youtube.com/watch?v=bcjXgHGTBDQ&list=PLKB7inGcWpEY';

// Convert any YouTube (Single video, Shorts, Playlist), Vimeo, or Video URL into an embeddable iframe URL with compliant autoplay
export function convertToEmbedUrl(rawUrl: string, isMuted: boolean = true): { type: 'youtube' | 'vimeo' | 'direct' | 'invalid'; embedUrl: string } {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { type: 'invalid', embedUrl: '' };
  }

  const clean = rawUrl.trim();
  const muteParam = isMuted ? 'mute=1' : 'mute=0';

  // 1. YouTube checks: handles playlists, watch videos, shorts, and embeds
  const isYouTube = /(?:youtube\.com|youtu\.be)/i.test(clean);
  if (isYouTube) {
    // Check for playlist parameter: list=...
    const listMatch = clean.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
    // Check for standard watch video ID: v=... or /v/... or youtu.be/...
    const watchMatch = clean.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);

    // If it has a playlist ID
    if (listMatch && listMatch[1]) {
      const listId = listMatch[1];
      let leadVideoId = watchMatch && watchMatch[1] ? watchMatch[1] : '';
      // For official playlist PLKB7inGcWpEY, use the verified first track so it starts playing immediately
      if (!leadVideoId && (listId === 'PLKB7inGcWpEY' || clean.includes('PLKB7inGcWpEY'))) {
        leadVideoId = 'bcjXgHGTBDQ';
      }

      if (leadVideoId) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${leadVideoId}?list=${listId}&autoplay=1&${muteParam}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`,
        };
      }
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1&${muteParam}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`,
      };
    }

    if (watchMatch && watchMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&${muteParam}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`,
      };
    }

    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    const ytShortsMatch = clean.match(/youtube\.com\/shorts\/([^"&?\/\s]+)/i);
    if (ytShortsMatch && ytShortsMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${ytShortsMatch[1]}?autoplay=1&${muteParam}&playsinline=1&enablejsapi=1&rel=0`,
      };
    }

    // Embed URL directly
    if (clean.includes('/embed/')) {
      const separator = clean.includes('?') ? '&' : '?';
      return {
        type: 'youtube',
        embedUrl: `${clean}${separator}autoplay=1&${muteParam}&playsinline=1&enablejsapi=1&rel=0`,
      };
    }
  }

  // 2. Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = clean.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1&${muteParam}`,
    };
  }

  // 3. Direct video link (.mp4, .webm, .ogg)
  if (/\.(mp4|webm|ogg)($|\?)/i.test(clean)) {
    return {
      type: 'direct',
      embedUrl: clean,
    };
  }

  // Fallback: If already an embed or valid https url
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return {
      type: 'youtube',
      embedUrl: clean,
    };
  }

  return { type: 'invalid', embedUrl: '' };
}

export const EntertainmentHub: React.FC<EntertainmentHubProps> = ({ onNavigate, onAskAI }) => {
  // --- Smart TV States ---
  const [videoInput, setVideoInput] = useState<string>('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(DEFAULT_OFFICIAL_PLAYLIST);
  const [isUserCustomVideo, setIsUserCustomVideo] = useState<boolean>(false);
  const userHasChangedVideoRef = useRef<boolean>(false);
  const [adminBroadcast, setAdminBroadcast] = useState<SmartTvBroadcast | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const tvIframeRef = useRef<HTMLIFrameElement>(null);

  // --- Community Chat States ---
  const [chatMessages, setChatMessages] = useState<CommunityChatMessage[]>([]);
  const [userChatName, setUserChatName] = useState<string>('IOIS साथी');
  const [chatInputText, setChatInputText] = useState<string>('');
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- Video Call Simulator States ---
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // --- Gallery & Photos States ---
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<GalleryPhoto | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // 1. Fetch initial Smart TV Admin Broadcast
  const fetchSmartTvBroadcast = useCallback(async () => {
    try {
      const res = await fetch('/api/smart-tv');
      if (res.ok) {
        const data = await res.json();
        if (data.broadcast) {
          setAdminBroadcast(data.broadcast);
          // If the visitor hasn't manually entered/chosen another video, play the broadcast / official playlist
          if (!userHasChangedVideoRef.current && data.broadcast.videoUrl) {
            setActiveVideoUrl(data.broadcast.videoUrl);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching smart tv broadcast:', err);
    }
  }, []);

  // 2. Fetch Community Chat Messages
  const fetchCommunityChat = useCallback(async () => {
    try {
      const res = await fetch('/api/community-chat');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setChatMessages(data.messages);
        }
      }
    } catch (err) {
      console.error('Error fetching community chat:', err);
    }
  }, []);

  // 3. Fetch Gallery Photos
  const fetchGalleryPhotos = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.photos)) {
          setGalleryPhotos(data.photos);
        }
      }
    } catch (err) {
      console.error('Error fetching gallery photos:', err);
    }
  }, []);

  useEffect(() => {
    fetchSmartTvBroadcast();
    fetchCommunityChat();
    fetchGalleryPhotos();

    // Periodic chat update poll every 4 seconds
    const interval = setInterval(() => {
      fetchCommunityChat();
    }, 4000);

    return () => clearInterval(interval);
  }, [fetchSmartTvBroadcast, fetchCommunityChat, fetchGalleryPhotos]);

  // Handle Play Custom Link
  const handlePlayVideo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!videoInput.trim()) return;
    userHasChangedVideoRef.current = true;
    setIsUserCustomVideo(true);
    setActiveVideoUrl(videoInput.trim());
  };

  // Preset Channel Selector
  const handlePresetSelect = (url: string) => {
    userHasChangedVideoRef.current = true;
    setIsUserCustomVideo(true);
    setVideoInput(url);
    setActiveVideoUrl(url);
  };

  // Reset to Default Official IOIS Playlist
  const handleResetToDefaultPlaylist = () => {
    userHasChangedVideoRef.current = false;
    setIsUserCustomVideo(false);
    setVideoInput('');
    setActiveVideoUrl(DEFAULT_OFFICIAL_PLAYLIST);
  };

  // Toggle Audio Mute/Unmute for TV Player
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      if (nextMuted) {
        tvIframeRef.current?.contentWindow?.postMessage(
          '{"event":"command","func":"mute","args":""}',
          '*'
        );
      } else {
        tvIframeRef.current?.contentWindow?.postMessage(
          '{"event":"command","func":"unMute","args":""}',
          '*'
        );
        tvIframeRef.current?.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
    } catch {
      // Ignored
    }
  };

  // Force Start / Restart Video Playback
  const handleForcePlay = () => {
    setIsMuted(false);
    try {
      tvIframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"unMute","args":""}',
        '*'
      );
      tvIframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    } catch {
      // Ignored
    }
  };

  // Send Community Chat Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    setIsSendingChat(true);
    try {
      const res = await fetch('/api/community-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userChatName.trim() || 'IOIS विज़िटर',
          text: chatInputText.trim(),
          avatar: '🇮🇳',
        }),
      });

      if (res.ok) {
        setChatInputText('');
        fetchCommunityChat();
        setTimeout(() => {
          chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error('Error sending chat message:', err);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Quick Emoji Reaction
  const handleSendReaction = (emoji: string) => {
    setChatInputText((prev) => `${prev} ${emoji}`.trim());
  };

  // Video Call: Start WebRTC camera stream
  const startVideoCall = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsCallActive(true);
        setIsCameraOn(true);
        setIsMicOn(true);
      } else {
        setCameraError('आपके ब्राउज़र में कैमरा एक्सेस समर्थित नहीं है या अनुमति अस्वीकृत है।');
      }
    } catch (err: any) {
      console.warn('Camera access error or permission denied:', err);
      // Fallback simulator mode so user can still experience the call room
      setIsCallActive(true);
      setCameraError('कैमरा अनुमति नहीं मिली, सिम्युलेटर मोड सक्रिय किया गया।');
    }
  };

  // Video Call: Stop stream
  const stopVideoCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setIsCallActive(false);
  };

  // Video Call: Toggle Camera Track
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    } else {
      setIsCameraOn(!isCameraOn);
    }
  };

  // Video Call: Toggle Mic Track
  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    } else {
      setIsMicOn(!isMicOn);
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const videoMeta = convertToEmbedUrl(activeVideoUrl, isMuted);

  const filteredPhotos = selectedCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === selectedCategory);

  const handleSharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IOIS Smart TV & Entertainment Hub',
          text: 'बिना रीडायरेक्ट हुए अपने मनपसंद वीडियो देखें, फोटो शेयर करें और कम्युनिटी चैट का आनंद लें:',
          url: window.location.href,
        });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 rounded-3xl border-2 border-amber-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Tv className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>IOIS SMART TV &bull; ऑल-इन-वन मनोरंजन व कम्युनिटी हब</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tiranga-text tracking-tight">
              IOIS स्मार्ट टीवी, वीडियो कॉल एवं फोटो एल्बम
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              यूट्यूब, भजन, समाचार या किसी भी वीडियो का लिंक पेस्ट करें और बिना किसी रीडायरेक्ट के यहीं आनंद लें। साथ ही ग्रुप कम्युनिटी चैट, वीडियो कॉल और IOIS की 15+ फोटो गैलरी देखें!
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleSharePage}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copiedLink ? 'लिंक कॉपी हुआ!' : 'स्मार्ट टीवी शेयर करें'}</span>
            </button>

            <button
              onClick={() => onAskAI('IOIS Smart TV का उपयोग कैसे करें और इसमें वीडियो लिंक कैसे चलाएं?')}
              className="btn-gold-gradient text-xs px-4 py-2.5 font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI सहायता</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Admin Live Broadcast Featured Bar (If Admin set a special link) */}
      {adminBroadcast && adminBroadcast.videoUrl && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-950 to-emerald-950/70 border-2 border-amber-500/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Radio className="w-5 h-5 animate-pulse text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-md animate-pulse">
                  एडमिन स्पेशल लाइव
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {adminBroadcast.title || 'IOIS ऑफिशियल ब्रॉडकास्ट'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {adminBroadcast.description || 'एडमिन द्वारा सभी विज़िटर्स के लिए विशेष रूप से सेट किया गया वीडियो'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveVideoUrl(adminBroadcast.videoUrl);
              setVideoInput(adminBroadcast.videoUrl);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>यह ब्रॉडकास्ट देखें</span>
          </button>
        </div>
      )}

      {/* 3. Main Smart TV Screen & Community Chat Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Smart TV Cinema Screen */}
        <div className="lg:col-span-2 space-y-4">
          {/* Active Broadcast Mode Banner */}
          {activeVideoUrl.includes('PLKB7inGcWpEY') ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/10 border border-amber-500/40 rounded-2xl p-3.5 text-xs text-amber-200 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
                  <Play className="w-4 h-4 fill-current animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-300 text-xs sm:text-sm">
                      IOIS ऑफिशियल वीडियो प्लेलिस्ट लाइव
                    </span>
                    <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded uppercase animate-pulse">
                      डिफ़ॉल्ट
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    जब तक कोई यूजर खुद से कोई अन्य वीडियो लिंक न चलाए, यह प्लेलिस्ट स्वतः चलती रहेगी। आवाज़ सुनने के लिए नीचे <strong className="text-amber-300">[🔊 आवाज़ चालू करें]</strong> दबाएं।
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-900/80 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-mono shrink-0 hidden sm:inline-block">
                Playlist ID: PLKB7inGcWpEY
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-3.5 text-xs text-emerald-200 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-black text-white text-xs sm:text-sm">
                    आपका कस्टम वीडियो सक्रिय है
                  </div>
                  <p className="text-[11px] text-slate-300">
                    आप अपना चुना हुआ वीडियो देख रहे हैं। मूल प्लेलिस्ट पर लौटने के लिए बटन दबाएं।
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetToDefaultPlaylist}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>IOIS मुख्य प्लेलिस्ट पर लौटें</span>
              </button>
            </div>
          )}

          {/* Cinema Frame */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-slate-800 bg-black shadow-[0_0_50px_rgba(212,175,55,0.15)] group">
            {/* TV Screen Top Bezel */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-black text-white text-[11px] tracking-wider uppercase">
                  IOIS SMART TV ULTRA HD
                </span>
                <span className="text-[9px] bg-amber-500/20 border border-amber-500/40 text-amber-300 px-1.5 py-0.5 rounded">
                  {activeVideoUrl.includes('PLKB7inGcWpEY') ? 'OFFICIAL PLAYLIST' : 'USER CUSTOM'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>लाइव स्ट्रीमिंग सक्रिय</span>
              </div>
            </div>

            {/* Video Player Display Area */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {videoMeta.type === 'youtube' || videoMeta.type === 'vimeo' ? (
                <iframe
                  ref={tvIframeRef}
                  key={`${videoMeta.embedUrl}-${isMuted}`}
                  src={videoMeta.embedUrl}
                  title="IOIS Smart TV Video Player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : videoMeta.type === 'direct' ? (
                <video
                  src={videoMeta.embedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  आपका ब्राउज़र HTML5 वीडियो का समर्थन नहीं करता है।
                </video>
              ) : (
                <div className="p-8 text-center space-y-3">
                  <Film className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400">अमान्य वीडियो लिंक। कृपया एक वैध यूट्यूब या वीडियो URL दर्ज करें।</p>
                </div>
              )}
            </div>

            {/* TV Screen Bottom Bar with Unmute and Controls */}
            <div className="bg-slate-950/95 px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-md ${
                    isMuted
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isMuted ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 fill-current" />
                      <span>🔊 आवाज़ चालू करें (Unmute Audio)</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span>🔇 म्यूट करें (Muted)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleForcePlay}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                  title="सीधे प्ले / रीस्टार्ट करें"
                >
                  <Play className="w-3 h-3 fill-current text-amber-400" />
                  <span>▶️ प्ले / रीस्टार्ट</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isMuted ? 'ऑटोप्ले सक्रिय (म्यूट)' : 'लाइव ऑडियो सक्रिय'}</span>
                <span>•</span>
                <span>1080p 60FPS</span>
              </div>
            </div>
          </div>

          {/* Paste Custom Link Input Bar */}
          <form onSubmit={handlePlayVideo} className="glass-card-premium p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <label className="text-xs font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>अपने मनपसंद वीडियो का लिंक पेस्ट करें (बिना कहीं गए यहीं देखें):</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                placeholder="यूट्यूब, यूट्यूब शॉर्ट्स या MP4 वीडियो लिंक पेस्ट करें (उदा. https://www.youtube.com/watch?v=...)"
                className="flex-1 bg-slate-900 border border-slate-700 text-white px-3.5 py-2.5 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-gold-gradient px-5 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>प्ले करें</span>
              </button>
            </div>

            {/* Curated Preset Channels */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-slate-400 font-bold">त्वरित चैनल:</span>
              <button
                type="button"
                onClick={handleResetToDefaultPlaylist}
                className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeVideoUrl.includes('PLKB7inGcWpEY')
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>⭐ IOIS मुख्य प्लेलिस्ट (डिफ़ॉल्ट)</span>
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('https://www.youtube.com/watch?v=kqtD5dpn9C8')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-400 cursor-pointer"
              >
                🕉️ भक्ति व शांति
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('https://www.youtube.com/watch?v=21X5lGlDOfg')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-400 cursor-pointer"
              >
                🪐 स्पेस व साइंस
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-400 cursor-pointer"
              >
                🎵 क्लासिक म्यूजिक
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('https://www.youtube.com/watch?v=m7Bc3tXtVio')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-400 cursor-pointer"
              >
                💻 कंप्यूटर स्किल
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Community Live Chat Room */}
        <div className="glass-card-premium p-4 sm:p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col h-[560px] shadow-2xl justify-between">
          <div className="space-y-2 border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white">कम्युनिटी लाइव चैट</h3>
              </div>
              <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span>लाइव</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              वीडियो देखते-देखते दूसरे साथियों से विचार साझा करें:
            </p>

            {/* Sender Name Bar */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400">आपका नाम:</span>
              <input
                type="text"
                value={userChatName}
                onChange={(e) => setUserChatName(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white text-[11px] px-2 py-0.5 rounded-md focus:outline-none focus:border-amber-400"
                placeholder="उदा. राहुल, पूजा..."
              />
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1 text-xs">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <span>{msg.avatar || '👤'}</span>
                    <span>{msg.sender}</span>
                  </span>
                  <span className="text-slate-400 font-mono">{msg.time}</span>
                </div>
                <p className="text-slate-200 text-[11px] leading-relaxed break-words">{msg.text}</p>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Reaction Emojis */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-2 px-1 text-sm">
            <button onClick={() => handleSendReaction('👍')} className="hover:scale-125 transition cursor-pointer">👍</button>
            <button onClick={() => handleSendReaction('❤️')} className="hover:scale-125 transition cursor-pointer">❤️</button>
            <button onClick={() => handleSendReaction('🇮🇳')} className="hover:scale-125 transition cursor-pointer">🇮🇳</button>
            <button onClick={() => handleSendReaction('👏')} className="hover:scale-125 transition cursor-pointer">👏</button>
            <button onClick={() => handleSendReaction('🔥')} className="hover:scale-125 transition cursor-pointer">🔥</button>
            <button onClick={() => handleSendReaction('🎉')} className="hover:scale-125 transition cursor-pointer">🎉</button>
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="mt-2 flex gap-1.5">
            <input
              type="text"
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              placeholder="एक संदेश लिखें..."
              className="flex-1 bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-xl text-xs focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSendingChat || !chatInputText.trim()}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 4. IOIS Live Video & Audio Call Room */}
      <div className="glass-card-premium p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-green-400 uppercase tracking-wider">
              <Video className="w-4 h-4 text-green-400" />
              <span>IOIS कम्युनिटी वीडियो एवं ऑडियो कॉल रूम</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              साथियों व मेंटर्स के साथ लाइव वीडियो संवाद
            </h2>
            <p className="text-xs text-slate-400">
              अपने कैमरे और माइक से सीधे जुड़ें। अपनी डिजिटल शंकाओं पर आमने-सामने चर्चा करें।
            </p>
          </div>

          {!isCallActive ? (
            <button
              onClick={startVideoCall}
              className="btn-gold-gradient px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <Video className="w-4 h-4" />
              <span>वीडियो कॉल शुरू करें</span>
            </button>
          ) : (
            <button
              onClick={stopVideoCall}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-xl"
            >
              <VideoOff className="w-4 h-4" />
              <span>कॉल समाप्त करें</span>
            </button>
          )}
        </div>

        {cameraError && (
          <div className="p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl text-amber-300 text-xs">
            {cameraError}
          </div>
        )}

        {/* Video Call Grids */}
        {isCallActive ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* User Live Camera Tile */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500/60 shadow-lg flex items-center justify-center">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
                />
                {!isCameraOn && (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Camera className="w-8 h-8 text-slate-500" />
                    <span className="text-xs font-bold">कैमरा बंद है</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>आप ({userChatName})</span>
                  {!isMicOn && <MicOff className="w-3 h-3 text-red-400 ml-1" />}
                </div>
              </div>

              {/* Peer 1: IOIS Mentor Tile */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                  alt="IOIS Mentor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span>सुमन गुप्ता (IOIS मेंटर - पटना)</span>
                </div>
                <div className="absolute top-2 right-2 bg-black/60 p-1 rounded text-green-400">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>

              {/* Peer 2: Student Peer Tile */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                  alt="IOIS Peer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span>रोहित वर्मा (Plan 03 स्टूडेंट)</span>
                </div>
              </div>
            </div>

            {/* In-Call Controls Bar */}
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center gap-4">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-full border transition cursor-pointer ${
                  isMicOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-red-600 text-white border-red-500'
                }`}
                title={isMicOn ? 'माइक म्यूट करें' : 'माइक अनम्यूट करें'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleCamera}
                className={`p-3 rounded-full border transition cursor-pointer ${
                  isCameraOn ? 'bg-slate-800 text-white border-slate-700' : 'bg-red-600 text-white border-red-500'
                }`}
                title={isCameraOn ? 'कैमरा बंद करें' : 'कैमरा चालू करें'}
              >
                {isCameraOn ? <Camera className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={stopVideoCall}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                कॉल काटें
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <Users className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">कम्युनिटी वीडियो कॉल रूम तैयार है</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              ऊपर "वीडियो कॉल शुरू करें" बटन पर क्लिक करके अपने वेबकैम व माइक से सीधे रूम में प्रवेश करें।
            </p>
          </div>
        )}
      </div>

      {/* 5. IOIS Photo Album & Gallery (15+ Photos History) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>IOIS फोटो एल्बम एवं ऐतिहासिक गैलरी ({galleryPhotos.length} तस्वीरें)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              IOIS यात्रा, कार्यशालाएं एवं सम्मान समारोह
            </h2>
            <p className="text-xs text-slate-400">
              एडमिन द्वारा समय-समय पर अपलोड की गई प्रामाणिक तस्वीरें व यादगार पल।
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'डिजिटल लर्निंग', 'सफलता की कहानियां', 'आयोजन व सम्मान', 'कार्यालय व टीम'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black font-black shadow-md'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'सभी तस्वीरें' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoModal(photo)}
              className="glass-card-premium rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400/60 transition group cursor-pointer shadow-lg flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                  {photo.category}
                </span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-amber-400 text-black font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>बड़ा देखें</span>
                  </span>
                </div>
              </div>

              <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                  {photo.title}
                </h4>
                {photo.description && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Gallery Photo */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card-premium bg-slate-950 border-2 border-amber-500/50 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400">
                  {selectedPhotoModal.category}
                </span>
                <h3 className="text-lg font-black text-white">{selectedPhotoModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative max-h-[60vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhotoModal.url}
                alt={selectedPhotoModal.title}
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
            </div>

            {selectedPhotoModal.description && (
              <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {selectedPhotoModal.description}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <a
                href={selectedPhotoModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>मूल साइज में खोलें</span>
              </a>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="btn-gold-gradient px-5 py-2 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
