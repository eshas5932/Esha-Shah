import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Coffee, Clock, Download, Disc, Monitor, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface CyberCafeExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const CyberCafeExhibit: React.FC<CyberCafeExhibitProps> = ({ onUnlockMemory }) => {
  const [timeLeftMinutes, setTimeLeftMinutes] = useState<number>(42);
  const [downloadProgress, setDownloadProgress] = useState<number>(35);
  const [isBurningCD, setIsBurningCD] = useState<boolean>(false);
  const [burnProgress, setBurnProgress] = useState<number>(0);
  const [hasRequestedMoreTime, setHasRequestedMoreTime] = useState<boolean>(false);

  const songsList = [
    { title: 'Kaho_Naa_Pyaar_Hai_Title_Track.mp3', size: '4.2 MB', source: 'Songs.pk' },
    { title: 'Tere_Naam_Sad_Version_128k.mp3', size: '3.8 MB', source: 'CoolGoose.com' },
    { title: 'Atrangi_Yaari_Friendship_Theme.mp3', size: '3.1 MB', source: 'Raaga.com' }
  ];

  const handleRequestTime = () => {
    retroAudio.playClick();
    setTimeLeftMinutes((prev) => prev + 30);
    setHasRequestedMoreTime(true);
    onUnlockMemory?.('cyber-cafe-time');
  };

  const handleBurnNeroCD = () => {
    if (isBurningCD) return;
    retroAudio.playClick();
    setIsBurningCD(true);
    setBurnProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setBurnProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsBurningCD(false);
        retroAudio.playUnlock();
        onUnlockMemory?.('cyber-cafe-cd');
      }
    }, 300);
  };

  return (
    <div id="cyber-cafe-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-emerald-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-2xl bg-[#0f172a] text-neutral-100 border-2 border-emerald-500 rounded-xl shadow-2xl overflow-hidden font-sans">
        
        {/* Cyber Cafe Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 p-3.5 flex items-center justify-between border-b border-emerald-700/60">
          <div className="flex items-center gap-2.5">
            <Coffee className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base text-emerald-300">SHREE SAI CYBER CAFÉ & GAMING ZONE</h3>
              <p className="text-[11px] text-emerald-200 font-mono">CABIN NO. 04 • High-Speed BSNL 256kbps Broadband</p>
            </div>
          </div>

          {/* Token Timer Widget */}
          <div className="bg-black/70 border border-emerald-400/60 px-3 py-1.5 rounded-lg text-center font-mono">
            <span className="text-[10px] text-neutral-400 block leading-none">TIME REMAINING:</span>
            <span className="text-base font-bold text-amber-400">{timeLeftMinutes}:18</span>
          </div>
        </div>

        {/* Cyber Cabin Desk Simulation */}
        <div className="p-4 space-y-4">
          
          {/* Rate & Rules Banner */}
          <div className="bg-emerald-950/40 border border-emerald-600/40 p-3 rounded-lg flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-300">Rates: ₹20 / Hour • ₹10 / Half Hour • Printout: ₹2 / Page</span>
              <p className="text-[11px] text-neutral-400">Strictly no food/drinks near mousepad. Scan pen drive before copying!</p>
            </div>
            <button
              onClick={handleRequestTime}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" /> "Bhaiya, +30 mins please!"
            </button>
          </div>

          {/* Songs.pk Downloading Simulation */}
          <div className="bg-neutral-900 border border-neutral-700 p-3.5 rounded-lg space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-neutral-300">
              <span className="flex items-center gap-1.5"><Download className="w-4 h-4 text-emerald-400" /> Downloading from Songs.pk</span>
              <span className="text-emerald-400 font-mono text-[11px]">28 KB/s</span>
            </div>

            <div className="space-y-2">
              {songsList.map((song, idx) => (
                <div key={idx} className="bg-neutral-950 p-2 rounded border border-neutral-800 flex justify-between items-center text-xs">
                  <div className="truncate max-w-[240px]">
                    <p className="font-mono text-neutral-200 text-[11px] truncate">{song.title}</p>
                    <span className="text-[10px] text-neutral-500">{song.source} • {song.size}</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded font-mono">
                    ✓ Completed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nero Burning ROM CD Writer Simulator */}
          <div className="bg-neutral-900 border border-neutral-700 p-3.5 rounded-lg text-xs space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Disc className={`w-4 h-4 ${isBurningCD ? 'animate-spin text-amber-400' : ''}`} />
                <span>Nero Express: Burn 700MB CD-R for Sony Walkman</span>
              </div>
              {burnProgress === 100 && (
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CD Burned Successfully!
                </span>
              )}
            </div>

            {isBurningCD && (
              <div className="space-y-1">
                <div className="w-full bg-neutral-800 h-3 rounded overflow-hidden">
                  <div className="bg-amber-400 h-full transition-all duration-200" style={{ width: `${burnProgress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Writing Track at 16x Speed (Do not shake CD drive!)...</span>
                  <span>{burnProgress}%</span>
                </div>
              </div>
            )}

            {!isBurningCD && burnProgress !== 100 && (
              <button
                onClick={handleBurnNeroCD}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 px-3 rounded text-xs flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Disc className="w-3.5 h-3.5" /> Burn Selected MP3s to Blank CD (₹15)
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "In the early 2000s, cyber cafés were the primary cultural hubs where millions around the world learned to use email, booked train tickets, printed resumes, and played Counter-Strike 1.6."
      </p>
    </div>
  );
};
