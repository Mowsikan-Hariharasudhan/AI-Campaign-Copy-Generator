import React from 'react';
import { Send, FileText } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function PromotionalEmailCard({ email, onRegenerate, isRegenerating }) {
  if (!email || !email.body) return null;

  const fullEmailCopy = `Subject: ${email.subject}\n\n${email.body}`;

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-neutral-700" />
          <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">Full Promotional Email</h3>
          <span className="text-[11px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
            Channel Copy
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={fullEmailCopy} label="Copy Full Email" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('promotionalEmail')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      <div className="space-y-3">
        {/* Email Header */}
        <div className="p-2.5 rounded bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-wider">
              Subject Line:
            </span>
            <CopyButton text={email.subject} label="Copy Subject" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900 mt-1">
            {email.subject}
          </p>
        </div>

        {/* Email Body */}
        <div className="p-4 rounded border border-neutral-200 bg-white shadow-2xs font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
    </div>
  );
}
