import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Sparkles, Flame, Eye, Music, Award, PenTool, Check } from 'lucide-react';

interface GeocitiesExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const GeocitiesExhibit: React.FC<GeocitiesExhibitProps> = ({ onUnlockMemory }) => {
  const [visitorCount, setVisitorCount] = useState<number>(1384);
  const [chaosMode, setChaosMode] = useState<boolean>(false);
  const [hasSignedGuestbook, setHasSignedGuestbook] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestComment, setGuestComment] = useState<string>('');
  const [guestEntries, setGuestEntries] = useState<Array<{ name: string; msg: string; date: string }>>([
    { name: 'X_DragonSlayer_99', msg: 'Awesome homepage!! Check out my DBZ fan page!', date: '04/12/1999' },
    { name: 'SailorMoonFan2000', msg: 'Luv the animated GIFs!! A+++ site!', date: '08/23/1999' }
  ]);

  const handleChaosToggle = () => {
    retroAudio.playClick();
    setChaosMode(!chaosMode);
    if (!chaosMode) {
      onUnlockMemory?.('geocities-chaos');
    }
  };

  const handleSignGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    retroAudio.playUnlock();
    setGuestEntries([
      { name: guestName.trim(), msg: guestComment.trim() || 'Cool site! Keep it up!', date: 'Today' },
      ...guestEntries
    ]);
    setHasSignedGuestbook(true);
    setVisitorCount((prev) => prev + 1);
  };

  return (
    <div id="geocities-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-yellow-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* 90s Browser Chrome */}
      <div className="w-full max-w-2xl bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 rounded-t shadow-2xl overflow-hidden font-sans">
        {/* Netscape Navigator / Internet Explorer Header */}
        <div className="bg-[#000080] text-white px-3 py-1 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-black px-1 rounded text-[10px]">N</span>
            <span>Netscape Navigator - [SpaceDino99’s Cyber Haven]</span>
          </div>
          <div className="flex gap-1">
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">_</button>
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">□</button>
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">X</button>
          </div>
        </div>

        {/* Address Bar */}
        <div className="p-2 border-b border-gray-400 flex items-center gap-2 bg-[#d4d0c8] text-xs">
          <span className="font-bold text-gray-700">Location:</span>
          <div className="win98-inset flex-1 bg-white px-2 py-1 text-xs font-mono select-all text-neutral-900">
            http://www.geocities.com/SiliconValley/Heights/9821/index.html
          </div>
          <button 
            onClick={handleChaosToggle}
            className="win98-btn px-2.5 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-yellow-100"
            title="Inject maximum 1999 HTML chaos"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {chaosMode ? 'Calm Mode' : 'MAX 1999 CHAOS'}
          </button>
        </div>

        {/* The Authentic 1999 Webpage Canvas */}
        <div 
          className={`p-4 md:p-6 transition-all duration-300 min-h-[420px] max-h-[460px] overflow-y-auto ${
            chaosMode 
              ? 'bg-[#000033] text-yellow-300' 
              : 'bg-[#000080] text-white'
          }`}
          style={{
            fontFamily: chaosMode ? '"Comic Sans MS", cursive, sans-serif' : 'Arial, sans-serif'
          }}
        >
          {/* Marquee Banner */}
          <div className="bg-yellow-400 text-black py-1.5 px-3 font-bold text-center border-2 border-dashed border-red-600 shadow-md mb-4 animate-pulse">
            ★ ★ ★ WELCOME TO SPACEDINO99’S CYBER SANCTUARY ★ ★ ★ BEST VIEWED IN NETSCAPE 4.0 ★ ★ ★
          </div>

          {/* Flaming Header */}
          <div className="text-center my-4">
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-6 h-6 text-red-500 animate-bounce" />
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 drop-shadow">
                SpaceDino’s Realm
              </h1>
              <Flame className="w-6 h-6 text-red-500 animate-bounce" />
            </div>
            <p className="text-xs text-yellow-300 mt-1 italic">
              "Under massive reconstruction! Come back often for new MIDI files!"
            </p>
          </div>

          {/* Under Construction Worker Sign */}
          <div className="my-4 border-2 border-yellow-400 bg-black/60 p-3 rounded flex items-center justify-center gap-3 text-center">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black text-xs animate-spin">
              ⚠️
            </div>
            <div className="text-xs text-yellow-200">
              <p className="font-bold uppercase tracking-wider text-yellow-400">🚧 PAGE UNDER CONSTRUCTION 🚧</p>
              <p className="text-[11px] text-neutral-300">Last updated: November 14, 1999 (Added animated cursor!)</p>
            </div>
          </div>

          {/* Interactive Hit Counter */}
          <div className="flex flex-col items-center my-5 bg-neutral-900 border border-green-500 p-2.5 rounded max-w-xs mx-auto text-center">
            <span className="text-[11px] text-green-400 font-mono">YOU ARE LUCKY VISITOR NUMBER:</span>
            <div className="flex gap-1 mt-1 font-pixel text-lg bg-black text-green-400 px-3 py-1 border border-green-600 tracking-widest">
              {visitorCount.toString().padStart(6, '0')}
            </div>
            <span className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
              <Eye className="w-3 h-3 text-green-400" /> Free Web Counter by Bravenet
            </span>
          </div>

          {/* 90s Web Badges / Webring */}
          <div className="my-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="border border-white/40 bg-blue-900 px-2 py-1 rounded text-[10px]">
              🌐 HTML 3.2 Validated
            </span>
            <span className="border border-white/40 bg-purple-900 px-2 py-1 rounded text-[10px]">
              🎵 Sound: ON (MIDI)
            </span>
            <span className="border border-white/40 bg-red-900 px-2 py-1 rounded text-[10px]">
              🚫 No Internet Explorer 2.0
            </span>
          </div>

          {/* Interactive Guestbook Signer */}
          <div className="mt-6 border-2 border-white/30 bg-black/50 p-4 rounded text-left">
            <h3 className="font-bold text-sm text-yellow-300 flex items-center gap-2 mb-3">
              <PenTool className="w-4 h-4 text-yellow-400" />
              Sign My Virtual Guestbook!
            </h3>

            {!hasSignedGuestbook ? (
              <form onSubmit={handleSignGuestbook} className="space-y-2.5 text-xs">
                <input
                  type="text"
                  placeholder="Your Handle (e.g. CyberPunk99)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white text-black px-2.5 py-1.5 rounded font-mono text-xs border border-gray-400"
                  required
                />
                <textarea
                  placeholder="Leave your nostalgic message..."
                  value={guestComment}
                  onChange={(e) => setGuestComment(e.target.value)}
                  rows={2}
                  className="w-full bg-white text-black px-2.5 py-1.5 rounded font-mono text-xs border border-gray-400"
                />
                <button
                  type="submit"
                  className="win98-btn px-4 py-1 text-black font-bold font-sans text-xs cursor-pointer hover:bg-neutral-200 flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" /> Submit to Guestbook
                </button>
              </form>
            ) : (
              <div className="bg-emerald-950/80 border border-emerald-500 p-2.5 rounded text-emerald-300 flex items-center gap-2 text-xs">
                <Check className="w-4 h-4" />
                <span>Thank you for signing my guestbook! You have been awarded +10 Webring Karma.</span>
              </div>
            )}

            {/* Guestbook entries */}
            <div className="mt-4 space-y-2 max-h-32 overflow-y-auto pr-1">
              {guestEntries.map((entry, idx) => (
                <div key={idx} className="bg-neutral-900/80 border border-white/20 p-2 rounded text-[11px]">
                  <div className="flex justify-between text-yellow-300 font-bold">
                    <span>{entry.name}</span>
                    <span className="text-[10px] text-neutral-400">{entry.date}</span>
                  </div>
                  <p className="text-neutral-200 mt-0.5">{entry.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "GeoCities allowed anyone to build homepages categorized into thematic cyber-neighborhoods. Yahoo acquired it in 1999 for $3.57 billion."
      </p>
    </div>
  );
};
