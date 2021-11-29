import {AppContext} from './AppContext';
import {AppStateI, Ticket} from './interfaces/AppStateInterface';
import AppReducer from './AppReducer';
import React, {useReducer} from 'react';
import {
  backHomeAction,
  changeAnimationAction,
  changeTotalProductsAction,
  printerQrAction,
  readQrAction,
  setTokenAction,
  setListDevicesAction,
  addProductsReturnedAction,
  deleteProductsReturnedAction,
} from './AppActions';
import {TypeOfPrinter} from 'utils/enums';
import {DeviceBluetooth} from 'interfaces/appInterface';
import {DetailTicketDto, StatusTicketDto} from './dtos/appDtos';
interface AppStateProps {
  children: React.ReactNode;
}

const AppState: React.FC<AppStateProps> = ({children}) => {
  const appInitialState: AppStateI = {
    isLoading: false,
    messageLoading: '',
    ticketStatus: 'init',
    token: '',
    ticketInfo: null,
    returnedProducts: [],
    products: [],
    totalPorducts: 0,
    error: false,
    typeOfError: null,
    printer: false,
    typeOfPrinter: TypeOfPrinter.PRINTER_ERROR,
    resetAnimation: false,
    currentPrint: null,
  };
  const [appState, dispatch] = useReducer(AppReducer, appInitialState);

  const readQr = (token: string) => readQrAction(dispatch, token);
  const backHome = () => backHomeAction(dispatch);
  const printerQr = (
    statusTicket: StatusTicketDto,
    detailTicket: DetailTicketDto,
  ) => printerQrAction(dispatch, statusTicket, detailTicket);
  const changeTotalProducts = (total: number) =>
    changeTotalProductsAction(dispatch, total);
  const changeAnimation = (status: boolean) =>
    changeAnimationAction(dispatch, status);
  const addProductReturned = (order_detail_id: number) =>
    addProductsReturnedAction(dispatch, order_detail_id);
  const deleteProductReturned = (order_detail_id: number) =>
    deleteProductsReturnedAction(dispatch, order_detail_id);
  const setToken = (token: string) => setTokenAction(dispatch, token);
  const setDeviceCurrent = (device: DeviceBluetooth) =>
    setListDevicesAction(dispatch, device);
  return (
    <AppContext.Provider
      value={{
        appState,
        readQr,
        backHome,
        printerQr,
        changeTotalProducts,
        changeAnimation,
        addProductReturned,
        deleteProductReturned,
        setToken,
        setDeviceCurrent,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
