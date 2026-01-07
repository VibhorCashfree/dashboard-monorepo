import { useEffect, RefObject } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callbackFn: () => void,
  ...extraRef: RefObject<HTMLElement>[]
) => {
  const checkForOutsideClick = (event: MouseEvent) => {
    let isClickedOutside = true;

    if (ref.current && ref.current.contains(event.target as Node)) {
      isClickedOutside = false;
    }

    extraRef.forEach((r) => {
      if (r.current && r.current.contains(event.target as Node)) {
        isClickedOutside = false;
      }
    });

    return isClickedOutside;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (checkForOutsideClick(event)) {
        callbackFn();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callbackFn]);
};
