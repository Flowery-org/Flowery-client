import { AppBar } from '@/components/common/app-bar';
import { ReactNode } from 'react';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen'>
      <AppBar title='로그인' />
      {children}
    </div>
  );
}
