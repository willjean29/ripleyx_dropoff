import {ITicketResponse} from 'context/app/interfaces/AppStateInterface';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export enum DimensionsDevice {
  WIDTH_DEVICE = width,
  HEIGHT_DEVICE = height,
}

export enum TypeOfError {
  TICKET_NOT_ERROR = 0,
  TICKET_USED = 1,
  TICKET_SECURITY = 2,
  TICKET_ELECTRO = 3,
  TICKET_CANCELED_CLIENT = 4,
  TICKET_CANCELED_PERSONAL = 5,
  TICKET_CANCELED = 6,
  TICKET_WIFI = 7,
}

export enum TypeOfPrinter {
  PRINTER_SUCCESS = 1,
  PRINTER_ERROR = 0,
}

export const ticketDemo: ITicketResponse = {
  ticket: {
    order_id: '322',
    ticket_id: 'T-000322',
    identity_document: '74785381',
    email: 'rulman26@gmail.com',
    status_request: 4,
    status_request_name: 'DROP OFF - READ',
    category_id: 1,
    category_name: 'FALLADO',
  },
  products: [
    {
      order_detail_id: '997',
      order_id: '322',
      ticket_id: 'T-000322',
      product_name: 'HARVEST PANTALÓN TTBPBRIB - AZUL MARINO - 10',
      reason_name: 'Me arrepiento',
      quantity_products_return: 1,
      price_by_unit: '29.9500',
      product_color: 'Azul',
      product_size: '-',
    },
    {
      order_detail_id: '997',
      order_id: '322',
      ticket_id: 'T-000322',
      product_name: 'HARVEST PANTALÓN TTBPBRIB - AZUL MARINO - 10',
      reason_name: 'Me arrepiento',
      quantity_products_return: 1,
      price_by_unit: '29.9500',
      product_color: 'Azul',
      product_size: '-',
    },
    {
      order_detail_id: '997',
      order_id: '322',
      ticket_id: 'T-000322',
      product_name: 'HARVEST PANTALÓN TTBPBRIB - AZUL MARINO - 10',
      reason_name: 'Me arrepiento',
      quantity_products_return: 1,
      price_by_unit: '29.9500',
      product_color: 'Azul',
      product_size: '-',
    },
    {
      order_detail_id: '997',
      order_id: '322',
      ticket_id: 'T-000322',
      product_name: 'HARVEST PANTALÓN TTBPBRIB - AZUL MARINO - 10',
      reason_name: 'Me arrepiento',
      quantity_products_return: 1,
      price_by_unit: '29.9500',
      product_color: 'Azul',
      product_size: '-',
    },
  ],
};

export let listMacsPrint = ['00:13:7B:3A:79:CD', '41:42:06:8C:00:CA'];
export const macModel = '00:13:7B:3A';
export const macModelDemo = '41:42:06:8C';
