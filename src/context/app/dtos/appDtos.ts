import {OrderDetail} from '../interfaces/AppStateInterface';

export interface StatusTicketDto {
  ticket_id: string;
  status: number;
}

export interface DetailTicketDto {
  order_id: number;
  products: OrderDetail[];
}

export interface TicketPrintDto {
  ticket_id: string;
  total_products: number;
  token: string;
  date_returned: Date;
}
