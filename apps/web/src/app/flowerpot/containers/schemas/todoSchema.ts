'use client'

import { z } from 'zod';

export const todoSchema = z.object({
  todoContent: z.string()
    .min(1, '할 일을 입력해주세요')
    .max(100, '할 일은 100자 이내로 입력해주세요')
});

export type TodoFormData = z.infer<typeof todoSchema>;