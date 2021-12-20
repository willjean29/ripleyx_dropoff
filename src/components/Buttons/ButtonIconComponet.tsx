import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {GlobalFont} from 'theme/GlobalThemes';
interface ButtonIconComponentProps {
  IconSvg: React.FC<SvgProps>;
  btnStyle?: ViewStyle;
  onPress: Function;
}

const ButtonIconComponent: React.FC<ButtonIconComponentProps> = ({
  IconSvg,
  btnStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, btnStyle]}
      onPress={() => onPress()}>
      <IconSvg width={44} height={32} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 90,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 40,
  },
  txtTitle: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: GlobalFont[600],
  },
});
export default ButtonIconComponent;
