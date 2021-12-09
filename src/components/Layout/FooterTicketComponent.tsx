import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

// custom imports
import ButtonComponent from 'components/Buttons/ButtonComponent';
import ButtonOutlineComponent from 'components/Buttons/ButtonOutlineComponent';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors} from 'theme/GlobalThemes';

interface FooterTicketComponentProps {
  type?: 'primary' | 'secundary';
}

interface DeviceBluetooth {
  name: string;
  address: string;
}

const FooterTicketComponent: React.FC<FooterTicketComponentProps> = ({
  type = 'primary',
}) => {
  const {
    appState: {
      ticketInfo,
      returnedProducts,
      totalPorducts,
      currentPrint,
      token,
      listDevices,
    },
    backHome,
    printerQr,
  } = useContext(AppContext);
  const route = useRoute();
  // console.log(JSON.stringify(route, null, 3));

  return (
    <View
      style={{
        backgroundColor:
          type == 'primary'
            ? GlobalColors.text.secondary
            : GlobalColors.background.morita,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
      }}>
      <ButtonComponent
        title={
          route.name == 'PrinterScreen'
            ? 'Volver a imprimir QR'
            : 'Imprimir código QR'
        }
        fill={type}
        onPress={() => {
          ticketInfo &&
            totalPorducts !== 0 &&
            printerQr(
              {
                ticket_id: ticketInfo.ticket_id!,
                status: 36,
              },
              {
                order_id: parseInt(ticketInfo.order_id)!,
                products: returnedProducts,
              },
              listDevices,
              {
                ticket_id: ticketInfo.ticket_id,
                total_products: totalPorducts,
                token: token,
                date_returned: new Date(),
              },
            );
        }}
      />
      <ButtonOutlineComponent
        title="Escanear otro QR"
        fill={type}
        onPress={() => {
          backHome();
        }}
      />
    </View>
  );
};

export default FooterTicketComponent;
