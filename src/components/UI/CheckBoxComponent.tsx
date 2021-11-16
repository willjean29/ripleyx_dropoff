import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// custom import
import {GlobalColors} from 'theme/GlobalThemes';
import CheckMarkSvg from 'assets/img/check_mark.svg';

interface CheckBoxComponentProps {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({
  isChecked,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...styles.containerCheckBox,
        borderColor: isChecked
          ? GlobalColors.text.secondary
          : GlobalColors.text.primary,
        backgroundColor: isChecked
          ? GlobalColors.text.secondary
          : 'transparent',
      }}>
      <CheckMarkSvg height={25} width={25} fill={'#FFF'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCheckBox: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CheckBoxComponent;
