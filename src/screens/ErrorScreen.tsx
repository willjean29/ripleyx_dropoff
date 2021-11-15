import React, {useContext, useEffect, useState} from 'react';
// import TicketSecuritySvg from 'assets/img/ticket_security.svg';
import ContentComponent from 'components/Layout/ContentComponent';
import AppLayout from 'layouts/AppLayout';
import ProgressBar from 'components/UI/ProgressBarComponent';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from 'navigation/StackNavigation';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors} from 'theme/GlobalThemes';
import {selectTicketContent} from 'utils/methods';
import {TicketContent} from 'interfaces/appInterface';
// import SVG
import TicketUsedSvg from 'assets/img/ticket_used.svg';
import TicketCanceledSvg from 'assets/img/ticket_canceled.svg';
import TicketElectroSvg from 'assets/img/ticket_electro.svg';
import TicketSecuritySvg from 'assets/img/ticket_security.svg';
import TicketWifiSvg from 'assets/img/wifi_error.svg';
import {TypeOfError} from 'utils/enums';
import {SvgProps} from 'react-native-svg';
import {Button} from 'react-native';

interface ErrorScreenProps
  extends StackScreenProps<StackParamList, 'ErrorScreen'> {}

const ErrorScreen: React.FC<ErrorScreenProps> = ({}) => {
  const [content, setContent] = useState<TicketContent>({} as TicketContent);
  const [resetAnimation, setResetAnimation] = useState(false);
  const {
    appState: {typeOfError},
  } = useContext(AppContext);

  useEffect(() => {
    if (typeOfError !== null) {
      const contentError = selectTicketContent(typeOfError);
      setContent(contentError);
    }
  }, []);
  const onPressDemo = (callback: Function) => {
    callback();
  };
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
          (typeOfError == TypeOfError.TICKET_CANCELED && TicketCanceledSvg) ||
          (typeOfError == TypeOfError.TICKET_WIFI && TicketWifiSvg) ||
          TicketCanceledSvg
        }
        title={content.title}
        message={content.message}
      />
      <Button
        title="Reset Anbimation"
        onPress={() => {
          setResetAnimation(!resetAnimation);
        }}
      />
      <ProgressBar
        backgroundColor={GlobalColors.background.paper}
        reset={resetAnimation}
      />
    </AppLayout>
  );
};

export default ErrorScreen;
