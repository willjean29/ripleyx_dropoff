import React from 'react';
import axios from 'axios';
import {
  QRDispatchTypes,
  QR_READ,
  QR_CHECK,
  RESET_DATA,
  TYPE_ERROR,
  CHECK_PRINTER,
  CHANGE_TOTAL_PRODUCTS,
} from './AppTypes';
import {ITicketResponse, Ticket} from './interfaces/AppStateInterface';
import {TypeOfError, TypeOfPrinter} from 'utils/enums';
import {calculateTotalProducts} from 'utils/methods';

// const url =  'https://clients-backend.herokuapp.com/api/clients';
const url = 'http://192.168.0.121:3005/api/ticket?token';

export const readQrAction = async (
  dispatch: React.Dispatch<QRDispatchTypes>,
  token: string,
) => {
  dispatch({
    type: QR_CHECK,
    payload: {
      status: true,
      message: 'Estamos buscando tu ticket',
    },
  });
  try {
    const response = await axios.get<ITicketResponse>(`${url}=${token}`);
    console.log(JSON.stringify({data: response.data}, null, 3));

    dispatch({
      type: QR_READ,
      payload: {
        ticket: response.data.ticket,
        products: response.data.products,
        totalProducts: calculateTotalProducts(response.data.products),
      },
    });
  } catch (error: any) {
    // console.log('error ');
    console.log(error.response);
    if (error.response.status === 500) {
      // disparar un error
      dispatch({
        type: TYPE_ERROR,
        payload: {
          error: true,
          type: TypeOfError.TICKET_WIFI,
        },
      });
    }
  }
};

export const backHomeAction = (dispatch: React.Dispatch<QRDispatchTypes>) => {
  // volver a home page
  // limpiar estado de tickets
  dispatch({
    type: QR_CHECK,
    payload: {
      status: true,
      message: 'Volviendo a la pantalla de inicio',
    },
  });
  setTimeout(() => {
    dispatch({
      type: RESET_DATA,
      payload: {
        isLoading: false,
        messageLoading: '',
        ticketStatus: 'init',
        ticketInfo: null,
        totalPorducts: 0,
        products: [],
        error: false,
        typeOfError: null,
        printer: false,
        typeOfPrinter: TypeOfPrinter.PRINTER_ERROR,
      },
    });
  }, 1500);
};

export const printerQrAction = (dispatch: React.Dispatch<QRDispatchTypes>) => {
  dispatch({
    type: QR_CHECK,
    payload: {
      status: true,
      message: 'Imprimiendo tu código QR',
    },
  });
  // respuesta de la impresora (true | false)
  setTimeout(() => {
    dispatch({
      type: CHECK_PRINTER,
      payload: {
        printer: true,
        type: TypeOfPrinter.PRINTER_ERROR,
      },
    });
  }, 1500);
};

export const changeTotalProductsAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  total: number,
) => {
  dispatch({
    type: CHANGE_TOTAL_PRODUCTS,
    payload: total,
  });
};
