'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SigninPresenter } from './sign-in.presenter';

export function SigninContainer() {
  const [isValid, setIsValid] = useState(true);

  const formSchema = z.object({
    id: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const loginWithGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT;

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

    window.location.href = googleAuthUrl;
  };

  function onSubmit() {
    console.log(form.getValues());

    // TODO: 추후 api 연동 후 로그인 성공/실패 로직 구현
    setIsValid(false);
  }

  return (
    <SigninPresenter
      form={form}
      onSubmit={onSubmit}
      isValid={isValid}
      onGoogleLogin={loginWithGoogle}
    ></SigninPresenter>
  );
}
