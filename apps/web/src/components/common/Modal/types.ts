import { ReactNode } from 'react';

export type ModalVariant = 'message' | 'confirm' | 'input' | 'profile';

export interface BaseModalProps {
  description?: ReactNode;
  onClose: () => void;
  onSubmit?: (data: string | boolean) => void;
  onCancel?: () => void;
  submitLabel?: ReactNode;
  cancelLabel?: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
}

export interface ModalProps extends BaseModalProps {
  open: boolean;
  variant?: ModalVariant;
  children?: ReactNode;
}