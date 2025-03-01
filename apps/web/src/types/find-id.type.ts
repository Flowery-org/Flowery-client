import { z } from 'zod';

const VALIDATION = {
  USERNAME: {
    MIN: 1,
    MAX: 6,
    MESSAGES: {
      MIN: '이름을 입력해 주세요.',
      MAX: '이름은 최대 6자까지 입력 가능합니다.',
    },
  },

  EMAIL: {
    MAX: 100,
    MESSAGES: {
      MAX: '이메일은 최대 100자까지 입력 가능합니다.',
      FORMAT: '올바른 이메일 형식으로 입력해 주세요.',
    },
  },
} as const;

export const findIdScheme = z.object({
  username: z
    .string()
    .min(1, { message: VALIDATION.USERNAME.MESSAGES.MIN })
    .max(VALIDATION.USERNAME.MAX, {
      message: VALIDATION.USERNAME.MESSAGES.MAX,
    }),

  email: z
    .string()
    .min(1)
    .max(VALIDATION.EMAIL.MAX, { message: VALIDATION.EMAIL.MESSAGES.MAX })
    .email({ message: VALIDATION.EMAIL.MESSAGES.FORMAT }),

  code: z.string(),
});
