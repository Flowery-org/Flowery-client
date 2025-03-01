import { AppBar } from '@/components/common/app-bar';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  return (
    <div className='h-screen'>
      <AppBar title='비밀번호 찾기' />
      {children}
      <div className='w-full justify-center flex mt-12'>
        <Image src='LogoBottom.svg' alt='Icon' width='84' height='84' />
      </div>
    </div>
  );
}
