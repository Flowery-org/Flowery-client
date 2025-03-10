'use client'

import { useState, useEffect } from 'react';
import { todoApi } from '@/app/flowerpot/api/todoApi';

export interface TodoItem {
  id: number;
  content: string;
  isCompleted: boolean;
  isStarted: boolean;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const data = await todoApi.getTodos();
        setTodos(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('할 일을 불러오는 중 오류가 발생했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (content: string) => {
    try {
      const newTodo = await todoApi.addTodo(content);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('할 일을 추가하는 중 오류가 발생했습니다.'));
      throw e;
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await todoApi.updateTodo(id, {
        isCompleted: !todoToUpdate.isCompleted
      });

      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('할 일 상태를 변경하는 중 오류가 발생했습니다.'));
    }
  };

  const toggleStart = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      
      const updatedTodo = await todoApi.updateTodo(id, {
        isStarted: !todoToUpdate.isStarted
      });

      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('할 일 시작 상태를 변경하는 중 오류가 발생했습니다.'));
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('할 일을 삭제하는 중 오류가 발생했습니다.'));
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    toggleStart,
    deleteTodo
  };
};