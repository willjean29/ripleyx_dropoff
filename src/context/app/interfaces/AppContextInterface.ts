import {AppStateI, Ticket} from './AppStateInterface';

export interface AppContextI {
  appState: AppStateI;
  readQr: (token: string) => Promise<void>;
  backHome: () => void;
  printerQr: () => void;
  changeTotalProducts: (total: number) => void;
  changeAnimation: (status: boolean) => void;
}
