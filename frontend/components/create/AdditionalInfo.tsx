'use client';

import { Textarea } from '../ui/textarea';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface AdditionalInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
}

export function AdditionalInfo({ register, errors }: AdditionalInfoProps) {
  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <label htmlFor="instructions" className="text-lg font-semibold text-foreground block mb-2">
        Additional Instructions
      </label>
      <Textarea
        id="instructions"
        placeholder="Add any specific instructions or context for the AI generation..."
        className="min-h-[120px] resize-y bg-card border-border/50 focus-visible:ring-primary text-base p-4"
        {...register('instructions')}
      />
      {errors.instructions && (
        <p className="text-sm text-destructive">{errors.instructions.message as string}</p>
      )}
    </div>
  );
}
