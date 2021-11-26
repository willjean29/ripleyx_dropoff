import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {
//   USBPrinter,
//   NetPrinter,
//   BLEPrinter,
// } from 'react-native-thermal-receipt-printer';

import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer-image-qr';
import QRCode from 'qrcode';
interface ExampleScreenProps {}

interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}
interface DeviceBluetooth {
  name: string;
  address: string;
}
const ExampleScreen: React.FC<ExampleScreenProps> = () => {
  // modo 1
  const [printers, setPrinters] = useState<any>([]);
  const [currentPrinter, setCurrentPrinter]: any = useState();
  const [error, setError] = useState('');
  const [qr, setQr] = useState('');
  useEffect(() => {
    BLEPrinter.init().then(() => {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }, []);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbmkiOiI0NjQ3MzE1NCIsInRpY2tldE51bWJlciI6IidULTAwMDMwMSciLCJpYXQiOjE2MzcyNzYwMjYsImV4cCI6MTY2ODgzMzYyNn0.bmMERFh-xFwWI8u5pWpF7SvwNwyX7n4BV00LjPUapyE';
  const printTextTest = (): void => {
    const textFooter =
      '<C>\n\nCOLOCA ESTE PAPEL JUNTO CON TUS PRODUCTOS DENTRO DE LA BOLSA DE DEVOLUCIONES</C>';
    const textPrint = `<C>RIPLEY</C>\n<C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n<C>CALLE LAS BEGONIAS 545-577</C>\n<C>SAN ISIDRO - LIMA</C>\n<C>RUC 20337564373</C>\n<M>Nro Ticket\tT-001005</M>\n<M>Fec Devolución\t25/10/2021</M>\n<M>Cant Productos\t4</M>\n\n`;
    const defaultPrint =
      '<C>RIPLEY</C>\n<C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n<C>CALLE LAS BEGONIAS 545-577</C>\n<C>SAN ISIDRO - LIMA</C>\n<C>RUC 20337564373</C>\n';
    // currentPrinter && BLEPrinter.printText(textPrint);
    if (currentPrinter) {
      BLEPrinter.printText(textPrint);
      BLEPrinter.printQrCode(token);
      BLEPrinter.printText(textFooter);
    }
  };

  const connectPrinter = (printer: IBLEPrinter) => {
    //connect printer
    console.log('imprimir modo 1');
    setError('');
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      (error: any) =>
        setError(JSON.stringify('Error al intentar establecer la conexión')),
    );

    printTextTest();
  };

  return (
    <ScrollView style={{flex: 1, margin: 10}}>
      <Text style={styles.txtTitle}>Prueba de Impresora </Text>
      <Text style={styles.txtTitle}>Prueba de módulo BLT</Text>
      <Text>{error}</Text>
      {printers.map((printer: IBLEPrinter, index: number) => (
        <TouchableOpacity
          style={styles.btnPrinter}
          key={index.toString()}
          onPress={() => {
            connectPrinter(printer);
          }}>
          <Text style={styles.txtName}>{printer.device_name}</Text>
          <Text>{printer.inner_mac_address}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: 28,
    color: '#000',
    marginBottom: 20,
  },
  btnPrinter: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  txtName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExampleScreen;
