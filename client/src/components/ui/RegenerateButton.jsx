import React from 'react';
import { RotateCw } from 'lucide-react';

export function RegenerateButton({ onRegenerate, isLoading = false, label = 'Regenerate', className = '' }) {
  return (
    <button
      type="button"
      onClick={onRegenerate}
      disabled={isLoading}
      aria-label={`Regenerate ${label}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      <RotateCw className={`w-3.5 h-3.5 text-neutral-500 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
      <span>{isLoading ? 'Regenerating…' : label}</span>
    </button>
  );
}
