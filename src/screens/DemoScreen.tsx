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
