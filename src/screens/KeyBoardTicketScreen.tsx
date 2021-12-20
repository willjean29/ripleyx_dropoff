import ButtonComponent from 'components/Buttons/ButtonComponent';
import KeyboardVirtualComponent from 'components/Keyboard/KeyboardVirtualComponent';
import TextInputCodeComponent from 'components/Keyboard/TextInputCodeComponent';
import useInputCode from 'hooks/useInputCode';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Keyboard, TextInput} from 'react-native';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import {DimensionsDevice} from 'utils/enums';

interface KeyBoardTicketScreenProps {}

const KeyBoardTicketScreen: React.FC<KeyBoardTicketScreenProps> = () => {
  const {arrayRef, arrayValue, addCode, deleteCode} = useInputCode();
  // console.log(arrayRef);
  // console.log(arrayValue);
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 42,
          }}>
          <Text style={styles.txtTitle}>Ingresa tu número de ticket</Text>
          <View
            style={{
              marginVertical: 24,
              flexDirection: 'row',
              alignItems: 'center',
              // borderWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 72,
                color: GlobalColors.background.paper,
                fontFamily: GlobalFont[600],
                top: -5,
              }}>
              T -{' '}
            </Text>
            <TextInputCodeComponent
              arrayRef={arrayRef}
              arrayValue={arrayValue}
            />
          </View>
          <Text style={styles.txtSubTitle}>
            o escanea el código QR en el lector de abajo
          </Text>
        </View>
      </View>
      <View style={styles.containerMain}>
        <KeyboardVirtualComponent addCode={addCode} deleteCode={deleteCode} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
  },
  containerHeader: {
    height: DimensionsDevice.HEIGHT_DEVICE * 0.4,
    backgroundColor: GlobalColors.text.secondary,
  },
  txtTitle: {
    fontSize: 40,
    color: GlobalColors.background.paper,
    fontFamily: GlobalFont[600],
  },
  txtSubTitle: {
    fontSize: 28,
    color: GlobalColors.alert.warning,
    fontFamily: GlobalFont[600],
  },
  containerMain: {
    flex: 1,
    backgroundColor: GlobalColors.text.secondary_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyBoardTicketScreen;
