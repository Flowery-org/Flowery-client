'use client';
import { findIdScheme } from '@/types/find-id.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from '../components/common/Modal';
import FindIdPresenter from './find-id.presenter';

export default function FindIdContainer() {
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [messageModal, setMessageModal] = useState(false);
  const [foundId, setFoundId] = useState<string | null>(null);
  const [foundUsername, setFoundUsername] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof findIdScheme>>({
    resolver: zodResolver(findIdScheme),
    defaultValues: {
      username: '',
      email: '',
      code: '',
    },
    mode: 'onChange',
  });

  const { formState, handleSubmit, watch } = form;

  const usernameValue = watch('username');
  const emailValue = watch('email');
  const codeValue = watch('code');

  const isValid = Boolean(
    formState.isValid &&
      usernameValue &&
      emailValue &&
      codeValue &&
      isCodeSent &&
      !formState.errors.username &&
      !formState.errors.email,
  );
  const isCodeFormFilled = Boolean(usernameValue && emailValue);

  // 서버 연결
  // const sendVerificationCode = async (data: {
  //   username: string;
  //   email: string;
  // }) => {
  //   try {
  //     const response = await fetch('/api/find-id/verify', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('이름과 이메일을 다시 확인해주세요.');
  //     }

  //     const result = await response.json();
  //     return result.message === 'succeed';
  //   } catch (error) {
  //     setVerificationError(
  //       error instanceof Error
  //         ? error.message
  //         : '인증 코드 전송에 실패했습니다.',
  //     );
  //     return false;
  //   }
  // };

  // 서버 연결
  // const verifyAndFindId = async (data: z.infer<typeof findIdScheme>) => {
  //   try {
  //     const response = await fetch('/api/find-id', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.status === 404) {
  //       throw new Error('일치하는 계정을 찾을 수 없습니다.');
  //     }

  //     if (response.status === 401) {
  //       throw new Error('인증 시간이 만료되었습니다.');
  //     }

  //     if (!response.ok) {
  //       throw new Error('인증 코드를 다시 확인해주세요.');
  //     }

  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     setSubmitError(
  //       error instanceof Error ? error.message : '인증에 실패했습니다.',
  //     );
  //     throw error;
  //   }
  // };

  const onSubmit = handleSubmit(() => {
    // TODO: 서버 연결
    try {
      // const result = await verifyAndFindId(data);
      const dummyResponse = {
        username: 'GilDong',
        id: 'My Id?',
      };
      setFoundId(dummyResponse.id);
      setFoundUsername(dummyResponse.username);
      setMessageModal(true);
      setSubmitError(null);
      setVerificationError(null);
    } catch (error) {
      console.log(error);
    }
  });
  const handleCloseModal = () => {
    setMessageModal(false);
    router.push('/sign-in');
  };

  // 서버 연결
  const onSendCode = async () => {
    // TODO: 서버 연결
    // const { username, email } = form.getValues();
    // const success = await sendVerificationCode({ username, email });
    // if (success) {
    //   setIsCodeSent(true);
    //   return true;
    // }
    console.log('sendCode');
    setIsCodeSent(true);
    return true;
  };

  return (
    <>
      <FormProvider {...form}>
        <FindIdPresenter
          onSubmit={onSubmit}
          isValid={isValid}
          verificationError={verificationError}
          submitError={submitError}
          onSendCode={onSendCode}
          isCodeFromFilled={isCodeFormFilled}
        />
      </FormProvider>
      <Modal
        open={messageModal}
        onClose={handleCloseModal}
        variant='message'
        description={`${foundUsername} 회원님의 아이디는\n'${foundId}'입니다.`}
      />
    </>
  );
}
