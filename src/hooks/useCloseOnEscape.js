import { useEffect } from 'react';

export const useCloseOnEscape = callback => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        callback();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};
