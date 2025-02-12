'use client';

import { FormInput } from '@/components/common/form-input';
import { Button } from '@packages/ui/components/button';
import { Form } from '@packages/ui/components/form';
import { Mail, UserRound, UserRoundPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FindPasswordPresenterProps {
  onSubmit: () => void;
  isValid: boolean;
}
export default function FindPasswordPresenter({
  onSubmit,
  isValid,
}: FindPasswordPresenterProps) {
  const form = useFormContext();
  const [isSent, setIsSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSent) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsSent(false);
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isSent]);

  function onSendCode() {
    setIsSent(true);
    setRemainingTime(120);
    // TODO: 코드 전송 로직 추가
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const emailValue = form.watch('email');
  const emailError = form.formState.errors.email;
  const isEmailValid = emailValue && !emailError;
  return (
    <div className='flex  justify-center min-h-screen w-full'>
      <main className='flex flex-col gap-8 w-96 mt-20'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormInput
              icon={UserRound}
              name='username'
              placeholder='이름을 입력해 주세요'
              label='이름'
              description='이름을 입력하세요.'
            />
            <FormInput
              icon={UserRoundPen}
              name='id'
              placeholder='4-12자로 입력해 주세요'
              label='아이디'
              description='아이디를 입력하세요.'
            />
            <div className='relative'>
              <FormInput
                icon={Mail}
                name='email'
                type='email'
                placeholder='이메일을 입력해 주세요'
                label='이메일'
                description='이메일을 입력하세요.'
              />
              {isSent ? (
                <div className='text-xs font-medium text-accent'>
                  코드를 보냈어요! 이메일을 확인해주세요
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type='button'
                onClick={onSendCode}
                className={`absolute w-24 right-3 top-11 h-8 ${
                  isSent
                    ? 'bg-white border border-primary-outline text-primary'
                    : ''
                }`}
                disabled={!isEmailValid || isSent}
              >
                {isSent
                  ? `${minutes}:${seconds.toString().padStart(2, '0')}`
                  : '코드 전송'}
              </Button>
            </div>
            <FormInput
              icon={UserRound}
              name='code'
              placeholder='이메일로 전송된 코드를 입력해 주세요'
              label='코드'
              description='코드를 입력하세요'
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
