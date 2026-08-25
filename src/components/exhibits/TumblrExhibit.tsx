import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Heart, Repeat2, MessageSquare, Sparkles, Send, Tag, Share2 } from 'lucide-react';

interface TumblrExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

interface TumblrPost {
  id: number;
  author: string;
  avatar: string;
  type: 'quote' | 'fandom' | 'aesthetic';
  content: string;
  notes: number;
  tags: string[];
  reblogs: Array<{ user: string; comment: string }>;
  isLiked?: boolean;
}

export const TumblrExhibit: React.FC<TumblrExhibitProps> = ({ onUnlockMemory }) => {
  const [posts, setPosts] = useState<TumblrPost[]>([
    {
      id: 1,
      author: 'vintage-rain-and-tea',
      avatar: '🌧️',
      type: 'quote',
      content: '“we are all just searching for someone whose demons play well with ours.”',
      notes: 142890,
      tags: ['#aesthetic', '#deep thoughts', '#2am vibes', '#grunge', '#black and white'],
      reblogs: [
        { user: 'midnight-cigarette', comment: 'this hit me right in the soul.' },
        { user: 'pastel-goth-queen', comment: 'PLEASE REBLOG THIS IS EVERYTHING' }
      ]
    },
    {
      id: 2,
      author: 'superwholock-obsessed',
      avatar: '🧣',
      type: 'fandom',
      content: 'DOCTOR WHO / SUPERNATURAL / SHERLOCK CROSSOVER GIFSET [6/6]\nDean Winchester: "Cas, what did you do?"\nThe Doctor: "All of space and time is collapsing."\nSherlock: "Boring."',
      notes: 389102,
      tags: ['#supernatural', '#doctor who', '#sherlock', '#superwholock', '#i am crying'],
      reblogs: [
        { user: 'tardis-impala', comment: 'MY FEELS CANNOT HANDLE THIS TODAY' }
      ]
    }
  ]);

  const [newReblogComment, setNewReblogComment] = useState<{ [postId: number]: string }>({});

  const handleLike = (id: number) => {
    retroAudio.playClick();
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked, notes: p.notes + (p.isLiked ? -1 : 1) } : p
      )
    );
    onUnlockMemory?.('tumblr-heart');
  };

  const handleAddReblog = (id: number) => {
    const comment = newReblogComment[id];
    if (!comment || !comment.trim()) return;
    retroAudio.playUnlock();
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              notes: p.notes + 1,
              reblogs: [...p.reblogs, { user: 'you-aesthetic-wanderer', comment: comment.trim() }]
            }
          : p
      )
    );
    setNewReblogComment((prev) => ({ ...prev, [id]: '' }));
    onUnlockMemory?.('tumblr-reblog');
  };

  return (
    <div id="tumblr-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-indigo-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* Tumblr Dashboard Shell */}
      <div className="w-full max-w-2xl bg-[#36465d] text-white rounded-xl shadow-2xl overflow-hidden font-sans border-2 border-indigo-400/40">
        
        {/* Tumblr Blue Header */}
        <div className="bg-[#2c4762] px-4 py-3 flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <span className="font-serif font-black text-2xl tracking-tighter text-white">t</span>
            <span className="text-sm font-bold text-indigo-100 hidden sm:inline">Dashboard</span>
          </div>

          {/* Quick Post Icons */}
          <div className="flex gap-2 text-xs">
            <span className="bg-[#44627f] hover:bg-[#527494] px-2.5 py-1 rounded font-bold cursor-pointer">Aa Text</span>
            <span className="bg-[#d95e40] px-2.5 py-1 rounded font-bold cursor-pointer">📷 Photo</span>
            <span className="bg-[#f29f3f] px-2.5 py-1 rounded font-bold cursor-pointer">❝ Quote</span>
            <span className="bg-[#56bc8a] px-2.5 py-1 rounded font-bold cursor-pointer">🔗 Link</span>
          </div>
        </div>

        {/* Dashboard Posts Stream */}
        <div className="p-4 space-y-4 max-h-[460px] overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className="bg-white text-neutral-900 rounded-lg shadow-lg overflow-hidden border border-neutral-300">
              
              {/* Post Author Header */}
              <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-indigo-200 flex items-center justify-center text-sm">
                    {post.avatar}
                  </div>
                  <span className="font-bold text-sm text-indigo-950 font-mono">{post.author}</span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">Follow</span>
              </div>

              {/* Post Body (Quote / Aesthetics) */}
              <div className="p-5 bg-neutral-900 text-neutral-100 text-center font-serif relative">
                <p className="text-lg md:text-xl italic leading-relaxed text-neutral-200">
                  {post.content}
                </p>
              </div>

              {/* Reblog commentary chain */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-2 text-xs">
                {post.reblogs.map((r, rIdx) => (
                  <div key={rIdx} className="pl-3 border-l-2 border-indigo-400 py-0.5">
                    <span className="font-bold text-indigo-900 font-mono">{r.user}: </span>
                    <span className="text-neutral-700">{r.comment}</span>
                  </div>
                ))}
              </div>

              {/* Reblog input */}
              <div className="p-2.5 bg-neutral-100 border-t border-neutral-200 flex gap-2">
                <input
                  type="text"
                  placeholder="Add your dramatic reblog commentary..."
                  value={newReblogComment[post.id] || ''}
                  onChange={(e) =>
                    setNewReblogComment({ ...newReblogComment, [post.id]: e.target.value })
                  }
                  className="flex-1 bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-900"
                />
                <button
                  onClick={() => handleAddReblog(post.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Repeat2 className="w-3.5 h-3.5" /> Reblog
                </button>
              </div>

              {/* Tags & Action Bar */}
              <div className="p-3 bg-white border-t border-neutral-200 flex flex-wrap justify-between items-center gap-2 text-xs">
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-neutral-500 hover:text-indigo-600 font-mono text-[11px] cursor-pointer">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-neutral-600 text-[11px]">
                    {post.notes.toLocaleString()} notes
                  </span>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="cursor-pointer transition-transform active:scale-125"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        post.isLiked ? 'text-red-500 fill-red-500' : 'text-neutral-400 hover:text-red-400'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Tumblr peaked in the early 2010s with over 500 million monthly visitors, becoming the ground zero for fandom culture, aesthetic movements, and text-post humor."
      </p>
    </div>
  );
};
