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
  RESET_ANIMATION,
  SET_TOKEN,
  SET_DEVICE_CURRENT,
  ADD_PRODUCT_REURNED,
  DELETE_PRODUCT_REURNED,
} from './AppTypes';
import {ITicketResponse, Ticket} from './interfaces/AppStateInterface';
import {ticketDemo, TypeOfError, TypeOfPrinter} from 'utils/enums';
import {calculateTotalProducts, validateErrorTicket} from 'utils/methods';
import dropoffApi from 'api/dropoffApi';
import {DeviceBluetooth} from 'interfaces/appInterface';
import {DetailTicketDto, StatusTicketDto} from './dtos/appDtos';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from '@brooons/react-native-bluetooth-escpos-printer';
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
    const response = await dropoffApi.get<ITicketResponse>(
      `/dropoff/ticket?token=${token}`,
    );
    console.log(JSON.stringify({data: response.data}, null, 3));
    const ticketError = validateErrorTicket(response.data.ticket);
    if (ticketError === 0) {
      dispatch({
        type: QR_READ,
        payload: {
          ticket: response.data.ticket,
          products: response.data.products,
          totalProducts: calculateTotalProducts(response.data.products),
        },
      });
    } else {
      // ESTABLECER EL ERROR DE TICKET
      dispatch({
        type: TYPE_ERROR,
        payload: {
          error: true,
          type: ticketError,
        },
      });
    }

    // setTimeout(() => {
    //   const response = ticketDemo;
    //   const ticketError = validateErrorTicket(response.ticket);
    //   if (ticketError === 0) {
    //     dispatch({
    //       type: QR_READ,
    //       payload: {
    //         ticket: response.ticket,
    //         products: response.products,
    //         totalProducts: calculateTotalProducts(response.products),
    //       },
    //     });
    //   } else {
    //     // ESTABLECER EL ERROR DE TICKET
    //     dispatch({
    //       type: TYPE_ERROR,
    //       payload: {
    //         error: true,
    //         type: ticketError,
    //       },
    //     });
    //   }
    // }, 1500);
  } catch (error: any) {
    // console.log('error ');
    console.log(JSON.stringify(error.response, null, 3));
    if (error.message == 'Network Error') {
      setTimeout(() => {
        dispatch({
          type: TYPE_ERROR,
          payload: {
            error: true,
            type: TypeOfError.TICKET_WIFI,
          },
        });
      }, 1500);

      return;
    }
    if (error.response.status === 400 || error.response.status === 401) {
      // disparar un error
      setTimeout(() => {
        dispatch({
          type: TYPE_ERROR,
          payload: {
            error: true,
            type: TypeOfError.TICKET_CANCELED,
          },
        });
      }, 1500);
      return;
    }
    if (error.response.status === 500 || error.response.status === 504) {
      // disparar un error
      setTimeout(() => {
        dispatch({
          type: TYPE_ERROR,
          payload: {
            error: true,
            type: TypeOfError.TICKET_WIFI,
          },
        });
      }, 1500);
      return;
    }
    // disparar un error
    // dispatch({
    //   type: TYPE_ERROR,
    //   payload: {
    //     error: true,
    //     type: TypeOfError.TICKET_CANCELED,
    //   },
    // });
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
        token: '',
        ticketInfo: null,
        totalPorducts: 0,
        returnedProducts: [],
        products: [],
        error: false,
        typeOfError: null,
        printer: false,
        typeOfPrinter: TypeOfPrinter.PRINTER_ERROR,
        resetAnimation: false,
        currentPrint: null,
      },
    });
  }, 2000);
};

export const printerQrAction = async (
  dispatch: React.Dispatch<QRDispatchTypes>,
  statusTicket: StatusTicketDto,
  detailTicket: DetailTicketDto,
) => {
  dispatch({
    type: QR_CHECK,
    payload: {
      status: true,
      message: 'Imprimiendo tu código QR',
    },
  });
  // respuesta de la impresora (true | false)
  try {
    const promiseStatus = dropoffApi.put(
      '/dropoff/update-status-ticket',
      statusTicket,
    );
    const promiseDetail = dropoffApi.put(
      '/dropoff/update-detail-ticket',
      detailTicket,
    );

    const [status, detail] = await Promise.all([promiseStatus, promiseDetail]);
    console.log(JSON.stringify(status.data, null, 3));
    console.log(JSON.stringify(detail.data, null, 3));
    setTimeout(() => {
      dispatch({
        type: CHECK_PRINTER,
        payload: {
          printer: true,
          type: TypeOfPrinter.PRINTER_SUCCESS,
        },
      });
    }, 1500);
  } catch (error) {}
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

export const changeAnimationAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  status: boolean,
) => {
  dispatch({
    type: RESET_ANIMATION,
    payload: status,
  });
};

export const addProductsReturnedAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  order_detail_id: number,
) => {
  dispatch({
    type: ADD_PRODUCT_REURNED,
    payload: order_detail_id,
  });
};

export const deleteProductsReturnedAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  order_detail_id: number,
) => {
  dispatch({
    type: DELETE_PRODUCT_REURNED,
    payload: order_detail_id,
  });
};

export const setTokenAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  token: string,
) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setListDevicesAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  device: DeviceBluetooth,
) => {
  dispatch({
    type: SET_DEVICE_CURRENT,
    payload: device,
  });
};
