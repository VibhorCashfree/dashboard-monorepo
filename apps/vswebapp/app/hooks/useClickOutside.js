import { useEffect } from 'react';

const useClickOutside = (ref, callbackFn, ...extraRef) => {
  const checkForOutsideClick = event => {
    let isClickedOutside = true;

    if (ref.current && ref.current.contains(event.target)) {
      isClickedOutside = false;
    }

    extraRef.forEach(ref => {
      if (ref.current && ref.current.contains(event.target)) {
        isClickedOutside = false;
      }
    });

    return isClickedOutside;
  };

  useEffect(() => {
    const handleClickOutside = event => {
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

export default useClickOutside;
