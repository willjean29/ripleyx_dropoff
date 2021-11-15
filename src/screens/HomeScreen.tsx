import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import BagSvg from 'assets/img/bag.svg';
import LogotipoSvg from 'assets/img/logotipo.svg';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';

import AppLayout from 'layouts/AppLayout';
import ColorBarComponent from 'components/UI/ColorBarComponent';
import {StackParamList} from 'navigation/StackNavigation';

import {AppContext} from 'context/app/AppContext';
interface HomeScreenProps
  extends StackScreenProps<StackParamList, 'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const tokenDefault =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiI0NjQ3MzE1NCIsInRpY2tldE51bWJlciI6IidULTAwMDMyMiciLCJpYXQiOjE2MzYzOTY1ODEsImV4cCI6MTY2Nzk1NDE4MX0.90eg7sSvSxgUcuJr6Y_bxbeir6lIpnClKeXArEVt0fU';
  const [token, setToken] = useState(tokenDefault);
  const {
    appState: {ticketInfo},
    readQr,
  } = useContext(AppContext);
  console.log({ticketInfo});

  return (
    <AppLayout footerTitle="Escanea tu código QR en el lector de abajo">
      <>
        <ColorBarComponent />
        <View style={styles.containerLogo}>
          <BagSvg width={120} height={95} />
          <Text style={styles.txtTitle}>Te damos la bienvenida a </Text>
          <LogotipoSvg width={550} height={100} />
        </View>
        <ColorBarComponent />
        <Button
          title="Leer Ticket"
          onPress={() => {
            readQr(token);
            // navigation.navigate('TicketProductsScreen');
          }}
        />
      </>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: GlobalColors.background.morita,
  },
  txtTitle: {
    fontFamily: GlobalFont[400],
    color: GlobalColors.text.primary,
    fontSize: 44,
    marginVertical: 24,
  },
});

export default HomeScreen;
