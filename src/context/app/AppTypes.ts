import {TypeOfError, TypeOfPrinter} from 'utils/enums';
import {Product, Ticket, AppStateI} from './interfaces/AppStateInterface';

export const QR_READ = 'QR_READ';
export const QR_CHECK = 'QR_CHECK';
export const RESET_DATA = 'RESET_DATA';
export const TYPE_ERROR = 'TYPE_ERROR';
export const CHECK_PRINTER = 'CHECK_PRINTER';
export const CHANGE_TOTAL_PRODUCTS = 'CHANGE_TOTAL_PRODUCTS';

export interface QRRead {
  type: typeof QR_READ;
  payload: {
    ticket: Ticket;
    products: Product[];
    totalProducts: number;
  };
}

export interface QRCheck {
  type: typeof QR_CHECK;
  payload: {
    status: boolean;
    message: string;
  };
}

export interface ResetData {
  type: typeof RESET_DATA;
  payload: AppStateI;
}

export interface TypeError {
  type: typeof TYPE_ERROR;
  payload: {
    error: boolean;
    type: TypeOfError;
  };
}

export interface CheckPrinter {
  type: typeof CHECK_PRINTER;
  payload: {
    printer: boolean;
    type: TypeOfPrinter;
  };
}

export interface ChangeTotalProducts {
  type: typeof CHANGE_TOTAL_PRODUCTS;
  payload: number;
}

export type QRDispatchTypes =
  | QRRead
  | QRCheck
  | ResetData
  | TypeError
  | CheckPrinter
  | ChangeTotalProducts;
