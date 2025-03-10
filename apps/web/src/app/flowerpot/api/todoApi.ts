'use client'

import { TodoItem } from '@/hooks/useTodos';

export interface TodoApi {
  getTodos: () => Promise<TodoItem[]>;
  addTodo: (content: string) => Promise<TodoItem>;
  updateTodo: (id: number, updates: Partial<TodoItem>) => Promise<TodoItem>;
  deleteTodo: (id: number) => Promise<void>;
}

export const createTodoApi = (): TodoApi => {
  const STORAGE_KEY = 'flowerpot-todos';

  const getTodos = async (): Promise<TodoItem[]> => {
    try {
      const savedTodos = localStorage.getItem(STORAGE_KEY);
      if (savedTodos) {
        return JSON.parse(savedTodos);
      }
      return [];
    } catch (e) {
      console.error('로컬스토리지 데이터 파싱 오류:', e);
      return [];
    }
  };

  const addTodo = async (content: string): Promise<TodoItem> => {
    const todos = await getTodos();
    const newTodo: TodoItem = {
      id: Date.now(),
      content,
      isCompleted: false,
      isStarted: false
    };
    
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    
    return newTodo;
  };

  const updateTodo = async (id: number, updates: Partial<TodoItem>): Promise<TodoItem> => {
    const todos = await getTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    
    const updatedTodo = updatedTodos.find(todo => todo.id === id);
    if (!updatedTodo) {
      throw new Error('할 일을 찾을 수 없습니다.');
    }
    
    return updatedTodo;
  };

  const deleteTodo = async (id: number): Promise<void> => {
    const todos = await getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodos));
  };

  return {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
  };
};

export const todoApi = createTodoApi();