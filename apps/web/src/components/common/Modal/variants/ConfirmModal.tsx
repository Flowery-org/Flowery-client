import { BaseModalProps } from '../types';
import { 
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel 
} from '@packages/ui/components/alert-dialog';

export function ConfirmModal({ 
  description, 
  onSubmit, 
  onCancel, 
  submitLabel = '확인',
  cancelLabel = '취소',
  onClose 
}: BaseModalProps) {
  return (
    <>
      <AlertDialogDescription className="text-sm text-foreground text-center whitespace-pre-line">
        {description}
      </AlertDialogDescription>
      <AlertDialogFooter className="flex gap-2 mt-4">
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
            onSubmit?.(true);
            onClose();
          }}
          className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white"
        >
          {submitLabel}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}