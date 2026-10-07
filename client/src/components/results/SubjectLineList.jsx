import React from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function SubjectLineList({ subjects, onRegenerate, isRegenerating }) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <section className="channel-panel subject-panel p-5" aria-label="Email subject line variations">
      <div className="channel-panel-heading flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#c74d38]" />
          <h3 className="section-title text-sm sm:text-base font-bold text-[#183a35] tracking-tight">Email Subject Lines</h3>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fff0e9] text-[#b54e39] px-2 py-1 rounded-sm">
            5 variations
          </span>
        </div>
        <RegenerateButton
          onRegenerate={() => onRegenerate('emailSubjects')}
          isLoading={isRegenerating}
          label="Regenerate All"
        />
      </div>

      <div className="space-y-2.5">
        {subjects.map((subject, idx) => (
          <div
            key={idx}
            className="subject-row group flex items-center justify-between gap-3 p-3 rounded-md border"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="w-7 h-7 rounded-sm bg-[#fff0e9] text-[#bc543d] flex items-center justify-center text-[11px] font-bold shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-xs sm:text-sm text-[#29463e] font-semibold break-words leading-relaxed">
                {subject}
              </p>
            </div>
            <div className="shrink-0">
              <CopyButton text={subject} label="Copy" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
