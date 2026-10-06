import React from 'react';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-neutral-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-sm ring-1 ring-neutral-800/10">
            <span className="bg-gradient-to-br from-white to-neutral-300 bg-clip-text text-transparent font-extrabold">
              CA
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-neutral-900 leading-none">
                CampaignAI
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-250 uppercase tracking-wide">
                STUDIO PRO
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5 hidden sm:block font-medium">
              Enterprise Multi-Channel AI Copy Generator for Ecommerce & D2C
            </p>
          </div>
        </div>

        {/* Live System Badges */}
        <div className="flex items-center gap-2.5 text-xs text-neutral-600">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-600 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Stateless & Secure</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] bg-neutral-50 border border-neutral-200/90 px-3 py-1.5 rounded-lg shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline text-neutral-500 font-medium">Engine:</span>
            <span className="font-semibold text-neutral-800 flex items-center gap-1">
              OpenRouter <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
