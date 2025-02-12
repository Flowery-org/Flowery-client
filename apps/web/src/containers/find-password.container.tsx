'use client';
import { findPasswordScheme } from '@/types/find-password.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import FindPasswordPresenter from './find-password.presenter';
export default function FindPasswordContainer() {
  const router = useRouter();

  const form = useForm<z.infer<typeof findPasswordScheme>>({
    resolver: zodResolver(findPasswordScheme),
    defaultValues: {
      username: '',
      id: '',
      email: '',
      code: '',
    },
    mode: 'onChange',
  });

  const { formState, handleSubmit } = form;

  const isValid = Boolean(formState.isValid);

  const onSubmit = handleSubmit(() => {
    router.push('/sign-in');
  });

  return (
    <FormProvider {...form}>
      <FindPasswordPresenter onSubmit={onSubmit} isValid={isValid} />
    </FormProvider>
  );
}
