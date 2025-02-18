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
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  icon: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
  validMessage?: string;
  errorMessage?: string | null;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>;

export function FormInput<T extends FieldValues>({
  icon,
  name,
  label,
  validMessage,
  errorMessage,
  className,
  ...props
}: FormInputProps<T>) {
  const { formState, control, watch } = useFormContext<T>();
  const { errors, touchedFields } = formState;
  const value = watch(name);
  const isFieldValid =
    touchedFields[name as keyof typeof touchedFields] &&
    Boolean(value) &&
    !errors[name];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='h-[110px]'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input icon={icon} className={className} {...field} {...props} />
          </FormControl>
          <div className='min-h-[20px]'>
            {errorMessage ? (
              <span className='text-destructive'>{errorMessage}</span>
            ) : isFieldValid ? (
              <span className='text-accent'>{validMessage}</span>
            ) : (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
