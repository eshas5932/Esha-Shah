import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Sparkles, Music, Volume2, UserCheck, Play, ArrowUpDown, Shield } from 'lucide-react';

interface MySpaceExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  relationship: string;
}

export const MySpaceExhibit: React.FC<MySpaceExhibitProps> = ({ onUnlockMemory }) => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: 'Tom (Your First Friend)', avatar: '🧑‍💼', relationship: 'Creator of MySpace' },
    { id: 2, name: 'Jessie <3 (BFF)', avatar: '🎸', relationship: 'Scene Queen' },
    { id: 3, name: 'Chris (Drummer)', avatar: '🥁', relationship: 'Bandmate' },
    { id: 4, name: 'Maya (Cousin)', avatar: '🎧', relationship: 'Family' },
    { id: 5, name: 'Skater_Zack', avatar: '🛹', relationship: 'Skatepark Bro' },
    { id: 6, name: 'Emo_Ashley_x', avatar: '🖤', relationship: 'Poet' },
    { id: 7, name: 'DJ_Mike', avatar: '🎛️', relationship: 'Mixmaster' },
    { id: 8, name: 'Kyle (Guitar)', avatar: '⚡', relationship: 'Rhythm Guitar' }
  ]);

  const [glitterMode, setGlitterMode] = useState<boolean>(true);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(true);

  const swapFriends = (index1: number, index2: number) => {
    retroAudio.playClick();
    const newArr = [...friends];
    const temp = newArr[index1];
    newArr[index1] = newArr[index2];
    newArr[index2] = temp;
    setFriends(newArr);
    onUnlockMemory?.('myspace-top8');
  };

  const toggleGlitter = () => {
    retroAudio.playClick();
    setGlitterMode(!glitterMode);
    onUnlockMemory?.('myspace-html');
  };

  return (
    <div id="myspace-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-sky-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className={`w-full max-w-2xl border-2 border-sky-400 rounded-xl shadow-2xl overflow-hidden font-sans ${glitterMode ? 'bg-[#0b0c16] text-white' : 'bg-white text-neutral-900'}`}>
        
        {/* Top Header */}
        <div className="bg-[#003399] text-white p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">myspace.com</span>
            <span className="text-[11px] text-blue-200">| a place for friends</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleGlitter}
              className="bg-amber-400 hover:bg-amber-300 text-black px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-red-600" />
              {glitterMode ? 'Glitter CSS: ON' : 'Glitter CSS: OFF'}
            </button>
          </div>
        </div>

        {/* Profile Banner */}
        <div className="p-4 border-b border-sky-900/50 bg-gradient-to-r from-sky-950/80 to-purple-950/80 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
              <span>★~*xX_Dark_Shadow_Xx*~★</span>
              <span className="text-xs bg-emerald-700 text-white px-2 py-0.5 rounded-full font-mono">In Your Network</span>
            </h2>
            <p className="text-xs text-neutral-300 mt-0.5">"I'd rather be hated for who I am than loved for who I am not."</p>
          </div>

          {/* Autoplay Song Widget */}
          <div className="bg-black/80 border border-sky-500/50 p-2 rounded flex items-center gap-2 text-xs">
            <Music className={`w-4 h-4 ${isPlayingSong ? 'text-amber-400 animate-spin' : 'text-neutral-500'}`} />
            <div>
              <p className="font-bold text-amber-300 text-[11px]">My Chemical Romance - Helena</p>
              <p className="text-[10px] text-neutral-400 font-mono">Autoplay: ON (0:45 / 3:24)</p>
            </div>
            <button
              onClick={() => {
                retroAudio.playClick();
                setIsPlayingSong(!isPlayingSong);
              }}
              className="bg-sky-600 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
            >
              {isPlayingSong ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* The Legendary TOP 8 Friends Organizer */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-sm text-sky-300 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-sky-400" />
                xX_Dark_Shadow_Xx's Friend Space (Top 8 Friends)
              </h3>
              <p className="text-[11px] text-neutral-400">Click any friend to swap rank and trigger teenage geopolitical drama!</p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-1 rounded border border-amber-500/30">
              Total Friends: 412
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {friends.map((friend, idx) => (
              <div
                key={friend.id}
                onClick={() => swapFriends(idx, (idx + 1) % friends.length)}
                className="bg-black/60 border border-sky-500/40 hover:border-amber-400 p-2 rounded-lg text-center cursor-pointer transition-all hover:scale-105 group relative"
                title="Click to shift rank position"
              >
                <span className="absolute top-1 left-1 bg-amber-500 text-black text-[10px] font-extrabold px-1.5 rounded-full font-mono">
                  #{idx + 1}
                </span>
                <div className="text-3xl my-1">{friend.avatar}</div>
                <h4 className="font-bold text-xs text-sky-300 truncate group-hover:text-amber-300">
                  {friend.name}
                </h4>
                <p className="text-[10px] text-neutral-400 truncate">{friend.relationship}</p>
                <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-sky-400/80 group-hover:text-amber-400 font-mono">
                  <ArrowUpDown className="w-2.5 h-2.5" /> Swap
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw HTML Bio / Bling Box */}
        <div className="p-4 bg-neutral-950 border-t border-sky-900/40 text-xs">
          <h4 className="font-bold text-amber-400 mb-2">About Me (Custom HTML Bling):</h4>
          <div className="bg-neutral-900 p-3 rounded border border-neutral-700 font-mono text-neutral-300 space-y-1 text-[11px]">
            <p className="text-emerald-400">&lt;style&gt; body &#123; background-image: url('glitter_stars.gif'); cursor: crosshair; &#125; &lt;/style&gt;</p>
            <p className="text-amber-300">&lt;marquee scrollamount="4"&gt;THANX 4 VISITING MY PAGE!! LEAVE A COMMENT &amp; PC4PC!!&lt;/marquee&gt;</p>
            <p className="text-pink-400">&lt;b&gt;Current Mood:&lt;/b&gt; Contemplative &lt;img src="skull.gif" /&gt;</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "MySpace peaked around 2006 with over 100 million users. Tom Anderson ('Tom from MySpace') was automatically added as the first friend of every new user."
      </p>
    </div>
  );
};
