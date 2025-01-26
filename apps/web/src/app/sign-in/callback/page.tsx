import { handleGoogleCallback } from '@/service/google-login.service';
import { redirect } from 'next/navigation';

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;
  const code = params.code;

  // 구글 로그인에서 오류 발생 시 로그인 페이지로 리다이렉트
  if (!code) {
    redirect('/sign-in');
  }

  await handleGoogleCallback(code);
  return;
}
