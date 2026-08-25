import React, { useState } from 'react';
import { retroAudio } from '../utils/audio';
import { Sparkles, Calendar, Check, Share2, Award, RefreshCw, Copy, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChildhoodTimelineProps {
  onSetChildhoodEra?: (story: string) => void;
}

export const ChildhoodTimeline: React.FC<ChildhoodTimelineProps> = ({ onSetChildhoodEra }) => {
  const [birthYear, setBirthYear] = useState<number>(1996);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'MSN Messenger',
    'Facebook',
    'Vine',
    'Instagram'
  ]);
  const [generatedStory, setGeneratedStory] = useState<{
    entryEra: string;
    milestones: string[];
    archetypeTitle: string;
    dossierCode: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Exact 8 platforms requested by user + vintage classics
  const availablePlatforms = [
    { name: 'Orkut', icon: '🌸', era: '2004–2010', tag: 'Scraps & Testimonials' },
    { name: 'MSN Messenger', icon: '💬', era: '1999–2012', tag: 'Nudges & Winks' },
    { name: 'Facebook', icon: '📘', era: '2004–Present', tag: 'The Poke & Wall' },
    { name: 'Tumblr', icon: '🖤', era: '2007–Present', tag: 'Aesthetic Fandom' },
    { name: 'Vine', icon: '📹', era: '2013–2017', tag: '6-Second Comedy' },
    { name: 'Musical.ly', icon: '🎵', era: '2014–2018', tag: 'Pre-TikTok Lip-sync' },
    { name: 'Instagram', icon: '📸', era: '2010–Present', tag: 'Skeuomorphic Filters' },
    { name: 'TikTok', icon: '✨', era: '2018–Present', tag: 'Algorithmic FYP' },
    { name: 'Dial-Up / AIM', icon: '📟', era: '1995–2003', tag: '56k & Away Messages' },
    { name: 'MySpace', icon: '⭐', era: '2003–2008', tag: 'Top 8 Drama' }
  ];

  const handleTogglePlatform = (name: string) => {
    retroAudio.playClick();
    if (selectedPlatforms.includes(name)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== name));
    } else {
      setSelectedPlatforms([...selectedPlatforms, name]);
    }
  };

  const handleGenerate = () => {
    retroAudio.playUnlock();
    confetti({ particleCount: 85, spread: 70, origin: { y: 0.6 } });

    let entryEra = 'You joined the internet during the transitional dial-up to social web bridge.';
    let archetypeTitle = 'The Golden Era Internet Native';
    const milestones: string[] = [];

    // Chronological analysis based on birth year
    if (birthYear < 1990) {
      entryEra = 'You first touched cyberspace in the raw 56k dial-up modem & CRT monitor wilderness.';
      archetypeTitle = 'Cyberspace Pioneer';
      milestones.push('You remember when going online meant yelling at family members to stay off the landline.');
    } else if (birthYear <= 1996) {
      entryEra = 'You grew up right in the peak MSN Messenger, Orkut scrap, and early Facebook era.';
      archetypeTitle = 'The Web 2.0 Vanguard';
      milestones.push('You survived the Facebook Poke and embarrassing 200-photo digital camera albums.');
    } else if (birthYear <= 2003) {
      entryEra = 'You came of age during the peak Tumblr aesthetic, 6-second Vine, and early Instagram era.';
      archetypeTitle = 'The Aesthetic Vine Generation';
      milestones.push('You witnessed Vine’s entire existence from launch to funeral, memorizing every punchline.');
    } else {
      entryEra = 'You grew up in the hyper-fast Musical.ly to TikTok algorithmic ecosystem.';
      archetypeTitle = 'The Algorithmic Speedrunner';
      milestones.push('You transitioned seamlessly from Musical.ly lip-syncs to 3:00 AM TikTok FYP vortexes.');
    }

    // Platform-specific humorous & nostalgic insights
    if (selectedPlatforms.includes('MSN Messenger')) {
      milestones.push('You mastered the aggressive sign-in/sign-out dance to catch your crush’s attention in the bottom-right corner.');
    }
    if (selectedPlatforms.includes('Orkut')) {
      milestones.push('You maintained a sacred 100% Cool rating, traded scraps, and begged best friends for poetic testimonials.');
    }
    if (selectedPlatforms.includes('Facebook')) {
      milestones.push('You received mysterious Pokes from people you sat next to in algebra and took 40-question quiz apps.');
    }
    if (selectedPlatforms.includes('Tumblr')) {
      milestones.push('You spent 5 consecutive hours debugging custom HTML/CSS on a Tumblr theme with falling cursor snowflakes.');
    }
    if (selectedPlatforms.includes('Vine')) {
      milestones.push('You can still quote "Look at all those chickens!" and "Road work ahead? Uh yeah, I sure hope it does" on command.');
    }
    if (selectedPlatforms.includes('Musical.ly')) {
      milestones.push('You remember holding your phone upside down to execute dramatic 2016 hand transitions to pop remixes.');
    }
    if (selectedPlatforms.includes('Instagram')) {
      milestones.push('You remember when Instagram had a leather-and-glass camera icon, Nashville/Earlybird filters, and zero sponsored ads.');
    }
    if (selectedPlatforms.includes('TikTok')) {
      milestones.push('You frequently open TikTok just to check the time and suddenly find yourself 3 hours into a recipe debunk saga.');
    }
    if (selectedPlatforms.includes('Dial-Up / AIM')) {
      milestones.push('You waited 45 minutes for a single 128kbps song to download on Napster, praying the connection would hold.');
    }
    if (selectedPlatforms.includes('MySpace')) {
      milestones.push('You navigated life-or-death friendship diplomacy when arranging your MySpace Top 8.');
    }

    const dossierCode = `DOSSIER-${birthYear}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = {
      entryEra,
      milestones: milestones.slice(0, 5),
      archetypeTitle,
      dossierCode
    };

    setGeneratedStory(result);
    onSetChildhoodEra?.(archetypeTitle);
  };

  const handleShareCard = () => {
    if (!generatedStory) return;
    retroAudio.playClick();

    const shareContent = `🏛️ THE INTERNET MUSEUM • CHILDHOOD DOSSIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ Born: ${birthYear} | Archetype: ${generatedStory.archetypeTitle}
✦ Entry Era: "${generatedStory.entryEra}"
✦ Selected Platforms: ${selectedPlatforms.join(', ')}
✦ Key Milestones:
${generatedStory.milestones.map((m, i) => `  ${i + 1}. ${m}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generate your Internet Childhood at The Internet Museum!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div id="childhood-timeline-container" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 md:p-8 text-white max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
      
      {/* Feature Title Header */}
      <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
          ★ TIME TRAVEL NOSTALGIA CAPSULE ★
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
          Your Internet Childhood
        </h2>
        <p className="text-xs md:text-sm text-gray-400">
          Enter your birth year and select the platforms you used to generate your personalized internet journey story.
        </p>
      </div>

      {!generatedStory ? (
        <div className="space-y-6">
          {/* Question 1: Birth Year Slider */}
          <div className="bg-zinc-900/70 p-5 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-blue-300 uppercase tracking-wider block flex items-center gap-2 font-mono">
                <Calendar className="w-4 h-4 text-blue-400" />
                1. What year were you born?
              </label>
              <span className="bg-blue-600 text-white font-mono text-base px-3 py-1 rounded-lg font-bold shadow-md shadow-blue-500/20">
                {birthYear}
              </span>
            </div>

            <input
              type="range"
              min={1980}
              max={2014}
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-black rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>1980 (Dial-Up Era)</span>
              <span>1995 (Web 1.0)</span>
              <span>2004 (Social Web)</span>
              <span>2014 (Mobile / Algo)</span>
            </div>
          </div>

          {/* Question 2: Platforms Selection (Including all required platforms) */}
          <div className="bg-zinc-900/70 p-5 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-blue-300 uppercase tracking-wider block font-mono">
                2. Which of these platforms did you use growing up?
              </label>
              <span className="text-[11px] text-gray-400 font-mono">
                {selectedPlatforms.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availablePlatforms.map((p) => {
                const active = selectedPlatforms.includes(p.name);
                return (
                  <button
                    key={p.name}
                    onClick={() => handleTogglePlatform(p.name)}
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border text-left ${
                      active
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-black/60 border-white/10 text-gray-400 hover:bg-zinc-800 hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{p.icon}</span>
                      <div>
                        <span className="block font-bold text-gray-100">{p.name}</span>
                        <span className="block text-[10px] text-gray-400 font-mono">{p.tag}</span>
                      </div>
                    </div>
                    {active ? (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-gray-500">{p.era}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Action Button */}
          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            Generate My Internet Childhood Timeline
          </button>
        </div>
      ) : (
        /* The Generated Timeline Story Card */
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          
          {/* Shareable Card Output */}
          <div className="bg-gradient-to-br from-black via-zinc-950 to-black border border-blue-500/40 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden space-y-4">
            
            {/* Header Telemetry */}
            <div className="flex flex-wrap justify-between items-start border-b border-white/10 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
                  CYBER NOSTALGIA DOSSIER • BORN {birthYear}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1 uppercase">
                  {generatedStory.archetypeTitle}
                </h3>
              </div>
              <span className="bg-blue-950 text-blue-300 border border-blue-500/40 text-xs px-2.5 py-1 rounded font-mono">
                {generatedStory.dossierCode}
              </span>
            </div>

            {/* Entry Era Quote */}
            <p className="text-sm md:text-base text-blue-200 font-serif italic bg-blue-950/20 border border-blue-500/30 p-4 rounded-xl leading-relaxed">
              "{generatedStory.entryEra}"
            </p>

            {/* Milestones List */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                Personalized Internet Journey Milestones:
              </span>
              {generatedStory.milestones.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-zinc-900/80 p-3 rounded-xl border border-white/10">
                  <span className="text-blue-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans">
                    {m}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Platforms Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] text-gray-500 font-mono">Archive Badges:</span>
              {selectedPlatforms.map((plat, idx) => (
                <span key={idx} className="bg-zinc-900 border border-white/10 text-gray-300 px-2 py-0.5 rounded text-[10px] font-mono">
                  {plat}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Share & Recalculate */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleShareCard}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
              {copied ? 'Childhood Card Copied to Clipboard!' : 'Share Your Childhood Card'}
            </button>

            <button
              onClick={() => {
                retroAudio.playClick();
                setGeneratedStory(null);
                setCopied(false);
              }}
              className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-mono uppercase tracking-wider py-3.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-blue-400" /> Recalculate Timeline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
