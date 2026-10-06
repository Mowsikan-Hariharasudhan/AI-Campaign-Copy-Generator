import React from 'react';
import { MessageSquare } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function WhatsAppCard({ message, onRegenerate, isRegenerating }) {
  if (!message) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">WhatsApp Campaign Message</h3>
          <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded">
            Mobile-First
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={message} label="Copy" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('whatsappMessage')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      {/* Modern chat-bubble container */}
      <div className="bg-[#EFEAE2]/50 border border-neutral-200/90 rounded-lg p-3.5 sm:p-4">
        <div className="max-w-lg bg-white rounded-lg p-3.5 shadow-xs border border-neutral-200 text-neutral-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
          {message}
          <div className="text-[10px] text-neutral-400 text-right mt-1.5 font-mono">
            Just now · Delivered
          </div>
        </div>
      </div>
    </div>
  );
}
