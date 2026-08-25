import React, { useState, useEffect } from 'react';
import { MUSEUM_ERAS } from './data/museumData';
import { EraRoom, Exhibit, VisitorTicket, MemoryUnlocked } from './types';
import { retroAudio } from './utils/audio';

// Components
import { MuseumLobby } from './components/MuseumLobby';
import { RoomView } from './components/RoomView';
import { ExhibitModal } from './components/ExhibitModal';
import { MuseumPassModal } from './components/MuseumPassModal';
import { GenerationQuiz } from './components/GenerationQuiz';
import { ChildhoodTimeline } from './components/ChildhoodTimeline';
import { CommunityArchive } from './components/CommunityArchive';
import { ClippyAssistant } from './components/ClippyAssistant';

// Icons
import { 
  Compass, Ticket, HelpCircle, Calendar, MessageSquare, 
  Volume2, VolumeX, Award, Sparkles, ArrowLeft, Home 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // Navigation State
  const [activeView, setActiveView] = useState<'lobby' | 'room' | 'quiz' | 'timeline' | 'archive'>('lobby');
  const [selectedEraId, setSelectedEraId] = useState<string>('wilderness-90s');
  const [activeExhibit, setActiveExhibit] = useState<Exhibit | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(retroAudio.isMuted());

  // Visitor Ticket & Persistence
  const [ticket, setTicket] = useState<VisitorTicket>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('internet_museum_ticket');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return {
      ticketNumber: `NET-${Math.floor(100000 + Math.random() * 900000)}`,
      visitorName: 'Visitor #1999',
      enteredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      visitedExhibits: [],
      unlockedMemories: [],
      foundEasterEggs: [],
      internetGeneration: 'The Social Network Native'
    };
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save ticket to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('internet_museum_ticket', JSON.stringify(ticket));
    }
  }, [ticket]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectEra = (eraId: string) => {
    setSelectedEraId(eraId);
    setActiveView('room');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExhibit = (exhibit: Exhibit) => {
    setActiveExhibit(exhibit);
    // Mark as visited
    if (!ticket.visitedExhibits.includes(exhibit.id)) {
      setTicket((prev) => ({
        ...prev,
        visitedExhibits: [...prev.visitedExhibits, exhibit.id]
      }));
    }
  };

  const handleUnlockMemory = (memoryTitle: string, flavorText: string) => {
    const existing = ticket.unlockedMemories.some((m) => m.title === memoryTitle);
    if (!existing) {
      const newMemory: MemoryUnlocked = {
        id: `mem-${Date.now()}`,
        title: memoryTitle,
        flavorText: flavorText || 'An unforgettable internet cultural milestone.',
        unlockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'exhibit'
      };

      setTicket((prev) => ({
        ...prev,
        unlockedMemories: [newMemory, ...prev.unlockedMemories]
      }));

      showToast(`🏆 Memory Unlocked: "${memoryTitle}"`);
    }
  };

  const handleFoundEasterEgg = (eggName: string, desc: string) => {
    if (!ticket.foundEasterEggs.includes(eggName)) {
      setTicket((prev) => ({
        ...prev,
        foundEasterEggs: [...prev.foundEasterEggs, eggName]
      }));
      showToast(`🥚 Easter Egg Discovered: "${eggName}"!`);
    }
  };

  const handleToggleMute = () => {
    const nextState = retroAudio.toggleMute();
    setIsMuted(nextState);
  };

  const currentEra = MUSEUM_ERAS.find((e) => e.id === selectedEraId) || MUSEUM_ERAS[0];

  const totalExhibitsCount = MUSEUM_ERAS.reduce((acc, era) => acc + era.exhibits.length, 0);
  const explorationPercent = Math.min(
    100,
    Math.round(((ticket.visitedExhibits.length + ticket.unlockedMemories.length) / (totalExhibitsCount + 16)) * 100)
  );

  return (
    <div className="min-h-screen immersive-canvas text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Radial Glow Accent */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(30,58,138,0.18)_0%,_transparent_65%)] pointer-events-none z-0" />

      {/* Top Museum Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => {
              retroAudio.playClick();
              setActiveView('lobby');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/40 p-1 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 group-hover:border-blue-400 transition-all overflow-hidden">
              <img src="/logo.svg" alt="The Internet Museum" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-white opacity-90 uppercase leading-tight">
                The Internet Museum
              </h1>
              <p className="text-[10px] text-blue-400 tracking-[0.4em] uppercase mt-0.5 font-mono">
                A collection of things we thought would last forever
              </p>
            </div>
          </div>

          {/* Right Header Section: Visitor Telemetry & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t md:border-t-0 pt-2 md:pt-0 border-white/5">
            
            {/* View Switchers */}
            <div className="flex items-center gap-1 bg-zinc-900/90 border border-white/10 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => {
                  retroAudio.playClick();
                  setActiveView('lobby');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] uppercase tracking-wider cursor-pointer ${
                  activeView === 'lobby' || activeView === 'room'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Exhibits
              </button>

              <button
                onClick={() => {
                  retroAudio.playClick();
                  setActiveView('quiz');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] uppercase tracking-wider cursor-pointer ${
                  activeView === 'quiz' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                Gen Quiz
              </button>

              <button
                onClick={() => {
                  retroAudio.playClick();
                  setActiveView('timeline');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] uppercase tracking-wider cursor-pointer ${
                  activeView === 'timeline' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                Childhood
              </button>

              <button
                onClick={() => {
                  retroAudio.playClick();
                  setActiveView('archive');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] uppercase tracking-wider cursor-pointer ${
                  activeView === 'archive' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-gray-400 hover:text-white'
                }`}
              >
                Archive
              </button>
            </div>

            {/* Visitor Telemetry Stats */}
            <div className="hidden lg:flex gap-6 border-l border-white/10 pl-6">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5 font-mono">Visitor Status</div>
                <div className="text-xs font-mono text-blue-300 font-semibold truncate max-w-[140px]">
                  @{ticket.visitorName.toLowerCase().replace(/[^a-z0-9_]/g, '_') || 'visitor_1999'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5 font-mono">Memories Unlocked</div>
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  {ticket.unlockedMemories.length.toString().padStart(2, '0')} / {totalExhibitsCount.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-2 bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-blue-500/40 rounded-xl text-gray-300 hover:text-white cursor-pointer transition-colors"
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Passport Modal Button */}
            <button
              onClick={() => {
                retroAudio.playClick();
                setIsPassModalOpen(true);
              }}
              className="bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 border border-blue-500/40 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-lg shadow-blue-500/10 cursor-pointer transition-all active:scale-95"
            >
              <Ticket className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Passport</span>
              <span className="bg-blue-500 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold font-sans">
                {ticket.unlockedMemories.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Museum Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 w-full flex-1 relative z-10">
        
        {/* Navigation Breadcrumb for non-lobby views */}
        {activeView !== 'lobby' && (
          <div className="mb-8 flex items-center gap-2 text-xs font-mono text-gray-400">
            <button
              onClick={() => {
                retroAudio.playClick();
                setActiveView('lobby');
              }}
              className="hover:text-blue-400 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" /> Grand Lobby
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-blue-300 font-bold uppercase tracking-wider">{activeView}</span>
          </div>
        )}

        {/* View Router */}
        {activeView === 'lobby' && (
          <MuseumLobby
            ticket={ticket}
            onSelectEra={handleSelectEra}
            onOpenPass={() => setIsPassModalOpen(true)}
            onOpenQuiz={() => setActiveView('quiz')}
            onOpenTimeline={() => setActiveView('timeline')}
            onOpenArchive={() => setActiveView('archive')}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {activeView === 'room' && (
          <RoomView
            era={currentEra}
            ticket={ticket}
            onBackToLobby={() => setActiveView('lobby')}
            onSelectExhibit={handleSelectExhibit}
          />
        )}

        {activeView === 'quiz' && (
          <div className="space-y-6">
            <GenerationQuiz
              ticket={ticket}
              onCompleteQuiz={(genTitle) => {
                setTicket((prev) => ({ ...prev, internetGeneration: genTitle }));
                handleUnlockMemory(`Generation Archetype: ${genTitle}`, 'Determined through the museum diagnostic test.');
              }}
            />
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="space-y-6">
            <ChildhoodTimeline
              onSetChildhoodEra={(story) => {
                handleUnlockMemory('Internet Childhood Timeline', story);
              }}
            />
          </div>
        )}

        {activeView === 'archive' && (
          <div className="space-y-6">
            <CommunityArchive
              onAddMemoryBonus={() => {
                handleUnlockMemory('Living Archive Contributor', 'You contributed your personal nostalgic memory to the community wall!');
              }}
            />
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-950 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-xl text-xs font-mono shadow-2xl shadow-blue-500/20 animate-in slide-in-from-top-2 duration-200 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Exhibit Simulation Modal */}
      {activeExhibit && (
        <ExhibitModal
          exhibit={activeExhibit}
          onClose={() => setActiveExhibit(null)}
          isUnlocked={ticket.unlockedMemories.some((m) =>
            m.title.toLowerCase().includes(activeExhibit.name.toLowerCase())
          )}
          onUnlock={(title, text) => handleUnlockMemory(title, text)}
        />
      )}

      {/* Museum Pass / Passport Modal */}
      {isPassModalOpen && (
        <MuseumPassModal
          ticket={ticket}
          onClose={() => setIsPassModalOpen(false)}
          onUpdateName={(newName) => {
            setTicket((prev) => ({ ...prev, visitorName: newName }));
            showToast(`Visitor name updated to "${newName}"`);
          }}
        />
      )}

      {/* Clippy Assistant & Easter Egg Engine */}
      <ClippyAssistant onFoundEasterEgg={handleFoundEasterEgg} />

      {/* Immersive UI Footer & Exploration Telemetry */}
      <footer className="bg-zinc-900/50 border-t border-white/5 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-16 z-20 relative backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="w-[180px] sm:w-[240px] h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500 shadow-sm shadow-blue-500/50"
              style={{ width: `${Math.max(12, explorationPercent)}%` }}
            />
          </div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
            Museum Exploration: {explorationPercent}% Complete
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveView('lobby');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2 border border-white/10 hover:border-white/30 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black rounded-lg transition-all font-mono cursor-pointer"
          >
            Museum Map
          </button>
          <button
            onClick={() => {
              retroAudio.playClick();
              setActiveView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-blue-500/20 rounded-lg transition-all font-mono cursor-pointer"
          >
            Take Generation Quiz
          </button>
        </div>
      </footer>

      {/* Atmospheric Background Watermark */}
      <div className="fixed bottom-0 right-0 p-4 opacity-5 pointer-events-none select-none z-0">
        <div className="text-[100px] sm:text-[140px] font-bold leading-none tracking-tighter text-white">
          MUSEUM
        </div>
      </div>
    </div>
  );
}

export default App;
