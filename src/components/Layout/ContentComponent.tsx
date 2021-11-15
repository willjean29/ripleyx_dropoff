import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
interface ContentComponentProps {
  IconSvg: React.FC<SvgProps>;
  title: string;
  message: string;
  type?: 'primary' | 'secundary';
}

const ContentComponent: React.FC<ContentComponentProps> = ({
  IconSvg,
  title,
  message,
  type = 'secundary',
}) => {
  const backgroundColor =
    type == 'primary'
      ? GlobalColors.text.secondary
      : GlobalColors.background.morita;
  const color =
    type == 'primary'
      ? GlobalColors.text.negative
      : GlobalColors.text.secondary;
  return (
    <View
      style={{
        ...styles.containerContent,
        backgroundColor,
      }}>
      <IconSvg width={192} height={192} />

      <Text style={{...styles.txtTitle, color}}>{title}</Text>
      <View style={{borderWidth: 0, paddingHorizontal: '22%'}}>
        <Text style={{...styles.txtMessage, color}}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.background.morita,
  },
  txtTitle: {
    fontFamily: GlobalFont[600],
    color: GlobalColors.text.secondary_dark,
    fontSize: 48,
    marginVertical: 24,
  },
  txtMessage: {
    fontFamily: GlobalFont[400],
    color: GlobalColors.text.secondary_dark,
    fontSize: 36,
    textAlign: 'center',
    lineHeight: 54,
  },
});

export default ContentComponent;
