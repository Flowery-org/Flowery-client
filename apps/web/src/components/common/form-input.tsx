'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@packages/ui/components/form';
import { Input } from '@packages/ui/components/input';
import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  icon: LucideIcon;
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>;

export function FormInput<T extends FieldValues>({
  icon,
  form,
  name,
  label,
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='h-[110px]'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input icon={icon} className={className} {...field} {...props} />
          </FormControl>
          <div className='min-h-[20px]'>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
