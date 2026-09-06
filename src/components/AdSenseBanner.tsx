import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  client?: string; // e.g. 'ca-pub-XXXXXXXXXXXXXXXX'
  slot?: string;   // e.g. '1234567890'
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  client = 'ca-pub-0000000000000000', // Default placeholder; replace with your Google AdSense Publisher ID
  slot = '1234567890',
  format = 'auto',
  className = '',
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Only attempt push if real publisher ID is configured and not already initialized
    if (!isInitialized.current && client !== 'ca-pub-0000000000000000') {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isInitialized.current = true;
        }
      } catch (err) {
        // Safe catch for adblockers or pending AdSense approvals
        console.debug('AdSense push error (usually harmless if adblocker active):', err);
      }
    }
  }, [client, slot]);

  return (
    <div
      className={`w-full my-6 text-center overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950/40 p-2 sm:p-4 ${className}`}
    >
      {/* Google AdSense Compliant Label */}
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2 select-none">
        विज्ञापन • Advertisement
      </div>

      {/* Responsive AdSense Container */}
      <div className="flex justify-center items-center min-h-[90px] w-full">
        {client !== 'ca-pub-0000000000000000' ? (
          <ins
            ref={adRef}
            className="adsbygoogle block w-full"
            style={{ display: 'block' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        ) : (
          <div className="text-center py-3 px-4 border border-dashed border-slate-800 rounded-xl max-w-md mx-auto">
            <p className="text-xs font-bold text-amber-400/90">
              📢 Google AdSense विज्ञापन स्लॉट (Ready)
            </p>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              AdSense अप्रूवल मिलने के बाद आपका <span className="font-mono text-amber-300">ca-pub-ID</span> यहाँ लाइव विज्ञापनों को प्रदर्शित करेगा।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
