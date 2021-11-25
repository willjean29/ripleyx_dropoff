import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import KeyEvent from 'react-native-keyevent';
import {StackParamList} from 'navigation/StackNavigation';
// custom import
import AppLayout from 'layouts/AppLayout';
import ColorBarComponent from 'components/UI/ColorBarComponent';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import BagSvg from 'assets/img/bag.svg';
import LogotipoSvg from 'assets/img/logotipo.svg';
import useDebounceValue from 'hooks/useDebounceValue';
interface HomeScreenProps
  extends StackScreenProps<StackParamList, 'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const tokenDefault =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiI0NjQ3MzE1NCIsInRpY2tldE51bWJlciI6IidULTAwMDMwMiciLCJpYXQiOjE2MzcyNzYwMjYsImV4cCI6MTY2ODgzMzYyNn0.GPZgQR_pQoUECRqAH7QY6YZzAok5mPakUmP2vfDjUEY';
  const [token, setToken] = useState(tokenDefault);
  const [readInflaR, setReadInflaR] = useState('');
  const debouncedValue = useDebounceValue(readInflaR);
  const {appState, readQr, resetState} = useContext(AppContext);

  let txtReaded = '';
  let resp = '';
  console.log(JSON.stringify(appState, null, 3));

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent: any) => {
      // console.log('1', keyEvent);
      // console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
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
      console.log({debouncedValue});
      readQr(debouncedValue);
    }
    // if (readInflaR.length !== 0) {
    //   console.log({readInflaR});
    //   readQr(readInflaR);
    // }
    // return () => {
    //   setReadInflaR('');
    // };
  }, [debouncedValue]);
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
        <Text style={{fontSize: 28}}>Infrarojo:{readInflaR}</Text>
        <Button
          title="Leer Ticket"
          onPress={() => {
            readQr(token);
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
