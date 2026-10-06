import React from 'react';
import { Mail, MessageSquare, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-white border border-neutral-200/90 rounded-xl p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[460px] transition-all">
      {/* Icon cluster */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-250 flex items-center justify-center text-neutral-700 shadow-xs">
          <Sparkles className="w-8 h-8 text-blue-600 stroke-[1.75]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
      </div>

      <h3 className="text-base font-bold text-neutral-900 tracking-tight">
        Multi-Channel Marketing Workspace Ready
      </h3>
      <p className="text-xs sm:text-sm text-neutral-500 max-w-md mt-2 leading-relaxed">
        Fill out your campaign parameters or select a <span className="font-semibold text-neutral-800">Preset</span> on the left. Click <span className="font-semibold text-neutral-800">Generate Campaign Copy</span> to create channel-ready marketing copy.
      </p>

      {/* Feature cards preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mt-8 text-left">
        <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/60 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">Email Suite</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">5 Subjects + 3 Previews + Full Copy</div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/60 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">WhatsApp</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Mobile-first conversational hook & CTA</div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/60 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shrink-0">
            <Smartphone className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-900">SMS Engine</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Character-counted instant flash text</div>
          </div>
        </div>
      </div>

      {/* Badges footer */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-[11px] text-neutral-500 font-mono">
        <span className="px-2.5 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-medium">✨ One-Click Copy</span>
        <span className="px-2.5 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-medium">⚡ Granular Regeneration</span>
        <span className="px-2.5 py-1 bg-neutral-100 rounded-md border border-neutral-200 font-medium">📄 PDF & MD Export</span>
      </div>
    </div>
  );
}
