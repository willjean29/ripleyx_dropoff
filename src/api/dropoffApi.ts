import axios from 'axios';

const environment_dev = {
  production: false,
  api: {
    host: 'https://api-cayde-dev.ripley.com.pe',
    // host: 'http://192.168.0.121:3005',
    x_api_key: '2QJUwd1A4AqjyLH29GL5xoTixUoI1bhRtI9rV6y8',
  },
};

const dropoffApi = axios.create({
  baseURL: environment_dev.api.host,
  headers: {
    'x-api-key': environment_dev.api.x_api_key,
  },
  timeout: 30000,
  timeoutErrorMessage:
    'Hubo un problema en la conexión por favor vuelva a intentarlo',
});

export default dropoffApi;
