import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from '../context/app/AppContext';
interface ProgressBarComponentProps {
  time?: number;
  backgroundColor?: string;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  time = 10,
  backgroundColor = GlobalColors.text.secondary_dark,
}) => {
  const translate = useRef(new Animated.Value(0)).current;
  const {backHome} = useContext(AppContext);
  const anim = useRef(
    Animated.timing(translate, {
      toValue: 100,
      duration: 1000 * time,
      useNativeDriver: true,
    }),
  ).current;
  useEffect(() => {
    // Animated.timing(translate, {
    //   toValue: 100,
    //   duration: 1000 * time,
    //   useNativeDriver: true,
    // }).start(({finished}) => {
    //   // disparar evento cuando termine el tiempo
    //   console.log({finished});
    //   if (finished) {
    //     backHome();
    //   }
    // });
    anim.start(({finished}) => {
      // disparar evento cuando termine el tiempo
      // console.log({finished});
      if (finished) {
        backHome();
      }
    });
  }, []);
  return (
    <View style={{backgroundColor}}>
      <Animated.View
        style={{
          ...styles.container,
          transform: [
            {
              scaleX: translate.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ],
        }}>
        <View style={styles.conatinerGradient}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              GlobalColors.alert.ripley,
              GlobalColors.alert.error,
              GlobalColors.alert.warning,
            ]}
            style={styles.linearGradient}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              GlobalColors.alert.warning,
              GlobalColors.alert.error,
              GlobalColors.alert.ripley,
            ]}
            style={styles.linearGradient}
          />
        </View>
      </Animated.View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
  },
  conatinerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    width: '50%',
    height: 8,
  },
});

export default ProgressBarComponent;
