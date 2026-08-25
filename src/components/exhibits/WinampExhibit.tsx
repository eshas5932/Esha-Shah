import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, Disc, Radio } from 'lucide-react';

interface WinampExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const WinampExhibit: React.FC<WinampExhibitProps> = ({ onUnlockMemory }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [activeSkin, setActiveSkin] = useState<'classic' | 'aqua' | 'matrix' | 'neon'>('classic');
  const [eqLevels, setEqLevels] = useState<number[]>([40, 65, 80, 50, 75, 90, 60, 45, 70, 85]);
  const [trackSeconds, setTrackSeconds] = useState<number>(14);

  const playlist = [
    { title: 'Linkin_Park_In_The_End_128kbps.mp3', duration: '03:36', bitrate: '128 kbps', freq: '44.1 kHz' },
    { title: 'Darude_-_Sandstorm_REAL_MP3.mp3', duration: '03:45', bitrate: '192 kbps', freq: '44.1 kHz' },
    { title: 'Eiffel_65_-_Blue_(Da_Ba_Dee).mp3', duration: '03:40', bitrate: '128 kbps', freq: '44.1 kHz' },
    { title: 'Evanescence_Bring_Me_To_Life.mp3', duration: '03:57', bitrate: '160 kbps', freq: '44.1 kHz' },
    { title: 'System_Of_A_Down_Chop_Suey_Napster.mp3', duration: '03:30', bitrate: '128 kbps', freq: '44.1 kHz' }
  ];

  const togglePlay = () => {
    retroAudio.playClick();
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      retroAudio.playWinChime();
      onUnlockMemory?.('winamp-playback');
    }
  };

  const handleNext = () => {
    retroAudio.playClick();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setTrackSeconds(0);
  };

  const handlePrev = () => {
    retroAudio.playClick();
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setTrackSeconds(0);
  };

  const triggerLlamaSound = () => {
    retroAudio.playWinChime();
    onUnlockMemory?.('winamp-llama');
  };

  // Equalizer visualizer bounce
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setEqLevels((prev) =>
          prev.map(() => Math.floor(Math.random() * 85) + 15)
        );
        setTrackSeconds((prev) => prev + 1);
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTrack = playlist[currentTrackIndex];

  // Skin color definitions
  const skinStyles = {
    classic: 'bg-[#292929] border-[#525252] text-[#00ff00]',
    aqua: 'bg-[#1a365d] border-[#3182ce] text-[#63b3ed]',
    matrix: 'bg-black border-[#00ff41] text-[#00ff41]',
    neon: 'bg-[#3b0764] border-[#c084fc] text-[#f472b6]'
  };

  return (
    <div id="winamp-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-emerald-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* Winamp Window Unit */}
      <div className={`w-full max-w-lg border-2 rounded-sm shadow-2xl p-2.5 font-mono ${skinStyles[activeSkin]}`}>
        {/* Winamp Main Header */}
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white px-2 py-1 flex items-center justify-between text-xs font-bold border-b border-neutral-600 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-400 font-pixel text-[10px]">⚡ WINAMP</span>
            <span className="text-[10px] text-neutral-300">v2.91</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={triggerLlamaSound}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-1.5 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer"
              title="Winamp intro sound"
            >
              🦙 Whip The Llama
            </button>
            <div className="flex gap-1 text-[10px] text-neutral-400">
              <span>_</span>
              <span>X</span>
            </div>
          </div>
        </div>

        {/* LCD Display Screen */}
        <div className="bg-black border border-neutral-700 p-2.5 rounded-sm mb-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs mb-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950 text-emerald-400 px-1 rounded text-[10px] font-bold">
                {isPlaying ? 'PLAY' : 'PAUSE'}
              </span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold truncate max-w-[200px]">
                {currentTrackIndex + 1}. {currentTrack.title}
              </span>
            </div>
            <span className="text-emerald-400 text-sm font-pixel tracking-wider">
              {String(Math.floor(trackSeconds / 60)).padStart(2, '0')}:
              {String(trackSeconds % 60).padStart(2, '0')}
            </span>
          </div>

          <div className="flex justify-between items-center text-[10px] text-emerald-600 font-mono border-t border-emerald-950 pt-1">
            <span>{currentTrack.bitrate}</span>
            <span>{currentTrack.freq}</span>
            <span>STEREO</span>
          </div>

          {/* Equalizer Frequency Bars */}
          <div className="flex items-end justify-between gap-1 h-12 mt-2 pt-1 border-t border-neutral-800">
            {eqLevels.map((lvl, i) => (
              <div key={i} className="flex-1 bg-neutral-950 h-full flex items-end">
                <div
                  className="w-full transition-all duration-100"
                  style={{
                    height: `${isPlaying ? lvl : 8}%`,
                    backgroundColor: lvl > 70 ? '#ef4444' : lvl > 45 ? '#eab308' : '#22c55e'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Player Transport Controls */}
        <div className="bg-neutral-800 p-2 rounded-sm flex items-center justify-between border border-neutral-700">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="bg-neutral-700 hover:bg-neutral-600 p-1.5 rounded text-white cursor-pointer shadow active:translate-y-0.5"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePlay}
              className="bg-emerald-700 hover:bg-emerald-600 p-2 rounded text-white cursor-pointer shadow active:translate-y-0.5 font-bold"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              className="bg-neutral-700 hover:bg-neutral-600 p-1.5 rounded text-white cursor-pointer shadow active:translate-y-0.5"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Skin Switcher */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
            <span>Skin:</span>
            <div className="flex gap-1">
              {(['classic', 'aqua', 'matrix', 'neon'] as const).map((skin) => (
                <button
                  key={skin}
                  onClick={() => {
                    retroAudio.playClick();
                    setActiveSkin(skin);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold cursor-pointer ${
                    activeSkin === skin ? 'bg-amber-500 text-black' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  }`}
                >
                  {skin[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Playlist Window */}
        <div className="mt-2 bg-neutral-950 border border-neutral-700 p-2 rounded-sm text-xs space-y-1">
          <div className="text-[10px] text-neutral-400 font-bold border-b border-neutral-800 pb-1 flex justify-between">
            <span>WINAMP PLAYLIST ({playlist.length} TRACKS)</span>
            <span>TOTAL: 18:28</span>
          </div>
          {playlist.map((trk, idx) => (
            <div
              key={idx}
              onClick={() => {
                retroAudio.playClick();
                setCurrentTrackIndex(idx);
                setIsPlaying(true);
              }}
              className={`flex justify-between items-center p-1 rounded cursor-pointer text-[11px] transition-colors ${
                currentTrackIndex === idx
                  ? 'bg-emerald-950/80 text-emerald-400 font-bold'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate max-w-[280px]">
                <span>{idx + 1}.</span>
                <span className="truncate">{trk.title}</span>
              </div>
              <span className="font-mono text-[10px]">{trk.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Winamp was originally created by Justin Frankel and Dmitry Boldyrev in 1997. Over 60 million users customized it with community-designed skins."
      </p>
    </div>
  );
};
