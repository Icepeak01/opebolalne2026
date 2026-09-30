// client/src/hooks/useCountdown.js
import { useState, useEffect } from 'react';

/**
 * Returns the time remaining to `targetTime` (a millisecond timestamp),
 * ticking every second, or null once the target has passed.
 */
export function useCountdown(targetTime) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const distance = targetTime - now;
  if (distance < 0) return null;

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}
