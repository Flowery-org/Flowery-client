'use client'

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpPresenter from './sign-up.presenter';

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: '이름을 입력해 주세요.' })
    .max(6, { message: '이름은 최대 6자까지 입력 가능합니다.' }),
    
  id: z
    .string()
    .min(4, { message: '아이디는 4-12자 사이로 입력 가능합니다.' })
    .max(12, { message: '아이디는 4-12자 사이로 입력 가능합니다.' })
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      { message: '영문, 숫자, 특수문자만 사용 가능합니다.' }
    )
    .refine(
      async () => {
        // 나중에는 여기서 실제 API 호출로 중복 체크함
        return true; // 임시로 true 반환
      },
      { message: '중복되는 아이디입니다.' }
    ),

  nickname: z
    .string()
    .max(12, { message: '닉네임은 최대 12자까지 입력 가능합니다.' })
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?ㄱ-ㅎ가-힣]*$/,
      { message: '영문, 숫자, 특수문자, 한글만 사용 가능합니다.' }
    )
    .refine(
      async () => {
        // 나중에는 여기서 실제 API 호출로 중복 체크함
        return true; // 임시로 true 반환
      },
      { message: '이미 사용 중인 닉네임입니다.' }
    ),
  
  password: z
    .string()
    .min(8, { message: '비밀번호는 8글자 이상으로 입력해 주세요.' })
    .refine(
      (password) => {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        
        const conditionsMet = [hasLowerCase, hasUpperCase, hasNumber, hasSpecial]
          .filter(Boolean)
          .length;
        
        return conditionsMet >= 2;
      },
      {
        message: '비밀번호에는 소문자, 대문자, 숫자, 특수기호 중 2가지 이상을 포함해 주세요.'
      }
    ),
  confirmPassword: z
    .string()
    .min(1, { message: '비밀번호를 다시 한번 확인해 주세요.' }),

  email: z
    .string()
    .max(100, { message: '이메일은 최대 100자까지 입력 가능합니다.' })
    .email({ message: '올바른 이메일 형식으로 입력해 주세요.' })
    .refine(
      async () => true,
      { message: '이미 사용 중인 이메일입니다.' }
    )
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호를 다시 한번 확인해 주세요.",
  path: ["confirmPassword"],
});

export default function SignUpContainer() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      id: '',
      nickname:'',
      password: '',
      confirmPassword: '',
      email: ''
    },
    mode: 'onChange'
  });

  const formState = form.formState;

  const isValid = Boolean(
    // 모든 필드가 입력되었는지 확인
    formState.dirtyFields.username &&
    formState.dirtyFields.id &&
    formState.dirtyFields.nickname &&
    formState.dirtyFields.password &&
    formState.dirtyFields.confirmPassword &&
    formState.dirtyFields.email &&
    // 에러 없는지 확인
    Object.keys(formState.errors).length === 0 &&
    formState.isValid
  );

  const onSubmit = () => {
    console.log(form.getValues());
    router.push('/sign-in');
  };

  return <SignUpPresenter form={form} onSubmit={onSubmit} isValid={isValid} />;
}