import React from 'react';
import { Layers, ArrowLeft } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-10 text-center shadow-xs flex flex-col items-center justify-center min-h-[420px]">
      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 mb-4 border border-neutral-200">
        <Layers className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
        No campaign generated yet
      </h3>
      <p className="text-xs text-neutral-500 max-w-sm mt-1.5 leading-relaxed">
        Fill out the campaign parameters on the left and select your desired tone of voice. Click <span className="font-medium text-neutral-800">Generate Campaign Copy</span> to produce channel-ready copy.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] text-neutral-500 font-mono">
        <span className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded">5 Email Subjects</span>
        <span className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded">3 Previews</span>
        <span className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded">Full Email</span>
        <span className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded">WhatsApp</span>
        <span className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded">SMS</span>
      </div>
    </div>
  );
}
