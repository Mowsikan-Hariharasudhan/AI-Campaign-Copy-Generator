import React from 'react';
import { Header } from './Header';

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-neutral-200 py-6 bg-white text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AI Campaign Copy Generator · Kalaiworks Assignment Prototype</span>
          <span className="font-mono text-[11px] text-neutral-400">Stateless Architecture · Secure Node/Express Backend</span>
        </div>
      </footer>
    </div>
  );
}
