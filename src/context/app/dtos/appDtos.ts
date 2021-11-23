import {OrderDetail} from '../interfaces/AppStateInterface';

export interface StatusTicketDto {
  ticket_id: string;
  status: number;
}

export interface DetailTicketDto {
  order_id: number;
  products: OrderDetail[];
}
