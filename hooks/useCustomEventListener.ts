import { useEffect } from 'react';

/**
 * Hook to listen for a custom event on window
 * @param {string} eventName - Name of the custom event
 * @param {function} eventHandler - Function to handle event
 */
const useCustomEventListener = (
  eventName: string,
  eventHandler: (data: { detail: Record<string, any> }) => void
) => {
  useEffect(() => {
    // @ts-ignore
    window.addEventListener(eventName, eventHandler);

    return () => {
      // @ts-ignore
      window.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler]);
};

export default useCustomEventListener;
