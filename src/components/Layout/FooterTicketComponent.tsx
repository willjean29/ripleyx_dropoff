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

const FooterTicketComponent: React.FC<FooterTicketComponentProps> = ({
  type = 'primary',
}) => {
  const {backHome, printerQr} = useContext(AppContext);
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
          printerQr();
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
