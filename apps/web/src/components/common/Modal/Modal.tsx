'use client';

import { match } from 'ts-pattern';
import { ModalProps } from './types';
import { ModalContainer } from './ModalContainer';
import {
  MessageModal,
  ConfirmModal,
  InputModal,
  ProfileModal,
} from './variants';

export default function Modal({
  open,
  onClose,
  variant = 'message',
  title,
  icon,
  children,
  ...props
}: ModalProps) {
  const modalContent = match(variant)
    .with('message', () => <MessageModal {...props} onClose={onClose} />)
    .with('confirm', () => <ConfirmModal {...props} onClose={onClose} />)
    .with('input', () => <InputModal {...props} onClose={onClose} />)
    .with('profile', () => <ProfileModal>{children}</ProfileModal>)
    .exhaustive();

  return (
    <ModalContainer
      open={open}
      onClose={onClose}
      title={title}
      icon={icon}
      variant={variant}
    >
      {modalContent}
    </ModalContainer>
  );
}