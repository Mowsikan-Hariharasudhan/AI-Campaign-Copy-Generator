import React from 'react';

export function TextArea({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  rows = 3,
  required = true,
  disabled = false
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-[11px] font-bold text-[#38564c] tracking-wide uppercase">
          {label} {required && <span className="text-[#c74d38]">*</span>}
        </label>
      </div>

      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`campaign-input w-full px-3 py-2.5 text-sm bg-white border rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-all resize-y ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
            : 'border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900'
        } disabled:bg-neutral-100 disabled:text-neutral-500`}
      />

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  );
}
