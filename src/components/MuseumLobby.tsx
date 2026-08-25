import React from 'react';
import { MUSEUM_ERAS } from '../data/museumData';
import { EraRoom, VisitorTicket } from '../types';
import { retroAudio } from '../utils/audio';
import { 
  Sparkles, Compass, Award, Ticket, HelpCircle, Calendar, MessageSquare, 
  ArrowRight, Disc, Volume2, VolumeX, ShieldCheck, Zap 
} from 'lucide-react';

interface MuseumLobbyProps {
  ticket: VisitorTicket;
  onSelectEra: (eraId: string) => void;
  onOpenPass: () => void;
  onOpenQuiz: () => void;
  onOpenTimeline: () => void;
  onOpenArchive: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MuseumLobby: React.FC<MuseumLobbyProps> = ({
  ticket,
  onSelectEra,
  onOpenPass,
  onOpenQuiz,
  onOpenTimeline,
  onOpenArchive,
  isMuted,
  onToggleMute
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
    <div id="museum-lobby-view" className="w-full space-y-12 pb-16 animate-in fade-in duration-300">
      
      {/* Immersive UI Hero Section */}
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                Current Era: Grand Lobby
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-[10px] uppercase tracking-widest text-blue-400 font-mono">
                1995 — 2026 Archives
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Select an <span className="italic text-blue-400 font-normal">Exhibition Room</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl font-sans mt-2 leading-relaxed">
              Step through physical portals of cyberspace: from 56k dial-up and custom MySpace HTML, to Tumblr aesthetics, cyber cafés, and the algorithmic present.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                retroAudio.playClick();
                onSelectEra('early-internet');
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-blue-500/20 rounded-lg cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 font-mono"
            >
              <Compass className="w-3.5 h-3.5" /> Start Tour (1995)
            </button>

            <button
              onClick={() => {
                retroAudio.playClick();
                onOpenQuiz();
              }}
              className="px-4 py-2 border border-white/10 hover:border-blue-500/40 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black rounded-lg transition-all font-mono text-gray-300 cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" /> Gen Quiz
            </button>

            <button
              onClick={() => {
                retroAudio.playClick();
                onOpenPass();
              }}
              className="px-4 py-2 bg-zinc-900 border border-white/10 hover:border-blue-500/40 text-[10px] uppercase tracking-widest text-blue-300 rounded-lg transition-all font-mono cursor-pointer flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5 text-blue-400" /> Passport ({ticket.unlockedMemories.length})
            </button>
          </div>
        </div>
      </div>

      {/* Museum Interactive Features Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => {
            retroAudio.playClick();
            onOpenQuiz();
          }}
          className="bg-black/40 hover:bg-zinc-900/80 border border-white/10 hover:border-blue-500/50 p-5 rounded-xl text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block mb-1">
              DIAGNOSTIC TEST
            </span>
            <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
              What's Your Internet Generation?
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Take the 5-question test to discover whether you're a Digital Pioneer, Social Native, or Algorithm Native.
            </p>
          </div>
          <span className="text-xs text-blue-400 font-mono uppercase tracking-wider font-semibold mt-4 flex items-center gap-1">
            Start Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => {
            retroAudio.playClick();
            onOpenTimeline();
          }}
          className="bg-black/40 hover:bg-zinc-900/80 border border-white/10 hover:border-blue-500/50 p-5 rounded-xl text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block mb-1">
              PERSONAL CHRONOLOGY
            </span>
            <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
              Your Internet Childhood Timeline
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Generate a personalized milestone card based on your birth year and the platforms you grew up using.
            </p>
          </div>
          <span className="text-xs text-blue-400 font-mono uppercase tracking-wider font-semibold mt-4 flex items-center gap-1">
            Build Timeline <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => {
            retroAudio.playClick();
            onOpenArchive();
          }}
          className="bg-black/40 hover:bg-zinc-900/80 border border-white/10 hover:border-blue-500/50 p-5 rounded-xl text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block mb-1">
              COMMUNITY WALL
            </span>
            <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
              Community Nostalgia Archive
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              "What is one internet thing you miss?" Read submissions from other visitors and add your own memory.
            </p>
          </div>
          <span className="text-xs text-blue-400 font-mono uppercase tracking-wider font-semibold mt-4 flex items-center gap-1">
            Open Archive <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Exhibition Era Wings Gallery (Immersive UI Layout) */}
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
              ★ PERMANENT GALLERIES ★
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">
              Exhibition Portals
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-400 hidden sm:inline">
            6 Wings • 16 Interactive Exhibits
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MUSEUM_ERAS.map((era) => {
            const visitedCount = era.exhibits.filter((e) =>
              ticket.visitedExhibits.includes(e.id)
            ).length;
            const isFullyExplored = visitedCount === era.exhibits.length;

            return (
              <div
                key={era.id}
                onClick={() => {
                  retroAudio.playClick();
                  onSelectEra(era.id);
                }}
                className="group relative bg-black/40 border border-white/10 hover:border-blue-500/50 rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Top Visual Showcase Stage */}
                <div className="h-44 w-full relative overflow-hidden flex items-center justify-center">
                  {era.id === 'early-internet' && (
                    <div className="h-full w-full bg-[#000080] p-4 flex flex-col items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                      <div className="border-2 border-white/20 p-2 text-[9px] font-mono text-gray-200 bg-black/30 rounded">
                        [56K_CONNECTING...]
                      </div>
                      <div className="text-[8px] font-mono text-blue-200 mt-2">
                        NOISE_SYNTH // 28.8K ~ 56K
                      </div>
                    </div>
                  )}

                  {era.id === 'social-internet' && (
                    <div className="h-full w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900 p-4 flex items-center justify-center relative">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/30 shadow-inner group-hover:scale-110 transition-transform">
                        <span className="text-2xl">💬</span>
                      </div>
                    </div>
                  )}

                  {era.id === 'aesthetic-internet' && (
                    <div className="h-full w-full bg-[#12131a] p-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-full grid grid-cols-2 gap-1.5 max-w-[160px]">
                        <div className="aspect-video bg-neutral-800 rounded border border-white/10 flex items-center justify-center text-xs">🌸</div>
                        <div className="aspect-video bg-neutral-750 rounded border border-white/10 flex items-center justify-center text-xs">📹</div>
                        <div className="aspect-video bg-neutral-750 rounded border border-white/10 flex items-center justify-center text-xs">📷</div>
                        <div className="aspect-video bg-neutral-800 rounded border border-white/10 flex items-center justify-center text-xs">🖤</div>
                      </div>
                    </div>
                  )}

                  {era.id === 'algorithm-era' && (
                    <div className="h-full w-full bg-zinc-950 p-4 flex flex-col gap-2 justify-center opacity-60 group-hover:opacity-85 transition-opacity">
                      <div className="h-1.5 bg-blue-500/40 rounded w-3/4" />
                      <div className="h-1.5 bg-indigo-500/60 rounded w-full" />
                      <div className="h-1.5 bg-purple-500/40 rounded w-1/2" />
                      <div className="h-1.5 bg-blue-400/30 rounded w-4/5" />
                    </div>
                  )}

                  {era.id === 'modern-internet' && (
                    <div className="h-full w-full bg-black p-4 flex flex-col items-center justify-center opacity-60 group-hover:opacity-90 transition-opacity">
                      <div className="text-[10px] font-mono text-white tracking-widest border border-white/20 px-3 py-1 rounded bg-zinc-900/80">
                        STREAM // 2026
                      </div>
                    </div>
                  )}

                  {era.id === 'cyber-cafe' && (
                    <div className="h-full w-full bg-[#0a101d] p-4 flex flex-col items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                      <div className="border border-cyan-500/40 bg-black/60 px-3 py-1 rounded text-[9px] font-mono text-cyan-300">
                        CABIN_04: 01:00:00
                      </div>
                    </div>
                  )}

                  {/* Status Badge in Top Right */}
                  {isFullyExplored ? (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-500 text-black text-[8px] font-bold rounded font-mono shadow-md">
                      100% UNLOCKED
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 border border-white/10 text-gray-300 text-[8px] font-mono rounded backdrop-blur-sm">
                      {visitedCount}/{era.exhibits.length} VISITED
                    </div>
                  )}
                </div>

                {/* Bottom Information Stage */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-900 border-t border-white/5 space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-blue-400 mb-1 tracking-wider uppercase">
                      {era.years}
                    </div>
                    <h3 className="text-lg font-bold leading-tight uppercase text-white group-hover:text-blue-300 transition-colors">
                      {era.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                      {era.description}
                    </p>
                  </div>

                  {/* Exhibit Tag Pills */}
                  <div className="pt-2 border-t border-white/5 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {era.exhibits.map((ex) => (
                        <span
                          key={ex.id}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            ticket.visitedExhibits.includes(ex.id)
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-black/60 text-gray-400 border border-white/5'
                          }`}
                        >
                          {ticket.visitedExhibits.includes(ex.id) ? '✓ ' : ''}{ex.name}
                        </span>
                      ))}
                    </div>

                    <div className="text-[9px] text-gray-500 group-hover:text-blue-400 uppercase tracking-widest flex items-center justify-between font-mono pt-1">
                      <span>Enter Portal →</span>
                      <span className="text-gray-500 font-normal">{getEraSoundtrack(era.id)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
