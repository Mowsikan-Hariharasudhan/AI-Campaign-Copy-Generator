import React from 'react';
import { Mail, MessageCircle, Smartphone, Sparkles } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="empty-workspace p-6 sm:p-10 text-center flex flex-col items-center justify-center min-h-[460px] transition-all">
      <div className="empty-mark w-14 h-14 rounded-lg flex items-center justify-center mb-5 shadow-sm">
        <Sparkles className="w-7 h-7 stroke-[1.7]" />
      </div>

      <h3 className="section-title text-xl sm:text-2xl font-bold text-[#183a35] tracking-tight">
        The next campaign starts here.
      </h3>
      <p className="text-xs sm:text-sm text-[#718178] max-w-sm mt-2 leading-relaxed">
        Your generated campaign will appear in this workspace.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 w-full max-w-lg mt-8 text-left">
        <div className="empty-channel px-3 py-4 flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-[#c74d38] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#29463e]">Email</div>
            <div className="text-[10px] text-[#829087] mt-0.5">Inbox-ready</div>
          </div>
        </div>

        <div className="empty-channel px-3 py-4 flex items-center gap-2.5">
          <MessageCircle className="w-4 h-4 text-[#16845f] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#29463e]">WhatsApp</div>
            <div className="text-[10px] text-[#829087] mt-0.5">Chat preview</div>
          </div>
        </div>

        <div className="empty-channel px-3 py-4 flex items-center gap-2.5">
          <Smartphone className="w-4 h-4 text-[#456e9a] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#29463e]">SMS</div>
            <div className="text-[10px] text-[#829087] mt-0.5">Message preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}
