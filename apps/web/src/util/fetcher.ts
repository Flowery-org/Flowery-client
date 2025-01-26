import { cookies } from 'next/headers';

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const accessToken = (await cookies()).get('access-token');

  if (!accessToken?.value) {
    throw new Error('인증이 필요합니다');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error('인증이 만료되었습니다');
        case 403:
          throw new Error('접근 권한이 없습니다');
        case 404:
          throw new Error('요청한 리소스를 찾을 수 없습니다');
        default:
          throw new Error(`API 요청 실패: ${response.status}`);
      }
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('API 요청 중 오류가 발생했습니다');
  }
};
