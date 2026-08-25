import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Vibrate, Send, Smile, Music, Sparkles, MessageCircle, Heart, ThumbsUp } from 'lucide-react';

interface MsnMessengerExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

interface ChatEntry {
  sender: 'me' | 'crush';
  text: string;
  time: string;
  isNudge?: boolean;
}

export const MsnMessengerExhibit: React.FC<MsnMessengerExhibitProps> = ({ onUnlockMemory }) => {
  const [isNudging, setIsNudging] = useState<boolean>(false);
  const [statusQuote, setStatusQuote] = useState<string>('(8) Avril Lavigne - Sk8er Boi (8) <3');
  const [isCrushTyping, setIsCrushTyping] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    { sender: 'crush', text: 'hey! did you finish the history homework? (H)', time: '7:14 PM' },
    { sender: 'me', text: 'heyyy not yet! was listening to music lol (Y)', time: '7:15 PM' }
  ]);

  const triggerNudge = () => {
    if (isNudging) return;
    setIsNudging(true);
    retroAudio.playMsnNudge();

    setChatLog((prev) => [
      ...prev,
      { sender: 'me', text: 'You have just sent a Nudge!', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isNudge: true }
    ]);

    setTimeout(() => {
      setIsNudging(false);
      onUnlockMemory?.('msn-nudge');
    }, 700);

    // Crush reply after nudge
    setTimeout(() => {
      setIsCrushTyping(true);
      setTimeout(() => {
        setIsCrushTyping(false);
        retroAudio.playMsnMessage();
        setChatLog((prev) => [
          ...prev,
          { sender: 'crush', text: 'omg why did u nudge me my whole screen shook haha :-P', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      }, 1500);
    }, 1200);
  };

  const sendPresetMessage = (msg: string) => {
    retroAudio.playClick();
    const newEntry: ChatEntry = {
      sender: 'me',
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatLog((prev) => [...prev, newEntry]);

    setIsCrushTyping(true);
    setTimeout(() => {
      setIsCrushTyping(false);
      retroAudio.playMsnMessage();
      let reply = 'haha yeah totally (K)';
      if (msg.includes('brb')) reply = 'okies hurry back! :-)';
      if (msg.includes('gtg')) reply = 'aww ok cya tomorrow at school! <3';
      if (msg.includes('heyyy')) reply = 'heyyyy what are u up to? (8)';

      setChatLog((prev) => [
        ...prev,
        {
          sender: 'crush',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      onUnlockMemory?.('msn-chat');
    }, 1200);
  };

  return (
    <div id="msn-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-cyan-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* MSN Window with Nudge Shake Animation Wrapper */}
      <div className={`w-full max-w-xl bg-[#e5f0fa] text-neutral-900 border-2 border-[#6495ed] rounded-lg shadow-2xl overflow-hidden font-sans ${isNudging ? 'animate-msn-nudge' : ''}`}>
        
        {/* MSN Glass Header */}
        <div className="bg-gradient-to-r from-[#215dc6] via-[#3982e5] to-[#215dc6] text-white px-3 py-2 flex items-center justify-between font-bold text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border border-white inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-300 border border-white inline-block" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Sarah ★ (Online) - Conversation</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <button className="bg-blue-700/60 hover:bg-blue-600 px-1.5 py-0.5 rounded text-white text-[11px]">_</button>
            <button className="bg-blue-700/60 hover:bg-blue-600 px-1.5 py-0.5 rounded text-white text-[11px]">□</button>
            <button className="bg-red-600 hover:bg-red-700 px-2 py-0.5 rounded text-white text-[11px]">✕</button>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="bg-[#d9ecff] p-3 border-b border-[#a8d0f5] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {/* Display Pic 1 */}
            <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white shadow flex items-center justify-center text-lg">
              ✨
            </div>
            <div>
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <span>Sarah ★ ~*~ sUmMeR vIbEs ~*~</span>
                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-sans">Online</span>
              </div>
              <p className="text-[11px] text-blue-700 italic flex items-center gap-1 mt-0.5">
                <Music className="w-3 h-3 text-blue-600" />
                <span>Listening to: Simple Plan - I'm Just a Kid</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Chat Conversation */}
        <div className="p-3 bg-white min-h-[220px] max-h-[260px] overflow-y-auto space-y-2 text-xs font-sans">
          <div className="text-center text-[10px] text-gray-400 border-b border-gray-200 pb-1">
            Conversation started on Tuesday, 7:14 PM
          </div>

          {chatLog.map((item, idx) => (
            <div key={idx} className={`p-1.5 rounded ${item.isNudge ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold text-center italic text-xs' : ''}`}>
              {!item.isNudge && (
                <>
                  <div className="flex items-center gap-1">
                    <span className={`font-bold ${item.sender === 'me' ? 'text-blue-700' : 'text-purple-700'}`}>
                      {item.sender === 'me' ? 'You' : 'Sarah ★'} says:
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">({item.time})</span>
                  </div>
                  <p className="text-gray-800 pl-2 mt-0.5 font-medium">{item.text}</p>
                </>
              )}
              {item.isNudge && <span>⚡ {item.text} ⚡</span>}
            </div>
          ))}

          {isCrushTyping && (
            <div className="text-[11px] text-blue-600 italic animate-pulse">
              Sarah ★ is typing a message...
            </div>
          )}
        </div>

        {/* Toolbar & Nudge Action */}
        <div className="bg-[#edf4fb] p-2 border-t border-[#bcd8f4] flex flex-wrap items-center justify-between gap-2">
          {/* Preset 2000s Responses */}
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => sendPresetMessage('heyyy')}
              className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer shadow-sm"
            >
              "heyyy"
            </button>
            <button
              onClick={() => sendPresetMessage('brb dinner! (K)')}
              className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer shadow-sm"
            >
              "brb dinner (K)"
            </button>
            <button
              onClick={() => sendPresetMessage('gtg mom needs computer! lol')}
              className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer shadow-sm"
            >
              "gtg mom needs PC"
            </button>
            <button
              onClick={() => sendPresetMessage('(Y) (L) (H)')}
              className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer shadow-sm"
            >
              "(Y) (L) emoticons"
            </button>
          </div>

          {/* THE SACRED NUDGE BUTTON */}
          <button
            id="btn-msn-nudge"
            onClick={triggerNudge}
            disabled={isNudging}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
            title="Shake Sarah's entire screen!"
          >
            <Vibrate className="w-4 h-4 animate-bounce" />
            SEND NUDGE
          </button>
        </div>

        {/* My Status Bar Editor */}
        <div className="bg-[#d9ecff] px-3 py-2 border-t border-[#a8d0f5] text-[11px] flex items-center justify-between text-blue-900">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-bold">Your Status:</span>
            <input
              type="text"
              value={statusQuote}
              onChange={(e) => setStatusQuote(e.target.value)}
              className="bg-white border border-blue-300 rounded px-2 py-0.5 text-xs text-blue-900 flex-1"
              title="Edit your MSN personal status"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "MSN Messenger launched in 1999 and hit over 330 million active users per month. The Nudge feature was famous for startling unsuspecting teenagers."
      </p>
    </div>
  );
};
