'use client';
import { GOOGLE_AUTH_URL } from '@/constants/google.constant';
import { SigninFormSchema } from '@/types/sign-in.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { SigninPresenter } from './sign-in.presenter';

type SigninContainerProps = {
  handleLogin: (accessToken: string, refreshToken: string) => Promise<void>;
};

const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT;

export function SigninContainer({ handleLogin }: SigninContainerProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const loginWithGoogle = () => {
    const googleAuthUrl = `${GOOGLE_AUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;

    window.location.href = googleAuthUrl;
  };

  async function onSubmit(data: z.infer<typeof SigninFormSchema>) {
    try {
      // 더미 API 응답
      if (data.id === 'test123' && data.password === 'password123') {
        const dummyResponse = {
          token: 'eyjhb...',
          ident: 'test123',
          roles: ['ROLE_USER'],
        };

        await handleLogin(dummyResponse.token, 'dummy-refresh-token');
        router.push('/');
        return;
      }

      form.setError('root', {
        type: 'manual',
        message: '아이디 또는 비밀번호가 틀렸습니다!',
      });
    } catch {
      form.setError('root', {
        type: 'manual',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  }

  return (
    <FormProvider {...form}>
      <SigninPresenter onSubmit={onSubmit} onGoogleLogin={loginWithGoogle} />
    </FormProvider>
  );
}
