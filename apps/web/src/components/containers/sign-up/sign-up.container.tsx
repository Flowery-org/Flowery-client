'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUpformSchema } from './schema';
import SignUpPresenter from './sign-up.presenter';

export default function SignUpContainer() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      username: '',
      id: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      email: '',
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
      <SignUpPresenter onSubmit={onSubmit} isValid={isValid} />
    </FormProvider>
  );
}
