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
    id: '322',
    ticketId: 'T-000322',
    identityDocument: '999999999999',
    email: 'demo@gmail.com',
    ticketStatus: 3,
    ticketStatusName: 'DROP OF READ',
    categoryId: 1,
    categoryName: 'Fallado',
  },
  products: [
    {
      productName: 'POLO CACHAREL PARA MUJER DELFIN',
      reasonName: 'No me queda',
      quantityProductsReturn: 1,
      priceByUnit: '45.10',
      productColor: 'Ladrillo',
      productSize: 'M',
    },
    {
      productName: 'PANTIES CAFFARENA PARA MUJER 10020',
      reasonName: 'Producto fallado',
      quantityProductsReturn: 3,
      priceByUnit: '45.10',
      productColor: 'Negro',
      productSize: 'T/U',
    },
    {
      productName: 'POLO INDEX PARA MUJER DYNAMO',
      reasonName: 'No me queda',
      quantityProductsReturn: 2,
      priceByUnit: '45.10',
      productColor: 'Amarillo',
      productSize: 'M',
    },
    {
      productName: 'POLO INDEX PARA HOMBRE DYNAMO',
      reasonName: 'No me queda',
      quantityProductsReturn: 2,
      priceByUnit: '45.10',
      productColor: 'Amarillo',
      productSize: 'M',
    },
  ],
};
