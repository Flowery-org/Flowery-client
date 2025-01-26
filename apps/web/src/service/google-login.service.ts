import { getGoogleUserInfo } from '@/service/google-auth-user-info.service';
import { setAuthTokens } from '@/service/token.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function handleGoogleCallback(code: string) {
  if (!code) {
    redirect('/sign-in');
  }

  try {
    const googleUserInfo = await getGoogleUserInfo(code);

    // 구글 로그인 로직
    // 현재는 에러 (Invalid URL)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleUserInfo }),
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        const cookieStore = await cookies();
        cookieStore.set(
          'signup_info',
          JSON.stringify({
            email: googleUserInfo.email,
            name: googleUserInfo.name,
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 300,
          },
        );

        redirect('/sign-up');
      }
      throw new Error('Login failed');
    }

    const data = (await response.json()) as LoginResponse;
    await setAuthTokens(data.accessToken, data.refreshToken);

    redirect('/');
  } catch (error) {
    if (error instanceof Response) {
      console.error('API Error:', await error.text());
    } else {
      console.error('Login error:', error);
    }
    redirect('/sign-in');
  }
}
