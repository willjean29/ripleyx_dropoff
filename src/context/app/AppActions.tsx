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
  SET_LIST_DEVICES,
} from './AppTypes';
import {ITicketResponse, Ticket} from './interfaces/AppStateInterface';
import {
  macModelDemo,
  ticketDemo,
  TypeOfError,
  TypeOfPrinter,
} from 'utils/enums';
import {calculateTotalProducts, validateErrorTicket} from 'utils/methods';
import dropoffApi from 'api/dropoffApi';
import {DeviceBluetooth} from 'interfaces/appInterface';
import {DetailTicketDto, StatusTicketDto, TicketPrintDto} from './dtos/appDtos';
import {macModel} from '../../utils/enums';
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
          ticketId: response.data.ticket.ticket_id,
        },
      });
    }
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
    setTimeout(() => {
      dispatch({
        type: TYPE_ERROR,
        payload: {
          error: true,
          type: TypeOfError.TICKET_WIFI,
        },
      });
    }, 1500);
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
        ticketId: '',
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
        listDevices: [],
      },
    });
  }, 2000);
};

export const printerQrAction = async (
  dispatch: React.Dispatch<QRDispatchTypes>,
  statusTicket: StatusTicketDto,
  detailTicket: DetailTicketDto,
  printer: DeviceBluetooth[],
  infoTicket: TicketPrintDto,
) => {
  dispatch({
    type: QR_CHECK,
    payload: {
      status: true,
      message: 'Imprimiendo tu código QR',
    },
  });
  // recorrer la lista de dispositivos y encontrar la impresora
  let isConnected = false;
  for (const device of printer) {
    if (!device.address.includes(macModel)) break;
    isConnected = await connectPrinter(device);
    if (isConnected) {
      const currentDate = new Date();
      const dateFormant = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
      try {
        // imprimir ticket
        // header ticket
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printerLeftSpace(0);
        await BluetoothEscposPrinter.printText('RIPLEY\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printText('TIENDAS POR DEPARTAMENTO\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        await BluetoothEscposPrinter.printText('RIPLEY S.A.\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printText(
          'CALLE LAS BEGONIAS 545-577\n\r',
          {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 0,
          },
        );
        await BluetoothEscposPrinter.printText('SAN ISIDRO - LIMA\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        await BluetoothEscposPrinter.printText('RUC 20337564373\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        // espaciado
        await BluetoothEscposPrinter.printText('\n\r', {});
        // content ticket
        const columnWidths = [16, 4, 12];
        await BluetoothEscposPrinter.printColumn(
          columnWidths,
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          ['Nro Ticket', '', `${infoTicket.ticket_id}`],
          {},
        );
        await BluetoothEscposPrinter.printColumn(
          columnWidths,
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          ['Fec Devolución', '', `${dateFormant}`],
          {
            encoding: 'Cp858',
            codepage: 13,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 0,
          },
        );
        await BluetoothEscposPrinter.printColumn(
          columnWidths,
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          ['Cant Productos', '', `${infoTicket.total_products}`],
          {},
        );
        // espaciado
        // await BluetoothEscposPrinter.printText('\n\r', {});
        // qr tikcet
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printQRCode(
          infoTicket.token,
          370,
          BluetoothEscposPrinter.ERROR_CORRECTION.L,
        );
        // espaciado
        // await BluetoothEscposPrinter.printText('\n\r', {});
        // footer ticket
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.printText(
          'COLOCA ESTE PAPEL JUNTO CON\n\r',
          {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 0,
          },
        );
        await BluetoothEscposPrinter.printText(
          'TUS PRODUCTOS DENTRO DE LA\n\r',
          {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 0,
          },
        );
        await BluetoothEscposPrinter.printText('BOLSA DE DEVOLUCIONES\n\r', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 0,
        });
        // espaciado
        await BluetoothEscposPrinter.printText('\n\r', {});
        await BluetoothEscposPrinter.printText('\n\r', {});
        await BluetoothEscposPrinter.printText('\n\r', {});

        // actualizar datos del ticket
        const promiseStatus = dropoffApi.put(
          '/dropoff/update-status-ticket',
          statusTicket,
        );
        const promiseDetail = dropoffApi.put(
          '/dropoff/update-detail-ticket',
          detailTicket,
        );

        const [status, detail] = await Promise.all([
          promiseStatus,
          promiseDetail,
        ]);
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
        return;
      } catch (error) {
        console.log('Error al conectar a ' + device.address);
        // setTimeout(() => {
        //   dispatch({
        //     type: CHECK_PRINTER,
        //     payload: {
        //       printer: true,
        //       type: TypeOfPrinter.PRINTER_ERROR,
        //     },
        //   });
        // }, 1500);
      }
    }
  }

  if (!isConnected) {
    console.log('error en conectar impresora');
    setTimeout(() => {
      dispatch({
        type: CHECK_PRINTER,
        payload: {
          printer: true,
          type: TypeOfPrinter.PRINTER_ERROR,
        },
      });
    }, 1500);
  }
};

const connectPrinter = async (printer: DeviceBluetooth) => {
  let isConnected = false;
  try {
    const isConnect = await BluetoothManager.connect(printer.address);
    isConnected = true;
  } catch (error) {
    console.log('Error al intentar establecer la conexión');
    isConnected = false;
  }
  return isConnected;
};

const printerText2 = async () => {
  await BluetoothEscposPrinter.printText('Tiendas Ripley\n\r', {});
  await BluetoothEscposPrinter.printText('Prueba De QR\n\r', {});
  await BluetoothEscposPrinter.printQRCode(
    'Hola demo',
    200,
    BluetoothEscposPrinter.ERROR_CORRECTION.L,
  );
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

export const setListDevicesArrayAction = (
  dispatch: React.Dispatch<QRDispatchTypes>,
  devices: DeviceBluetooth[],
) => {
  dispatch({
    type: SET_LIST_DEVICES,
    payload: devices,
  });
};
