import ButtonComponent from 'components/Buttons/ButtonComponent';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BtnDelete from 'assets/img/btn_delete.svg';
import ButtonIconComponent from 'components/Buttons/ButtonIconComponet';
interface KeyboardVirtualComponentProps {
  addCode: (value: string) => void;
  deleteCode: () => void;
}

const KeyboardVirtualComponent: React.FC<KeyboardVirtualComponentProps> = ({
  addCode,
  deleteCode,
}) => {
  const numbersKeyboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      {numbersKeyboard.map((item, index) => (
        <ButtonComponent
          key={index.toString()}
          title={item.toString()}
          btnStyle={styles.btnCalc}
          txtStyle={{
            fontSize: 48,
          }}
          onPress={() => addCode(item.toString())}
        />
      ))}
      <ButtonComponent
        title={`0`}
        btnStyle={{
          ...styles.btnCalc,
          width: 250,
        }}
        txtStyle={{
          fontSize: 48,
        }}
        onPress={() => addCode('0')}
      />
      <ButtonIconComponent
        IconSvg={BtnDelete}
        btnStyle={{
          ...styles.btnCalc,
          backgroundColor: '#F15B5B',
        }}
        onPress={() => {
          deleteCode();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '30%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnCalc: {
    padding: 12,
    width: 120,
    borderRadius: 16,
    justifyContent: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    flex: 0,
  },
});

export default KeyboardVirtualComponent;
