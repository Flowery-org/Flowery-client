'use client';

import { FormInput } from '@/components/common/form-input';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@packages/ui/components/button';
import { Form } from '@packages/ui/components/form';
import { Mail, UserRound, UserRoundPen } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
export const findPasswordScheme = z.object({
  username: z.string(),
  id: z.string(),
  email: z.string(),
  code: z.string(),
});
interface FindPasswordPresenterProps {
  onSubmit: () => void;
  isValid: boolean;
  verificationError: string | null;
  submitError: string | null;
  onSendCode: () => Promise<boolean>;
  isCodeFromFilled: boolean;
}
export default function FindPasswordPresenter({
  onSubmit,
  isValid,
  verificationError,
  submitError,
  onSendCode,
  isCodeFromFilled,
}: FindPasswordPresenterProps) {
  const form = useFormContext<z.infer<typeof findPasswordScheme>>();
  const { isRunning, isExpired, formattedTime, startTimer } = useTimer(120);

  const emailError = form.formState.errors.email;
  const isEmailValid = isCodeFromFilled && !emailError;

  const handleSendCode = async () => {
    const success = await onSendCode();
    if (success) {
      startTimer();
    }
  };
  return (
    <div className='flex justify-center min-h-screen w-full'>
      <main className='flex flex-col gap-8 w-96 mt-20'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormInput
              icon={UserRound}
              name='username'
              placeholder='이름을 입력해 주세요'
              label='이름'
              description='이름을 입력하세요.'
              errorMessage={verificationError}
            />
            <FormInput
              icon={UserRoundPen}
              name='id'
              placeholder='4-12자로 입력해 주세요'
              label='아이디'
              description='아이디를 입력하세요.'
              errorMessage={verificationError}
            />
            <div className='relative h-32'>
              <FormInput
                icon={Mail}
                name='email'
                type='email'
                placeholder='이메일을 입력해 주세요'
                label='이메일'
                description='이메일을 입력하세요.'
                errorMessage={verificationError}
              />
              {isRunning && !isExpired && (
                <div className='text-xs font-medium text-accent'>
                  코드를 보냈어요! 이메일을 확인해주세요
                </div>
              )}
              {isExpired && (
                <div className='text-xs font-medium text-destructive'>
                  인증 시간이 만료되었습니다
                </div>
              )}

              <Button
                type='button'
                onClick={handleSendCode}
                className={`absolute w-24 right-3 top-11 h-8 ${
                  isRunning
                    ? 'bg-white border border-primary-outline text-primary'
                    : ''
                }`}
                disabled={!isEmailValid || isRunning}
              >
                {isRunning ? formattedTime : isExpired ? '재전송' : '코드 전송'}
              </Button>
            </div>
            <FormInput
              icon={UserRound}
              name='code'
              placeholder='이메일로 전송된 코드를 입력해 주세요'
              label='코드'
              description='코드를 입력하세요'
              errorMessage={submitError}
            />
            <Button type='submit' disabled={!isValid} className='w-full'>
              확인
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
