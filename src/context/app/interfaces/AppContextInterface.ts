import {DetailTicketDto, StatusTicketDto} from '../dtos/appDtos';
import {AppStateI, Ticket} from './AppStateInterface';

export interface AppContextI {
  appState: AppStateI;
  readQr: (token: string) => Promise<void>;
  backHome: () => void;
  printerQr: (
    statusTicket: StatusTicketDto,
    detailTicket: DetailTicketDto,
  ) => void;
  changeTotalProducts: (total: number) => void;
  changeAnimation: (status: boolean) => void;
  addProductReturned: (order_detail_id: number) => void;
  deleteProductReturned: (order_detail_id: number) => void;
  resetState: () => void;
}
