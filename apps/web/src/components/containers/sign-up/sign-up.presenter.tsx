'use client'

import { FormInput } from '@/components/common/form-input';
import { Button } from '@packages/ui/components/button';
import { Form } from '@packages/ui/components/form';
import { 
  UserRound,
  UserRoundPen,
  PencilLine,
  LockKeyholeOpen,
  LockKeyhole,
  Mail, } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

interface SignUpPresenterProps {
  onSubmit: () => void;
  isValid: boolean;
}

export default function SignUpPresenter({ onSubmit, isValid }: SignUpPresenterProps) {
  const form = useFormContext();

  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <main className='flex flex-col gap-8 w-96'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormInput
              icon={UserRound}
              name='username'
              placeholder='이름을 입력해 주세요'
              label='이름'
              description='이름을 입력하세요.'
              validMessage="입력되었습니다. 입력하신 이름은 친구에게만 보입니다."
            />
            <FormInput
              icon={UserRoundPen}
              name='id'
              placeholder='4-12자로 입력해 주세요'
              label='아이디'
              description='아이디를 입력하세요.'
              validMessage="사용 가능한 아이디입니다."
            />
            <FormInput
              icon={PencilLine}
              name='nickname'
              placeholder='12자 이내로 입력해 주세요'
              label='닉네임'
              description='닉네임을 입력하세요.'
              validMessage="사용 가능한 닉네임입니다."
            />
            <FormInput
              icon={LockKeyholeOpen}
              name='password'
              type="password"
              placeholder='8자 이상의 문자열로 입력해 주세요'
              label='비밀번호'
              description='비밀번호를 입력하세요.'
              validMessage="사용 가능한 비밀번호입니다."
            />
            <FormInput
              icon={LockKeyhole}
              name='confirmPassword'
              type="password"
              placeholder='비밀번호를 다시 입력해 주세요'
              label='비밀번호 확인'
              description='비밀번호를 다시 입력하세요.'
              validMessage="확인되었습니다."
            />
            <FormInput
              icon={Mail}
              name='email'
              type="email"
              placeholder='이메일을 입력해 주세요'
              label='이메일'
              description='이메일을 입력하세요.'
              validMessage="사용 가능한 이메일입니다."
            />

            <Button type='submit' disabled={!isValid} className="w-full">
              회원가입
            </Button>

            <div className="text-center text-sm text-gray-500 mb-16">
              이미 계정이 있으신가요?{' '}
              <Link href="/sign-in" className="text-accent underline">
              로그인
              </Link>
            </div> 
          </form>
        </Form>
      </main>
    </div>
  );
}