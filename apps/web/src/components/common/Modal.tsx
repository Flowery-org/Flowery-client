'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogOverlay,
} from '@packages/ui/components/alert-dialog';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  variant?: 'message' | 'confirm' | 'input' | 'profile';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: (data: string | boolean) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;

  icon?: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  variant = 'message',
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitLabel = '확인',
  cancelLabel = '취소',

  icon,
}: ModalProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      if (variant === 'input') {
        onSubmit(inputValue);
      } else {
        onSubmit(true);
      }
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const renderContent = () => {
    switch (variant) {
      case 'message':
        return (
          <div className="py-4">
            <AlertDialogDescription className="text-sm text-foreground text-center whitespace-pre-line">
              {description}
            </AlertDialogDescription>
          </div>
        );
      case 'confirm':
        return (
          <>
            <AlertDialogDescription className="text-sm text-foreground text-center whitespace-pre-line">
              {description}
            </AlertDialogDescription>
            <AlertDialogFooter className="flex gap-2 mt-4">
              <AlertDialogCancel 
                onClick={handleCancel}
                className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {cancelLabel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white"
              >
                {submitLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        );
      case 'input':
        return (
          <div className="space-y-4">
            {description && (
              <AlertDialogDescription className="text-sm text-muted-foreground">
                {description}
              </AlertDialogDescription>
            )}
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="상세 제목, 메모 등을 입력하세요"
              className="w-full h-[120px] p-3 text-sm rounded-lg border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <AlertDialogFooter className="flex gap-2">
              <AlertDialogCancel 
                onClick={handleCancel}
                className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {cancelLabel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white"
              >
                {submitLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        );
      case 'profile':
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
      default:
        return null;
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <AlertDialogContent className="fixed z-50 w-[300px] rounded-xl bg-background border-none p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <div className="absolute right-3 top-3">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">
            {variant === 'message' ? '알림' : 
             variant === 'input' ? '입력' : 
             variant === 'confirm' ? '확인' : '프로필'}
          </AlertDialogTitle>
          {icon && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-accent">{icon}</span>
              {title && <span className="text-base font-medium text-foreground">{title}</span>}
            </div>
          )}
          {renderContent()}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}