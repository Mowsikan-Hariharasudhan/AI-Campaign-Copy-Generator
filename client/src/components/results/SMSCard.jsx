import React from 'react';
import { MoreHorizontal, Smartphone } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function SMSCard({ message, onRegenerate, isRegenerating }) {
  if (!message) return null;

  const charCount = message.length;
  const isOver160 = charCount > 160;

  return (
    <section className="channel-panel sms-panel p-5" aria-label="SMS message preview">
      <div className="channel-panel-heading flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-md bg-[#eaf0f7] text-[#456e9a] flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#456e9a]">SMS / 05</p>
            <h3 className="section-title text-sm sm:text-base font-bold text-[#183a35] tracking-tight">Text message</h3>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-sm border ${
              isOver160
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-[#eaf0f7] text-[#456e9a] border-[#d8e1ec]'
            }`}
          >
            {charCount} chars {isOver160 ? '(2 segments)' : '(1 segment)'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={message} label="Copy" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('smsMessage')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      <div className="sms-window max-w-xl mx-auto overflow-hidden" aria-label="SMS conversation mockup">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d7e1ea] bg-white/70">
          <span className="text-xs font-semibold text-[#405b70]">Messages</span>
          <MoreHorizontal className="w-4 h-4 text-[#6e8799]" aria-hidden="true" />
        </div>
        <div className="min-h-40 p-4 sm:p-5 flex flex-col justify-end gap-3">
          <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-[#8b9baa]">Text preview</p>
          <div className="sms-bubble self-end max-w-[92%] sm:max-w-[82%] px-4 py-2.5 text-xs sm:text-sm text-white leading-relaxed break-words">
            {message}
          </div>
          <p className="text-right text-[10px] text-[#8192a0]">{charCount} characters · {isOver160 ? 'multiple segments' : 'single segment'}</p>
        </div>
      </div>
    </section>
  );
}
