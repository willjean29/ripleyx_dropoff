import {TicketStatus} from 'interfaces/appInterface';
import TicketUsedSvg from 'assets/img/ticket_used.svg';
import TicketCanceledSvg from 'assets/img/ticket_canceled.svg';
import TicketElectroSvg from 'assets/img/ticket_electro.svg';
import TicketSecuritySvg from 'assets/img/ticket_security.svg';
import TicketWifiSvg from 'assets/img/wifi_error.svg';
import {TicketContent} from 'interfaces/AppInterface';
import {TypeOfError} from 'utils/enums';
import {Product, Ticket} from 'context/app/interfaces/AppStateInterface';

export const selectTicketContent = (typeOfError: TypeOfError) => {
  let ticketContent: TicketContent = {} as TicketContent;
  switch (typeOfError) {
    case TypeOfError.TICKET_USED:
      ticketContent.IconSvg = TicketUsedSvg;
      ticketContent.title = 'Tu ticket ya fue usado';
      ticketContent.message =
        'Los productos en este ticket ya fueron devueltos a la tienda';
      break;
    case TypeOfError.TICKET_SECURITY:
      ticketContent.IconSvg = TicketSecuritySvg;
      ticketContent.title = 'Tu ticket no fue validado por seguridad';
      ticketContent.message =
        'Acércate a un personal de seguridad o a la caja más cercana';
      break;
    case TypeOfError.TICKET_ELECTRO:
      ticketContent.IconSvg = TicketElectroSvg;
      ticketContent.title = 'Tu ticket contiene un producto Electro';
      ticketContent.message =
        'Acércate a la Zona Electro/Gran Volumen para devolver tu producto';
      break;
    case TypeOfError.TICKET_CANCELED_CLIENT:
      ticketContent.IconSvg = TicketCanceledSvg;
      ticketContent.title = 'Tu ticket fue anulado';
      ticketContent.message =
        'La solicitud N° T-001005 fue anulada por un personal de Ripley';
      break;
    case TypeOfError.TICKET_CANCELED_PERSONAL:
      ticketContent.IconSvg = TicketCanceledSvg;
      ticketContent.title = 'Tu ticket fue anulado';
      ticketContent.message =
        'La solicitud N° T-001005 fue anulada por el cliente que hizo la compra';
      break;
    case TypeOfError.TICKET_CANCELED:
      ticketContent.IconSvg = TicketCanceledSvg;
      ticketContent.title = 'No pudimos encontrar tu ticket';
      ticketContent.message =
        'Comunícate con un personal de tienda o dirígete a una caja para continuar tu devolución';
      break;
    case TypeOfError.TICKET_WIFI:
      ticketContent.IconSvg = TicketWifiSvg;
      ticketContent.title = 'No pudimos encontrar tu ticket';
      ticketContent.message =
        'Comunícate con un personal de tienda o dirígete a una caja para continuar tu devolución';
      break;
    default:
      break;
  }
  return ticketContent;
};

export const validateErrorTicket = (ticket: Ticket) => {
  let errorTicket: TypeOfError = TypeOfError.TICKET_NOT_ERROR;
  // validar ticket usado
  if (ticket.status_request === 6) {
    errorTicket = TypeOfError.TICKET_USED;
    return errorTicket;
  }
  // validar ticket cancelado (cliente o personal)
  // validar ticket por seguirdad
  // validar electro
  if (ticket.category_id === 3) {
    errorTicket = TypeOfError.TICKET_ELECTRO;
    return errorTicket;
  }
  return errorTicket;
};

export const calculateTotalProducts = (products: Product[]) => {
  let total = 0;
  products.map(product => {
    total += product.quantity_products_return;
  });
  return total;
};
