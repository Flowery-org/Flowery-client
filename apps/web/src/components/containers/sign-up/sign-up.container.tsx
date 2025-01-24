'use client'

import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from './schema';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpPresenter from './sign-up.presenter';

export default function SignUpContainer() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      id: '',
      nickname:'',
      password: '',
      confirmPassword: '',
      email: ''
    },
    mode: 'onChange'
  });

  const {formState} = form;

  const isValid = Boolean(
    // 에러 없는지 확인
    Object.keys(formState.errors).length === 0 &&
    formState.isValid
  );

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
    router.push('/sign-in');
  });

  return (
    <FormProvider {...form}>
      <SignUpPresenter onSubmit={onSubmit} isValid={isValid} />;
    </FormProvider>
  );
}