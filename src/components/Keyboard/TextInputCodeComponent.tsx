import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';

interface TextInputCodeComponentProps {
  arrayRef: React.MutableRefObject<TextInput | undefined>[];
  arrayValue: string[];
}

const TextInputCodeComponent: React.FC<TextInputCodeComponentProps> = ({
  arrayRef,
  arrayValue,
}) => {
  const maxLengthInput = [1, 2, 3, 4, 5, 6];

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {maxLengthInput.map((item, index) => (
        <TextInput
          key={index.toString()}
          ref={e => (arrayRef[index].current = e!)}
          showSoftInputOnFocus={false}
          maxLength={1}
          value={arrayValue[index] ? arrayValue[index] : ''}
          editable={false}
          selectionColor={'#fff'}
          style={styles.inputCode}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputCode: {
    borderRadius: 24,
    backgroundColor: '#8843A5',
    width: 96,
    height: 96,
    fontSize: 72,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 5,
    color: GlobalColors.background.paper,
    fontFamily: GlobalFont[600],
    textDecorationLine: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default TextInputCodeComponent;
