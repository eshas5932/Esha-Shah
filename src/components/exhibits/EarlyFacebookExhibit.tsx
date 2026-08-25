import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Hand, Heart, MessageSquare, Sparkles, Send, Check } from 'lucide-react';

interface EarlyFacebookExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const EarlyFacebookExhibit: React.FC<EarlyFacebookExhibitProps> = ({ onUnlockMemory }) => {
  const [pokeCount, setPokeCount] = useState<number>(14);
  const [lastPokedTime, setLastPokedTime] = useState<string>('5 minutes ago');
  const [wallPosts, setWallPosts] = useState<Array<{ author: string; text: string; date: string }>>([
    { author: 'Dave Miller', text: 'Hey man, are we heading to the dining hall after econ lecture?', date: 'March 18, 2007 at 1:15 PM' },
    { author: 'Emily Watson', text: 'hahaha loved your untagged album from spring break! 📸', date: 'March 17, 2007 at 8:40 PM' }
  ]);
  const [postInput, setPostInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('is studying for finals and drinking too much Red Bull');
  const [farmvilleAlert, setFarmvilleAlert] = useState<boolean>(true);

  const handlePoke = () => {
    retroAudio.playClick();
    setPokeCount((prev) => prev + 1);
    setLastPokedTime('Just now');
    onUnlockMemory?.('facebook-poke');
  };

  const handlePostWall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postInput.trim()) return;
    retroAudio.playClick();
    setWallPosts([
      { author: 'You (Visitor)', text: postInput.trim(), date: 'Just now' },
      ...wallPosts
    ]);
    setPostInput('');
    onUnlockMemory?.('facebook-wall');
  };

  return (
    <div id="facebook-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-blue-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-2xl bg-[#f7f7f7] text-neutral-900 border-2 border-[#3b5998] rounded-lg shadow-2xl overflow-hidden font-sans">
        
        {/* Facebook 2007 Blue Bar */}
        <div className="bg-[#3b5998] text-white px-4 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-2xl tracking-tighter">[facebook]</span>
            <div className="hidden sm:flex gap-3 text-xs text-blue-100 font-semibold">
              <span className="cursor-pointer hover:underline">Profile</span>
              <span className="cursor-pointer hover:underline">Friends</span>
              <span className="cursor-pointer hover:underline">Networks</span>
              <span className="cursor-pointer hover:underline">Inbox</span>
            </div>
          </div>
          <div className="text-xs text-blue-200">
            <span>Stanford Network</span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="p-4 bg-white border-b border-gray-300">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded bg-neutral-200 border border-gray-300 flex items-center justify-center text-3xl shadow-inner">
                🎓
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#3b5998]">Mark Robinson</h2>
                <div className="flex items-center gap-1 text-xs text-neutral-700 mt-0.5">
                  <span className="font-semibold">Mark</span>
                  <input
                    type="text"
                    value={statusMessage}
                    onChange={(e) => setStatusMessage(e.target.value)}
                    className="border border-gray-300 rounded px-1.5 py-0.5 text-xs text-neutral-900 bg-neutral-50 flex-1 max-w-xs"
                    title="In 2007, Facebook status had to start with 'is...'"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">Relationship: It's Complicated • Interested in: Women</p>
              </div>
            </div>

            {/* POKE BOX */}
            <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-center shadow-sm">
              <span className="text-[11px] font-bold text-[#3b5998] block">Poke War in Progress!</span>
              <p className="text-xs text-neutral-600 my-1">
                You and Mark have poked each other <strong className="text-blue-900">{pokeCount}</strong> times.
              </p>
              <button
                id="btn-facebook-poke"
                onClick={handlePoke}
                className="bg-[#3b5998] hover:bg-[#2d4373] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 mx-auto cursor-pointer shadow active:scale-95 transition-transform"
              >
                <Hand className="w-3.5 h-3.5" /> Poke Mark Back
              </button>
            </div>
          </div>
        </div>

        {/* FarmVille Notification Banner */}
        {farmvilleAlert && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs flex items-center justify-between text-amber-900">
            <div className="flex items-center gap-2">
              <span className="text-base">🚜</span>
              <span><strong>FarmVille:</strong> Your Eggplants are ready to harvest! Neighbor Mark needs help fertilizing crops!</span>
            </div>
            <button
              onClick={() => setFarmvilleAlert(false)}
              className="text-[10px] text-neutral-500 hover:text-neutral-800 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* The Wall */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-sm text-[#3b5998] border-b border-gray-300 pb-1">
            The Wall (Write Something on Mark's Wall)
          </h3>

          <form onSubmit={handlePostWall} className="space-y-2">
            <textarea
              placeholder="Write a message on Mark's public wall..."
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
              rows={2}
              className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-neutral-900 font-sans"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3b5998] hover:bg-[#2d4373] text-white px-3 py-1 rounded text-xs font-bold cursor-pointer"
              >
                Post to Wall
              </button>
            </div>
          </form>

          {/* Wall Feed */}
          <div className="space-y-2.5 pt-2 max-h-[180px] overflow-y-auto pr-1">
            {wallPosts.map((post, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded border border-gray-200 text-xs shadow-sm space-y-1">
                <div className="flex justify-between items-center text-[#3b5998] font-bold">
                  <span>{post.author}</span>
                  <span className="text-[10px] text-neutral-400 font-normal">{post.date}</span>
                </div>
                <p className="text-neutral-800">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Before the algorithmic News Feed was introduced, users visited individual friend profiles and manually scrolled down their Wall to see what they were doing."
      </p>
    </div>
  );
};
