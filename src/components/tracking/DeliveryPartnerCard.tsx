import React, { useState } from 'react';
import { Phone, MessageSquare, Star, ShieldCheck, Bike } from 'lucide-react';
import { DELIVERY_PARTNER } from '../../data/deliveryRoute';
import { CallModal } from './CallModal';
import { ChatModal } from './ChatModal';

interface DeliveryPartnerCardProps {
  isDelivered: boolean;
}

export const DeliveryPartnerCard: React.FC<DeliveryPartnerCardProps> = ({ isDelivered }) => {
  const [callOpen, setCallOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-neutral-200 p-5 sm:p-6 rounded-sm shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Assigned Delivery Specialist
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Courier</span>
          </span>
        </div>

        {/* Partner Info */}
        <div className="flex items-center space-x-4 py-4">
          <div className="relative shrink-0">
            <img
              src={DELIVERY_PARTNER.photoUrl}
              alt={DELIVERY_PARTNER.name}
              className="w-14 h-14 rounded-full object-cover border border-neutral-200"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-base font-bold text-neutral-900 truncate">
                {DELIVERY_PARTNER.name}
              </h4>
              <div className="flex items-center space-x-0.5 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-bold text-neutral-800">
                <span>{DELIVERY_PARTNER.rating}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-0.5">
              MALL Senior Delivery Partner • {DELIVERY_PARTNER.totalDeliveries}+ deliveries
            </p>

            <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-neutral-600">
              <Bike className="w-3.5 h-3.5 text-neutral-500" />
              <span>{DELIVERY_PARTNER.vehicleType}</span>
              <span className="font-mono font-semibold bg-neutral-100 px-1 rounded text-neutral-900">
                {DELIVERY_PARTNER.vehicleNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Call and Chat */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100">
          <button
            onClick={() => setCallOpen(true)}
            className="py-2.5 px-3 border border-neutral-300 hover:border-neutral-900 rounded-none text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center justify-center space-x-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>

          <button
            onClick={() => setChatOpen(true)}
            className="py-2.5 px-3 bg-neutral-950 hover:bg-black rounded-none text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center space-x-2 transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      <CallModal
        isOpen={callOpen}
        onClose={() => setCallOpen(false)}
        partner={DELIVERY_PARTNER}
      />

      <ChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        partner={DELIVERY_PARTNER}
      />
    </>
  );
};
