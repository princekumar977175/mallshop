import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const isFootwear = category === 'footwear';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full rounded-md shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center space-x-2">
            <Ruler className="w-4 h-4 text-neutral-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              {isFootwear ? 'Footwear Sizing Chart' : 'Apparel Sizing Chart'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-neutral-700">
          <p className="text-neutral-600">
            {isFootwear
              ? 'All shoe sizes are presented in UK/Indian standard scale. We suggest ordering your regular sneaker size.'
              : 'Measurements are listed in inches. Sizing is true-to-size with an intentional tailored contemporary drape.'}
          </p>

          {isFootwear ? (
            <div className="border border-neutral-200 rounded overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-neutral-100 text-neutral-900 font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-3">UK / IND</th>
                    <th className="py-2.5 px-3">US Men</th>
                    <th className="py-2.5 px-3">EU</th>
                    <th className="py-2.5 px-3">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="py-2 px-3 font-semibold">6</td>
                    <td className="py-2 px-3">7.0</td>
                    <td className="py-2 px-3">40</td>
                    <td className="py-2 px-3">25.0 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">7</td>
                    <td className="py-2 px-3">8.0</td>
                    <td className="py-2 px-3">41</td>
                    <td className="py-2 px-3">25.8 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">8</td>
                    <td className="py-2 px-3">9.0</td>
                    <td className="py-2 px-3">42</td>
                    <td className="py-2 px-3">26.6 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">9</td>
                    <td className="py-2 px-3">10.0</td>
                    <td className="py-2 px-3">43</td>
                    <td className="py-2 px-3">27.5 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">10</td>
                    <td className="py-2 px-3">11.0</td>
                    <td className="py-2 px-3">44</td>
                    <td className="py-2 px-3">28.3 cm</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">11</td>
                    <td className="py-2 px-3">12.0</td>
                    <td className="py-2 px-3">45</td>
                    <td className="py-2 px-3">29.1 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-neutral-200 rounded overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-neutral-100 text-neutral-900 font-semibold border-b border-neutral-200">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (in)</th>
                    <th className="py-2.5 px-3">Waist (in)</th>
                    <th className="py-2.5 px-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="py-2 px-3 font-semibold">XS</td>
                    <td className="py-2 px-3">36</td>
                    <td className="py-2 px-3">29-30</td>
                    <td className="py-2 px-3">27.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">S</td>
                    <td className="py-2 px-3">38</td>
                    <td className="py-2 px-3">31-32</td>
                    <td className="py-2 px-3">27.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">M</td>
                    <td className="py-2 px-3">40</td>
                    <td className="py-2 px-3">33-34</td>
                    <td className="py-2 px-3">28.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">L</td>
                    <td className="py-2 px-3">42</td>
                    <td className="py-2 px-3">35-36</td>
                    <td className="py-2 px-3">28.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">XL</td>
                    <td className="py-2 px-3">44</td>
                    <td className="py-2 px-3">37-38</td>
                    <td className="py-2 px-3">29.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">XXL</td>
                    <td className="py-2 px-3">46</td>
                    <td className="py-2 px-3">39-40</td>
                    <td className="py-2 px-3">29.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
            <p className="font-semibold text-neutral-900 mb-1">Fit Guarantee</p>
            <p className="text-neutral-500 text-[11px]">
              If your chosen size doesn't fit perfectly, enjoy complimentary doorstep exchanges or 15-day hassle-free returns.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 text-white rounded text-xs font-semibold hover:bg-black transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
