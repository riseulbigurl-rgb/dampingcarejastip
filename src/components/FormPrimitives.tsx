import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionProps {
  title: string;
  children: ReactNode;
  eyebrow?: string;
}

export function FormSection({ title, children, eyebrow }: SectionProps) {
  return (
    <div className="card p-5">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h3 className="section-title mt-1">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function Field({ label, required, error, children }: FieldProps) {
  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="text-dj-accent">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'tel' | 'numeric' | 'decimal';
  icon?: LucideIcon;
  onBlur?: () => void;
}

export function TextInput({ value, onChange, placeholder, type = 'text', inputMode, icon: Icon }: TextInputProps) {
  return (
    <div className="relative">
      {Icon && <Icon size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dj-muted" />}
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`field-input ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  );
}

interface TextAreaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  icon?: LucideIcon;
}

export function TextArea({ value, onChange, placeholder, rows = 3, icon: Icon }: TextAreaProps) {
  return (
    <div className="relative">
      {Icon && <Icon size={18} className="pointer-events-none absolute left-3.5 top-3.5 text-dj-muted" />}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`field-input resize-none ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  );
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder }: SelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="field-input appearance-none">
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

interface RadioGroupProps {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[] | string[];
}

export function RadioGroup({ value, onChange, options }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              active
                ? 'bg-dj-accent text-white shadow-accent'
                : 'bg-white text-dj-ink shadow-softer hover:bg-dj-bg'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
