import {Client, ClientResponse} from 'interfaces/appInterface';
import {useEffect, useState} from 'react';
import axios from 'axios';

const useTicket = () => {
  const [isLoading, setisLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  const getData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get<ClientResponse>(
        'https://clients-backend.herokuapp.com/api/clients',
      );
      setisLoading(false);
      setClients(response.data.clients);
    } catch (error) {
      setisLoading(false);
      setClients([]);
    }
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  return {
    isLoading,
    clients,
    getData,
  };
};

export default useTicket;
