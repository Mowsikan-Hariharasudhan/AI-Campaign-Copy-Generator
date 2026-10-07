import React from 'react';
import { Header } from './Header';

export function AppShell({ children }) {
  return (
    <div className="app-shell min-h-screen flex flex-col font-sans">
      <Header />
      <main className="workspace-main flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      <footer className="workspace-footer border-t py-5 text-center text-xs text-[#6b7c72]">
        <div className="max-w-[1480px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>CampaignAI Studio <span className="text-[#ed7357]">/</span> Campaigns, composed with care</span>
          <span className="text-[11px]">Private by design · No campaign history stored</span>
        </div>
      </footer>
    </div>
  );
}
