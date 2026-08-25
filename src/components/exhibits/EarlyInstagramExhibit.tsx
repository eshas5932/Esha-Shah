import React, { useState } from 'react';
import { retroAudio } from '../../utils/audio';
import { Camera, Heart, MessageCircle, Sparkles, Sliders, RefreshCw } from 'lucide-react';

interface EarlyInstagramExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const EarlyInstagramExhibit: React.FC<EarlyInstagramExhibitProps> = ({ onUnlockMemory }) => {
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'nashville' | 'earlybird' | 'lofi' | 'kelvin' | 'toaster'>('earlybird');
  const [likeCount, setLikeCount] = useState<number>(37);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState<number>(0);

  const samplePhotos = [
    { name: 'Coffee Cup on Wooden Table', emoji: '☕', location: 'Local Indie Cafe', caption: 'Starting the morning right with fresh beans. #coffee #latteart #vibes #nofilter (actually filter)' },
    { name: 'Vintage Converse Sneakers', emoji: '👟', location: 'Downtown Sidewalk', caption: 'Walk your own path. #shoes #wanderlust #deep #life' },
    { name: 'Sunset Through Tree Leaves', emoji: '🌅', location: 'Golden Hour Hill', caption: 'Nature is the best artist. 🍃 #goldenhour #sunset #2012' }
  ];

  const filterStyles = {
    normal: '',
    nashville: 'sepia-[0.35] contrast-125 brightness-110 hue-rotate-[-10deg]',
    earlybird: 'sepia-[0.6] contrast-110 brightness-95 saturate-125 ring-8 ring-amber-950/40',
    lofi: 'contrast-150 saturate-150 brightness-105',
    kelvin: 'sepia-[0.7] saturate-200 hue-rotate-[-25deg] contrast-125',
    toaster: 'contrast-130 brightness-90 saturate-125 shadow-inner'
  };

  const handleLike = () => {
    retroAudio.playClick();
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikeCount((prev) => prev + (nextState ? 1 : -1));
    if (nextState) {
      onUnlockMemory?.('instagram-2012-like');
    }
  };

  const handleSelectFilter = (filter: 'normal' | 'nashville' | 'earlybird' | 'lofi' | 'kelvin' | 'toaster') => {
    retroAudio.playCameraShutter();
    setSelectedFilter(filter);
    onUnlockMemory?.('instagram-filter');
  };

  const currentPhoto = samplePhotos[activePhoto];

  return (
    <div id="instagram-exhibit-container" className="w-full flex flex-col items-center bg-neutral-900 border border-amber-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* 2012 Skeuomorphic Instagram Frame */}
      <div className="w-full max-w-sm bg-[#3f3224] text-neutral-900 rounded-3xl p-3.5 shadow-2xl border-4 border-[#2b2218] overflow-hidden font-sans">
        
        {/* Instagram Leather Header */}
        <div className="bg-gradient-to-b from-[#517fa4] to-[#305777] text-white px-4 py-2.5 rounded-t-2xl flex items-center justify-between border-b-2 border-[#1c3850] shadow">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-extrabold text-xl tracking-tight text-white drop-shadow">Instagram</span>
          </div>
          <button 
            onClick={() => {
              retroAudio.playCameraShutter();
              setActivePhoto((prev) => (prev + 1) % samplePhotos.length);
            }}
            className="bg-sky-800/80 hover:bg-sky-700 text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Next Photo
          </button>
        </div>

        {/* The 1:1 Square Polaroid Post Frame */}
        <div className="bg-white p-3.5 rounded-b-2xl shadow space-y-3">
          
          {/* Post Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-200 border border-amber-400 flex items-center justify-center text-xs">
                📸
              </div>
              <div>
                <h4 className="font-bold text-xs text-neutral-900 leading-none">retro_photog_2012</h4>
                <span className="text-[10px] text-neutral-500">{currentPhoto.location}</span>
              </div>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">3h ago</span>
          </div>

          {/* Square Photo with 2012 Filter Applied */}
          <div className="relative aspect-square w-full bg-neutral-900 rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 text-center border border-neutral-300 shadow-inner">
            <div className={`w-full h-full rounded flex flex-col items-center justify-center bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300 transition-all duration-300 ${filterStyles[selectedFilter]}`}>
              <div className="text-6xl mb-2">{currentPhoto.emoji}</div>
              <span className="font-serif font-bold text-sm text-neutral-900 drop-shadow-sm px-4">
                {currentPhoto.name}
              </span>
            </div>

            {/* Polaroid vignette border simulation */}
            <div className="absolute inset-0 border-8 border-white/80 pointer-events-none rounded-lg" />
          </div>

          {/* Action Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className="cursor-pointer transition-transform active:scale-125"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-600 fill-red-600' : 'text-neutral-700'}`} />
              </button>
              <MessageCircle className="w-5 h-5 text-neutral-700 cursor-pointer" />
            </div>

            <p className="text-xs font-bold text-neutral-900">{likeCount} likes</p>
            <p className="text-xs text-neutral-800">
              <strong className="font-bold">retro_photog_2012</strong> {currentPhoto.caption}
            </p>
          </div>

          {/* Vintage Filter Selector Carousel */}
          <div className="border-t border-neutral-200 pt-3 space-y-1.5">
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider block">
              Choose 2012 Vintage Filter:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {(['normal', 'nashville', 'earlybird', 'lofi', 'kelvin', 'toaster'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleSelectFilter(filter)}
                  className={`px-2 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? 'bg-[#517fa4] text-white shadow'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "When Instagram launched in 2010 on iOS, photos were strictly 1:1 squares with nostalgic filters designed to mimic Kodak Instamatic and Polaroid cameras."
      </p>
    </div>
  );
};
