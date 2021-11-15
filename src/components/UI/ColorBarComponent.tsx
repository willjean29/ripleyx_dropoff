import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ColorBar from 'assets/img/color_bar.png';
import {DimensionsDevice} from 'utils/enums';
interface ColorBarComponentProps {}

const ColorBarComponent: React.FC<ColorBarComponentProps> = () => {
  return (
    <View>
      <Image
        source={ColorBar}
        style={{
          width: DimensionsDevice.WIDTH_DEVICE,
          height: 24,
        }}
      />
    </View>
  );
};

export default ColorBarComponent;
