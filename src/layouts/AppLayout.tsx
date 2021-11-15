import FooterScannerComponent from 'components/Layout/FooterScannerComponet';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DimensionsDevice} from 'utils/enums';
interface AppLayoutProps {
  children: React.ReactNode;
  footerTitle: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({children, footerTitle}) => {
  return (
    <View style={styles.conatinerLayout}>
      <View style={styles.containerMain}>{children}</View>
      <View style={{flex: 1}}>
        <FooterScannerComponent message={footerTitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatinerLayout: {
    flex: 1,
  },
  containerMain: {
    height: DimensionsDevice.HEIGHT_DEVICE * 0.7,
  },
});

export default AppLayout;
