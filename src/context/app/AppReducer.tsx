import {act} from 'react-test-renderer';
import {
  QR_READ,
  QR_CHECK,
  QRDispatchTypes,
  RESET_DATA,
  TYPE_ERROR,
  CHECK_PRINTER,
  CHANGE_TOTAL_PRODUCTS,
  RESET_ANIMATION,
  ADD_PRODUCT_REURNED,
  DELETE_PRODUCT_REURNED,
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
        printer: action.payload.printer,
        typeOfPrinter: action.payload.type,
        isLoading: false,
      };
    case CHANGE_TOTAL_PRODUCTS:
      return {
        ...state,
        totalPorducts: action.payload,
      };
    case RESET_ANIMATION:
      return {
        ...state,
        resetAnimation: action.payload,
      };
    case ADD_PRODUCT_REURNED:
      return {
        ...state,
        returnedProducts: [
          ...state.returnedProducts,
          {order_detail_id: action.payload},
        ],
      };
    case DELETE_PRODUCT_REURNED:
      return {
        ...state,
        returnedProducts: state.returnedProducts.filter(
          product => product.order_detail_id !== action.payload && product,
        ),
      };
    default:
      return state;
  }
};

export default AppReducer;
