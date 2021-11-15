import {
  QR_READ,
  QR_CHECK,
  QRDispatchTypes,
  RESET_DATA,
  TYPE_ERROR,
  CHECK_PRINTER,
  CHANGE_TOTAL_PRODUCTS,
} from './AppTypes';

import {AppStateI, Product} from './interfaces/AppStateInterface';

const AppReducer = (state: AppStateI, action: QRDispatchTypes) => {
  switch (action.type) {
    case QR_READ:
      return {
        ...state,
        ticketInfo: action.payload.ticket,
        products: action.payload.products,
        totalPorducts: action.payload.totalProducts,
        isLoading: false,
      };
    case QR_CHECK:
      return {
        ...state,
        isLoading: action.payload.status,
        messageLoading: action.payload.message,
      };
    case RESET_DATA:
      return {
        // ...state,
        ...action.payload,
      };
    case TYPE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        typeOfError: action.payload.type,
      };
    case CHECK_PRINTER:
      return {
        ...state,
        isLoading: false,
        printer: action.payload.printer,
        typeOfPrinter: action.payload.type,
      };
    case CHANGE_TOTAL_PRODUCTS:
      return {
        ...state,
        totalPorducts: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
