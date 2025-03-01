import { useEffect, useState } from 'react';

export const useTimer = (time: number) => {
  const [count, setCount] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (isRunning && count > 0) {
        setCount((prev) => prev - 1);
      }
    }, 1000);

    if (count === 0) {
      setIsRunning(false);
      setIsExpired(true);
    }

    return () => clearInterval(id);
  }, [count, isRunning]);

  const startTimer = () => {
    setCount(time);
    setIsRunning(true);
    setIsExpired(false);
  };

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return {
    isRunning,
    isExpired,
    formattedTime,
    startTimer,
  };
};
