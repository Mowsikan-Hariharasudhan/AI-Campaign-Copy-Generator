import React from 'react';
import { Mail, RefreshCw } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function SubjectLineList({ subjects, onRegenerate, isRegenerating }) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-neutral-700" />
          <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">Email Subject Lines</h3>
          <span className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
            5 variations
          </span>
        </div>
        <RegenerateButton
          onRegenerate={() => onRegenerate('emailSubjects')}
          isLoading={isRegenerating}
          label="Regenerate All"
        />
      </div>

      <div className="space-y-2">
        {subjects.map((subject, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between gap-3 p-2.5 rounded border border-neutral-150 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className="text-xs font-mono font-medium text-neutral-400 mt-0.5">
                {idx + 1}.
              </span>
              <p className="text-xs sm:text-sm text-neutral-800 font-medium break-words leading-relaxed">
                {subject}
              </p>
            </div>
            <div className="shrink-0">
              <CopyButton text={subject} label="Copy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
