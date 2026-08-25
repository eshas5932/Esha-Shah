import React, { useState, useEffect } from 'react';
import { retroAudio } from '../utils/audio';
import { Sparkles, MessageCircle, X, HelpCircle, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClippyAssistantProps {
  onFoundEasterEgg: (eggName: string, desc: string) => void;
}

export const ClippyAssistant: React.FC<ClippyAssistantProps> = ({ onFoundEasterEgg }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clippyTipIndex, setClippyTipIndex] = useState<number>(0);
  const [showBsod, setShowBsod] = useState<boolean>(false);
  const [konamiProgress, setKonamiProgress] = useState<number>(0);

  const clippyTips = [
    "It looks like you're trying to reminisce about the early internet. Would you like help downloading more RAM?",
    "Did you know? If you type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) anywhere in this museum, something secret happens!",
    "Warning: Your dial-up connection is only 56kbps. Please do not download 10-hour movies at once!",
    "It looks like you're writing a MySpace HTML profile. Would you like to add 40 animated fire GIFs?",
    "Tip: Never press 'Don't Click Me' buttons in retro software unless you want a Blue Screen of Death!"
  ];

  // Konami code detection (Up Up Down Down Left Right Left Right B A)
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = konamiSequence[currentIndex];
      if (e.key.toLowerCase() === expectedKey.toLowerCase()) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          currentIndex = 0;
          retroAudio.playWinChime();
          confetti({ particleCount: 150, spread: 100 });
          onFoundEasterEgg('Konami Code 1999', 'You entered the legendary 30-lives Konami Code!');
          alert('🎮 SECRET EASTER EGG UNLOCKED: 30 Extra Lives in Cyberspace!');
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onFoundEasterEgg]);

  const handleNextTip = () => {
    retroAudio.playClick();
    setClippyTipIndex((prev) => (prev + 1) % clippyTips.length);
  };

  const triggerBsod = () => {
    retroAudio.playVineBoom();
    setShowBsod(true);
    onFoundEasterEgg('Blue Screen of Death', 'You intentionally caused a fatal Windows exception!');
  };

  return (
    <>
      {/* Clippy Floating Bubble in Bottom Corner */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {isOpen && (
          <div className="bg-[#ffffe1] text-neutral-900 border-2 border-neutral-700 p-3.5 rounded-2xl shadow-2xl max-w-xs mb-2 text-xs font-sans space-y-2 relative animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-start font-bold text-neutral-800">
              <span className="text-[11px] font-mono text-amber-800">📎 Clippy's Museum Guide:</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-neutral-800 leading-snug font-medium">
              "{clippyTips[clippyTipIndex]}"
            </p>

            <div className="flex justify-between items-center pt-1 border-t border-neutral-300">
              <button
                onClick={handleNextTip}
                className="text-[11px] text-blue-700 font-bold hover:underline cursor-pointer"
              >
                Next Tip →
              </button>

              <button
                onClick={triggerBsod}
                className="text-[10px] text-red-600 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded font-mono font-bold cursor-pointer"
                title="Trigger a retro Windows BSOD crash"
              >
                ⚠️ Fatal Crash
              </button>
            </div>
          </div>
        )}

        <button
          id="btn-clippy-assistant"
          onClick={() => {
            retroAudio.playClick();
            setIsOpen(!isOpen);
            if (!isOpen) {
              onFoundEasterEgg('Summoned Clippy', 'You interacted with Microsoft’s famous paperclip assistant!');
            }
          }}
          className="bg-amber-400 hover:bg-amber-300 text-neutral-950 p-2.5 rounded-full shadow-2xl border-2 border-neutral-900 flex items-center justify-center cursor-pointer transition-transform active:scale-95 group"
          title="Click Clippy for nostalgic tips & Easter eggs"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">📎</span>
        </button>
      </div>

      {/* BSOD Modal */}
      {showBsod && (
        <div
          onClick={() => setShowBsod(false)}
          className="fixed inset-0 z-50 bg-[#0000aa] text-white font-mono p-6 md:p-12 flex flex-col justify-center items-center cursor-pointer animate-in fade-in select-none text-left"
        >
          <div className="max-w-2xl space-y-4">
            <div className="bg-white text-[#0000aa] px-4 py-1 inline-block font-bold">
              Windows
            </div>
            <p className="text-lg font-bold">
              A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.
            </p>
            <p className="text-sm text-neutral-300">
              * Press any key or click anywhere to return to The Internet Museum.
              <br />
              * Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved MP3 downloads.
            </p>
            <div className="pt-6 text-center text-xs text-neutral-400">
              Press any key to continue _
            </div>
          </div>
        </div>
      )}
    </>
  );
};
