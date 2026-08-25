import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Cpu, Zap, Eye, Sparkles, AlertTriangle, Filter, CheckCircle2, TrendingUp } from 'lucide-react';

interface AlgorithmSimulatorExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const AlgorithmSimulatorExhibit: React.FC<AlgorithmSimulatorExhibitProps> = ({ onUnlockMemory }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [dopamineScore, setDopamineScore] = useState<number>(45);
  const [bubbleSeverity, setBubbleSeverity] = useState<number>(20);
  const [feedItems, setFeedItems] = useState<Array<{ id: number; title: string; category: string; viralRate: string; icon: string }>>([
    { id: 1, title: 'Top 10 Hidden Travel Spots in Kyoto', category: 'travel', viralRate: '98% match', icon: '✈️' },
    { id: 2, title: 'Speedrunning Mario 64 in 15 Minutes', category: 'gaming', viralRate: '92% match', icon: '🎮' },
    { id: 3, title: 'Why Everyone Is Talking About This Drama', category: 'drama', viralRate: '99% match', icon: '🍿' },
    { id: 4, title: 'Cat Accidentally Jumps into Laundry Basket', category: 'memes', viralRate: '95% match', icon: '😹' }
  ]);

  const categories = [
    { id: 'memes', label: 'Absurdist Memes', icon: '😹' },
    { id: 'gaming', label: 'Gaming Clips & Drama', icon: '🎮' },
    { id: 'travel', label: 'Aesthetic Travel & Lo-Fi', icon: '✈️' },
    { id: 'drama', label: 'Celebrity Drama & Hot Takes', icon: '🍿' },
    { id: 'food', label: 'Overloaded Street Food', icon: '🍕' }
  ];

  const handleToggleTopic = (topicId: string) => {
    retroAudio.playClick();
    let updated: string[];
    if (selectedTopics.includes(topicId)) {
      updated = selectedTopics.filter((t) => t !== topicId);
    } else {
      updated = [...selectedTopics, topicId];
    }
    setSelectedTopics(updated);

    // Compute algorithmic intensity
    const nextDopamine = Math.min(99, 45 + updated.length * 14);
    const nextBubble = Math.min(98, 20 + updated.length * 19);
    setDopamineScore(nextDopamine);
    setBubbleSeverity(nextBubble);

    if (updated.length >= 3) {
      onUnlockMemory?.('algorithm-bubble');
    }
  };

  return (
    <div id="algorithm-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-violet-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-2xl bg-neutral-950 border-2 border-violet-500 rounded-xl shadow-2xl p-4 md:p-6 text-neutral-100 font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-violet-900/60 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-violet-400 animate-pulse" />
            <div>
              <h3 className="font-bold text-base text-violet-300">Neural Recommender Engine Lab</h3>
              <p className="text-xs text-neutral-400">Step 1: Choose what you like. Step 2: Watch the machine trap you.</p>
            </div>
          </div>
          <span className="text-xs bg-violet-900/60 text-violet-300 border border-violet-500/40 px-2.5 py-1 rounded font-mono">
            v4.2 ENGAGEMENT-AI
          </span>
        </div>

        {/* Interactive Topic Selection */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
            Select Your Interests to Train the Feed:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedTopics.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleToggleTopic(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    active
                      ? 'bg-violet-600 border-violet-400 text-white shadow-lg scale-105'
                      : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {active && <CheckCircle2 className="w-3.5 h-3.5 ml-1 text-violet-200" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Algorithm Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="bg-neutral-900 border border-violet-500/40 p-3 rounded-lg">
            <div className="flex justify-between items-center text-xs text-violet-300 font-bold mb-1">
              <span>Estimated Dopamine Retention:</span>
              <span className="text-sm font-mono text-emerald-400">{dopamineScore}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${dopamineScore}%` }}
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1 font-mono">
              Prediction: User will stay on app for {Math.round(dopamineScore * 1.6)} minutes.
            </p>
          </div>

          <div className="bg-neutral-900 border border-violet-500/40 p-3 rounded-lg">
            <div className="flex justify-between items-center text-xs text-violet-300 font-bold mb-1">
              <span>Filter Bubble Severity:</span>
              <span className="text-sm font-mono text-amber-400">{bubbleSeverity}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-2 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300"
                style={{ width: `${bubbleSeverity}%` }}
              />
            </div>
            <p className="text-[10px] text-neutral-400 mt-1 font-mono">
              {bubbleSeverity > 70 ? '⚠️ High Echo Chamber Risk: Opposing viewpoints suppressed.' : 'Diverse viewpoints present.'}
            </p>
          </div>
        </div>

        {/* Dynamically Generated Feed Simulation */}
        <div className="border border-neutral-800 bg-neutral-900/60 p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-400 border-b border-neutral-800 pb-1">
            <span>Your Calibrated Algorithmic Feed:</span>
            <span className="text-[10px] text-violet-400 font-mono">Target: Infinite Scroll</span>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
            {feedItems.map((item) => (
              <div key={item.id} className="bg-neutral-950 p-2.5 rounded border border-neutral-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-neutral-200 text-xs">{item.title}</p>
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">Category: {item.category}</span>
                  </div>
                </div>
                <span className="bg-violet-950 text-violet-300 px-2 py-0.5 rounded text-[10px] font-mono border border-violet-800">
                  {item.viralRate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "In 2016, social networks pivoted decisively from chronological timelines to machine-learning recommendation models that optimize for watch-time and rage/dopamine engagement."
      </p>
    </div>
  );
};
