import React from 'react';
import { CheckCheck, MessageCircle, MoreVertical } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function WhatsAppCard({ message, onRegenerate, isRegenerating }) {
  if (!message) return null;

  return (
    <section className="channel-panel whatsapp-panel p-5" aria-label="WhatsApp message preview">
      <div className="channel-panel-heading flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-md bg-[#e8f4ed] text-[#16845f] flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#16845f]">WhatsApp / 04</p>
            <h3 className="section-title text-sm sm:text-base font-bold text-[#183a35] tracking-tight">Campaign message</h3>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={message} label="Copy" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('whatsappMessage')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      <div className="whatsapp-window max-w-2xl mx-auto" aria-label="WhatsApp chat mockup">
        <div className="whatsapp-topbar flex items-center gap-3 px-4 py-3 text-white">
          <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold">CA</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">Campaign preview</p>
            <p className="text-[10px] text-white/75 mt-0.5">Business message</p>
          </div>
          <MoreVertical className="w-4 h-4 text-white/80" aria-hidden="true" />
        </div>
        <div className="min-h-44 p-4 sm:p-6 flex items-end">
          <div className="whatsapp-bubble ml-auto max-w-[92%] sm:max-w-[84%] px-3.5 py-3 text-[13px] sm:text-sm text-[#24483a] leading-relaxed whitespace-pre-wrap">
            {message}
            <div className="flex items-center justify-end gap-1 text-[10px] text-[#6c8a78] mt-2">
              <span>Preview</span>
              <CheckCheck className="w-3.5 h-3.5 text-[#3994b8]" aria-label="Message status preview" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
