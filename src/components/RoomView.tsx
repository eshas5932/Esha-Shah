import React from 'react';
import { EraRoom, Exhibit, VisitorTicket } from '../types';
import { retroAudio } from '../utils/audio';
import { 
  ArrowLeft, Sparkles, Award, Clock, Compass, HelpCircle, 
  Volume2, Disc, Play, ExternalLink, ShieldCheck 
} from 'lucide-react';

interface RoomViewProps {
  era: EraRoom;
  ticket: VisitorTicket;
  onBackToLobby: () => void;
  onSelectExhibit: (exhibit: Exhibit) => void;
  onNextEra?: (nextEraId: string) => void;
  onPrevEra?: (prevEraId: string) => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  era,
  ticket,
  onBackToLobby,
  onSelectExhibit,
  onNextEra,
  onPrevEra
}) => {
  const getEraIcon = (eraId: string) => {
    switch (eraId) {
      case 'early-internet':
        return '📟';
      case 'social-internet':
        return '💬';
      case 'aesthetic-internet':
        return '🌸';
      case 'algorithm-era':
        return '🔮';
      case 'modern-internet':
        return '⚡';
      case 'cyber-cafe':
        return '☕';
      default:
        return '🏛️';
    }
  };

  const getEraSoundtrack = (eraId: string) => {
    switch (eraId) {
      case 'early-internet':
        return '56k Dial-Up Modem Beeps';
      case 'social-internet':
        return 'MSN Nudge & ICQ “Uh-oh!”';
      case 'aesthetic-internet':
        return '6-Second Vine Looping Audio';
      case 'algorithm-era':
        return 'Snapchat Ping & TikTok Earworm';
      case 'modern-internet':
        return '24/7 Notification Stream';
      case 'cyber-cafe':
        return 'Counter-Strike 1.6 & CD Burner';
      default:
        return 'Retro Chimes';
    }
  };

  return (
    <div id={`room-view-${era.id}`} className="w-full space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* Room Header & Navigation Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => {
            retroAudio.playClick();
            onBackToLobby();
          }}
          className="bg-zinc-900 hover:bg-zinc-800 text-gray-300 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-colors border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" /> Back to Grand Lobby
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono">
            {era.years}
          </span>
          <span className="text-xs bg-zinc-900 text-gray-300 border border-white/10 px-3 py-1 rounded-full font-mono">
            Sound: {getEraSoundtrack(era.id)}
          </span>
        </div>
      </div>

      {/* Room Hero Presentation */}
      <div className="bg-gradient-to-br from-black via-zinc-950 to-black border border-blue-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl p-2.5 bg-zinc-900 border border-white/10 rounded-2xl">
            {era.badgeIcon || getEraIcon(era.id)}
          </span>
          <div>
            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white uppercase">
              {era.title}
            </h1>
            <p className="text-sm sm:text-base text-blue-300 font-sans italic mt-0.5">
              "{era.subTitle}"
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans max-w-3xl">
          {era.description}
        </p>

        {/* Era Cultural Atmosphere Details */}
        <div className="bg-zinc-900/80 border border-white/10 p-4 rounded-xl space-y-2 text-xs">
          <span className="font-bold text-blue-400 uppercase tracking-widest block font-mono text-[10px]">
            Era Atmosphere & Signature Quote:
          </span>
          <p className="text-gray-200 italic font-serif text-sm">
            {era.bannerQuote}
          </p>
          <p className="text-gray-400 mt-1">
            <strong className="text-gray-200 font-mono text-[11px]">Theme Keywords:</strong> {era.theme}
          </p>
        </div>
      </div>

      {/* Interactive Exhibits Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-2">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
              ★ ACTIVE INSTALLATIONS ★
            </span>
            <h3 className="text-xl font-bold uppercase text-white tracking-wide">
              Interactive Exhibits ({era.exhibits.length})
            </h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            Click any exhibit to launch simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {era.exhibits.map((exhibit) => {
            const isExplored = ticket.visitedExhibits.includes(exhibit.id);
            const isMemoryUnlocked = ticket.unlockedMemories.some((m) =>
              m.title.toLowerCase().includes(exhibit.name.toLowerCase())
            );

            return (
              <div
                key={exhibit.id}
                onClick={() => {
                  retroAudio.playClick();
                  onSelectExhibit(exhibit);
                }}
                className="group bg-black/40 hover:bg-zinc-900/80 border border-white/10 hover:border-blue-500/50 p-5 rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded">
                      {exhibit.years}
                    </span>
                    {isExplored && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        ✓ Visited
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors uppercase tracking-wide">
                      {exhibit.name}
                    </h4>
                    <p className="text-xs text-blue-200/80 italic font-serif mt-0.5">
                      "{exhibit.tagline}"
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {exhibit.whatWasIt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">
                    Interactive Lab
                  </span>
                  <span className="font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-mono uppercase text-[11px]">
                    Launch <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relics & Ephemera Showcase */}
      <div className="bg-black/40 border border-white/10 p-5 sm:p-7 rounded-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h4 className="font-bold text-base text-white uppercase tracking-wider">
            {era.title} Artifacts & Cultural Ephemera
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-zinc-900/80 border border-white/10 p-3.5 rounded-xl space-y-1 text-xs">
            <span className="font-mono text-blue-300 text-[10px] uppercase tracking-wider block">Era Aesthetic Theme</span>
            <p className="text-[11px] text-gray-300 leading-snug">{era.theme}</p>
          </div>
          <div className="bg-zinc-900/80 border border-white/10 p-3.5 rounded-xl space-y-1 text-xs">
            <span className="font-mono text-blue-300 text-[10px] uppercase tracking-wider block">Signature Audio Tone</span>
            <p className="text-[11px] text-gray-300 leading-snug">{getEraSoundtrack(era.id)}</p>
          </div>
          <div className="bg-zinc-900/80 border border-white/10 p-3.5 rounded-xl space-y-1 text-xs">
            <span className="font-mono text-blue-300 text-[10px] uppercase tracking-wider block">Years Active</span>
            <p className="text-[11px] text-gray-300 leading-snug">{era.years}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
