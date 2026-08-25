import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Heart, Star, Flame, Shield, Users, MessageSquare, Check, ThumbsUp, Sparkles, Smile } from 'lucide-react';

interface OrkutExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const OrkutExhibit: React.FC<OrkutExhibitProps> = ({ onUnlockMemory }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'scraps' | 'testimonials' | 'communities'>('profile');
  const [trustyRating, setTrustyRating] = useState<number>(3); // out of 3 stars
  const [coolRating, setCoolRating] = useState<number>(3);
  const [sexyRating, setSexyRating] = useState<number>(3);
  const [fansCount, setFansCount] = useState<number>(48);

  const [scraps, setScraps] = useState<Array<{ sender: string; text: string; date: string }>>([
    { sender: 'Priya_Sparkle', text: 'Heyyy Alex! Dont forget to forward the chemistry notes! Scrap me back! :-)', date: 'Oct 14, 2007' },
    { sender: 'Rohan_CoolDude', text: 'Bro match was awesome today!! CS 1.6 server tonight at 9pm?', date: 'Oct 13, 2007' }
  ]);
  const [scrapInput, setScrapInput] = useState<string>('');

  const [testimonials, setTestimonials] = useState<Array<{ sender: string; text: string; approved: boolean }>>([
    {
      sender: 'Neha (Bestie4Life)',
      text: 'Alex is the most genuine, funny, and coolest guy on this planet!! Always there to help during exam panic. If anyone hurts him they will answer to ME!! Luv u loads bro! Plz accept testy!',
      approved: true
    },
    {
      sender: 'Karan (LAN Gamer)',
      text: 'Alex is a true brother! King of de_dust2 and always shares his lunch. 100% Cool 100% Trusty 100% Sexy without doubt!!',
      approved: false
    }
  ]);

  const handlePostScrap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapInput.trim()) return;
    retroAudio.playClick();
    setScraps([
      { sender: 'You (Visitor)', text: scrapInput.trim(), date: 'Just now' },
      ...scraps
    ]);
    setScrapInput('');
    onUnlockMemory?.('orkut-scrap');
  };

  const handleApproveTestimonial = (index: number) => {
    retroAudio.playUnlock();
    setTestimonials((prev) =>
      prev.map((t, idx) => (idx === index ? { ...t, approved: true } : t))
    );
    onUnlockMemory?.('orkut-testimonial');
  };

  const handleRate = () => {
    retroAudio.playClick();
    setFansCount((prev) => prev + 1);
    onUnlockMemory?.('orkut-rating');
  };

  return (
    <div id="orkut-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-pink-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* Orkut Main Card */}
      <div className="w-full max-w-2xl bg-[#f2e7ef] text-neutral-900 border-2 border-[#d17ca8] rounded-xl shadow-2xl overflow-hidden font-sans">
        {/* Orkut Classic Pink Header */}
        <div className="bg-gradient-to-r from-[#cc3377] via-[#e64a8d] to-[#cc3377] text-white p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tighter text-white drop-shadow">orkut</span>
            <span className="text-xs bg-pink-900/40 text-pink-100 px-2 py-0.5 rounded">by Google</span>
          </div>
          <div className="flex gap-2 text-xs">
            <button 
              onClick={() => { retroAudio.playClick(); setActiveTab('profile'); }}
              className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${activeTab === 'profile' ? 'bg-white text-pink-800' : 'text-white hover:bg-pink-700/50'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => { retroAudio.playClick(); setActiveTab('scraps'); }}
              className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${activeTab === 'scraps' ? 'bg-white text-pink-800' : 'text-white hover:bg-pink-700/50'}`}
            >
              Scraps ({scraps.length})
            </button>
            <button 
              onClick={() => { retroAudio.playClick(); setActiveTab('testimonials'); }}
              className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${activeTab === 'testimonials' ? 'bg-white text-pink-800' : 'text-white hover:bg-pink-700/50'}`}
            >
              Testimonials ({testimonials.filter(t => t.approved).length})
            </button>
            <button 
              onClick={() => { retroAudio.playClick(); setActiveTab('communities'); }}
              className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${activeTab === 'communities' ? 'bg-white text-pink-800' : 'text-white hover:bg-pink-700/50'}`}
            >
              Communities
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 min-h-[340px]">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left Column: Avatar & Trust/Cool/Sexy Badges */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-pink-200 shadow-sm text-center">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-tr from-pink-400 to-amber-300 border-2 border-pink-400 flex items-center justify-center text-4xl shadow">
                  😎
                </div>
                <h3 className="font-bold text-pink-900 mt-2 text-base">Alex "The Rebel"</h3>
                <p className="text-xs text-neutral-500">Mumbai, India</p>

                {/* The Legendary Orkut Rating Icons */}
                <div className="w-full mt-4 pt-3 border-t border-pink-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-blue-700 font-bold">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Trusty:</span>
                    <span className="text-pink-600">{'★'.repeat(trustyRating)} (100%)</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-700 font-bold">
                    <span className="flex items-center gap-1"><Smile className="w-3.5 h-3.5" /> Cool:</span>
                    <span className="text-pink-600">{'😎'.repeat(coolRating)} (100%)</span>
                  </div>
                  <div className="flex justify-between items-center text-red-700 font-bold">
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> Sexy:</span>
                    <span className="text-pink-600">{'❤️'.repeat(sexyRating)} (100%)</span>
                  </div>
                </div>

                <button
                  onClick={handleRate}
                  className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5" /> Rate Alex (+1 Fan)
                </button>
              </div>

              {/* Right Column: Bio, Stats, and Badges */}
              <div className="md:col-span-2 space-y-3">
                <div className="bg-white p-3.5 rounded-lg border border-pink-200 shadow-sm text-xs space-y-2">
                  <h4 className="font-bold text-pink-800 border-b border-pink-100 pb-1 flex items-center justify-between">
                    <span>Personal Info & Karma</span>
                    <span className="text-[10px] text-pink-600 font-normal">Fans: {fansCount}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-neutral-700">
                    <p><strong className="text-neutral-900">Relationship:</strong> Single</p>
                    <p><strong className="text-neutral-900">Passions:</strong> Rock Music, Coding, FIFA</p>
                    <p><strong className="text-neutral-900">Ethnicity:</strong> Desi Cyberpunk</p>
                    <p><strong className="text-neutral-900">Languages:</strong> English, Hindi, C++</p>
                  </div>
                  <p className="text-neutral-800 italic bg-pink-50 p-2 rounded border border-pink-200">
                    "Life is not measured by the number of breaths you take, but by the scraps you receive! Scrap me before leaving!"
                  </p>
                </div>

                {/* Fast Scrap CTA */}
                <div className="bg-white p-3.5 rounded-lg border border-pink-200 shadow-sm text-xs">
                  <h4 className="font-bold text-pink-800 mb-2">Leave a Public Scrap for Alex</h4>
                  <form onSubmit={handlePostScrap} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write something nice on Alex's wall..."
                      value={scrapInput}
                      onChange={(e) => setScrapInput(e.target.value)}
                      className="flex-1 bg-neutral-50 border border-pink-300 rounded px-2.5 py-1 text-xs text-neutral-900"
                    />
                    <button
                      type="submit"
                      className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded font-bold text-xs cursor-pointer shadow"
                    >
                      Scrap!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scraps' && (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-pink-200 shadow-sm flex items-center justify-between text-xs">
                <span className="font-bold text-pink-900">Scrapbook ({scraps.length} public scraps)</span>
                <span className="text-[10px] text-neutral-500 italic">Anyone visiting can read these!</span>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {scraps.map((s, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-pink-200 text-xs shadow-sm space-y-1">
                    <div className="flex justify-between items-center text-pink-800 font-bold">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {s.sender}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{s.date}</span>
                    </div>
                    <p className="text-neutral-700 pl-2 border-l-2 border-pink-300">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-pink-200 text-xs text-neutral-700 shadow-sm">
                <p className="font-bold text-pink-900 mb-1">Pending Testimonials for Approval</p>
                <p className="text-[11px]">In Orkut, testimonials were long tribute essays. You had to review and accept them before they appeared publicly!</p>
              </div>

              <div className="space-y-2">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-lg border border-pink-200 text-xs shadow-sm space-y-2">
                    <div className="flex justify-between items-center font-bold text-pink-900">
                      <span>From: {t.sender}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${t.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {t.approved ? 'Approved & Visible' : 'Pending Review'}
                      </span>
                    </div>
                    <p className="text-neutral-700 italic pl-2 border-l-2 border-pink-400">"{t.text}"</p>
                    {!t.approved && (
                      <button
                        onClick={() => handleApproveTestimonial(idx)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer shadow"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept Testimonial
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: 'I Hate Waking Up Early for School/College', members: '1,420,891 members', icon: '😴' },
                { name: 'Maggi 2-Minute Noodles Lovers Club', members: '892,104 members', icon: '🍜' },
                { name: 'We Hate Mathematics & Calculus', members: '612,450 members', icon: '📐' },
                { name: 'Bollywood Dialogues & Mimicry', members: '430,991 members', icon: '🎬' },
                { name: 'Counter-Strike 1.6 All-Night LAN Clan', members: '241,000 members', icon: '💣' },
                { name: 'Linkin Park & Green Day Fanatics', members: '780,210 members', icon: '🎸' }
              ].map((comm, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg border border-pink-200 text-xs shadow-sm flex items-center gap-2.5">
                  <span className="text-2xl">{comm.icon}</span>
                  <div>
                    <h5 className="font-bold text-pink-900 text-xs">{comm.name}</h5>
                    <p className="text-[10px] text-neutral-500 font-mono">{comm.members}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "Orkut was founded in 2004 by Google engineer Orkut Büyükkökten and became a massive cultural phenomenon in Brazil and India before closing in 2014."
      </p>
    </div>
  );
};
