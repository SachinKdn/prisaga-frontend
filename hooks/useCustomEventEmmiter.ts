import { useCallback } from 'react';

/**
 * Custom Hook for emitting (dispatching) a custom event.
 * @param {string} eventName - The name of the custom event to dispatch.
 * @returns {function} A function to emit the custom event with optional data.
 */
const useCustomEventEmitter = (eventName: string) => {
  return useCallback(
    (detail = {}) => {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
    },
    [eventName]
  );
};

export default useCustomEventEmitter;
