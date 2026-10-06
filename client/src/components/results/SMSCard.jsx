import React from 'react';
import { Smartphone } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function SMSCard({ message, onRegenerate, isRegenerating }) {
  if (!message) return null;

  const charCount = message.length;
  const isOver160 = charCount > 160;

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">SMS Campaign Message</h3>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
              isOver160
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
            }`}
          >
            {charCount} chars {isOver160 ? '(2 segments)' : '(1 segment)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={message} label="Copy" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('smsMessage')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      {/* Modern SMS message bubble */}
      <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-3.5 sm:p-4">
        <div className="max-w-md bg-blue-600 text-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-2xs text-xs sm:text-sm leading-relaxed">
          {message}
        </div>
        <div className="text-[10px] text-neutral-400 mt-2 font-mono">
          SMS / Direct Text Gateway
        </div>
      </div>
    </div>
  );
}
