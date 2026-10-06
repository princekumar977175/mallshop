import React from 'react';
import { Clock, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RouteCheckpoint } from '../../data/deliveryRoute';

interface EtaCardProps {
  checkpoint: RouteCheckpoint;
  isDelivered: boolean;
  orderId: string;
}

export const EtaCard: React.FC<EtaCardProps> = ({ checkpoint, isDelivered, orderId }) => {
  return (
    <div className="bg-white border border-neutral-200 p-5 sm:p-6 rounded-sm shadow-subtle relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
          Delivery Estimate • #{orderId}
        </span>
        <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>OTP Verified Safe Drop</span>
        </div>
      </div>

      {/* Main ETA Display */}
      <div className="py-5">
        {isDelivered ? (
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Package Status
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-0.5">
                Delivered
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Handed directly to recipient at Indiranagar residence.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-700" />
              <span>Estimated Arrival</span>
            </span>

            <div className="flex flex-wrap items-baseline gap-3 mt-1">
              <div className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight transition-all duration-300">
                {checkpoint.etaLabel}
              </div>

              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-100 rounded text-xs font-semibold text-neutral-800">
                <Navigation className="w-3.5 h-3.5 text-neutral-600" />
                <span>{checkpoint.distanceLabel}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Status Message */}
      <div className="pt-3 border-t border-neutral-100">
        <div className="flex items-center space-x-2">
          {!isDelivered && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
          )}
          <p className="text-xs font-medium text-neutral-800 transition-all duration-300">
            {checkpoint.message}
          </p>
        </div>

        {/* Dynamic Progress indicator */}
        {!isDelivered && (
          <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-neutral-900 h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.max(8, Math.min(100, ((2.4 - checkpoint.distanceKm) / 2.4) * 100))}%`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
