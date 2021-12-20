import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
// custom import
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from 'context/app/AppContext';
import useAnimationScale from 'hooks/useAnimationScale';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
interface ProgressBarComponentProps {
  time?: number;
  backgroundColor?: string;
  reset?: boolean;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
  time = 15,
  backgroundColor = GlobalColors.text.secondary_dark,
  reset = false,
}) => {
  const {animation, scaleInterpolate, scaleX} = useAnimationScale(time);
  const {backHome} = useContext(AppContext);
  // console.log(time);
  useEffect(() => {
    animation.reset();
    scaleX(() => {
      console.log('final de la animación');
      backHome();
    });
  }, [reset]);

  return (
    <View style={{backgroundColor}}>
      <Animated.View
        style={{
          ...styles.container,
          transform: [
            {
              scaleX: scaleInterpolate,
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
