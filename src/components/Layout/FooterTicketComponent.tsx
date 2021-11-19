import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from 'tp-react-native-bluetooth-printer';
// custom imports
import ButtonComponent from 'components/Buttons/ButtonComponent';
import ButtonOutlineComponent from 'components/Buttons/ButtonOutlineComponent';
import {AppContext} from 'context/app/AppContext';
import {GlobalColors} from 'theme/GlobalThemes';

interface FooterTicketComponentProps {
  type?: 'primary' | 'secundary';
}

interface DeviceBluetooth {
  name: string;
  address: string;
}

const FooterTicketComponent: React.FC<FooterTicketComponentProps> = ({
  type = 'primary',
}) => {
  const {backHome, printerQr} = useContext(AppContext);
  const route = useRoute();
  // console.log(JSON.stringify(route, null, 3));
  const mac = '41:42:06:8C:00:CA';
  const checkBluetooth = () => {
    console.log('imprimir ticket');
    BluetoothManager.isBluetoothEnabled().then(
      (enabled: boolean) => {
        console.log(enabled); // enabled ==> true /false
        // BluetoothManager.enableBluetooth().then((r: DeviceBluetooth[]) => {
        //   r.map((device: DeviceBluetooth) => {
        //     const dv: DeviceBluetooth = JSON.parse(device as any);
        //     if (dv.address === mac) {
        //       console.log('se encontro devie');
        //       BluetoothManager.connect(dv.address).then((s: any) => {
        //         console.log(s);
        //       });
        //     }
        //   });
        // });
        BluetoothManager.connect(mac).then(
          (s: any) => {
            console.log(s);
          },
          (err: any) => {
            console.log('error' + err);
          },
        );
      },
      (err: any) => {
        console.log(JSON.stringify(err, null, 3));
      },
    );
  };
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
        title={
          route.name == 'PrinterScreen'
            ? 'Volver a imprimir QR'
            : 'Imprimir código QR'
        }
        fill={type}
        onPress={() => {
          checkBluetooth();
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
