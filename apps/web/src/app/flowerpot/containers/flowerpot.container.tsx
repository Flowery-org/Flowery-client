'use client'

import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FlowerpotPresenter from './flowerpot.presenter';

export interface TodoItem {
  id: number;
  content: string;
  isCompleted: boolean;
  isStarted: boolean;
}

export type TodoFormData = {
  todoContent: string;
};

export default function FlowerpotContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  
  const methods = useForm<TodoFormData>({
    defaultValues: {
      todoContent: '',
    }
  });

  // localStorage에서 todos 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('flowerpot-todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('로컬스토리지 데이터 파싱 오류:', e);
      }
    }
  }, []);

  // todos 변경 시 localStorage 저장
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('flowerpot-todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = (data: TodoFormData) => {
    console.log('새 할 일 추가:', data.todoContent);
    const newTodo: TodoItem = {
      id: Date.now(),
      content: data.todoContent,
      isCompleted: false,
      isStarted: false
    };
    setTodos([...todos, newTodo]);
    methods.reset();
    setIsModalOpen(false);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const handleToggleStart = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isStarted: !todo.isStarted } : todo
    ));
  };

  return (
    <FormProvider {...methods}>
      <FlowerpotPresenter 
        isModalOpen={isModalOpen}
        onOpenModal={() => setIsModalOpen(true)}
        onCloseModal={() => setIsModalOpen(false)}
        onSubmit={handleAddTodo}
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onToggleStart={handleToggleStart}
      />
    </FormProvider>
  );
}