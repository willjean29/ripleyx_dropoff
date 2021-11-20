import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'tp-react-native-bluetooth-printer';

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

  const printTextTest = (): void => {
    const textFooter =
      'COLOCA ESTE PAPEL JUNTO CON TUS PRODUCTOS DENTRO DE LA BOLSA DE DEVOLUCIONES';
    const textPrint = `
    <C>RIPLEY</C>\n
    <C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n
    <C>CALLE LAS BEGONIAS 545-577</C>\n
    <C>SAN ISIDRO - LIMA</C>\n
    <C>RUC 20337564373</C>\n
    <M>Nro Ticket\t\tT-001005</M>\n
    <M>Fec Devolución\t\t25/10/2021</M>\n
    <M>Cant Productos\t\t4</M>\n\n
    <M>${qr}</M>\n\n
    <C>${textFooter}</C>
    `;
    const defaultPrint =
      '<C>RIPLEY</C>\n<C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n<C>CALLE LAS BEGONIAS 545-577</C>\n<C>SAN ISIDRO - LIMA</C>\n<C>RUC 20337564373</C>\n';
    currentPrinter && BLEPrinter.printText(textPrint);
  };

  const connectPrinter = (printer: IBLEPrinter) => {
    //connect printer
    QRCode.toString('http://www.google.com', function (err, string) {
      if (err) throw err;
      setQr(string);
    });
    console.log('imprimir modo 1');
    setError('');
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error =>
        setError(JSON.stringify('Error al intentar establecer la conexión')),
    );

    printTextTest();
  };

  const [printers2, setPrinters2] = useState<DeviceBluetooth[]>([]);
  const [error2, setError2] = useState('');
  // modo 2
  useEffect(() => {
    BluetoothManager.enableBluetooth().then((devices: DeviceBluetooth[]) => {
      let listDevices: DeviceBluetooth[] = [];
      devices.map((device: DeviceBluetooth) => {
        const dv: DeviceBluetooth = JSON.parse(device as any);
        listDevices.push(dv);
      });
      setPrinters2(listDevices);
    });
  }, []);
  let options = {
    width: 40,
    height: 30,
    gap: 20,
    direction: BluetoothTscPrinter.DIRECTION.FORWARD,
    reference: [0, 0],
    tear: BluetoothTscPrinter.TEAR.ON,
    sound: 0,
    text: [
      {
        text: 'RIPLEY',
        x: 20,
        y: 0,
        fonttype: BluetoothTscPrinter.FONTTYPE.FONT_1,
        rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
        xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      },
      {
        text: 'TIENDAS POR DEPARTAMENTO RIPLEY S.A.',
        x: 20,
        y: 50,
        fonttype: BluetoothTscPrinter.FONTTYPE.FONT_1,
        rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
        xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      },
    ],
    qrcode: [
      {
        x: 20,
        y: 96,
        level: BluetoothTscPrinter.EEC.LEVEL_L,
        width: 3,
        rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
        code: 'Prueba de QR',
      },
    ],
  };
  const printerModo2 = async () => {
    BluetoothTscPrinter.printLabel(options).then(
      () => {
        //success
      },
      (err: any) => {
        //error
      },
    );
  };

  const connectDevice = (device: DeviceBluetooth) => {
    console.log('imprimir modo 2');
    setError2('');
    BluetoothManager.connect(device.address).then(
      () => {
        printerModo2();
      },
      (err: any) => {
        setError2('Error al conectar dispositivo');
      },
    );
    printerModo2();
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
      <Text style={styles.txtTitle}>Prueba de módulo PRINT ECS</Text>
      <Text>{error2}</Text>
      {printers2.map((printer: DeviceBluetooth, index: number) => (
        <TouchableOpacity
          style={styles.btnPrinter}
          key={index.toString()}
          onPress={() => {
            connectDevice(printer);
          }}>
          <Text style={styles.txtName}>{printer.name}</Text>
          <Text>{printer.address}</Text>
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
