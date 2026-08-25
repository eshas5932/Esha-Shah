import React, { useState, useEffect } from 'react';
import { retroAudio } from '../../utils/audio';
import { Radio, RefreshCw, Volume2, AlertCircle, CheckCircle2, Download, Zap } from 'lucide-react';

interface DialUpExhibitProps {
  onUnlockMemory?: (memoryId: string) => void;
}

export const DialUpExhibit: React.FC<DialUpExhibitProps> = ({ onUnlockMemory }) => {
  const [status, setStatus] = useState<'idle' | 'dialing' | 'connected' | 'failed'>('idle');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('Ready to connect. Check phone line.');
  const [speed] = useState<number>(56667);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [phoneInterrupted, setPhoneInterrupted] = useState<boolean>(false);

  const startDialup = () => {
    setPhoneInterrupted(false);
    setStatus('dialing');
    setLogMessages(['ATDT 555-0199', 'Opening COM3 port at 115200 baud...']);
    
    retroAudio.playDialupSequence((stepText) => {
      setCurrentStep(stepText);
      setLogMessages((prev) => [...prev.slice(-5), stepText]);
    });

    setTimeout(() => {
      setStatus('connected');
      onUnlockMemory?.('dialup-handshake');
    }, 4800);
  };

  const simulateMomPhone = () => {
    retroAudio.playClick();
    setPhoneInterrupted(true);
    setStatus('failed');
    setCurrentStep('NO CARRIER - Line disconnected (Someone picked up the upstairs phone!)');
    setLogMessages((prev) => [...prev, '>>> ERROR: Line voltage drop detected. Connection lost! <<<']);
    setIsDownloading(false);
  };

  const startDownload = () => {
    if (status !== 'connected' || isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    retroAudio.playClick();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDownloading && downloadProgress < 100) {
      interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval);
            setIsDownloading(false);
            retroAudio.playUnlock();
            return 100;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isDownloading, downloadProgress]);

  return (
    <div id="dialup-simulation-container" className="w-full flex flex-col items-center bg-neutral-900 border border-amber-500/30 rounded-xl p-4 md:p-6 text-neutral-200">
      {/* CRT Monitor Housing */}
      <div className="w-full max-w-2xl bg-[#c5baa7] p-5 md:p-7 rounded-2xl shadow-2xl border-4 border-[#9e927f] relative">
        {/* CRT Badge */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-neutral-800 tracking-wider">CYBERSCAN 15" CRT</span>
            <span className="text-[10px] bg-neutral-700 text-white px-2 py-0.5 rounded font-mono">SVGA 800x600</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${status === 'connected' ? 'bg-emerald-500 animate-pulse' : status === 'dialing' ? 'bg-amber-400 animate-ping' : 'bg-red-500'}`} />
            <span className="text-[10px] font-mono text-neutral-700">{status === 'connected' ? 'ONLINE' : status === 'dialing' ? 'CONNECTING' : 'OFFLINE'}</span>
          </div>
        </div>

        {/* Screen Bezel & Curved Display */}
        <div className="relative bg-black rounded-lg p-4 md:p-6 border-4 border-[#2b2723] overflow-hidden min-h-[320px] shadow-inner crt-overlay font-vt text-amber-400">
          {/* Scanline subtle text */}
          <div className="flex justify-between text-xs text-amber-500/70 border-b border-amber-500/20 pb-2 mb-4 font-mono">
            <span>MS-DOS 6.22 / Trumpet Winsock v2.1</span>
            <span>PORT COM3 : 56k V.90</span>
          </div>

          {status === 'idle' && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <Radio className="w-12 h-12 text-amber-400 animate-bounce" />
              <div>
                <p className="text-xl md:text-2xl font-vt tracking-wide">DIAL-UP CONNECTION ASSISTANT</p>
                <p className="text-sm font-mono text-amber-300/80 mt-1">ISP: America Online / WorldNet Gateway #4</p>
              </div>
              <button
                id="btn-dial-connect"
                onClick={startDialup}
                className="win98-btn px-6 py-2.5 text-neutral-900 font-bold font-sans-modern text-sm flex items-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer shadow-md active:translate-y-0.5"
              >
                <Zap className="w-4 h-4 text-amber-600" />
                Dial Connection (Listen to Audio)
              </button>
            </div>
          )}

          {status === 'dialing' && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-amber-300 animate-spin" />
                <span className="text-2xl font-vt animate-pulse">ESTABLISHING HANDSHAKE...</span>
              </div>
              <div className="w-full bg-neutral-950/80 border border-amber-500/40 p-3 rounded text-left font-mono text-xs space-y-1 text-emerald-400">
                {logMessages.map((msg, idx) => (
                  <p key={idx}>&gt; {msg}</p>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300/90 bg-amber-950/50 px-3 py-1.5 rounded border border-amber-500/30">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Playing authentic modem dual-tones & carrier screech</span>
              </div>
            </div>
          )}

          {status === 'connected' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/60 p-3 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-lg font-vt text-emerald-300">CONNECTED AT {speed.toLocaleString()} BPS</span>
                </div>
                <span className="font-mono text-xs text-emerald-400">TCP/IP ESTABLISHED</span>
              </div>

              {/* Download Simulator */}
              <div className="bg-neutral-950/90 border border-amber-500/30 p-3.5 rounded space-y-2.5">
                <div className="flex justify-between text-xs font-mono text-amber-300">
                  <span>File: linkin_park_in_the_end.mp3 (3.8 MB)</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full h-4 bg-neutral-800 border border-amber-500/50 rounded overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400">
                  <span>Transfer Rate: 3.42 KB/sec</span>
                  <span>Est. Time: {downloadProgress === 100 ? 'Completed!' : `${Math.max(1, Math.round((100 - downloadProgress) * 0.2))} min remaining`}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    id="btn-download-mp3"
                    onClick={startDownload}
                    disabled={isDownloading || downloadProgress === 100}
                    className="win98-btn px-3 py-1 text-xs text-neutral-900 font-sans-modern font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {downloadProgress === 100 ? 'Downloaded!' : isDownloading ? 'Downloading...' : 'Start Napster Download'}
                  </button>
                  <button
                    id="btn-mom-pickup"
                    onClick={simulateMomPhone}
                    className="win98-btn px-3 py-1 text-xs text-red-900 font-sans-modern font-bold flex items-center gap-1 cursor-pointer hover:bg-red-200"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    Simulate: Mom picks up landline
                  </button>
                </div>
              </div>

              <div className="text-xs font-mono text-neutral-400 border-t border-amber-500/20 pt-2 flex justify-between">
                <span>Packets In: 1,420 / Out: 840</span>
                <span>Byte Count: 48.2 KB</span>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
              <div className="space-y-1">
                <p className="text-xl font-vt text-red-400">DISCONNECTED - LINE DROPPED</p>
                <p className="text-xs font-mono text-neutral-400 max-w-md">{currentStep}</p>
              </div>
              <button
                id="btn-reconnect-dial"
                onClick={startDialup}
                className="win98-btn px-4 py-1.5 text-xs text-neutral-900 font-bold font-sans-modern flex items-center gap-1.5 cursor-pointer hover:bg-neutral-100"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Connection
              </button>
            </div>
          )}
        </div>

        {/* CRT Controls on Bezel */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neutral-600 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-neutral-600 shadow-inner" />
            <span className="font-mono text-[10px] text-neutral-700">BRIGHTNESS / CONTRAST</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-700">POWER</span>
            <div className="w-4 h-4 rounded-sm bg-neutral-800 border border-neutral-600" />
          </div>
        </div>
      </div>

      {/* Relatable Nostalgia Note */}
      <p className="text-xs text-neutral-400 text-center mt-4 max-w-lg italic font-mono">
        💡 "The 56k modem handshake sound was actually the computers negotiating line quality and filtering telephone line static frequencies."
      </p>
    </div>
  );
};
