import React, { useState } from 'react';
import { INITIAL_COMMUNITY_MEMORIES } from '../data/museumData';
import { CommunityMemory } from '../types';
import { retroAudio } from '../utils/audio';
import { Heart, Send, Sparkles, MessageSquare, Plus, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommunityArchiveProps {
  onAddMemoryBonus?: () => void;
}

export const CommunityArchive: React.FC<CommunityArchiveProps> = ({ onAddMemoryBonus }) => {
  const [memories, setMemories] = useState<CommunityMemory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('internet_museum_community_memories');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return INITIAL_COMMUNITY_MEMORIES;
  });

  const [activeEraFilter, setActiveEraFilter] = useState<'all' | '90s' | '00s' | '10s' | '20s'>('all');
  const [authorName, setAuthorName] = useState<string>('');
  const [memoryText, setMemoryText] = useState<string>('');
  const [selectedEra, setSelectedEra] = useState<'90s' | '00s' | '10s' | '20s'>('00s');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLikeMemory = (id: string) => {
    retroAudio.playClick();
    const updated = memories.map((m) =>
      m.id === id ? { ...m, likes: m.likes + 1 } : m
    );
    setMemories(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('internet_museum_community_memories', JSON.stringify(updated));
    }
  };

  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryText.trim()) return;

    retroAudio.playUnlock();
    confetti({ particleCount: 60, spread: 60 });

    const newMem: CommunityMemory = {
      id: `mem-${Date.now()}`,
      author: authorName.trim() || 'Anonymous Netizen',
      era: selectedEra,
      text: memoryText.trim(),
      likes: 1,
      timestamp: 'Just now'
    };

    const updated = [newMem, ...memories];
    setMemories(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('internet_museum_community_memories', JSON.stringify(updated));
    }

    setAuthorName('');
    setMemoryText('');
    setIsSubmitting(false);
    onAddMemoryBonus?.();
  };

  const filteredMemories = activeEraFilter === 'all'
    ? memories
    : memories.filter((m) => m.era === activeEraFilter);

  return (
    <div id="community-archive-container" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 md:p-8 text-white max-w-4xl mx-auto shadow-2xl backdrop-blur-sm">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
          ★ THE LIVING ARCHIVE ★
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
          Community Nostalgia Archive
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          "What is one internet thing you miss?" Add your memories to the permanent museum wall.
        </p>
      </div>

      {/* Submission Card */}
      <div className="bg-zinc-900/70 border border-white/10 p-4 md:p-6 rounded-2xl mb-6 shadow-inner">
        <h3 className="font-bold text-xs text-blue-300 mb-3 flex items-center gap-2 font-mono uppercase tracking-wider">
          <Plus className="w-4 h-4 text-blue-400" />
          Contribute Your Nostalgic Memory:
        </h3>

        <form onSubmit={handleSubmitMemory} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Handle or Name (e.g. CyberDreamer99)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-blue-500/50 outline-none"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono text-[11px]">Era:</span>
              {(['90s', '00s', '10s', '20s'] as const).map((era) => (
                <button
                  key={era}
                  type="button"
                  onClick={() => setSelectedEra(era)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                    selectedEra === era ? 'bg-blue-600 text-white' : 'bg-black/60 text-gray-400 border border-white/10 hover:bg-zinc-800'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="What nostalgic internet moment, sound, website, or ritual do you miss the most?..."
            value={memoryText}
            onChange={(e) => setMemoryText(e.target.value)}
            rows={2}
            className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-gray-500 focus:border-blue-500/50 outline-none"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
            >
              <Send className="w-3.5 h-3.5" /> Submit to Permanent Archive
            </button>
          </div>
        </form>
      </div>

      {/* Era Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4 text-xs">
        <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px]">
          <Filter className="w-3.5 h-3.5 text-blue-400" /> Filter by Decade:
        </div>
        <div className="flex gap-1.5">
          {(['all', '90s', '00s', '10s', '20s'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                retroAudio.playClick();
                setActiveEraFilter(tab);
              }}
              className={`px-3 py-1 rounded-full font-mono text-xs font-bold cursor-pointer transition-colors ${
                activeEraFilter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-white/10 text-gray-400 hover:bg-zinc-800'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Memories Wall Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredMemories.map((m) => (
          <div key={m.id} className="bg-zinc-900/70 border border-white/10 p-4 rounded-xl space-y-2.5 shadow-sm hover:border-blue-500/30 transition-colors">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-400 font-mono">{m.author}</span>
                <span className="bg-blue-950 text-blue-300 text-[10px] px-2 py-0.5 rounded font-mono border border-blue-800">
                  {m.era.toUpperCase()} ERA
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">{m.timestamp}</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-sans italic">
              "{m.text}"
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs">
              <span className="text-[10px] text-gray-500 font-mono">{m.location || 'Cyberspace'}</span>
              <button
                onClick={() => handleLikeMemory(m.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-rose-400 cursor-pointer transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                <span className="font-mono text-xs">{m.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
