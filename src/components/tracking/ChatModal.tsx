import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import { DeliveryPartner } from '../../types';

interface Message {
  id: string;
  sender: 'customer' | 'driver';
  text: string;
  time: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: DeliveryPartner;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, partner }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'driver',
      text: 'Hello! I have picked up your MALL fashion parcel and am riding on 100ft road towards Indiranagar.',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Please ring Apartment 402 bell',
    'Leave with security at main gate',
    'I will meet you at the lobby'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      text,
      time: 'Now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate smart driver reply
    setTimeout(() => {
      let replyText = 'Noted! I will follow your instructions once I arrive.';
      if (text.toLowerCase().includes('security') || text.toLowerCase().includes('gate')) {
        replyText = 'Understood! I will hand the parcel safely to the security guard and take entry signature.';
      } else if (text.toLowerCase().includes('402') || text.toLowerCase().includes('bell')) {
        replyText = 'Got it, taking the lift directly to 4th floor Apartment 402.';
      } else if (text.toLowerCase().includes('lobby')) {
        replyText = 'Perfect, see you downstairs in the building lobby!';
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'driver',
          text: replyText,
          time: 'Now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white max-w-md w-full h-[520px] rounded-md shadow-2xl border border-neutral-200 overflow-hidden flex flex-col text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <img
                src={partner.photoUrl}
                alt={partner.name}
                className="w-9 h-9 rounded-full object-cover border border-neutral-300"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900">{partner.name}</h4>
              <p className="text-[10px] text-neutral-500">MALL Delivery Partner • On Route</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50/50 text-xs">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'customer' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2 leading-relaxed ${
                  msg.sender === 'customer'
                    ? 'bg-neutral-900 text-white rounded-br-none'
                    : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-none shadow-subtle'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-neutral-400 mt-0.5 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 border-t border-neutral-100 bg-white flex space-x-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition-colors shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-neutral-200 bg-white flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Type instructions for delivery partner..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 text-xs border border-neutral-200 rounded px-3 py-2 focus:outline-none focus:border-neutral-900"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 bg-neutral-950 text-white rounded disabled:opacity-40 hover:bg-black transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
