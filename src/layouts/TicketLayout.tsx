import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {DimensionsDevice} from 'utils/enums';
interface TicketLayoutProps {
  header: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
}
console.log(DimensionsDevice.HEIGHT_DEVICE);
console.log(DimensionsDevice.WIDTH_DEVICE);

const TicketLayout: React.FC<TicketLayoutProps> = ({header, main, footer}) => {
  return (
    <View style={styles.containerLayout}>
      {/* header */}
      <View style={styles.conatinerHeader}>{header}</View>
      {/* main */}
      <View style={{flex: 1}}>{main}</View>
      {/* footer */}
      <View style={styles.containerFooter}>{footer}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLayout: {
    flex: 1,
  },
  conatinerHeader: {
    height: DimensionsDevice.HEIGHT_DEVICE * 0.3,
  },
  containerFooter: {
    height: DimensionsDevice.HEIGHT_DEVICE * 0.2,
  },
});
export default TicketLayout;
