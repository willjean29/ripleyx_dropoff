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
    appState: {ticketInfo, products, currentPrint, listDevices},
    setDeviceCurrent,
    setListDevices,
  } = useContext(AppContext);

  // console.log({currentPrint});
  console.log(JSON.stringify(listDevices, null, 3));
  console.log({listDevices});
  useEffect(() => {
    BluetoothManager.enableBluetooth().then(
      devices => {
        const listDevices: DeviceBluetooth[] = [];
        devices?.map(device => {
          const dv: DeviceBluetooth = JSON.parse(device);
          // console.log(dv);
          // if (listPrinters.map(printer => printer.mac).includes(dv.address)) {
          //   console.log('se encontro');
          //   setDeviceCurrent(dv);
          // }
          listDevices.push(dv);
        });
        setListDevices(listDevices);
      },
      err => {
        console.log(err);
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
