import { handleLoginAction } from '@/action/auth.action';
import { SigninContainer } from '@/containers/sign-in.container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token');

  // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
  if (accessToken) {
    redirect('/');
  }

  return <SigninContainer handleLogin={handleLoginAction} />;
}
