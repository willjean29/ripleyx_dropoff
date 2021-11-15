import {AppContext} from './AppContext';
import {AppStateI, Ticket} from './interfaces/AppStateInterface';
import AppReducer from './AppReducer';
import React, {useReducer} from 'react';
import {
  backHomeAction,
  changeTotalProductsAction,
  printerQrAction,
  readQrAction,
} from './AppActions';
import {TypeOfPrinter} from 'utils/enums';
interface AppStateProps {
  children: React.ReactNode;
}

const AppState: React.FC<AppStateProps> = ({children}) => {
  const appInitialState: AppStateI = {
    isLoading: false,
    messageLoading: '',
    ticketStatus: 'init',
    ticketInfo: null,
    products: [],
    totalPorducts: 0,
    error: false,
    typeOfError: null,
    printer: false,
    typeOfPrinter: TypeOfPrinter.PRINTER_ERROR,
  };
  const [appState, dispatch] = useReducer(AppReducer, appInitialState);

  const readQr = (token: string) => readQrAction(dispatch, token);
  const backHome = () => backHomeAction(dispatch);
  const printerQr = () => printerQrAction(dispatch);
  const changeTotalProducts = (total: number) =>
    changeTotalProductsAction(dispatch, total);

  return (
    <AppContext.Provider
      value={{appState, readQr, backHome, printerQr, changeTotalProducts}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
