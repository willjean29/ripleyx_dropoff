import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export enum DimensionsDevice {
  WIDTH_DEVICE = width,
  HEIGHT_DEVICE = height,
}

export enum TypeOfError {
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
