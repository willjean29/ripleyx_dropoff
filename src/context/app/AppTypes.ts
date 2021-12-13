import {TypeOfError, TypeOfPrinter} from 'utils/enums';
import {Product, Ticket, AppStateI} from './interfaces/AppStateInterface';
import {DeviceBluetooth} from 'interfaces/appInterface';
export const QR_READ = 'QR_READ';
export const QR_CHECK = 'QR_CHECK';
export const RESET_DATA = 'RESET_DATA';
export const TYPE_ERROR = 'TYPE_ERROR';
export const CHECK_PRINTER = 'CHECK_PRINTER';
export const CHANGE_TOTAL_PRODUCTS = 'CHANGE_TOTAL_PRODUCTS';
export const RESET_ANIMATION = 'RESET_ANIMATION';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_DEVICE_CURRENT = 'SET_DEVICE_CURRENT';
export const SET_LIST_DEVICES = 'SET_LIST_DEVICES';

// ACTIONS FOR ADD / DELETE RETURNED PRODUICTS
export const ADD_PRODUCT_REURNED = 'ADD_PRODUCT_REURNED';
export const DELETE_PRODUCT_REURNED = 'DELETE_PRODUCT_REURNED';
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
    ticketId?: string;
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

export interface ResetAnimation {
  type: typeof RESET_ANIMATION;
  payload: boolean;
}

export interface AddeProductReturned {
  type: typeof ADD_PRODUCT_REURNED;
  payload: number;
}

export interface DeleteProductReturned {
  type: typeof DELETE_PRODUCT_REURNED;
  payload: number;
}

export interface SetToken {
  type: typeof SET_TOKEN;
  payload: string;
}

export interface SetDeviceCurrent {
  type: typeof SET_DEVICE_CURRENT;
  payload: DeviceBluetooth;
}

export interface SetListDevices {
  type: typeof SET_LIST_DEVICES;
  payload: DeviceBluetooth[];
}

export type QRDispatchTypes =
  | QRRead
  | QRCheck
  | ResetData
  | TypeError
  | CheckPrinter
  | ChangeTotalProducts
  | ResetAnimation
  | AddeProductReturned
  | DeleteProductReturned
  | SetToken
  | SetDeviceCurrent
  | SetListDevices;
