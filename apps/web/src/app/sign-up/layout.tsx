import { AppBar } from '@/components/common/app-bar';
import { ReactNode } from 'react';
import Image from 'next/image';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen'>
      <AppBar title='회원가입' />
      {children}
      <div className='w-full justify-center flex mt-12'>
        <Image src='LogoBottom.svg' alt='Icon' width='84' height='84' />
      </div>
    </div>
  );
}