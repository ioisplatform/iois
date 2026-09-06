import React, { useState, useEffect, useCallback } from 'react';
import { PageId } from '../types';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Compass, 
  MapPin, 
  RotateCw, 
  Search, 
  Calendar, 
  Eye, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Navigation,
  CloudLightning,
  Cloud,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface WeatherPageProps {
  onNavigate: (page: PageId) => void;
  onAskAI: (query: string) => void;
}

interface CityOption {
  nameHi: string;
  nameEn: string;
  lat: number;
  lon: number;
  state: string;
}

const PRESET_CITIES: CityOption[] = [
  { nameHi: 'पटना', nameEn: 'Patna', lat: 25.5941, lon: 85.1376, state: 'बिहार' },
  { nameHi: 'नई दिल्ली', nameEn: 'New Delhi', lat: 28.6139, lon: 77.2090, state: 'दिल्ली' },
  { nameHi: 'गया', nameEn: 'Gaya', lat: 24.7914, lon: 85.0002, state: 'बिहार' },
  { nameHi: 'मुजफ्फरपुर', nameEn: 'Muzaffarpur', lat: 26.1209, lon: 85.3647, state: 'बिहार' },
  { nameHi: 'भागलपुर', nameEn: 'Bhagalpur', lat: 25.2425, lon: 86.9842, state: 'बिहार' },
  { nameHi: 'राँची', nameEn: 'Ranchi', lat: 23.3441, lon: 85.3096, state: 'झारखंड' },
  { nameHi: 'लखनऊ', nameEn: 'Lucknow', lat: 26.8467, lon: 80.9462, state: 'उत्तर प्रदेश' },
  { nameHi: 'वाराणसी', nameEn: 'Varanasi', lat: 25.3176, lon: 82.9739, state: 'उत्तर प्रदेश' },
  { nameHi: 'कोलकाता', nameEn: 'Kolkata', lat: 22.5726, lon: 88.3639, state: 'पश्चिम बंगाल' },
  { nameHi: 'मुंबई', nameEn: 'Mumbai', lat: 19.0760, lon: 72.8777, state: 'महाराष्ट्र' },
  { nameHi: 'जयपुर', nameEn: 'Jaipur', lat: 26.9124, lon: 75.7873, state: 'राजस्थान' },
];

// WMO Weather code description helper in Hindi & icon
function decodeWeatherCode(code: number): { textHi: string; icon: any; color: string } {
  if (code === 0) return { textHi: 'साफ़ धूप एवं खुला आसमान', icon: Sun, color: 'text-amber-400' };
  if (code === 1 || code === 2 || code === 3)
    return { textHi: 'आंशिक रूप से बादल छाए रहेंगे', icon: CloudSun, color: 'text-yellow-300' };
  if (code === 45 || code === 48)
    return { textHi: 'कोहरा / सुबह धुंध', icon: Cloud, color: 'text-slate-300' };
  if (code >= 51 && code <= 55)
    return { textHi: 'हल्की बूंदाबांदी / रिमझिम फुहारें', icon: CloudRain, color: 'text-sky-400' };
  if (code >= 61 && code <= 65)
    return { textHi: 'मध्यम से भारी वर्षा', icon: CloudRain, color: 'text-blue-400' };
  if (code >= 80 && code <= 82)
    return { textHi: 'तेज मानसूनी बौछारें', icon: CloudRain, color: 'text-cyan-400' };
  if (code >= 95 && code <= 99)
    return { textHi: 'आंधी-तूफान, मेघ गर्जन व बिजली', icon: CloudLightning, color: 'text-amber-300' };
  return { textHi: 'सामान्य सुहावना मौसम', icon: CloudSun, color: 'text-yellow-400' };
}

