import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {DimensionsDevice} from 'utils/enums';

// import {
//   BluetoothEscposPrinter,
//   BluetoothManager,
//   BluetoothTscPrinter,
// } from 'react-native-bluetooth-escpos-printer';

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'tp-react-native-bluetooth-printer';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

var {height, width} = Dimensions.get('window');
interface DemoScreenProps {}
interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}
type IBLEPrinterArray = IBLEPrinter[];

interface STATEPrinter {
  printers: IBLEPrinterArray;
  setPrinters: () => void;
}
const DemoScreen: React.FC<DemoScreenProps> = () => {
  const [printers, setPrinters] = useState<any>([]);
  const [currentPrinter, setCurrentPrinter]: any = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    BLEPrinter.init().then(() => {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }, []);

  const printTextTest = (): void => {
    currentPrinter &&
      BLEPrinter.printText(
        '<C>RIPLEY</C>\n<C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n<C>CALLE LAS BEGONIAS 545-577</C>\n<C>SAN ISIDRO - LIMA</C>\n<C>RUC 20337564373</C>\n',
      );
  };

  const _connectPrinter = (printer: IBLEPrinter) => {
    //connect printer
    setError('');
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error =>
        setError(JSON.stringify('Error al intentar establecer la conexión')),
    );

    printTextTest();
  };
  console.log(error);

  return (
    <ScrollView style={styles.container}>
      <Text>Prueba de Bluetooth</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  title: {
    width: width,
    backgroundColor: '#eee',
    color: '#232323',
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: 'left',
  },
  wtf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    textAlign: 'left',
  },
  address: {
    flex: 1,
    textAlign: 'right',
  },
});

export default DemoScreen;
