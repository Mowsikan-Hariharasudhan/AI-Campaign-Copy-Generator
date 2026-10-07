import React from 'react';
import { Eye } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function PreviewTextList({ previews, onRegenerate, isRegenerating }) {
  if (!previews || previews.length === 0) return null;

  return (
    <section className="channel-panel preview-panel p-5" aria-label="Email preview text variations">
      <div className="channel-panel-heading flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#456e82]" />
          <h3 className="section-title text-sm sm:text-base font-bold text-[#183a35] tracking-tight">Inbox Previews</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#eaf1f3] text-[#456e82] px-2 py-1 rounded-sm">
            3 variations
          </span>
        </div>
        <RegenerateButton
          onRegenerate={() => onRegenerate('emailPreviews')}
          isLoading={isRegenerating}
          label="Regenerate All"
        />
      </div>

      <div className="email-preview-window overflow-hidden px-3 sm:px-4">
        {previews.map((preview, idx) => (
          <div
            key={idx}
            className="preview-row flex items-center justify-between gap-3 py-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#eaf1f3] text-[#456e82] flex items-center justify-center text-[10px] font-bold shrink-0" aria-hidden="true">
                CA
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#29463e]">CampaignAI <span className="font-normal text-[#829087]">· Preview {idx + 1}</span></p>
                <p className="text-xs sm:text-sm text-[#5d7068] break-words leading-relaxed mt-0.5">{preview}</p>
              </div>
            </div>
            <div className="shrink-0">
              <CopyButton text={preview} label="Copy" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
