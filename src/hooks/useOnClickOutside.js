import { useEffect, useCallback } from 'react';

export const useOnClickOutside = (ref, callback) => {
  const handleClick = useCallback(
    event => {
      console.log(ref);

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      console.log('here');

      callback();
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback, handleClick]);
};
