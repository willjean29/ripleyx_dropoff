import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import KeyEvent from 'react-native-keyevent';
import {StackParamList} from 'navigation/StackNavigation';
import jwt_decode from 'jwt-decode';
// custom import
import AppLayout from 'layouts/AppLayout';
import ColorBarComponent from 'components/UI/ColorBarComponent';
import {AppContext} from 'context/app/AppContext';
import useDebounceValue from 'hooks/useDebounceValue';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import BagSvg from 'assets/img/bag.svg';
import LogotipoSvg from 'assets/img/logotipo.svg';

interface HomeScreenProps
  extends StackScreenProps<StackParamList, 'HomeScreen'> {}
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // const tokenDefault =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3OTc0ODM2MDAsImRhdGEiOiJ7XCJkbmlcIjpcIjQxNTQ3NTI3XCIsXCJ0aWNrZXROdW1iZXJcIjpcIlQtMDAwMzE3XCJ9IiwiaWF0IjoxNjM5NjA0MzQ0fQ.ONzcHONzArMKOC5YktcNTlIl9g6ees9kYip5tgYLHDE';
  // const [token, setToken] = useState(tokenDefault);
  const [readInflaR, setReadInflaR] = useState('');
  const debouncedValue = useDebounceValue(readInflaR);
  const {readQr, setToken} = useContext(AppContext);

  let txtReaded = '';

  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent: any) => {
      console.log('1', keyEvent);
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
  // console.log(readInflaR);
  useEffect(() => {
    if (debouncedValue.split('.').length === 3) {
      console.log({debouncedValue: debouncedValue.trim()});
      setToken(debouncedValue.trim());
      readQr(debouncedValue.trim());
    }
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
        {/* <Text style={{fontSize: 25}}>TOKEN: {readInflaR}</Text> */}
        {/* <Button
          title="Leer Ticket"
          onPress={() => {
            // console.log('holaaa');
            setReadInflaR(tokenDefault);
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
