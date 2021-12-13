import React, {useContext, useEffect, useState} from 'react';
import {Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from 'navigation/StackNavigation';
// custom import
import AppLayout from 'layouts/AppLayout';
import ProgressBar from 'components/UI/ProgressBarComponent';
import ContentComponent from 'components/Layout/ContentComponent';
import {AppContext} from 'context/app/AppContext';
import {TicketContent} from 'interfaces/appInterface';
import {selectTicketContent} from 'utils/methods';
import {GlobalColors} from 'theme/GlobalThemes';
// import SVG
import TicketUsedSvg from 'assets/img/ticket_used.svg';
import TicketCanceledSvg from 'assets/img/ticket_canceled.svg';
import TicketElectroSvg from 'assets/img/ticket_electro.svg';
import TicketSecuritySvg from 'assets/img/ticket_security.svg';
import TicketWifiSvg from 'assets/img/wifi_error.svg';
import TicketNotFound from 'assets/img/ticket_not_found.svg';
import {TypeOfError} from 'utils/enums';

interface ErrorScreenProps
  extends StackScreenProps<StackParamList, 'ErrorScreen'> {}

const ErrorScreen: React.FC<ErrorScreenProps> = ({}) => {
  const [content, setContent] = useState<TicketContent>({} as TicketContent);
  const {
    appState: {typeOfError, ticketId},
  } = useContext(AppContext);

  useEffect(() => {
    if (typeOfError !== null) {
      const contentError = selectTicketContent(typeOfError, ticketId);
      setContent(contentError);
    }
  }, []);

  return (
    <AppLayout footerTitle="Escanear otro código QR">
      <ContentComponent
        IconSvg={
          (typeOfError == TypeOfError.TICKET_USED && TicketUsedSvg) ||
          (typeOfError == TypeOfError.TICKET_SECURITY && TicketSecuritySvg) ||
          (typeOfError == TypeOfError.TICKET_ELECTRO && TicketElectroSvg) ||
          (typeOfError == TypeOfError.TICKET_CANCELED_CLIENT &&
            TicketCanceledSvg) ||
          (typeOfError == TypeOfError.TICKET_CANCELED_PERSONAL &&
            TicketCanceledSvg) ||
          (typeOfError == TypeOfError.TICKET_CANCELED && TicketNotFound) ||
          (typeOfError == TypeOfError.TICKET_WIFI && TicketWifiSvg) ||
          TicketCanceledSvg
        }
        title={content.title}
        message1={content.message1}
        message2={content.message2}
      />
      <ProgressBar backgroundColor={GlobalColors.background.paper} />
    </AppLayout>
  );
};

export default ErrorScreen;
