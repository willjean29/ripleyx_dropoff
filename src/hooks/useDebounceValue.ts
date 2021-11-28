import React, {useEffect, useState} from 'react';

const useDebounceValue = (input: string = '', time: number = 750) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};

export default useDebounceValue;
