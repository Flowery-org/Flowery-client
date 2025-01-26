import {
  GOOGLE_TOKEN_URL,
  GOOGLE_USER_INFO_URL,
} from '@/constants/google.constant';
import { GoogleUserInfo, TokenResponse } from '@/types/sign-in.type';

export const getGoogleUserInfo = async (
  code: string,
): Promise<GoogleUserInfo> => {
  try {
    // 토큰 받기
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token 요청 실패: ${tokenResponse.status}`);
    }

    const tokenData = (await tokenResponse.json()) as TokenResponse;

    // 사용자 정보 받기
    const userResponse = await fetch(GOOGLE_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userResponse.ok) {
      throw new Error(`사용자 정보 요청 실패: ${userResponse.status}`);
    }

    return (await userResponse.json()) as GoogleUserInfo;
  } catch (error) {
    console.error('Google 로그인 중 오류 발생:', error);
    throw error;
  }
};
