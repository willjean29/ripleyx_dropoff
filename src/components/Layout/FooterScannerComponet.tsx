import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// custom import
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import ArrowDownSvg from 'assets/img/arrow_down.svg';
interface FooterScannerComponentProps {
  message: string;
}

const FooterScannerComponent: React.FC<FooterScannerComponentProps> = ({
  message,
}) => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.txtMessage}>{message}</Text>
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
