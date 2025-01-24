import { z } from 'zod';

const VALIDATION = {
  USERNAME: {
    MIN: 1,
    MAX: 6,
    MESSAGES: {
      MIN: '이름을 입력해 주세요.',
      MAX: '이름은 최대 6자까지 입력 가능합니다.'
    }
  },
  ID: {
    MIN: 4, 
    MAX: 12,
    REGEX: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
    MESSAGES: {
      LENGTH: '아이디는 4-12자 사이로 입력 가능합니다.',
      REGEX: '영문, 숫자, 특수문자만 사용 가능합니다.',
      DUPLICATE: '중복되는 아이디입니다.'
    }
  },
  NICKNAME: {
    MAX: 12,
    REGEX: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?ㄱ-ㅎ가-힣]*$/,
    MESSAGES: {
      MAX: '닉네임은 최대 12자까지 입력 가능합니다.',
      REGEX: '영문, 숫자, 특수문자, 한글만 사용 가능합니다.',
      DUPLICATE: '이미 사용 중인 닉네임입니다.'
    }
  },
  PASSWORD: {
    MIN: 8,
    REGEX: {
      LOWER: /[a-z]/,
      UPPER: /[A-Z]/,
      NUMBER: /[0-9]/,
      SPECIAL: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
    },
    MESSAGES: {
      MIN: '비밀번호는 8글자 이상으로 입력해 주세요.',
      CONFIRM: '비밀번호를 다시 한번 확인해 주세요.',
      RULES: '비밀번호에는 소문자, 대문자, 숫자, 특수기호 중 2가지 이상을 포함해 주세요.'
    }
  },
  EMAIL: {
    MAX: 100,
    MESSAGES: {
      MAX: '이메일은 최대 100자까지 입력 가능합니다.',
      FORMAT: '올바른 이메일 형식으로 입력해 주세요.',
      DUPLICATE: '이미 사용 중인 이메일입니다.'
    }
  }
 } as const;
 
 export const formSchema = z.object({
  username: z
    .string()
    .min(VALIDATION.USERNAME.MIN, { message: VALIDATION.USERNAME.MESSAGES.MIN })
    .max(VALIDATION.USERNAME.MAX, { message: VALIDATION.USERNAME.MESSAGES.MAX }),
    
  id: z
    .string()
    .min(VALIDATION.ID.MIN, { message: VALIDATION.ID.MESSAGES.LENGTH })
    .max(VALIDATION.ID.MAX, { message: VALIDATION.ID.MESSAGES.LENGTH })
    .regex(VALIDATION.ID.REGEX, { message: VALIDATION.ID.MESSAGES.REGEX })
    .refine(async () => true, { message: VALIDATION.ID.MESSAGES.DUPLICATE }),
 
  nickname: z
    .string()
    .max(VALIDATION.NICKNAME.MAX, { message: VALIDATION.NICKNAME.MESSAGES.MAX })
    .regex(VALIDATION.NICKNAME.REGEX, { message: VALIDATION.NICKNAME.MESSAGES.REGEX })
    .refine(async () => true, { message: VALIDATION.NICKNAME.MESSAGES.DUPLICATE }),
  
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN, { message: VALIDATION.PASSWORD.MESSAGES.MIN })
    .refine(
      (password) => {
        const hasLowerCase = VALIDATION.PASSWORD.REGEX.LOWER.test(password);
        const hasUpperCase = VALIDATION.PASSWORD.REGEX.UPPER.test(password);
        const hasNumber = VALIDATION.PASSWORD.REGEX.NUMBER.test(password);
        const hasSpecial = VALIDATION.PASSWORD.REGEX.SPECIAL.test(password);
        
        return [hasLowerCase, hasUpperCase, hasNumber, hasSpecial]
          .filter(Boolean)
          .length >= 2;
      },
      { message: VALIDATION.PASSWORD.MESSAGES.RULES }
    ),
 
  confirmPassword: z
    .string()
    .min(1, { message: VALIDATION.PASSWORD.MESSAGES.CONFIRM }),
 
  email: z
    .string()
    .max(VALIDATION.EMAIL.MAX, { message: VALIDATION.EMAIL.MESSAGES.MAX })
    .email({ message: VALIDATION.EMAIL.MESSAGES.FORMAT })
    .refine(async () => true, { message: VALIDATION.EMAIL.MESSAGES.DUPLICATE })
 }).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION.PASSWORD.MESSAGES.CONFIRM,
  path: ["confirmPassword"],
 });