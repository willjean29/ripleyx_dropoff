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
// custom import
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';

export type ButtonFill = 'primary' | 'secundary' | ' disabled';

interface ButtonComponentProps {
  title: string;
  fill?: ButtonFill;
  btnStyle?: ViewStyle;
  txtStyle?: TextStyle;
  onPress: Function;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  fill = 'primary',
  btnStyle,
  txtStyle,
  onPress,
}) => {
  const containerStyle: ViewStyle = {};
  const textStyle: TextStyle = {};
  switch (fill) {
    case 'primary':
      containerStyle.backgroundColor = GlobalColors.background.paper;
      textStyle.color = GlobalColors.text.secondary;
      break;
    case 'secundary':
      containerStyle.backgroundColor = GlobalColors.text.secondary;
      textStyle.color = GlobalColors.background.paper;
      break;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, containerStyle, btnStyle]}
      onPress={() => onPress()}>
      <Text style={[styles.txtTitle, textStyle, txtStyle]}>{title}</Text>
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

export default ButtonComponent;
