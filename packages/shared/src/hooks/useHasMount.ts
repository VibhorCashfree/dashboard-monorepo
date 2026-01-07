import { useRef, useEffect } from 'react';

export const useHasMount = () => {
  const hasMountRef = useRef(true);

  useEffect(() => {
    hasMountRef.current = false;
  }, []);

  return hasMountRef.current;
};
