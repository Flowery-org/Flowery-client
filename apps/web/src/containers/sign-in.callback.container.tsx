'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import SigninCallbackPresenter from './sign-in.callback.presenter';

export default function SigninCallbackContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // TODO: 받은 code로 백엔드 API 호출하여 처리
      console.log('인증 코드:', code);
      // TODO: 처리 완료 후 원하는 페이지로 이동
      router.push('/');
    }
  }, [searchParams]);

  return <SigninCallbackPresenter></SigninCallbackPresenter>;
}
