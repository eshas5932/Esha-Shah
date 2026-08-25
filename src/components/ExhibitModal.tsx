import React from 'react';
import { Exhibit } from '../types';
import { retroAudio } from '../utils/audio';
import { X, Sparkles, Award, Tag, Clock, BookOpen, Quote, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

// Import all interactive exhibit components
import { DialUpExhibit } from './exhibits/DialUpExhibit';
import { GeocitiesExhibit } from './exhibits/GeocitiesExhibit';
import { AimChatExhibit } from './exhibits/AimChatExhibit';
import { WinampExhibit } from './exhibits/WinampExhibit';
import { MsnMessengerExhibit } from './exhibits/MsnMessengerExhibit';
import { OrkutExhibit } from './exhibits/OrkutExhibit';
import { MySpaceExhibit } from './exhibits/MySpaceExhibit';
import { EarlyFacebookExhibit } from './exhibits/EarlyFacebookExhibit';
import { EarlyYoutubeExhibit } from './exhibits/EarlyYoutubeExhibit';
import { TumblrExhibit } from './exhibits/TumblrExhibit';
import { VineExhibit } from './exhibits/VineExhibit';
import { EarlyInstagramExhibit } from './exhibits/EarlyInstagramExhibit';
import { AlgorithmSimulatorExhibit } from './exhibits/AlgorithmSimulatorExhibit';
import { DoomscrollExhibit } from './exhibits/DoomscrollExhibit';
import { CyberCafeExhibit } from './exhibits/CyberCafeExhibit';

interface ExhibitModalProps {
  exhibit: Exhibit | null;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlock: (memoryTitle: string, flavorText: string) => void;
}

export const ExhibitModal: React.FC<ExhibitModalProps> = ({
  exhibit,
  onClose,
  isUnlocked,
  onUnlock
}) => {
  if (!exhibit) return null;

  const triggerUnlock = () => {
    retroAudio.playUnlock();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onUnlock(exhibit.name, exhibit.theMemory);
  };

  // Render the appropriate interactive simulation based on exhibit ID
  const renderInteractiveSim = () => {
    switch (exhibit.id) {
      case 'dialup-modem':
        return <DialUpExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'geocities-web':
        return <GeocitiesExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'aim-chatroom':
        return <AimChatExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'winamp-player':
        return <WinampExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'msn-messenger':
        return <MsnMessengerExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'orkut-network':
        return <OrkutExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'myspace-profile':
        return <MySpaceExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'early-facebook':
        return <EarlyFacebookExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'early-youtube':
        return <EarlyYoutubeExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'tumblr-dashboard':
        return <TumblrExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'vine-loop':
        return <VineExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'early-instagram':
        return <EarlyInstagramExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'algorithm-simulator':
        return <AlgorithmSimulatorExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'doomscroll-feed':
      case 'ai-hallucination':
        return <DoomscrollExhibit onUnlockMemory={() => triggerUnlock()} />;
      case 'cyber-cafe-cabin':
        return <CyberCafeExhibit onUnlockMemory={() => triggerUnlock()} />;
      default:
        return <DialUpExhibit onUnlockMemory={() => triggerUnlock()} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-zinc-900/90 px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded font-mono uppercase tracking-wider">
              EXHIBIT # {exhibit.id.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{exhibit.years}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isUnlocked ? (
              <button
                onClick={triggerUnlock}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/20 cursor-pointer transition-all active:scale-95 font-mono uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5" /> Unlock Memory
              </button>
            ) : (
              <span className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Memory Unlocked!
              </span>
            )}

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
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 md:p-7 overflow-y-auto space-y-6">
          
          {/* Exhibit Title & Tagline */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
              {exhibit.name}
            </h2>
            <p className="text-sm md:text-base text-blue-300 mt-1 italic font-serif">
              "{exhibit.tagline}"
            </p>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 px-1 font-mono">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-blue-400">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Simulation Experience
              </span>
              <span className="text-gray-500 italic">Click, explore and interact below</span>
            </div>
            {renderInteractiveSim()}
          </div>

          {/* Structured Historical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* What Was It? */}
            <div className="bg-zinc-900/70 border border-white/10 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-xs text-gray-300 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <Info className="w-4 h-4 text-blue-400" /> 1. What Was It?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {exhibit.whatWasIt}
              </p>
            </div>

            {/* Why Did It Matter? */}
            <div className="bg-zinc-900/70 border border-white/10 p-4 rounded-xl space-y-1.5">
              <h4 className="font-bold text-xs text-gray-300 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4 text-emerald-400" /> 2. Why Did It Matter?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {exhibit.whyItMattered}
              </p>
            </div>
          </div>

          {/* The Memory (Relatable Nostalgic Observation) */}
          <div className="bg-gradient-to-r from-blue-950/30 via-zinc-900 to-blue-950/30 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
            <Quote className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-blue-300 uppercase tracking-wider font-mono">
                3. The Relatable Memory
              </h4>
              <p className="text-sm text-gray-200 italic mt-1 font-serif">
                "{exhibit.theMemory}"
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-gray-500 font-mono">Archived Tags:</span>
            {exhibit.tags.map((t, idx) => (
              <span key={idx} className="bg-zinc-900 border border-white/10 text-gray-400 px-2.5 py-1 rounded-full text-xs font-mono">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
