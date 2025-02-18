import { BaseModalProps } from '../types';
import { AlertDialogDescription } from '@packages/ui/components/alert-dialog';

export function MessageModal({ description }: BaseModalProps) {
  return (
    <div className="py-4">
      <AlertDialogDescription className="text-sm text-foreground text-center whitespace-pre-line">
        {description}
      </AlertDialogDescription>
    </div>
  );
}