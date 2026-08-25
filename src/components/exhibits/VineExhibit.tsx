import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Repeat, Heart, Play, Volume2, Sparkles, Zap, MessageSquare } from 'lucide-react';

interface VineExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const VineExhibit: React.FC<VineExhibitProps> = ({ onUnlockMemory }) => {
  const [activeVineIndex, setActiveVineIndex] = useState<number>(0);
  const [loopProgress, setLoopProgress] = useState<number>(0);
  const [revineCount, setRevineCount] = useState<number>(312450);
  const [hasRevined, setHasRevined] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const iconicVines = [
    {
      id: 1,
      creator: 'Little Girl in Field',
      quote: '“Look at all those CHICKENS! 🦆🦆🦆”',
      subtext: '(They were clearly ducks)',
      icon: '🦆',
      bgGradient: 'from-emerald-800 to-teal-950',
      loops: '48.9M loops'
    },
    {
      id: 2,
      creator: 'Hot Tub Bros',
      quote: '“Two bros, chillin in a hot tub, five feet apart cuz they’re not gay.”',
      subtext: 'Pure musical acoustic genius',
      icon: '🛁',
      bgGradient: 'from-blue-900 to-indigo-950',
      loops: '64.2M loops'
    },
    {
      id: 3,
      creator: 'Drew Gooden',
      quote: '“Road work ahead? Uh, yeah, I sure HOPE it does!”',
      subtext: 'The apex of dad joke delivery',
      icon: '🚧',
      bgGradient: 'from-amber-900 to-orange-950',
      loops: '82.1M loops'
    },
    {
      id: 4,
      creator: 'Del Taco Fan',
      quote: '“Get to Del Taco, they got a new thing called Freesha—... Freeesh Vacadoo!”',
      subtext: 'Pronunciation perfection',
      icon: '🥑',
      bgGradient: 'from-green-900 to-emerald-950',
      loops: '51.3M loops'
    }
  ];

  const currentVine = iconicVines[activeVineIndex];

  const handleRevine = () => {
    retroAudio.playVineBoom();
    setRevineCount((prev) => prev + 1);
    setHasRevined(true);
    onUnlockMemory?.('vine-revine');
  };

  const handleSwitchVine = (idx: number) => {
    retroAudio.playClick();
    setActiveVineIndex(idx);
    setLoopProgress(0);
    retroAudio.playVineBoom();
  };

  // 6-second looping timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setLoopProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / 60); // 6 seconds = 60 ticks of 100ms
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div id="vine-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-emerald-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* Vine Phone Frame */}
      <div className="w-full max-w-sm bg-[#00b488] text-white rounded-3xl p-3 shadow-2xl border-4 border-[#008f6b] overflow-hidden font-sans">
        
        {/* Vine Header */}
        <div className="flex justify-between items-center px-3 py-2 text-xs font-bold border-b border-emerald-700/50">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tighter text-white">vine</span>
          </div>
          <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded-full font-mono">
            6.0s LOOP
          </span>
        </div>

        {/* 6-Second Looping Video Box */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center p-6 text-center shadow-inner mt-2">
          
          {/* Progress Ring / Top Bar (6s countdown) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-800">
            <div
              className="h-full bg-[#00b488] transition-all duration-100 ease-linear"
              style={{ width: `${loopProgress}%` }}
            />
          </div>

          <div className={`w-full h-full rounded-xl bg-gradient-to-br ${currentVine.bgGradient} flex flex-col items-center justify-center p-4`}>
            <div className="text-5xl mb-3 animate-pulse">{currentVine.icon}</div>
            <h3 className="font-extrabold text-base md:text-lg text-white leading-snug drop-shadow-md">
              {currentVine.quote}
            </h3>
            <p className="text-xs text-emerald-200/90 mt-1 italic">{currentVine.subtext}</p>
          </div>

          {/* Looping indicator badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 flex items-center gap-1">
            <Repeat className="w-2.5 h-2.5 animate-spin" /> {currentVine.loops}
          </div>
        </div>

        {/* Vine Engagement Bar */}
        <div className="p-3 flex justify-between items-center text-xs">
          <div>
            <p className="font-bold text-white text-xs">{currentVine.creator}</p>
            <p className="text-[10px] text-emerald-100 font-mono">Original Sound • 2014</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRevine}
              className={`p-2 rounded-full cursor-pointer transition-transform active:scale-125 flex items-center gap-1 ${
                hasRevined ? 'bg-emerald-950 text-white font-bold' : 'bg-emerald-700/60 hover:bg-emerald-600 text-white'
              }`}
              title="Revine to your followers"
            >
              <Repeat className="w-4 h-4" />
              <span className="text-[11px] font-mono">{revineCount.toLocaleString()}</span>
            </button>

            <button
              onClick={() => {
                retroAudio.playClick();
                onUnlockMemory?.('vine-loop');
              }}
              className="p-2 bg-emerald-700/60 hover:bg-emerald-600 rounded-full cursor-pointer text-white"
            >
              <Heart className="w-4 h-4 text-emerald-100" />
            </button>
          </div>
        </div>

        {/* Soundboard Selector */}
        <div className="p-2 bg-emerald-900/50 rounded-xl space-y-1.5 mt-1">
          <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block px-1">
            Iconic 6-Second Vines Soundboard:
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {iconicVines.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => handleSwitchVine(idx)}
                className={`p-1.5 rounded text-[11px] font-bold text-left truncate cursor-pointer transition-all ${
                  activeVineIndex === idx
                    ? 'bg-white text-emerald-900 shadow'
                    : 'bg-emerald-800/80 text-white hover:bg-emerald-700'
                }`}
              >
                {v.icon} {v.quote.slice(0, 14)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Vine launched in 2013 and was shut down by Twitter in 2017. Its 6-second format created an unforgettable era of absurd, rapid-fire comedic timing."
      </p>
    </div>
  );
};
