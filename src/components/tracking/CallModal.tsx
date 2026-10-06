import React, { useState, useEffect } from 'react';
import { Phone, X, Mic, Volume2, PhoneOff } from 'lucide-react';
import { DeliveryPartner } from '../../types';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: DeliveryPartner;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose, partner }) => {
  const [callState, setCallState] = useState<'prompt' | 'calling' | 'connected'>('prompt');
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCallState('prompt');
      setDuration(0);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'calling') {
      timer = setTimeout(() => {
        setCallState('connected');
      }, 2500);
    } else if (callState === 'connected') {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [callState]);

  if (!isOpen) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white max-w-sm w-full rounded-md shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100 bg-neutral-50">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Masked Secure Call
          </span>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-neutral-300 mx-auto"
            />
            {callState === 'connected' && (
              <span className="absolute bottom-0 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-neutral-900">{partner.name}</h3>
            <p className="text-xs text-neutral-500">
              {callState === 'prompt' && 'MALL Express Delivery Partner'}
              {callState === 'calling' && 'Connecting via secure virtual bridge...'}
              {callState === 'connected' && (
                <span className="text-emerald-700 font-semibold font-mono">
                  Connected • {formatTimer(duration)}
                </span>
              )}
            </p>
          </div>

          {callState === 'prompt' && (
            <div className="bg-neutral-50 p-3 rounded text-[11px] text-neutral-600 text-left border border-neutral-200">
              <p className="font-semibold text-neutral-800 mb-0.5">Privacy Protected</p>
              Your personal telephone number is concealed using MALL Virtual Bridge. Calls are free of charge.
            </div>
          )}

          {callState === 'connected' && (
            <div className="flex justify-center space-x-6 py-2 text-neutral-600">
              <button className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            {callState === 'prompt' ? (
              <button
                onClick={() => setCallState('calling')}
                className="w-full py-2.5 px-4 bg-neutral-950 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Rahul Kumar</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-red-600 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
