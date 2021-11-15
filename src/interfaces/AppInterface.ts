import {SvgProps} from 'react-native-svg';

export type TicketStatus =
  | 'ticket_used'
  | 'ticket_security'
  | 'ticket_electro'
  | 'ticket_canceled_client'
  | 'ticket_canceled_personal'
  | 'ticket_canceled'
  | 'ticket_canceled_wifi';

export interface TicketContent {
  IconSvg: React.FC<SvgProps>;
  title: string;
  message: string;
}
