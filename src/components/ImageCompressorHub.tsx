import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  RotateCcw, 
  FileCheck2, 
  ArrowRight 
} from 'lucide-react';

interface ImageCompressorHubProps {
  onNavigate: (page: PageId) => void;
}

export const ImageCompressorHub: React.FC<ImageCompressorHubProps> = ({ onNavigate }) => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [targetMaxKB, setTargetMaxKB] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [reductionPercent, setReductionPercent] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], targetMaxKB);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0], targetMaxKB);
    }
  };

  const processFile = (file: File, maxKB: number) => {
    setOriginalFile(file);
    const originalUrl = URL.createObjectURL(file);
    setOriginalPreview(originalUrl);
    compressImage(file, maxKB);
  };

  const compressImage = async (file: File, maxKB: number) => {
    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Initial dimension scaling if huge
      const maxDimension = 1200;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context failed');

      // Draw white background (prevents transparent PNG turning black)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      let quality = 0.92;
      let step = 0;
      let resultBlob: Blob | null = null;
      const targetBytes = maxKB * 1024;

      // Iterative compression binary search / step down
      while (step < 12) {
        resultBlob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', quality);
        });

        if (!resultBlob) break;

        if (resultBlob.size <= targetBytes) {
          break; // achieved goal
        }

        // Reduce quality or dimensions
        if (quality > 0.3) {
          quality -= 0.12;
        } else {
          // Scale down dimensions if quality is already low
          width = Math.round(width * 0.85);
          height = Math.round(height * 0.85);
          canvas.width = width;
          canvas.height = height;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          quality = 0.75;
        }
        step++;
      }

      if (resultBlob) {
        setCompressedBlob(resultBlob);
        setCompressedPreview(URL.createObjectURL(resultBlob));
        const originalBytes = file.size;
        const saved = Math.max(0, Math.round(((originalBytes - resultBlob.size) / originalBytes) * 100));
        setReductionPercent(saved);
      }
    } catch (err) {
      console.error('Compression error', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iois-compressed-${targetMaxKB}kb.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTargetChange = (kb: number) => {
    setTargetMaxKB(kb);
    if (originalFile) {
      compressImage(originalFile, kb);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-amber-500/20 to-green-500/20 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>100% फ्री ऑनलाइन फोटो कंप्रेसर टूल &bull; Free Image Compressor</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tiranga-text tracking-tight">
          सरकारी फॉर्म व RTPS के लिए फोटो व सिग्नेचर 50KB / 20KB में कंप्रेस करें
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          बिहार RTPS (जातीय/आवासीय/आय), SSC, रेलवे, बैंक, BPSC या किसी भी सरकारी फॉर्म में फोटो और हस्ताक्षर का साइज सीमित मांगा जाता है। यहाँ आप किसी भी बड़ी फोटो को सेकंडों में बिना धुंधला किए मनचाहे KB में कंप्रेस करके तुरंत डाउनलोड कर सकते हैं।
        </p>
      </div>

      {/* Main Compressor Box */}
      <div className="glass-card-premium p-6 sm:p-10 border-2 border-amber-500/40 rounded-3xl bg-slate-950/85 shadow-2xl space-y-8">
        {/* Preset Size Buttons */}
        <div className="space-y-2.5">
          <label className="text-xs font-black text-amber-300 uppercase tracking-wider block">
            1. टारगेट साइज चुनें (आवश्यकतानुसार):
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => handleTargetChange(50)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black transition cursor-pointer ${
                targetMaxKB === 50
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
              }`}
            >
              ⭐ RTPS बिहार फोटो (50 KB से कम)
            </button>
            <button
              onClick={() => handleTargetChange(20)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black transition cursor-pointer ${
                targetMaxKB === 20
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
              }`}
            >
              ✍️ सिग्नेचर / हस्ताक्षर (20 KB से कम)
            </button>
            <button
              onClick={() => handleTargetChange(100)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black transition cursor-pointer ${
                targetMaxKB === 100
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
              }`}
            >
              📄 SSC / रेलवे फॉर्म (100 KB)
            </button>
            <button
              onClick={() => handleTargetChange(200)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-black transition cursor-pointer ${
                targetMaxKB === 200
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400'
              }`}
            >
              📁 दस्तावेज / सर्टिफिकेट (200 KB)
            </button>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-400/50 hover:border-amber-400 rounded-3xl p-8 sm:p-12 text-center bg-slate-900/60 hover:bg-slate-900/90 transition cursor-pointer space-y-4 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/jpg"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto group-hover:scale-110 transition">
            <Upload className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-white">
              फोटो यहाँ खींच कर लाएं या <span className="text-amber-400 underline">क्लिक करके चुनें</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              (JPG, JPEG, PNG फॉर्मेट समर्थित &bull; 100% सुरक्षित आपके डिवाइस पर प्रोसेस होता है)
            </p>
          </div>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="text-center py-4 space-y-2">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs font-bold text-amber-300">
              फोटो को {targetMaxKB} KB में अनुकूलित (Optimize) किया जा रहा है...
            </p>
          </div>
        )}

        {/* Results Comparison Grid */}
        {originalFile && compressedBlob && !isProcessing && (
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>कंप्रेशन सफल! {reductionPercent}% साइज कम हुआ</span>
              </div>
              <span className="text-xs text-slate-300">
                टारगेट: <strong>&le; {targetMaxKB} KB</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Original Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 text-center">
                <span className="text-xs font-bold text-slate-400 block">मूल फोटो (Original)</span>
                {originalPreview && (
                  <div className="h-48 flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="text-xs font-black text-slate-300">
                  साइज: <span className="text-red-400">{(originalFile.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>

              {/* Compressed Card */}
              <div className="bg-slate-950/80 border-2 border-amber-500/40 rounded-xl p-4 space-y-3 text-center shadow-lg">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>कंप्रेस्ड फोटो (Ready for Upload)</span>
                </div>
                {compressedPreview && (
                  <div className="h-48 flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
                    <img
                      src={compressedPreview}
                      alt="Compressed"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="text-xs font-black text-slate-200">
                  नया साइज: <span className="text-green-400 font-extrabold">{(compressedBlob.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleDownload}
                className="btn-gold-gradient text-xs sm:text-sm px-8 py-3.5 font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>कंप्रेस्ड फोटो डाउनलोड करें (Download JPG)</span>
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 text-xs font-bold px-6 py-3.5 rounded-full flex items-center gap-2 cursor-pointer transition"
              >
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>RTPS पोर्टल पर जाएं</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <h3 className="text-sm font-black text-amber-300">बिहार RTPS पोर्टल नियम</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            जातीय, आवासीय व आय प्रमाण पत्र में आवेदक की फोटो 20KB से 50KB के बीच तथा स्पष्ट चेहरे वाली होनी चाहिए।
          </p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <h3 className="text-sm font-black text-blue-300">सिग्नेचर साइज नियम</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            हस्ताक्षर हमेशा सफेद कागज पर काली या नीली स्याही से करके 10KB से 20KB के बीच ही अपलोड करें।
          </p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
          <h3 className="text-sm font-black text-green-300">100% डेटा गोपनीयता</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            आपकी फोटो किसी भी सर्वर पर अपलोड नहीं होती, यह सीधे आपके ब्राउज़र के कैनवास में कंप्रेस होती है।
          </p>
        </div>
      </div>
    </div>
  );
};
