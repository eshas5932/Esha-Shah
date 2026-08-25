import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Bot, Send, User, MessageSquare, Clock, Smile, Sparkles } from 'lucide-react';

interface AimChatExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

interface Message {
  sender: 'user' | 'smarterchild' | 'buddy';
  name: string;
  text: string;
  time: string;
}

export const AimChatExhibit: React.FC<AimChatExhibitProps> = ({ onUnlockMemory }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'smarterchild',
      name: 'SmarterChild',
      text: 'Hi there! I am SmarterChild, your AOL Instant Messenger AI buddy. Type anything, ask for a joke, movie trivia, or tell me about your day!',
      time: '3:45 PM'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [awayMessage, setAwayMessage] = useState<string>('~*~ oUt w/ tHe cReW ~*~ lEaVe a nUmBeR ~*~');
  const [isAway, setIsAway] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const getSmarterChildResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('joke')) {
      return 'Why was the computer cold? Because it left its Windows open! LOL! 😂 Want another one?';
    }
    if (lower.includes('movie') || lower.includes('matrix')) {
      return 'The Matrix (1999) is awesome! Keanu Reeves plays Neo. Did you take the red pill or the blue pill?';
    }
    if (lower.includes('weather')) {
      return 'It is 72°F and sunny in Cyberspace! Perfect weather to stay indoors and chat on AIM all day.';
    }
    if (lower.includes('hate') || lower.includes('stupid')) {
      return 'Hey, watch your language! Be nice to robots or I will not help you with your algebra homework!';
    }
    if (lower.includes('love') || lower.includes('crush')) {
      return 'Oooooh, someone has a crush! Put their initials in your away message with a tilde ~*~ to let them know!';
    }
    if (lower.includes('asl') || lower.includes('a/s/l')) {
      return '1/Bot/AOL Servers in Virginia! What about you? 😉';
    }
    if (lower.includes('bye') || lower.includes('gtg') || lower.includes('brb')) {
      return 'Later alligator! Don’t forget to leave an emotional lyric in your Away Message before you sign off!';
    }
    return `Interesting... you said "${input}". That reminds me of the time I crashed the entire America Online dial-up cluster in 2001! Ask me for a joke!`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');
    retroAudio.playClick();

    const userMsg: Message = {
      sender: 'user',
      name: 'ScreenName99',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getSmarterChildResponse(userText);
      retroAudio.playMsnMessage();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'smarterchild',
          name: 'SmarterChild',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      onUnlockMemory?.('smarterchild-chat');
    }, 900);
  };

  const toggleAway = () => {
    retroAudio.playClick();
    setIsAway(!isAway);
    if (!isAway) {
      onUnlockMemory?.('aim-away-message');
    }
  };

  return (
    <div id="aim-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-orange-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-2xl bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 rounded-t shadow-2xl overflow-hidden font-sans">
        {/* AIM Title Bar */}
        <div className="bg-[#000080] text-white px-3 py-1 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block" />
            <span>AIM Instant Message - SmarterChild &lt;Online&gt;</span>
          </div>
          <div className="flex gap-1">
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">_</button>
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">□</button>
            <button className="win98-btn px-1.5 py-0.5 text-[10px] text-black">X</button>
          </div>
        </div>

        {/* Buddy info & Away message toggle */}
        <div className="bg-[#d4d0c8] p-2 border-b border-gray-400 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-700" />
            <span className="font-bold">Talking to: SmarterChild</span>
            <span className="text-[10px] bg-green-700 text-white px-1.5 py-0.2 rounded font-mono">Available</span>
          </div>
          <button
            onClick={toggleAway}
            className={`win98-btn px-2.5 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer ${
              isAway ? 'bg-amber-300 text-neutral-900' : 'text-neutral-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {isAway ? 'Status: AWAY (Click to return)' : 'Set Away Message'}
          </button>
        </div>

        {/* Away message banner if active */}
        {isAway && (
          <div className="bg-amber-100 border-b border-amber-300 p-2 text-xs text-amber-900 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold">Away Message:</span>
              <span className="italic">{awayMessage}</span>
            </div>
            <input
              type="text"
              value={awayMessage}
              onChange={(e) => setAwayMessage(e.target.value)}
              className="bg-white px-2 py-0.5 border border-gray-400 rounded text-[11px]"
              title="Edit your dramatic 2001 lyric away message"
            />
          </div>
        )}

        {/* Chat History Box */}
        <div className="win98-inset bg-white p-3.5 m-2 min-h-[260px] max-h-[300px] overflow-y-auto space-y-3 font-sans text-xs">
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className={`font-bold ${msg.sender === 'user' ? 'text-red-700' : 'text-blue-700'}`}>
                  {msg.name}:
                </span>
                <span className="text-[10px] text-gray-500 font-mono">({msg.time})</span>
              </div>
              <p className="text-gray-900 pl-2 leading-relaxed">{msg.text}</p>
            </div>
          ))}
          {isTyping && (
            <p className="text-[11px] italic text-blue-700 font-mono animate-pulse">
              SmarterChild is typing a response...
            </p>
          )}
        </div>

        {/* Message Input & Formatting Tools */}
        <form onSubmit={handleSendMessage} className="p-2 bg-[#d4d0c8] space-y-2">
          {/* Quick buttons */}
          <div className="flex flex-wrap gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setInputText('Tell me a joke!')}
              className="win98-btn px-2 py-0.5 cursor-pointer hover:bg-white text-black"
            >
              "Tell me a joke"
            </button>
            <button
              type="button"
              onClick={() => setInputText('What is the weather?')}
              className="win98-btn px-2 py-0.5 cursor-pointer hover:bg-white text-black"
            >
              "What is the weather?"
            </button>
            <button
              type="button"
              onClick={() => setInputText('What is your A/S/L?')}
              className="win98-btn px-2 py-0.5 cursor-pointer hover:bg-white text-black"
            >
              "A/S/L?"
            </button>
            <button
              type="button"
              onClick={() => setInputText('Do you like The Matrix?')}
              className="win98-btn px-2 py-0.5 cursor-pointer hover:bg-white text-black"
            >
              "Do you like The Matrix?"
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message to SmarterChild..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="win98-inset flex-1 bg-white px-2.5 py-1.5 text-xs text-black"
            />
            <button
              type="submit"
              className="win98-btn px-4 py-1.5 font-bold text-xs text-black flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </form>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "SmarterChild was created in 2001 by ActiveBuddy and had over 30 million users on AIM and MSN. It was the direct ancestor of modern conversational AI."
      </p>
    </div>
  );
};
