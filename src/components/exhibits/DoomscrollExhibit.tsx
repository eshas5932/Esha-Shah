import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Smartphone, Bell, Flame, AlertOctagon, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface DoomscrollExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const DoomscrollExhibit: React.FC<DoomscrollExhibitProps> = ({ onUnlockMemory }) => {
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [scrollDepth, setScrollDepth] = useState<number>(1);
  const [sensoryOverload, setSensoryOverload] = useState<number>(68);

  const modernFeed = [
    { id: 1, type: 'video', author: '@speed_hustle', text: 'If you are not waking up at 3:45 AM and drinking cold water with salt, you are wasting your 20s. #grindset', likes: '1.2M', icon: '⏰' },
    { id: 2, type: 'ai-art', author: '@synthetic_dreams', text: 'Check out this AI-generated hyperrealistic image of an astronaut playing guitar on Jupiter! Real or fake? 🤯', likes: '890K', icon: '🤖' },
    { id: 3, type: 'rage', author: '@unfiltered_takes', text: 'Unpopular opinion: Putting milk before cereal should be a felony. Discuss in comments!', likes: '450K', icon: '🥛' },
    { id: 4, type: 'brainrot', author: '@skibidi_hub', text: 'Only true legends know the unspoken rizz of Ohio Sigma phonk music 🗿🍷', likes: '3.4M', icon: '🗿' },
    { id: 5, type: 'sponsored', author: '@magic_mattress', text: 'SPONSORED: Our revolutionary memory foam pillow cured my existential dread in 4 nights.', likes: '21K', icon: '🛌' }
  ];

  const incomingNotifications = [
    '🔴 BREAKING: Unbelievable thing happened in another country!',
    '💬 14 friends sent you reels while you were looking at this reel',
    '⚡ FLASH SALE: 90% off ends in 00:04:12',
    '🔔 @creator_99 is now LIVE: "Staring at a wall for 24 hours straight"'
  ];

  const handleScrollMore = () => {
    retroAudio.playClick();
    setScrollDepth((prev) => prev + 1);
    setSensoryOverload((prev) => Math.min(100, prev + 8));
    setNotificationCount((prev) => prev + 1);
    onUnlockMemory?.('modern-doomscroll');
  };

  const handleTakeBreak = () => {
    retroAudio.playUnlock();
    setSensoryOverload(20);
    setNotificationCount(0);
    onUnlockMemory?.('zen-break');
  };

  return (
    <div id="doomscroll-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-rose-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-md bg-black border-2 border-rose-500 rounded-3xl p-4 shadow-2xl overflow-hidden font-sans text-white">
        
        {/* Phone Top Header with Live Notification Alert */}
        <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-rose-400" />
            <span className="font-bold text-rose-300">ATTENTION ECONOMY 2026</span>
          </div>
          <div className="flex items-center gap-1 bg-rose-950 text-rose-400 px-2 py-0.5 rounded-full border border-rose-800 text-[10px] font-mono">
            <Bell className="w-3 h-3 animate-bounce" /> {notificationCount} Pings
          </div>
        </div>

        {/* Sensory Overload Stress Meter */}
        <div className="my-3 bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 space-y-1">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-neutral-400">Cognitive Load Meter:</span>
            <span className={sensoryOverload > 80 ? 'text-red-400 font-mono' : 'text-amber-400 font-mono'}>
              {sensoryOverload}% (Hyper-Stimulated)
            </span>
          </div>
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                sensoryOverload > 80 ? 'bg-red-500' : 'bg-amber-400'
              }`}
              style={{ width: `${sensoryOverload}%` }}
            />
          </div>
        </div>

        {/* Modern Infinite Stream */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {modernFeed.slice(0, scrollDepth + 2).map((item) => (
            <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-300">{item.author}</span>
                <span className="text-[10px] text-neutral-400">{item.likes} ❤️</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-3xl bg-neutral-800 p-2 rounded-lg">{item.icon}</span>
                <p className="text-xs text-neutral-200 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}

          {/* Random Incoming Push Notification Toast */}
          <div className="bg-rose-950/90 border border-rose-500/60 p-2.5 rounded-lg text-xs text-rose-200 animate-pulse flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-400" />
            <span>{incomingNotifications[scrollDepth % incomingNotifications.length]}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex gap-2">
          <button
            onClick={handleScrollMore}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-transform"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Keep Scrolling (+ Dopamine)
          </button>
          <button
            onClick={handleTakeBreak}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
            title="Calm down cognitive overload"
          >
            🧘 Reset Focus
          </button>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Modern mobile interfaces utilize variable reward schedules—the same psychological mechanism that powers slot machines—to maximize user retention."
      </p>
    </div>
  );
};
