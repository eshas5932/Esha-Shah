import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Play, Pause, Star, ThumbsUp, MessageSquare, RefreshCw, Eye, Volume2 } from 'lucide-react';

interface EarlyYoutubeExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const EarlyYoutubeExhibit: React.FC<EarlyYoutubeExhibitProps> = ({ onUnlockMemory }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [starRating, setStarRating] = useState<number>(5);
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [bufferPercent, setBufferPercent] = useState<number>(75);
  const [isLowQuality, setIsLowQuality] = useState<boolean>(true);

  const clips = [
    {
      title: 'Charlie bit my finger - again !',
      views: '881,492,019 views',
      author: 'HDCYT',
      date: 'May 22, 2007',
      description: 'Charlie bit me... and it really hurt! Original viral moment.',
      emoji: '👶✌️',
      subtitles: '"Charlieeee, that really hurt! Charlie bit my finger!"'
    },
    {
      title: 'Keyboard Cat! - THE ORIGINAL!',
      views: '71,200,910 views',
      author: 'fatso99',
      date: 'June 7, 2007',
      description: 'Fatso the musical genius cat playing the piano keyboard.',
      emoji: '🐱🎹',
      subtitles: '🎶 [Upbeat retro synth solo playing relentlessly] 🎶'
    },
    {
      title: 'Chocolate Rain (Original Song by Tay Zonday)',
      views: '135,102,400 views',
      author: 'TayZonday',
      date: 'April 22, 2007',
      description: 'Tay Zonday singing Chocolate Rain with deep baritone voice.',
      emoji: '🍫🌧️',
      subtitles: '"Chocolate Rain... **I move away from the mic to breathe in**"'
    }
  ];

  const currentClip = clips[activeClipIndex];

  const handleTogglePlay = () => {
    retroAudio.playClick();
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      onUnlockMemory?.('youtube-2006');
    }
  };

  const handleRateStars = (stars: number) => {
    retroAudio.playClick();
    setStarRating(stars);
    setHasRated(true);
    onUnlockMemory?.('youtube-star-rating');
  };

  return (
    <div id="youtube-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-red-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      <div className="w-full max-w-2xl bg-[#ffffff] text-neutral-900 border-2 border-red-500 rounded-xl shadow-2xl overflow-hidden font-sans">
        
        {/* 2006 YouTube Header */}
        <div className="p-3 bg-[#e8e8e8] border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <span className="font-extrabold text-2xl tracking-tighter text-black">You</span>
              <span className="bg-red-600 text-white font-extrabold text-2xl tracking-tighter px-1.5 py-0.5 rounded-lg ml-0.5">
                Tube
              </span>
            </div>
            <span className="text-[11px] text-neutral-600 italic font-mono hidden sm:inline">
              Broadcast Yourself™
            </span>
          </div>

          <div className="flex gap-2">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded shadow-sm cursor-pointer">
              ★ Subscribe (Yellow Button)
            </button>
          </div>
        </div>

        {/* Video Stage / Flash Player Canvas */}
        <div className="bg-black p-4 flex flex-col items-center justify-center min-h-[260px] relative text-white">
          {/* Grainy CRT Filter / 240p Mode */}
          <div className={`w-full max-w-md h-52 bg-neutral-900 rounded border border-neutral-700 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden ${isLowQuality ? 'blur-[0.4px] contrast-125' : ''}`}>
            
            <div className="text-6xl mb-3 animate-bounce">
              {currentClip.emoji}
            </div>

            <div className="bg-black/80 px-3 py-1.5 rounded text-xs font-mono text-yellow-300 max-w-xs border border-yellow-500/40">
              {currentClip.subtitles}
            </div>

            {isPlaying && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" /> PLAYING (240p)
              </div>
            )}
          </div>

          {/* Flash Video Player Controls */}
          <div className="w-full max-w-md bg-neutral-800 p-2 rounded-b border border-neutral-700 flex flex-col gap-1.5 mt-1 text-xs">
            {/* Buffering Bar */}
            <div className="w-full bg-neutral-700 h-2 rounded overflow-hidden relative cursor-pointer">
              <div className="bg-neutral-500 h-full absolute left-0 top-0" style={{ width: `${bufferPercent}%` }} />
              <div className="bg-red-600 h-full absolute left-0 top-0" style={{ width: `${isPlaying ? 45 : 0}%` }} />
            </div>

            <div className="flex justify-between items-center text-neutral-300 text-[11px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white p-1 rounded cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <span>{isPlaying ? '0:24 / 0:56' : '0:00 / 0:56'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    retroAudio.playClick();
                    setIsLowQuality(!isLowQuality);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${isLowQuality ? 'bg-red-900 text-red-200' : 'bg-neutral-700 text-white'}`}
                >
                  {isLowQuality ? '240p (Standard)' : 'HQ (High Quality)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info & 5-Star Ratings */}
        <div className="p-4 bg-white border-b border-gray-300">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="font-bold text-base text-neutral-900">{currentClip.title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                From: <span className="text-blue-700 font-bold">{currentClip.author}</span> • Added {currentClip.date}
              </p>
            </div>

            {/* The 5-Star Rating System */}
            <div className="bg-neutral-50 border border-gray-300 p-2 rounded text-center">
              <span className="text-[10px] text-neutral-500 font-bold block mb-1">
                {hasRated ? 'Thanks for rating!' : 'Rate this video:'}
              </span>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => handleRateStars(star)}
                    className={`w-4 h-4 cursor-pointer transition-colors ${
                      star <= starRating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-neutral-700 mt-2 bg-neutral-100 p-2 rounded">
            {currentClip.description}
          </p>

          {/* Clip switcher */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="font-bold text-neutral-600 self-center">Watch Iconic 2007 Clasic:</span>
            {clips.map((clip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  retroAudio.playClick();
                  setActiveClipIndex(idx);
                  setIsPlaying(true);
                }}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border ${
                  activeClipIndex === idx ? 'bg-red-600 text-white border-red-700' : 'bg-gray-100 text-neutral-800 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {clip.title.slice(0, 18)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "YouTube was launched in 2005 and used the 5-star rating system until 2009, when Google found that almost all ratings were either 1 star or 5 stars, prompting the switch to Thumbs Up/Down."
      </p>
    </div>
  );
};
