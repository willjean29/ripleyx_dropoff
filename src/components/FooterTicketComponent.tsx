import {AppContext} from 'context/app/AppContext';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {GlobalColors} from 'theme/GlobalThemes';
import ButtonComponent from './ButtonComponent';
import ButtonOutlineComponent from './ButtonOutlineComponent';

interface FooterTicketComponentProps {
  type?: 'primary' | 'secundary';
}

const FooterTicketComponent: React.FC<FooterTicketComponentProps> = ({
  type = 'primary',
}) => {
  const {backHome, printerQr} = useContext(AppContext);
  const navigation = useNavigation();
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
        title="Imprimir código QR"
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
