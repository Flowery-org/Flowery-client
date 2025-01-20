import * as React from 'react';

import { cn } from '@packages/ui/lib/utils';
import { LucideIcon } from 'lucide-react';
interface InputProps extends React.ComponentProps<'input'> {
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className='relative'>
        {Icon && (
          <div className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-500'>
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[60px] w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            Icon && 'pl-12',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
