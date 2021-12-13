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

const PrinterScreen: React.FC<PrinterScreenProps> = () => {
  const {
    appState: {typeOfPrinter},
  } = useContext(AppContext);

  const [content, setContent] = useState({
    title: '',
    message1: '',
    message2: '',
  });

  const selectContent = (typeOfPrinter: TypeOfPrinter) => {
    const content = {
      title: '',
      message1: '',
      message2: '',
    };
    switch (typeOfPrinter) {
      case TypeOfPrinter.PRINTER_ERROR:
        content.title = '¡Ups! Algo falló al imprimir tu QR';
        content.message1 = 'Si este error se vuelve a repetir, por favor';
        content.message2 = 'llama a un personal de la tienda';
        break;
      case TypeOfPrinter.PRINTER_SUCCESS:
        content.title = '¡Impresión de QR exitosa!';
        content.message1 = 'Coloca el papel con tu QR dentro de la bolsa';
        content.message2 = 'junto con tus productos';
        break;
    }
    return content;
  };

  useEffect(() => {
    const contentPrinter = selectContent(typeOfPrinter);
    setContent(contentPrinter);
  }, []);

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
          message1={content.message1}
          message2={content.message2}
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
