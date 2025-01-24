'use client';

import { useFormContext } from 'react-hook-form';
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
import { FieldValues, Path } from 'react-hook-form';


type FormInputProps<T extends FieldValues> = {
  icon: LucideIcon;
  name: Path<T>;
  label?: string;
  description?: string;
  validMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'name'>;

export function FormInput<T extends FieldValues>({
  icon,
  name,
  label,
  validMessage,
  className,
  ...props
}: FormInputProps<T>) {
  const form = useFormContext<T>();
  const { dirtyFields, errors } = form.formState;
  const isFieldValid = dirtyFields[name as keyof typeof dirtyFields] && !errors[name];

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
            {isFieldValid && (
              <FormMessage className="text-accent">
                {validMessage}
                </FormMessage>
            )}
            {!isFieldValid && (
              <FormMessage className="text-destructive" />
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
