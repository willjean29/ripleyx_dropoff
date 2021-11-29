import {AppStateI, Ticket} from './AppStateInterface';
import {DeviceBluetooth} from 'interfaces/appInterface';
import {
  DetailTicketDto,
  StatusTicketDto,
  TicketPrintDto,
} from '../dtos/appDtos';
export interface AppContextI {
  appState: AppStateI;
  readQr: (token: string) => Promise<void>;
  backHome: () => void;
  printerQr: (
    statusTicket: StatusTicketDto,
    detailTicket: DetailTicketDto,
    printer: DeviceBluetooth,
    infoTicket: TicketPrintDto,
  ) => void;
  changeTotalProducts: (total: number) => void;
  changeAnimation: (status: boolean) => void;
  addProductReturned: (order_detail_id: number) => void;
  deleteProductReturned: (order_detail_id: number) => void;
  setToken: (token: string) => void;
  setDeviceCurrent: (device: DeviceBluetooth) => void;
}
