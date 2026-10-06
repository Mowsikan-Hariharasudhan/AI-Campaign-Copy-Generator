import React from 'react';

export function TextField({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = true,
  disabled = false
}) {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-xs font-semibold text-neutral-800 tracking-wide uppercase">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      </div>

      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm bg-white border rounded text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-all ${
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
