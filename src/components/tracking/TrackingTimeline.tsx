import React from 'react';
import { Check, CircleDot, Circle } from 'lucide-react';

interface TrackingTimelineProps {
  currentStageIndex: number; // 0: Confirmed, 1: Packed, 2: Shipped, 3: Out for Delivery, 4: Delivered
  deliveredAtTime?: string;
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  currentStageIndex,
  deliveredAtTime = '9:42 PM'
}) => {
  const steps = [
    { label: 'Order Confirmed', time: 'Today, 6:30 PM' },
    { label: 'Order Packed', time: 'Today, 7:15 PM' },
    { label: 'Order Shipped', time: 'Today, 8:00 PM' },
    { label: 'Out for Delivery', time: 'Today, 8:45 PM' },
    { label: 'Delivered', time: currentStageIndex >= 4 ? `Delivered at ${deliveredAtTime}` : 'Estimated 9:45 PM' }
  ];

  return (
    <div className="bg-white border border-neutral-200 p-5 sm:p-6 rounded-sm shadow-subtle">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Order Status Timeline
          </h3>
          <p className="text-[11px] text-neutral-500">
            Updated in real-time from Bengaluru Express Hub
          </p>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-100 rounded text-[11px] font-semibold text-neutral-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {currentStageIndex >= 4 ? 'Completed' : 'Live Tracking Active'}
          </span>
        </div>
      </div>

      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:grid grid-cols-5 relative gap-2">
        {/* Connecting Progress Line */}
        <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-neutral-200 -z-0">
          <div
            className="h-full bg-neutral-950 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, (currentStageIndex / 4) * 100)}%` }}
          />
        </div>

        {steps.map((step, idx) => {
          const isDone = idx < currentStageIndex || currentStageIndex === 4;
          const isCurrent = idx === currentStageIndex && currentStageIndex < 4;

          return (
            <div key={idx} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isDone
                    ? 'bg-neutral-950 border-neutral-950 text-white'
                    : isCurrent
                    ? 'bg-white border-neutral-950 text-neutral-950 ring-4 ring-neutral-200 shadow-sm'
                    : 'bg-white border-neutral-300 text-neutral-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : isCurrent ? (
                  <CircleDot className="w-4 h-4 animate-pulse text-emerald-600" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>

              <p
                className={`text-xs mt-3 font-semibold ${
                  isCurrent || isDone ? 'text-neutral-950' : 'text-neutral-400'
                }`}
              >
                {step.label}
              </p>
              <span className="text-[10px] text-neutral-500 mt-0.5">{step.time}</span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="md:hidden space-y-4 relative pl-6 border-l-2 border-neutral-200 ml-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentStageIndex || currentStageIndex === 4;
          const isCurrent = idx === currentStageIndex && currentStageIndex < 4;

          return (
            <div key={idx} className="relative">
              <div
                className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  isDone
                    ? 'bg-neutral-950 border-neutral-950 text-white'
                    : isCurrent
                    ? 'bg-white border-neutral-950 text-emerald-600 ring-2 ring-neutral-200'
                    : 'bg-white border-neutral-300 text-neutral-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-3 h-3" />
                ) : isCurrent ? (
                  <CircleDot className="w-3 h-3" />
                ) : (
                  <Circle className="w-2.5 h-2.5" />
                )}
              </div>

              <div>
                <p
                  className={`text-xs font-semibold ${
                    isCurrent || isDone ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-neutral-500">{step.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
