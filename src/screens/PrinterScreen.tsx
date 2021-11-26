import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// custom import
import ProgressBarComponent from 'components/UI/ProgressBarComponent';
import FooterTicketComponent from 'components/Layout/FooterTicketComponent';
import ContentComponent from 'components/Layout/ContentComponent';
import {AppContext} from 'context/app/AppContext';
import {DimensionsDevice, TypeOfPrinter} from 'utils/enums';
import {GlobalColors} from 'theme/GlobalThemes';
import PrinterSuccessSvg from 'assets/img/printer_success.svg';
import PrinterError from 'assets/img/printer_error.svg';

interface PrinterScreenProps {}
interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}
const PrinterScreen: React.FC<PrinterScreenProps> = () => {
  const {
    appState: {typeOfPrinter},
  } = useContext(AppContext);

  const [content, setContent] = useState({
    title: '',
    message: '',
  });

  const selectContent = (typeOfPrinter: TypeOfPrinter) => {
    const content = {
      title: '',
      message: '',
    };
    switch (typeOfPrinter) {
      case TypeOfPrinter.PRINTER_ERROR:
        content.title = '¡Ups! Algo falló al imprimir tu QR';
        content.message =
          'Si este error se vuelve a repetir, por favor llama a un personal de la tienda';
        break;
      case TypeOfPrinter.PRINTER_SUCCESS:
        content.title = '¡Impresión de QR exitosa!';
        content.message =
          'Coloca el papel con tu QR dentro de la bolsa junto con tus productos';
        break;
    }
    return content;
  };

  // const [printers, setPrinters] = useState<any>([]);
  // const [currentPrinter, setCurrentPrinter]: any = useState();
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   BLEPrinter.init().then(() => {
  //     BLEPrinter.getDeviceList().then(setPrinters);
  //   });
  // }, []);

  // const printTextTest = (): void => {
  //   currentPrinter &&
  //     BLEPrinter.printText(
  //       '<C>RIPLEY</C>\n<C>TIENDAS POR DEPARTAMENTO RIPLEY S.A.</C>\n<C>CALLE LAS BEGONIAS 545-577</C>\n<C>SAN ISIDRO - LIMA</C>\n<C>RUC 20337564373</C>\n',
  //     );
  // };

  // const _connectPrinter = (printer: IBLEPrinter) => {
  //   //connect printer
  //   setError('');
  //   BLEPrinter.connectPrinter(printer.inner_mac_address).then(
  //     setCurrentPrinter,
  //     error =>
  //       setError(JSON.stringify('Error al intentar establecer la conexión')),
  //   );

  //   printTextTest();
  // };
  // console.log(error);

  // useEffect(() => {
  //   const contentPrinter = selectContent(typeOfPrinter);
  //   setContent(contentPrinter);
  // }, []);

  // useEffect(() => {
  //   BLEPrinter.init().then(() => {
  //     BLEPrinter.getDeviceList().then(setPrinters);
  //   });
  // }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ProgressBarComponent
          time={15}
          backgroundColor={
            typeOfPrinter == TypeOfPrinter.PRINTER_SUCCESS
              ? GlobalColors.text.secondary_dark
              : GlobalColors.background.paper
          }
        />
        <ContentComponent
          IconSvg={
            typeOfPrinter == TypeOfPrinter.PRINTER_SUCCESS
              ? PrinterSuccessSvg
              : PrinterError
          }
          title={content.title}
          message={content.message}
          type={
            typeOfPrinter == TypeOfPrinter.PRINTER_ERROR
              ? 'secundary'
              : 'primary'
          }
        />
      </View>
      <View style={{height: DimensionsDevice.HEIGHT_DEVICE * 0.22}}>
        <FooterTicketComponent
          type={
            typeOfPrinter == TypeOfPrinter.PRINTER_ERROR
              ? 'secundary'
              : 'primary'
          }
        />
      </View>
    </View>
  );
};

export default PrinterScreen;
