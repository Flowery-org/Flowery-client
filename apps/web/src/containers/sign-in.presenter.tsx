'use client';
import { FormInput } from '@/components/common/form-input';
import { Button } from '@packages/ui/components/button';
import { Form } from '@packages/ui/components/form';
import { LockKeyholeOpen, UserRoundPen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';

type SigninPresenterProps = {
  form: UseFormReturn<{ id: string; password: string }>;
  onSubmit: () => void;
  isValid: boolean;
  onGoogleLogin: () => void;
};

export function SigninPresenter({
  form,
  onSubmit,
  isValid,
  onGoogleLogin,
}: SigninPresenterProps) {
  return (
    <div className='px-8 '>
      <div className='px-5 pt-11 pb-20 flex flex-col justify-center gap-1'>
        <div className='flex'>
          <span>
            <Image
              src='FloweryLogoShadow.svg'
              alt='Icon'
              width='120'
              height='40'
            />
          </span>
          <span className='text-4xl'>에 오신걸 </span>
        </div>
        <span className='text-4xl'>환영합니다!</span>
      </div>
      <div className=''>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                icon={UserRoundPen}
                form={form}
                name='id'
                label='아이디'
                placeholder='아이디를 입력해주세요'
              />
              <FormInput
                icon={LockKeyholeOpen}
                form={form}
                type='password'
                name='password'
                label='비밀번호'
                placeholder='비밀번호를 입력해주세요'
              />
              <div className='items-center justify-center flex mb-4 text-sm text-gray-600'>
                <Link href='/find-id'>아이디 찾기</Link>
                &nbsp;<span>|</span>&nbsp;
                <Link href='/find-pw'>비밀번호 찾기</Link>
              </div>

              <div className='text-sm h-1 mx-1 my-8 text-destructive'>
                {isValid ? '' : '아이디 또는 비밀번호가 틀렸습니다!'}
              </div>
              <Button type='submit'>로그인</Button>
            </form>
          </Form>
        </div>
        <div className='py-12 justify-center flex flex-col gap-4'>
          <div className='items-center justify-center flex'>
            <div className='w-full h-[0.7px] bg-gray-700' />
            <span className='mx-4'>or</span>
            <div className='w-full h-[0.7px] bg-gray-700' />
          </div>
          <Button
            className='bg-[#EDEAE4] text-black border-gray-300 border hover:bg-gray-600/30'
            variant='secondary'
            size='lg'
            onClick={onGoogleLogin}
          >
            <Image src='Google.svg' alt='Icon' width='24' height='24' />
            구글로 로그인
          </Button>
          <div className='items-center justify-center flex gap-2 text-sm text-gray-600'>
            <span>아직 회원이 아니신가요?</span>
            <Link href='/sign-up' className='text-green-800 underline'>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
