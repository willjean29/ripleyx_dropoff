import {useContext, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {AppContext} from 'context/app/AppContext';

const useInputCode = (length: number = 6) => {
  const {readTicket} = useContext(AppContext);
  const [arrayValue, setArrayValue] = useState<string[]>([]);
  const arrayRef = [1, 2, 3, 4, 5, 6].map(x => useRef<TextInput>());
  useEffect(() => {
    let timeout: any;
    if (arrayValue.length == 6) {
      console.log('ejecutar consulta');
      const ticket = arrayValue.join('');
      console.log(ticket);
      timeout = setTimeout(() => {
        readTicket(ticket);
      }, 200);
      // readTicket(ticket);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [arrayValue]);

  const addCode = (value: string) => {
    if (arrayValue.length >= 6) return;
    console.log(value);
    if (arrayValue.length === 0) {
      arrayRef[0].current?.focus();
    } else {
      arrayRef[arrayValue.length].current?.focus();
    }
    setArrayValue([...arrayValue, value]);
  };

  const deleteCode = () => {
    const array = arrayValue.slice(0, arrayValue.length - 1);
    setArrayValue(array);
  };

  return {
    arrayRef,
    arrayValue,
    addCode,
    deleteCode,
  };
};

export default useInputCode;
