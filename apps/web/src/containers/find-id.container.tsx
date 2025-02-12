'use client';
import { findIdScheme } from '@/types/find-id.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import FindIdPresenter from './find-id.presenter';
export default function FindIdContainer() {
  const router = useRouter();

  const form = useForm<z.infer<typeof findIdScheme>>({
    resolver: zodResolver(findIdScheme),
    defaultValues: {
      username: '',
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
      <FindIdPresenter onSubmit={onSubmit} isValid={isValid} />
    </FormProvider>
  );
}
