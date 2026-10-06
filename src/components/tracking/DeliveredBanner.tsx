import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Eye, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeliveredBannerProps {
  orderId: string;
  deliveredTime?: string;
  onViewOrder: () => void;
}

export const DeliveredBanner: React.FC<DeliveredBannerProps> = ({
  orderId,
  deliveredTime = '9:42 PM',
  onViewOrder
}) => {
  useEffect(() => {
    // Subtle confetti burst on arrival
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="bg-emerald-50/70 border-2 border-emerald-300 p-6 sm:p-8 rounded-sm text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
          Package Verified & Handed Over
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">
          ORDER DELIVERED
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-md mx-auto">
          Your order #{orderId} has been delivered successfully.
        </p>
        <p className="text-xs font-semibold text-emerald-800 mt-1">
          Delivered at {deliveredTime}
        </p>
      </div>

      {/* Driver Rating Widget */}
      <div className="py-2 border-y border-emerald-200/60 max-w-sm mx-auto">
        <p className="text-xs text-neutral-700 font-medium mb-1.5">
          How was your delivery experience with Rahul Kumar?
        </p>
        <div className="flex justify-center space-x-1.5 text-amber-400">
          {[1, 2, 3, 4, 5].map(st => (
            <button
              key={st}
              className="p-1 hover:scale-110 transition-transform focus:outline-none"
            >
              <Star className="w-5 h-5 fill-amber-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Buttons: VIEW ORDER & CONTINUE SHOPPING */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onViewOrder}
          className="px-6 py-2.5 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-none transition-colors inline-flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Order Summary</span>
        </button>

        <Link
          to="/"
          className="px-6 py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none transition-colors inline-flex items-center space-x-2 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
