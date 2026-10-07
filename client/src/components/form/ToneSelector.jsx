import React from 'react';
import { TONES } from '../../constants/tones';

export function ToneSelector({ selectedTone, onSelect, error, disabled = false }) {
  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-[11px] font-bold text-[#38564c] tracking-wide uppercase">
        Tone of Voice <span className="text-[#c74d38">*</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {TONES.map((tone) => {
          const isSelected = selectedTone === tone.id;
          return (
            <button
              key={tone.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(tone.id)}
              className={`tone-option p-2.5 text-left rounded border transition-all cursor-pointer ${
                isSelected
                  ? 'tone-option-selected border-neutral-900 bg-neutral-900 text-white shadow-xs'
                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="font-medium text-xs tracking-tight">{tone.label}</div>
              <div
                className={`text-[11px] leading-snug mt-0.5 line-clamp-1 ${
                  isSelected ? 'text-neutral-300' : 'text-neutral-500'
                }`}
              >
                {tone.description}
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
