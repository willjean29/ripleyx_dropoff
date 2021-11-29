import React, {useContext, useEffect, useState} from 'react';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from '@brooons/react-native-bluetooth-escpos-printer';
// custom import
import TicketLayout from 'layouts/TicketLayout';
import HeaderTicketComponent from 'components/Layout/HeaderTicketComponent';
import FooterTicketComponent from 'components/Layout/FooterTicketComponent';
import TicketProductsComponent from 'components/TicketProduct/TicketProductsComponent';
import {AppContext} from 'context/app/AppContext';
import {DeviceBluetooth} from 'interfaces/appInterface';
import {listMacsPrint} from 'utils/enums';

interface TicketProductsScreenProps {}

const TicketProductsScreen: React.FC<TicketProductsScreenProps> = () => {
  const {
    appState: {ticketInfo, products, currentPrint},
    setDeviceCurrent,
  } = useContext(AppContext);
  // console.log(ticketInfo, products);
  console.log({currentPrint});
  useEffect(() => {
    BluetoothManager.enableBluetooth().then(
      devices => {
        // let listDevice: DeviceBluetooth[] = [];
        devices?.map(device => {
          const dv: DeviceBluetooth = JSON.parse(device);
          console.log(dv);
          if (listMacsPrint.includes(dv.address)) {
            console.log('se encontro');
            setDeviceCurrent(dv);
          }
        });
        // setPrinters2(listDevice);
      },
      err => {
        //  alert(err)
      },
    );
  }, []);
  return (
    <TicketLayout
      header={<HeaderTicketComponent ticket={ticketInfo!} />}
      main={<TicketProductsComponent products={products} />}
      footer={<FooterTicketComponent />}
    />
  );
};

export default TicketProductsScreen;
