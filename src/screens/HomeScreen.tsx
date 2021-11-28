import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import KeyEvent from 'react-native-keyevent';
import {StackParamList} from 'navigation/StackNavigation';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from '@brooons/react-native-bluetooth-escpos-printer';
// custom import
import AppLayout from 'layouts/AppLayout';
import ColorBarComponent from 'components/UI/ColorBarComponent';
import {AppContext} from 'context/app/AppContext';
import useDebounceValue from 'hooks/useDebounceValue';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import BagSvg from 'assets/img/bag.svg';
import LogotipoSvg from 'assets/img/logotipo.svg';
import {DeviceBluetooth} from 'interfaces/appInterface';
interface HomeScreenProps
  extends StackScreenProps<StackParamList, 'HomeScreen'> {}
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // const tokenDefault =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiI0NjQ3MzE1NCIsInRpY2tldE51bWJlciI6IidULTAwMDMyMiciLCJpYXQiOjE2MzYzOTY1ODEsImV4cCI6MTY2Nzk1NDE4MX0.90eg7sSvSxgUcuJr6Y_bxbeir6lIpnClKeXArEVt0fU';
  // const [token, setToken] = useState(tokenDefault);
  const [readInflaR, setReadInflaR] = useState('');
  const debouncedValue = useDebounceValue(readInflaR);
  const {
    appState: {ticketInfo},
    readQr,
    setToken,
  } = useContext(AppContext);
  console.log({ticketInfo});

  let txtReaded = '';
  let resp = '';
  // console.log(JSON.stringify(appState, null, 3));

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent: any) => {
      // console.log('1', keyEvent);
      if (keyEvent.keyCode == 66) return;
      console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      // console.log(`Action: ${keyEvent.action}`);
      // console.log(`Key: ${keyEvent.pressedKey}`);
      txtReaded += String(keyEvent.pressedKey);
      setReadInflaR(`${String(txtReaded)}`);
    });

    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);
  console.log(readInflaR);
  useEffect(() => {
    if (debouncedValue.split('.').length === 3) {
      console.log({debouncedValue: debouncedValue.trim()});
      setToken(debouncedValue.trim());
      readQr(debouncedValue.trim());
    }
    // if (readInflaR.length !== 0) {
    //   console.log({readInflaR});
    //   readQr(readInflaR);
    // }
    // return () => {
    //   setReadInflaR('');
    // };
  }, [debouncedValue]);

  useEffect(() => {
    BluetoothManager.enableBluetooth().then(
      devices => {
        let listDevice: DeviceBluetooth[] = [];
        devices?.map(device => {
          const dv: DeviceBluetooth = JSON.parse(device);
          listDevice.push(dv);
        });
        // setPrinters2(listDevice);
      },
      err => {
        //  alert(err)
      },
    );
  }, []);

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
        {/* <Button
          title="Leer Ticket"
          onPress={() => {
            readQr(token);
          }}
        /> */}
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
