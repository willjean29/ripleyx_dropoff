import axios from 'axios';

const environment_dev = {
  host: 'https://api-cayde-dev.ripley.com.pe',
  // host: 'http://192.168.0.121:3005',
  x_api_key: '2QJUwd1A4AqjyLH29GL5xoTixUoI1bhRtI9rV6y8',
};

const environment_qa = {
  host: 'https://api-cayde-qa.ripley.com.pe',
  x_api_key: 'no9ArKc2x2k2lWE97rC5fOQc5tvL7GFCu3snAC18',
};

const environment_prod = {
  host: 'https://api-cayde.ripley.com.pe/',
  x_api_key: 'HzkCfoDndHYr0H8uPgF4UhwSvLFB0ErnqdrzmDdv',
};

const dropoffApi = axios.create({
  baseURL: environment_qa.host,
  headers: {
    'x-api-key': environment_qa.x_api_key,
  },
  timeout: 30000,
  timeoutErrorMessage:
    'Hubo un problema en la conexión por favor vuelva a intentarlo',
});

export default dropoffApi;
