import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  TextInput,
} from 'react-native';
import {DimensionsDevice} from 'utils/enums';
interface DemoScreenProps {}

const DemoScreen: React.FC<DemoScreenProps> = () => {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: 100,
      duration: 1000 * 10,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        title="Demo"
        onPress={() => {
          console.log('hola');
        }}
      />
      <TextInput placeholder="hola" />
      {/* <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: 'green',
        }}>
        <Animated.View
          style={{
            width: '100%',
            height: 20,
            backgroundColor: 'red',
            transform: [
              {
                scaleX: translate.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                }),
              },
            ],
          }}
        />
      </View> */}
    </View>
  );
};

export default DemoScreen;
