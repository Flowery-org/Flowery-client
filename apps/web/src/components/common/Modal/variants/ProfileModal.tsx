import { ReactNode } from 'react';

interface ProfileModalProps {
  children: ReactNode;
}

export function ProfileModal({ children }: ProfileModalProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-accent"></div>
          <div className="absolute -top-1 -left-1">
            <span className="text-xl">☀️</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}