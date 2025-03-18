import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement| null> ,
  handler: Function
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
