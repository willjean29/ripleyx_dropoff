import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// custom import
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import ArrowDownSvg from 'assets/img/arrow_down.svg';
import ButtonComponent from 'components/Buttons/ButtonComponent';
import {AppContext} from 'context/app/AppContext';
import {TypeOfError} from 'utils/enums';
interface FooterScannerComponentProps {
  message: string;
}

const FooterScannerComponent: React.FC<FooterScannerComponentProps> = ({
  message,
}) => {
  const {
    appState: {typeOfError},
    loadKeyboard,
  } = useContext(AppContext);

  return (
    <View style={styles.conatiner}>
      {typeOfError == TypeOfError.TICKET_CANCELED && (
        <ButtonComponent
          title="Ingresa tu número de ticket"
          btnStyle={{
            justifyContent: 'center',
            height: 72,
            padding: 8,
            marginHorizontal: 0,
            paddingHorizontal: 64,
            flex: 0,
            marginVertical: 24,
            borderRadius: 16,
          }}
          txtStyle={{
            fontSize: 32,
          }}
          onPress={() => {
            loadKeyboard();
          }}
        />
      )}

      <Text
        style={{
          ...styles.txtMessage,
          fontSize: typeOfError == TypeOfError.TICKET_CANCELED ? 32 : 40,
        }}>
        {message}
      </Text>
      <View style={styles.conatinerSvg}>
        <ArrowDownSvg width={56} height={56} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: GlobalColors.text.secondary_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMessage: {
    fontSize: 40,
    fontFamily: GlobalFont[500],
    color: GlobalColors.text.negative,
  },
  conatinerSvg: {
    marginVertical: 24,
  },
});

export default FooterScannerComponent;
