'use client'

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FlowerpotPresenter from './flowerpot.presenter';
import { useTodos } from '@/hooks/useTodos';
import { todoSchema, TodoFormData } from './schemas/todoSchema';

export default function FlowerpotContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, isLoading, error, addTodo, toggleTodo, toggleStart } = useTodos();
  
  const methods = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todoContent: '',
    }
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTodo = (data: TodoFormData) => {
    addTodo(data.todoContent)
      .then(() => {
        methods.reset();
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error('할 일 추가 실패:', error);
      });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <FormProvider {...methods}>
      <FlowerpotPresenter 
        isModalOpen={isModalOpen}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        onSubmit={methods.handleSubmit(handleAddTodo)}
        todos={todos}
        onToggleTodo={toggleTodo}
        onToggleStart={toggleStart}
      />
    </FormProvider>
  );
}