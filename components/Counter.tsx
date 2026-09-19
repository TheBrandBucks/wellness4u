'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
  value: string;
  duration?: number;
}

export default function Counter({ value, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Parse the numeric value and suffix
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setCount(0);
      return;
    }

    const numericValue = parseFloat(match[1]);
    const suffix = match[2];

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * numericValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  // Format the display value
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;

  const suffix = match[2];
  return `${count}${suffix}`;
}