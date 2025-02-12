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
  ID: {
    MIN: 4,
    MAX: 12,
    REGEX: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
    MESSAGES: {
      MIN: '아이디를 입력해 주세요.',
      MAX: '아이디는 최대 12자까지 입력 가능합니다.',
      REGEX: '영문, 숫자, 특수문자만 사용 가능합니다.',
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

export const findPasswordScheme = z.object({
  username: z
    .string()
    .min(1, { message: VALIDATION.USERNAME.MESSAGES.MIN })
    .max(VALIDATION.USERNAME.MAX, {
      message: VALIDATION.USERNAME.MESSAGES.MAX,
    }),
  id: z
    .string()
    .min(1)
    .min(VALIDATION.ID.MIN, { message: VALIDATION.ID.MESSAGES.MIN })
    .max(VALIDATION.ID.MAX, { message: VALIDATION.ID.MESSAGES.MAX })
    .regex(VALIDATION.ID.REGEX, { message: VALIDATION.ID.MESSAGES.REGEX }),

  email: z
    .string()
    .min(1)
    .max(VALIDATION.EMAIL.MAX, { message: VALIDATION.EMAIL.MESSAGES.MAX })
    .email({ message: VALIDATION.EMAIL.MESSAGES.FORMAT }),
  code: z.string(),
});
