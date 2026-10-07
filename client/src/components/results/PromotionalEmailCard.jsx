import React from 'react';
import { FileText, MailOpen } from 'lucide-react';
import { CopyButton } from '../ui/CopyButton';
import { RegenerateButton } from '../ui/RegenerateButton';

export function PromotionalEmailCard({ email, onRegenerate, isRegenerating }) {
  if (!email || !email.body) return null;

  const fullEmailCopy = `Subject: ${email.subject}\n\n${email.body}`;

  return (
    <section className="channel-panel email-panel p-5" aria-label="Promotional email preview">
      <div className="channel-panel-heading flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-md bg-[#fbf5df] text-[#9a7723] flex items-center justify-center">
            <MailOpen className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a7723]">Email / 03</p>
            <h3 className="section-title text-sm sm:text-base font-bold text-[#183a35] tracking-tight">Promotional email</h3>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={fullEmailCopy} label="Copy Full Email" />
          <RegenerateButton
            onRegenerate={() => onRegenerate('promotionalEmail')}
            isLoading={isRegenerating}
            label="Regenerate"
          />
        </div>
      </div>

      <div className="email-preview-window overflow-hidden">
        <div className="email-preview-toolbar flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-full bg-[#183a35] text-[#d7ee78] flex items-center justify-center text-[10px] font-bold shrink-0">CA</span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#29463e]">CampaignAI <span className="font-normal text-[#829087]">&lt;hello@campaignai&gt;</span></p>
              <p className="text-[10px] text-[#829087]">To: campaign audience</p>
            </div>
          </div>
          <span className="text-[10px] text-[#829087] shrink-0">Email preview</span>
        </div>
        <div className="px-4 sm:px-6 pt-4 pb-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#829087]">Subject</p>
            <CopyButton text={email.subject} label="Copy Subject" />
          </div>
          <p className="section-title text-base sm:text-lg font-semibold text-[#183a35] mt-1 break-words">{email.subject}</p>
        </div>
        <div className="email-body-paper mx-3 sm:mx-5 mb-4 p-4 sm:p-6 border border-[#edf0e8] rounded-sm text-sm text-[#38564c] leading-7 whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
    </section>
  );
}
