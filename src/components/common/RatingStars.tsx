import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  size = 'sm',
  showCount = true
}) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="inline-flex items-center space-x-1.5">
      <div className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-800 text-xs font-semibold">
        <span>{rating.toFixed(1)}</span>
        <Star className={`${iconSize} fill-amber-400 text-amber-400`} />
      </div>
      {showCount && count !== undefined && (
        <span className="text-[11px] text-neutral-500 font-normal">
          ({count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count})
        </span>
      )}
    </div>
  );
};
