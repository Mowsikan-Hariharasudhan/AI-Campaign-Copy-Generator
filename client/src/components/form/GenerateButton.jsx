import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export function GenerateButton({ isLoading, disabled }) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white text-sm font-semibold rounded border border-neutral-900 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />
          <span>Generating campaign copy…</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Generate Campaign Copy</span>
        </>
      )}
    </button>
  );
}
