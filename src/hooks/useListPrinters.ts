import dropoffApi from 'api/dropoffApi';
import {Printers} from 'interfaces/appInterface';
import {useEffect, useState} from 'react';

const useListPrinters = () => {
  const [listPrinters, setListPrinters] = useState<Printers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllPrinters = async () => {
    const response = await dropoffApi.get<Printers[]>('/dropoff/printers');
    setListPrinters(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllPrinters();
  }, []);
  return {
    listPrinters,
    isLoading,
  };
};

export default useListPrinters;
