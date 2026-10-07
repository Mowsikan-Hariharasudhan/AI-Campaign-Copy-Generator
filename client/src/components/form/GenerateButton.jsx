import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export function GenerateButton({ isLoading, disabled }) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="generate-button w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ed7357] focus:ring-offset-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white/80" />
          <span>Generating campaign copy…</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-[#d7ee78]" />
          <span>Generate Campaign Copy</span>
        </>
      )}
    </button>
  );
}
