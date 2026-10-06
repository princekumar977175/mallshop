import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Sliders, ChevronDown, ChevronUp, FastForward } from 'lucide-react';

interface DemoControlsProps {
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onChangeSpeed: (spd: number) => void;
  onReset: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  currentIndex,
  onSelectIndex,
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  onReset
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Key presenter milestones
  const stages = [
    { label: '18 MIN', index: 0, subtitle: '2.4 km' },
    { label: '12 MIN', index: 2, subtitle: '1.6 km' },
    { label: '6 MIN', index: 4, subtitle: '800 m' },
    { label: '3 MIN', index: 5, subtitle: '450 m' },
    { label: 'ARRIVING', index: 7, subtitle: '50 m' },
    { label: 'DELIVERED', index: 8, subtitle: '0 m' }
  ];

  return (
    <div className="border border-neutral-300 bg-neutral-900 text-white rounded-sm shadow-xl overflow-hidden text-xs">
      {/* Header Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2.5 bg-neutral-950 flex items-center justify-between cursor-pointer select-none border-b border-neutral-800"
      >
        <div className="flex items-center space-x-2">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold tracking-wider uppercase text-[11px] text-neutral-200">
            Client Presentation Controller
          </span>
          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-400 text-[10px] rounded font-mono">
            Demo Mode
          </span>
        </div>
        <button className="text-neutral-400 hover:text-white">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Controls Body */}
      {isExpanded && (
        <div className="p-4 space-y-3.5 bg-neutral-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
              Quick State Jumps
            </span>

            {/* Play/Pause & Speed Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onTogglePlay}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition-colors ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause Auto</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Simulate Live</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onChangeSpeed(speed === 1 ? 2 : speed === 2 ? 3 : 1)}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded font-mono text-[11px] flex items-center space-x-1"
                title="Toggle Speed Multiplier"
              >
                <FastForward className="w-3 h-3" />
                <span>{speed}x</span>
              </button>

              <button
                onClick={onReset}
                className="p-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded"
                title="Reset to 18 MIN"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {stages.map(st => {
              const isSelected = currentIndex === st.index;
              return (
                <button
                  key={st.label}
                  onClick={() => onSelectIndex(st.index)}
                  className={`p-2 rounded text-center transition-all ${
                    isSelected
                      ? 'bg-white text-neutral-950 font-bold ring-2 ring-amber-400'
                      : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700'
                  }`}
                >
                  <p className="text-xs font-bold leading-tight">{st.label}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{st.subtitle}</p>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-neutral-400">
            Tip: Click any milestone button above to immediately synchronize ETA, distance, map coordinates, timeline, and delivery status for the client.
          </p>
        </div>
      )}
    </div>
  );
};
