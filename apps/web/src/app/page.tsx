'use client';
import { FormInput } from '@/components/common/form-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/ui/components/button';
import { Form } from '@packages/ui/components/form';
import { UserRoundPen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export default function Home() {
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: '아이디는 4-12자로 입력해주세요.',
      })
      .max(12, {
        message: '아이디는 4-12자로 입력해주세요.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit() {
    console.log(form.getValues());
  }

  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <main className='flex flex-col gap-8 w-96'>
        <div className='text-4xl font-bold'>Components</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormInput
              icon={UserRoundPen}
              form={form}
              name='username'
              placeholder='4-12자로 입력해주세요'
              label='아이디'
              description='아이디를 입력하세요.'
            />
            <Button type='submit'>테스트</Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
