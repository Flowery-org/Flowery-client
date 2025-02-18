import { ReactNode } from 'react';
import { X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from '@packages/ui/components/alert-dialog';

const STYLES = {
  overlay: "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  content: "fixed z-50 w-[300px] rounded-xl bg-background border-none p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
} as const;

interface ModalContainerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  icon?: ReactNode;
  variant: string;
  children: ReactNode;
}

export function ModalContainer({ 
  open, 
  onClose, 
  title, 
  icon, 
  variant,
  children 
}: ModalContainerProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogOverlay className={STYLES.overlay} />
      <AlertDialogContent className={STYLES.content}>
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
          {children}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}