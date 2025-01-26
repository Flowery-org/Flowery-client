import { z } from 'zod';

export const SigninFormSchema = z.object({
  id: z.string(),
  password: z.string(),
});

// Google Login
export type GoogleUserInfo = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
};

export type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};
