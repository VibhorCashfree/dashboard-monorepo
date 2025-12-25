import { useRef, useEffect } from 'react';

const useHasMount = () => {
  const hasMountRef = useRef(true);

  useEffect(() => {
    hasMountRef.current = false;
  }, []);

  return hasMountRef.current;
};

export default useHasMount;
