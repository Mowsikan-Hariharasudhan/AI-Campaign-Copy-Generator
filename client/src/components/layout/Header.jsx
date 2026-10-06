import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-neutral-250 bg-white/90 backdrop-blur-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-neutral-900 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-2xs">
            CA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-neutral-900 leading-none">
                CampaignAI
              </h1>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 uppercase">
                Studio
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5 hidden sm:block">
              AI-powered ecommerce campaign copy, ready for every channel.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5 font-mono text-[11px] bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Engine:</span>
            <span className="font-semibold text-neutral-800">OpenRouter</span>
          </div>
        </div>
      </div>
    </header>
  );
}
