import React from 'react';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="workspace-header sticky top-0 z-30 backdrop-blur-md">
      <div className="workspace-header-inner max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="brand-mark w-10 h-10 rounded-lg flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-[#d7ee78]" strokeWidth={1.8} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="brand-title text-base sm:text-lg font-bold tracking-tight text-[#183a35] leading-none">
                CampaignAI
              </h1>
              <span className="hidden sm:inline text-[9px] font-bold px-2 py-1 rounded-sm bg-[#fff0e9] text-[#c74d38] uppercase tracking-[0.12em]">Campaign studio</span>
            </div>
            <p className="text-[11px] text-[#60766c] mt-1 hidden sm:block font-medium">
              Creative workspace for ecommerce
            </p>
          </div>
        </div>
        <div className="header-context hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]">
          <span className="w-2 h-2 rounded-full bg-[#ed7357]" />
          <span>Campaign workspace</span>
        </div>
      </div>
    </header>
  );
}
