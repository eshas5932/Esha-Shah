import React, { useState } from 'react';
import { QUIZ_QUESTIONS, GENERATION_RESULTS } from '../data/museumData';
import { GenerationResult, VisitorTicket } from '../types';
import { retroAudio } from '../utils/audio';
import { Award, CheckCircle, RefreshCw, Share2, Sparkles, Check, Compass, Cpu, Radio, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GenerationQuizProps {
  onCompleteQuiz: (generationTitle: string) => void;
  ticket?: VisitorTicket;
}

export const GenerationQuiz: React.FC<GenerationQuizProps> = ({ onCompleteQuiz, ticket }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<{ [gen: string]: number }>({
    'digital-pioneer': 0,
    'social-native': 0,
    'tumblr-gen': 0,
    'algorithm-native': 0
  });
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (gen: string) => {
    retroAudio.playClick();
    const nextScores = { ...scores, [gen]: (scores[gen] || 0) + 1 };
    setScores(nextScores);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      let highestGen = 'social-native';
      let maxScore = -1;
      for (const [key, val] of Object.entries(nextScores)) {
        const numericVal = Number(val);
        if (numericVal > maxScore) {
          maxScore = numericVal;
          highestGen = key;
        }
      }

      const winResult = GENERATION_RESULTS[highestGen] || GENERATION_RESULTS['social-native'];
      setResult(winResult);
      retroAudio.playUnlock();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onCompleteQuiz(winResult.title);
    }
  };

  // Shortcut: Infer generation from user's visited exhibits & unlocked memories throughout the museum
  const handleInferFromMuseumActivity = () => {
    retroAudio.playClick();
    if (!ticket) return;

    let earlyCount = 0;
    let socialCount = 0;
    let tumblrCount = 0;
    let algoCount = 0;

    ticket.visitedExhibits.forEach((id) => {
      if (id.includes('dialup') || id.includes('geocities') || id.includes('aim') || id.includes('winamp') || id.includes('yahoo')) {
        earlyCount += 2;
      } else if (id.includes('msn') || id.includes('orkut') || id.includes('myspace') || id.includes('facebook') || id.includes('youtube')) {
        socialCount += 2;
      } else if (id.includes('tumblr') || id.includes('vine') || id.includes('instagram')) {
        tumblrCount += 2;
      } else if (id.includes('algorithm') || id.includes('doomscroll') || id.includes('ai')) {
        algoCount += 2;
      }
    });

    let bestGen = 'social-native';
    const max = Math.max(earlyCount, socialCount, tumblrCount, algoCount);
    if (max > 0) {
      if (max === earlyCount) bestGen = 'digital-pioneer';
      else if (max === socialCount) bestGen = 'social-native';
      else if (max === tumblrCount) bestGen = 'tumblr-gen';
      else if (max === algoCount) bestGen = 'algorithm-native';
    }

    const winResult = GENERATION_RESULTS[bestGen];
    setResult(winResult);
    retroAudio.playUnlock();
    confetti({ particleCount: 90, spread: 70 });
    onCompleteQuiz(winResult.title);
  };

  const handleRestart = () => {
    retroAudio.playClick();
    setCurrentStep(0);
    setScores({
      'digital-pioneer': 0,
      'social-native': 0,
      'tumblr-gen': 0,
      'algorithm-native': 0
    });
    setResult(null);
    setCopied(false);
  };

  const handleShareResult = () => {
    if (!result) return;
    retroAudio.playClick();

    const shareText = `🏛️ THE INTERNET MUSEUM • GENERATION DIAGNOSTIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ Category: ${result.title} (${result.eraRange})
✦ Archetype: ${result.archetype}
✦ Quote: ${result.quote}
✦ Signature Memory: "${result.signatureMemory}"
✦ Relics: ${result.techStack.join(' • ')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Discover your Internet Generation at The Internet Museum!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Distinct Generation Card Themes
  const getThemeDetails = (id: string) => {
    switch (id) {
      case 'digital-pioneer':
        return {
          cardBg: 'bg-gradient-to-br from-amber-950/40 via-[#0a0805] to-zinc-950 border-amber-500/50 shadow-amber-500/10',
          badgeBg: 'bg-amber-500 text-black',
          subBadge: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
          accentText: 'text-amber-300',
          quoteBorder: 'border-amber-500/30 bg-amber-950/20 text-amber-100',
          icon: <Radio className="w-5 h-5 text-amber-400" />,
          glow: 'from-amber-400 via-yellow-200 to-amber-500'
        };
      case 'tumblr-gen':
        return {
          cardBg: 'bg-gradient-to-br from-fuchsia-950/40 via-[#090509] to-zinc-950 border-fuchsia-500/50 shadow-fuchsia-500/10',
          badgeBg: 'bg-fuchsia-500 text-white',
          subBadge: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-950/40',
          accentText: 'text-fuchsia-300',
          quoteBorder: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-100',
          icon: <Flame className="w-5 h-5 text-fuchsia-400" />,
          glow: 'from-fuchsia-400 via-pink-200 to-purple-400'
        };
      case 'algorithm-native':
        return {
          cardBg: 'bg-gradient-to-br from-rose-950/40 via-[#0a0507] to-zinc-950 border-rose-500/50 shadow-rose-500/10',
          badgeBg: 'bg-rose-600 text-white',
          subBadge: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
          accentText: 'text-rose-300',
          quoteBorder: 'border-rose-500/30 bg-rose-950/20 text-rose-100',
          icon: <Cpu className="w-5 h-5 text-rose-400" />,
          glow: 'from-rose-400 via-orange-200 to-rose-500'
        };
      case 'social-native':
      default:
        return {
          cardBg: 'bg-gradient-to-br from-blue-950/40 via-[#05080f] to-zinc-950 border-blue-500/50 shadow-blue-500/10',
          badgeBg: 'bg-blue-600 text-white',
          subBadge: 'text-blue-400 border-blue-500/40 bg-blue-950/40',
          accentText: 'text-blue-300',
          quoteBorder: 'border-blue-500/30 bg-blue-950/20 text-blue-100',
          icon: <Compass className="w-5 h-5 text-blue-400" />,
          glow: 'from-blue-400 via-indigo-200 to-blue-500'
        };
    }
  };

  return (
    <div id="generation-quiz-container" className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 md:p-8 text-white max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
      {!result ? (
        <div className="space-y-6">
          {/* Header & Activity Shortcut */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
                ★ OFFICIAL ARCHETYPE DIAGNOSTIC ★
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                What's Your Internet Generation?
              </h2>
            </div>

            {ticket && ticket.visitedExhibits.length >= 2 && (
              <button
                onClick={handleInferFromMuseumActivity}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Auto-Diagnose from Activity</span>
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span className="text-blue-400 font-bold uppercase tracking-wider">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Answered</span>
            </div>

            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/10">
              <div
                className="bg-blue-500 h-full transition-all duration-300 shadow-sm shadow-blue-500/50"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1 bg-zinc-900/60 p-4 rounded-xl border border-white/5">
            <span className="text-[11px] text-gray-400 font-mono italic">Scenario: {currentQ.scenario}</span>
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.generation)}
                className="w-full text-left bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-blue-500/50 p-4 rounded-xl transition-all cursor-pointer group flex items-start gap-3.5 shadow-sm active:scale-98"
              >
                <span className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs font-mono text-gray-400 group-hover:border-blue-400 group-hover:text-blue-400 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs md:text-sm font-semibold text-gray-200 group-hover:text-white leading-relaxed">
                    {opt.text}
                  </p>
                  <p className="text-[11px] text-gray-400 italic font-sans">{opt.subtext}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Distinct Generation Result Presentation */
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">
              ★ OFFICIAL ARCHETYPE DIAGNOSTIC RESULT ★
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
              Your Internet Generation
            </h2>
          </div>

          {/* Result Card with Distinct Theming */}
          {(() => {
            const theme = getThemeDetails(result.id);
            return (
              <div className={`border p-6 md:p-8 rounded-2xl shadow-2xl space-y-5 relative overflow-hidden ${theme.cardBg}`}>
                
                {/* Header Badge */}
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${theme.subBadge}`}>
                        {result.eraRange}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        {result.archetype}
                      </span>
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${theme.glow} uppercase tracking-wide`}>
                      {result.title}
                    </h3>
                  </div>
                  <span className={`${theme.badgeBg} font-bold px-3 py-1 rounded-full text-xs font-mono shadow-md`}>
                    100% MATCH
                  </span>
                </div>

                {/* Core Quote */}
                <p className={`text-sm md:text-base italic font-serif leading-relaxed p-4 rounded-xl border ${theme.quoteBorder}`}>
                  {result.quote}
                </p>

                {/* Traits Checklist */}
                <div className="space-y-2">
                  <h4 className={`font-bold text-xs uppercase tracking-wider font-mono ${theme.accentText}`}>
                    Key Cultural Identifiers:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.traits.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-black/60 p-2.5 rounded-lg border border-white/10 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature Memory */}
                <div className="border-t border-white/10 pt-3 text-xs space-y-1">
                  <span className="font-bold text-gray-400 block font-mono uppercase text-[10px]">
                    Signature Memory:
                  </span>
                  <p className="text-gray-200 italic font-serif">"{result.signatureMemory}"</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] text-gray-500 font-mono">Era Relics:</span>
                  {result.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-0.5 rounded text-[11px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Action Buttons: Share & Retake */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleShareResult}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
              {copied ? 'Shareable Card Copied to Clipboard!' : 'Share Generation Card'}
            </button>

            <button
              onClick={handleRestart}
              className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-gray-300 hover:text-white font-mono uppercase tracking-wider py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-blue-400" /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
