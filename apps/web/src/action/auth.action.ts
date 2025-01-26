'use server';

import { setAuthTokens } from '@/service/token.service';

export async function handleLoginAction(
  accessToken: string,
  refreshToken: string,
) {
  await setAuthTokens(accessToken, refreshToken);
}
