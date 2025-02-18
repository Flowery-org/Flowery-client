import { useState } from 'react';
import { BaseModalProps } from '../types';
import { 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel 
} from '@packages/ui/components/alert-dialog';

export function InputModal({ 
  description, 
  onSubmit, 
  onCancel,
  submitLabel = '확인',
  cancelLabel = '취소',
  onClose 
}: BaseModalProps) {
  const [inputValue, setInputValue] = useState('');

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
          onClick={() => {
            onCancel?.();
            onClose();
          }}
          className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          {cancelLabel}
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            onSubmit?.(inputValue);
            onClose();
          }}
          className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white"
        >
          {submitLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  );
}