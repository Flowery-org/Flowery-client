'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@packages/ui/components/form';
import { Input } from '@packages/ui/components/input';
import { cn } from '@packages/ui/lib/utils';
import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';


type FormInputProps<T extends FieldValues> = {
  icon: LucideIcon;
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  validMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>;

export function FormInput<T extends FieldValues>({
  icon,
  form,
  name,
  label,
  validMessage,
  className,
  ...props
}: FormInputProps<T>) {
  const isFieldValid = form.getFieldState(name).isDirty && !form.getFieldState(name).error;

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
            <FormMessage className={cn(
              isFieldValid && "text-accent", // 성공시 accent 컬러
              !isFieldValid && "text-destructive" // 실패시 destructive 컬러
            )}>
              {isFieldValid ? validMessage : undefined}
            </FormMessage>
          </div>
        </FormItem>
      )}
    />
  );
}
