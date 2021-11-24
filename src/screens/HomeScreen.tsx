import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from 'navigation/StackNavigation';
// custom import
import AppLayout from 'layouts/AppLayout';
import ColorBarComponent from 'components/UI/ColorBarComponent';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import BagSvg from 'assets/img/bag.svg';
import LogotipoSvg from 'assets/img/logotipo.svg';
interface HomeScreenProps
  extends StackScreenProps<StackParamList, 'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const tokenDefault =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiI0NjQ3MzE1NCIsInRpY2tldE51bWJlciI6IidULTAwMDMyOCciLCJpYXQiOjE2MzcyNzYwMjYsImV4cCI6MTY2ODgzMzYyNn0.izB3FvuDikeCDEk8pKDgyFN7hWNUR73CFeX5gf_hxOM';
  const [token, setToken] = useState(tokenDefault);
  const {readQr} = useContext(AppContext);
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
