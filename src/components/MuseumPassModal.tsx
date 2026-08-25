import React, { useState } from 'react';
import { VisitorTicket } from '../types';
import { retroAudio } from '../utils/audio';
import { X, Award, Sparkles, Share2, Check, Download, QrCode, Ticket, ShieldCheck, User, Compass, Flame, Cpu, Radio, Egg } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MuseumPassModalProps {
  ticket: VisitorTicket;
  onClose: () => void;
  onUpdateName: (name: string) => void;
}

export const MuseumPassModal: React.FC<MuseumPassModalProps> = ({
  ticket,
  onClose,
  onUpdateName
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(ticket.visitorName);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    retroAudio.playClick();
    onUpdateName(tempName.trim());
    setIsEditingName(false);
  };

  const handleShare = () => {
    retroAudio.playUnlock();
    confetti({
      particleCount: 70,
      spread: 60
    });

    const shareText = `🏛️ THE INTERNET MUSEUM • OFFICIAL VISIT SUMMARY & PASSPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎟️ Visitor Handle: ${ticket.visitorName}
🆔 Passport ID: ${ticket.ticketNumber}
⚡ Assigned Generation: ${ticket.internetGeneration || 'THE SOCIAL NETWORK NATIVE'}

📊 EXPLORATION TELEMETRY:
✦ Exhibits Explored: ${ticket.visitedExhibits.length}
✦ Memories Unlocked: ${ticket.unlockedMemories.length}
✦ Easter Eggs Found: ${ticket.foundEasterEggs.length}

🏆 RECENT MEMORIES UNLOCKED:
${ticket.unlockedMemories.slice(0, 4).map((m) => `• ${m.title} ("${m.flavorText}")`).join('\n') || '• Exploring museum archives...'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tour the Internet Museum & unlock your nostalgia!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const getGenerationBadge = (gen?: string) => {
    const title = (gen || '').toUpperCase();
    if (title.includes('PIONEER')) {
      return {
        label: 'THE DIGITAL PIONEER',
        badge: 'bg-amber-950 text-amber-300 border-amber-500/40',
        icon: <Radio className="w-4 h-4 text-amber-400" />
      };
    } else if (title.includes('TUMBLR')) {
      return {
        label: 'THE TUMBLR GENERATION',
        badge: 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-500/40',
        icon: <Flame className="w-4 h-4 text-fuchsia-400" />
      };
    } else if (title.includes('ALGORITHM')) {
      return {
        label: 'THE ALGORITHM NATIVE',
        badge: 'bg-rose-950 text-rose-300 border-rose-500/40',
        icon: <Cpu className="w-4 h-4 text-rose-400" />
      };
    } else {
      return {
        label: 'THE SOCIAL NETWORK NATIVE',
        badge: 'bg-blue-950 text-blue-300 border-blue-500/40',
        icon: <Compass className="w-4 h-4 text-blue-400" />
      };
    }
  };

  const genBadge = getGenerationBadge(ticket.internetGeneration);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#080808] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200 text-white">
        
        {/* Header */}
        <div className="bg-zinc-900/90 px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base text-white uppercase tracking-wider font-mono">
              Museum Visit Summary & Passport
            </h3>
          </div>
          <button
            onClick={() => {
              retroAudio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vintage Museum Ticket Card Canvas */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6">
          <div className="bg-gradient-to-br from-[#f8f5ed] via-[#f0ebe0] to-[#e4dcd0] text-neutral-900 p-6 rounded-2xl shadow-xl border-4 border-dashed border-[#b8ab94] relative overflow-hidden font-sans">
            
            {/* Watermark stamp */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-9xl font-black font-pixel">
              NET
            </div>

            {/* Ticket Header */}
            <div className="flex justify-between items-start border-b-2 border-dashed border-[#b8ab94] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-pixel text-blue-900 uppercase tracking-widest block">
                  OFFICIAL ADMISSION VOUCHER & SUMMARY
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  THE INTERNET MUSEUM
                </h2>
                <p className="text-xs text-neutral-600 italic mt-0.5">
                  "A walk through the internet we grew up with."
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Ticket #</span>
                <span className="text-sm font-mono font-bold bg-neutral-900 text-blue-400 px-2 py-0.5 rounded">
                  {ticket.ticketNumber}
                </span>
              </div>
            </div>

            {/* Visitor Identity & Custom Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 text-xs">
              <div className="bg-white/80 p-3 rounded-lg border border-[#c7bca7]">
                <span className="text-[10px] text-neutral-500 font-mono uppercase block">Visitor Handle:</span>
                {!isEditingName ? (
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-sm text-neutral-900">{ticket.visitorName}</span>
                    <button
                      onClick={() => {
                        retroAudio.playClick();
                        setIsEditingName(true);
                      }}
                      className="text-[11px] text-blue-700 underline font-semibold cursor-pointer hover:text-blue-900 font-mono"
                    >
                      Edit Name
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSaveName} className="flex gap-1.5 mt-1">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="bg-neutral-50 border border-neutral-400 rounded px-2 py-0.5 text-xs text-neutral-900 flex-1"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-white/80 p-3 rounded-lg border border-[#c7bca7]">
                <span className="text-[10px] text-neutral-500 font-mono uppercase block">Assigned Generation:</span>
                <div className="flex items-center gap-1.5 mt-1">
                  {genBadge.icon}
                  <span className="font-bold text-sm text-blue-900">
                    {ticket.internetGeneration || 'The Social Network Native'}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Progress Counters */}
            <div className="grid grid-cols-3 gap-2 text-center my-4 font-mono">
              <div className="bg-neutral-900 text-white p-3 rounded-xl shadow-inner border border-neutral-800">
                <span className="text-[10px] text-gray-400 block uppercase">Exhibits</span>
                <span className="text-xl font-bold text-blue-400">{ticket.visitedExhibits.length}</span>
                <span className="text-[9px] text-gray-500 block">Explored</span>
              </div>

              <div className="bg-neutral-900 text-white p-3 rounded-xl shadow-inner border border-neutral-800">
                <span className="text-[10px] text-gray-400 block uppercase">Memories</span>
                <span className="text-xl font-bold text-emerald-400">{ticket.unlockedMemories.length}</span>
                <span className="text-[9px] text-gray-500 block">Unlocked</span>
              </div>

              <div className="bg-neutral-900 text-white p-3 rounded-xl shadow-inner border border-neutral-800">
                <span className="text-[10px] text-gray-400 block uppercase">Easter Eggs</span>
                <span className="text-xl font-bold text-purple-400">{ticket.foundEasterEggs.length}</span>
                <span className="text-[9px] text-gray-500 block">Discovered</span>
              </div>
            </div>

            {/* Barcode & Timestamp */}
            <div className="pt-4 border-t-2 border-dashed border-[#b8ab94] flex items-center justify-between text-xs text-neutral-600 font-mono">
              <div className="space-y-0.5">
                <p>VALIDATED DIGITAL PASSPORT & SUMMARY</p>
                <p className="text-[10px] text-neutral-500">Issued: {ticket.enteredAt}</p>
              </div>

              <div className="font-pixel text-[9px] bg-neutral-900 text-white px-2.5 py-1 tracking-widest rounded">
                ||||| | |||| ||| |||||
              </div>
            </div>
          </div>

          {/* Trophy Shelf of Unlocked Memories */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-gray-300 flex items-center gap-2 font-mono uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-400" />
                Unlocked Memories & Relics ({ticket.unlockedMemories.length})
              </h4>
              {ticket.foundEasterEggs.length > 0 && (
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                  <Egg className="w-3 h-3" /> {ticket.foundEasterEggs.length} Easter Eggs
                </span>
              )}
            </div>

            {ticket.unlockedMemories.length === 0 ? (
              <div className="bg-zinc-900/60 border border-white/10 p-4 rounded-xl text-center text-gray-500 text-xs font-mono">
                No memories unlocked yet. Explore exhibits and click "Unlock Memory" to collect relics!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                {ticket.unlockedMemories.map((m) => (
                  <div key={m.id} className="bg-zinc-900 border border-emerald-500/30 p-2.5 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center text-emerald-400 font-bold font-mono">
                      <span className="truncate">{m.title}</span>
                      <span className="text-[10px] text-gray-500">{m.unlockedAt}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 italic truncate font-serif">"{m.flavorText}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share Action */}
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all active:scale-95 font-mono uppercase tracking-wider"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
              {copied ? 'Visit Summary Copied to Clipboard!' : 'Share Complete Museum Visit Summary'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
