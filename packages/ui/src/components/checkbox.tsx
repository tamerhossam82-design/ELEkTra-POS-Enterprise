import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../lib/utils.js';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id ?? `checkbox-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring',
            className,
          )}
          {...props}
        />
        {label ? <span className="text-sm text-foreground">{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
