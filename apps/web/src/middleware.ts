import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from './constants/route.constant';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    const accessToken = request.cookies.get('access-token');
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    try {
      // access token 체크
      const accessToken = request.cookies.get('access-token');
      if (accessToken) {
        const res = NextResponse.next();
        res.headers.set('Authorization', `Bearer ${accessToken.value}`);
        return res;
      }

      // refresh token으로 갱신
      const refreshToken = request.cookies.get('refresh-token');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken.value }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { accessToken: newAccessToken } = await response.json();
      const res = NextResponse.next();

      // 새 토큰 설정
      res.headers.set('Authorization', `Bearer ${newAccessToken}`);
      res.cookies.set('access-token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60,
      });

      return res;
    } catch (error) {
      // 에러 발생 시 로그인 페이지로 리다이렉트
      console.log(error);
      const res = NextResponse.redirect(new URL('/sign-in', request.url));
      res.cookies.delete('access-token');
      res.cookies.delete('refresh-token');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/password-reset',
    '/about',
    '/profile',
    '/settings',
  ],
};
