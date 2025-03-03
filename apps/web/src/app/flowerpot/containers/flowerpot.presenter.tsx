'use client'

import { AppBar } from '@/components/common/app-bar';
import Modal from '@/components/common/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TodoItem, TodoFormData } from './flowerpot.container';
import { ReactNode } from 'react';

interface FlowerpotPresenterProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSubmit: (data: TodoFormData) => void;
  todos: TodoItem[];
  onToggleTodo: (id: number) => void;
  onToggleStart: (id: number) => void;
  children?: ReactNode;
}

export default function FlowerpotPresenter({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onSubmit,
  todos,
  onToggleTodo,
  onToggleStart,
  children
}: FlowerpotPresenterProps) {
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    setCurrentDate(`${year}년 ${month}월 ${day}일`);
  }, []);

  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  const handleModalSubmit = (data: string | boolean) => {
    if (typeof data === 'string' && data.trim()) {
      onSubmit({ todoContent: data });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppBar title={currentDate} showIcon={false} />

      <main className="flex-1 px-5">
        <div className="flex justify-center items-center">
          <Image
            src="/튤립_노.svg"
            alt="Tulip"
            width={1200}
            height={1500}
            priority
            quality={100}
            className="w-auto object-contain" 
            style={{ 
              height: '70vh',
              transform: 'scale(1.8)',
              pointerEvents: 'none'
            }}
          />
        </div>

        <section>
          <h2 className="text-xl font-medium mb-4 z-10">오늘 할 일</h2>
          
          {activeTodos.length > 0 ? (
            activeTodos.map((todo) => (
              <div 
                key={todo.id}
                className={`mb-3 rounded-2xl bg-white border shadow-md ${
                  todo.isStarted 
                    ? 'border-accent border-2' 
                    : 'border-[hsl(var(--gray-border))]'
                }`}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={false}
                      onChange={() => onToggleTodo(todo.id)}
                      className="w-5 h-5 rounded-lg border-[hsl(var(--gray-border))] text-accent" 
                    />
                    <span className="text-black">{todo.content}</span>
                  </div>
                  <button 
                    onClick={() => onToggleStart(todo.id)}
                    className={`min-w-[56px] px-4 py-1.5 rounded-xl text-sm ${
                      todo.isStarted 
                        ? 'bg-accent text-white' 
                        : 'bg-white text-[hsl(var(--gray-button))] border border-[hsl(var(--gray-border))]'
                    }`}
                  >
                    {todo.isStarted ? '정지' : '시작'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">
              할 일이 없습니다. 새로운 할 일을 추가해 보세요!
            </div>
          )}

          <div className="flex justify-center my-6">
            <button 
              onClick={onOpenModal}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <span className="text-2xl text-gray-400">+</span>
            </button>
          </div>

          {completedTodos.length > 0 && (
            <>
              <h2 className="text-xl font-medium mb-4 mt-8">완료</h2>
              {completedTodos.map((todo) => (
                <div 
                  key={todo.id}
                  className="mb-3 rounded-2xl bg-[hsl(var(--gray-medium))] border border-[hsl(var(--gray-border))] shadow-md"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 bg-[hsl(var(--gray-light))] rounded-md flex items-center justify-center border border-[hsl(var(--gray-border))] cursor-pointer"
                        onClick={() => onToggleTodo(todo.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 13L9 18L20 7" stroke="hsl(var(--check-color))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-[hsl(var(--check-color))] line-through">{todo.content}</span>
                    </div>
                    <button 
                      onClick={() => onToggleStart(todo.id)}
                      className="min-w-[56px] px-4 py-1.5 rounded-xl text-sm bg-[hsl(var(--gray-border))] border border-[hsl(var(--gray-button))] text-[hsl(var(--gray-button))]"
                    >
                      시작
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </main>

      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        variant="input"
        title="할 일 추가하기"
        icon={<Image src="/FloweryIcon.svg" alt="Flowery Icon" width={24} height={24} className="filter grayscale brightness-90 contrast-110" />}
        onSubmit={handleModalSubmit}
      />
      {children}
    </div>
  );
}