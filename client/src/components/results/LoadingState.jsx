import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="bg-white border border-neutral-200 rounded-md p-10 text-center shadow-xs flex flex-col items-center justify-center min-h-[420px]">
      <div className="relative mb-5">
        <div className="w-12 h-12 rounded-full border-2 border-neutral-200 border-t-neutral-900 animate-spin" />
        <Sparkles className="w-4 h-4 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
        Generating campaign copy…
      </h3>
      <p className="text-xs text-neutral-500 max-w-sm mt-1.5 leading-relaxed">
        Our AI is crafting channel-optimized copy tailored to your product, audience, and offer. This takes about 5–15 seconds.
      </p>

      {/* Simulated progress indicators */}
      <div className="mt-6 flex flex-col gap-2 w-full max-w-xs text-left">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Structuring promotional email hook & CTA</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Generating 5 email subject line variations</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Adapting copy for WhatsApp & SMS character limits</span>
        </div>
      </div>
    </div>
  );
}