export const WeatherPage: React.FC<WeatherPageProps> = ({ onNavigate, onAskAI }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption>(PRESET_CITIES[0]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefreshSec, setAutoRefreshSec] = useState<number>(120); // 2 minutes countdown
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Fetch Live Real Data from Free Open-Meteo API
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('लाइव मौसम डेटा प्राप्त नहीं हो सका');
      const data = await res.json();
      setWeatherData(data);
      setLastUpdated(new Date());
      setAutoRefreshSec(120); // Reset timer
    } catch (err: any) {
      console.error('Weather API error', err);
      setError('लाइव मौसम सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and city changes
  useEffect(() => {
    fetchWeather(selectedCity.lat, selectedCity.lon);
  }, [selectedCity, fetchWeather]);

  // Regular auto-update countdown timer (refreshes automatically)
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoRefreshSec((prev) => {
        if (prev <= 1) {
          fetchWeather(selectedCity.lat, selectedCity.lon);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedCity, fetchWeather]);

  // GPS Location detector
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('आपके ब्राउज़र में जीपीएस लोकेशन सपोर्ट उपलब्ध नहीं है।');
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const gpsCity: CityOption = {
          nameHi: 'मेरी वर्तमान लोकेशन',
          nameEn: 'Current Location',
          lat: latitude,
          lon: longitude,
          state: 'GPS Detected',
        };
        setSelectedCity(gpsCity);
      },
      (err) => {
        console.error('GPS error', err);
        alert('लोकेशन अनुमति नहीं मिली। आप नीचे दी गई सूची से अपना शहर चुन सकते हैं।');
        setIsLoading(false);
      }
    );
  };

  // Search Indian cities via Open-Meteo Geocoding
  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=5&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
        alert('कोई शहर नहीं मिला। कृपया वर्तनी जांचें।');
      }
    } catch (err) {
      console.error('City search error', err);
    } finally {
      setIsSearching(false);
    }
  };

  const current = weatherData?.current;
  const daily = weatherData?.daily;
  const weatherInfo = current ? decodeWeatherCode(current.weather_code) : null;
  const WeatherIconComponent = weatherInfo?.icon || CloudSun;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 rounded-3xl border-2 border-sky-500/30 bg-slate-950/90 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>Free Live Weather API &bull; 100% Real-Time Auto-Update</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tiranga-text tracking-tight">
              लाइव मौसम रिपोर्ट एवं 7 दिवसीय पूर्वानुमान
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              सटीक तापमान, हवा की गति, आर्द्रता, वर्षा की संभावना एवं सूर्योदय-सूर्यास्त का रियल-टाइम विवरण।
            </p>
          </div>

          {/* Auto Update Countdown & Actions */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                ऑटो अपडेट: <strong className="text-amber-400 font-mono">{autoRefreshSec}s</strong> बाद
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchWeather(selectedCity.lat, selectedCity.lon)}
                disabled={isLoading}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-sky-500/40 text-sky-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
                <span>{isLoading ? 'अपडेट जारी...' : 'अभी अपडेट करें'}</span>
              </button>

              <button
                onClick={handleDetectGPS}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="वर्तमान स्थान से मौसम जानें"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GPS लोकेशन</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search & Presets */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-3">
          {/* City Search Form */}
          <form onSubmit={handleSearchCity} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="भारत का कोई भी शहर खोजें (उदा. Ranchi, Delhi, Gorakhpur)..."
                className="w-full bg-slate-900 border border-slate-700 text-white pl-9 pr-3 py-2 rounded-xl text-xs font-semibold focus:border-sky-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer"
            >
              {isSearching ? 'खोज...' : 'खोजें'}
            </button>
          </form>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="p-3 bg-slate-900 border border-sky-500/40 rounded-xl flex flex-wrap gap-2">
              <span className="text-xs font-bold text-sky-400 w-full">खोजे गए स्थान (क्लिक करें):</span>
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCity({
                      nameHi: item.name,
                      nameEn: item.name,
                      lat: item.latitude,
                      lon: item.longitude,
                      state: item.admin1 || item.country,
                    });
                    setSearchResults([]);
                    setSearchQuery('');
                  }}
                  className="px-3 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-white transition cursor-pointer"
                >
                  📍 {item.name}, {item.admin1 || ''} ({item.country})
                </button>
              ))}
            </div>
          )}

          {/* Preset Major City Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400">त्वरित शहर चयन:</span>
            {PRESET_CITIES.map((city) => {
              const isSelected = selectedCity.nameEn === city.nameEn;
              return (
                <button
                  key={city.nameEn}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {city.nameHi}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Live Weather Card */}
      {current && (
        <div className="glass-card-premium p-6 sm:p-10 rounded-3xl bg-slate-950/90 border-2 border-sky-500/40 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            {/* City & Temperature */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-sky-500/15 border-2 border-sky-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <WeatherIconComponent className={`w-12 h-12 ${weatherInfo?.color || 'text-yellow-400'}`} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <h2 className="text-2xl sm:text-4xl font-black text-white">
                    {selectedCity.nameHi} <span className="text-sm sm:text-lg text-slate-400 font-normal">({selectedCity.nameEn})</span>
                  </h2>
                </div>
                <div className="text-xs text-sky-400 font-bold">
                  {selectedCity.state} &bull; लाइव रिपोर्ट {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-200">
                  {weatherInfo?.textHi}
                </div>
              </div>
            </div>

            {/* Giant Degree Celsius */}
            <div className="text-left md:text-right">
              <div className="text-5xl sm:text-7xl font-mono font-black text-white tracking-tight flex items-start md:justify-end">
                <span>{Math.round(current.temperature_2m)}</span>
                <span className="text-3xl sm:text-4xl text-sky-400 font-sans">°C</span>
              </div>
              <div className="text-xs text-slate-400 font-bold mt-1">
                महसूस हो रहा है (Feels Like): <strong className="text-amber-300 font-mono">{Math.round(current.apparent_temperature)}°C</strong>
              </div>
            </div>
          </div>

          {/* 4 Meteorological Gauge Cards (Wind, Humidity, Pressure, Precipitation) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Humidity */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-wider">
                <Droplets className="w-4 h-4" />
                <span>आर्द्रता (Humidity)</span>
              </div>
              <div className="text-2xl font-mono font-black text-white">
                {current.relative_humidity_2m}%
              </div>
              <div className="text-[10px] text-slate-400">वायुमंडल में नमी का स्तर</div>
            </div>

            {/* 2. Wind Speed */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider">
                <Wind className="w-4 h-4" />
                <span>हवा की गति (Wind)</span>
              </div>
              <div className="text-2xl font-mono font-black text-white">
                {current.wind_speed_10m} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
              <div className="text-[10px] text-slate-400">दिशा कोण: {current.wind_direction_10m}°</div>
            </div>

            {/* 3. Precipitation / Rain */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-wider">
                <CloudRain className="w-4 h-4" />
                <span>वर्षा (Precipitation)</span>
              </div>
              <div className="text-2xl font-mono font-black text-white">
                {current.precipitation} <span className="text-xs font-normal text-slate-400">mm</span>
              </div>
              <div className="text-[10px] text-slate-400">वर्तमान वर्षा दर</div>
            </div>

            {/* 4. Air Pressure */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>वायुदाब (Pressure)</span>
              </div>
              <div className="text-2xl font-mono font-black text-white">
                {Math.round(current.surface_pressure)} <span className="text-xs font-normal text-slate-400">hPa</span>
              </div>
              <div className="text-[10px] text-slate-400">सतह वायुमंडलीय दबाव</div>
            </div>
          </div>

          {/* 7-Day Extended Forecast */}
          {daily && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>आगामी 7 दिनों का मौसम पूर्वानुमान (7-Day Forecast)</span>
                </h3>
                <span className="text-xs text-sky-400 font-bold">दैनिक अधिकतम व न्यूनतम तापमान</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {daily.time.map((dateStr: string, idx: number) => {
                  const dateObj = new Date(dateStr);
                  const dayName = idx === 0 ? 'आज' : idx === 1 ? 'कल' : dateObj.toLocaleDateString('hi-IN', { weekday: 'short' });
                  const code = daily.weather_code[idx];
                  const info = decodeWeatherCode(code);
                  const Icon = info.icon;
                  const maxT = Math.round(daily.temperature_2m_max[idx]);
                  const minT = Math.round(daily.temperature_2m_min[idx]);

                  return (
                    <div
                      key={dateStr}
                      className={`p-3.5 rounded-2xl border text-center space-y-2 transition ${
                        idx === 0
                          ? 'bg-sky-500/15 border-sky-400 shadow-md'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-black text-white">{dayName}</div>
                      <div className="text-[10px] text-slate-400">
                        {dateObj.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="flex justify-center my-1">
                        <Icon className={`w-7 h-7 ${info.color}`} />
                      </div>
                      <div className="flex items-center justify-center gap-1 font-mono text-xs">
                        <span className="text-amber-400 font-bold">{maxT}°</span>
                        <span className="text-slate-500">/</span>
                        <span className="text-sky-300 font-bold">{minT}°</span>
                      </div>
                      <div className="text-[9px] text-slate-400 truncate" title={info.textHi}>
                        {info.textHi}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ask AI Weather & Agriculture CTA */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-black text-white">मौसम, खेती, यात्रा या परीक्षा से जुड़ा कोई भी सवाल पूछें</h4>
          <p className="text-xs text-slate-400">IOIS AI आपको बारिश, धूप, यात्रा सुरक्षा एवं कृषि सलाह तुरंत देगा।</p>
        </div>
        <button
          onClick={() => onAskAI(`${selectedCity.nameHi} में आने वाले दिनों में मौसम कैसा रहेगा और क्या यात्रा या खेती के लिए अनुकूल है?`)}
          className="btn-gold-gradient text-xs px-6 py-2.5 font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI से मौसम सलाह लें</span>
        </button>
      </div>
    </div>
  );
};
