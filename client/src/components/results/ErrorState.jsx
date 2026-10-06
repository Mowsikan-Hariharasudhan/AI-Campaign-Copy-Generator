import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export function ErrorState({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="bg-rose-50/60 border border-rose-200 rounded-md p-6 shadow-xs flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-rose-900 tracking-tight">
        Campaign Generation Failed
      </h3>
      <p className="text-xs text-rose-700 max-w-md mt-1.5 leading-relaxed">
        {error}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-white hover:bg-rose-100 border border-rose-300 rounded transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
