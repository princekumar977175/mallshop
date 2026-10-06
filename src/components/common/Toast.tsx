import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:top-20 sm:bottom-auto sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-top-2 duration-200">
      <div className="bg-neutral-900 text-white px-4 py-3 rounded-md shadow-elevated flex items-center space-x-3 text-xs sm:text-sm font-medium border border-neutral-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
