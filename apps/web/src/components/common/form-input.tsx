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
  const { formState, control, watch } = useFormContext<T>();
  const { errors, touchedFields } = formState;
  const value = watch(name);
  const isFieldValid = touchedFields[name as keyof typeof touchedFields] && Boolean(value) && !errors[name];

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
            {isFieldValid ? 
              <FormMessage className="text-accent">{validMessage}</FormMessage> : 
              <FormMessage className="text-destructive" />
            }
          </div>
        </FormItem>
      )}
    />
  );
}
