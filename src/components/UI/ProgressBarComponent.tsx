import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {useRoute} from '@react-navigation/native';
// custom import
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from 'context/app/AppContext';
import useAnimationScale from 'hooks/useAnimationScale';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import ButtonComponent from 'components/Buttons/ButtonComponent';
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
  const [timeText, setTimeText] = useState<number>(time);
  const route = useRoute();
  console.log(route);
  useEffect(() => {
    animation.reset();
    setTimeText(time);
    scaleX(() => {
      console.log('final de la animación');
      backHome();
    });
    const timer = setInterval(() => {
      if (timeText == 0) {
        clearInterval(timer);
      }
      setTimeText(value => value - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [reset]);

  return (
    <View style={{backgroundColor}}>
      <ButtonComponent
        title={timeText.toString()}
        // btnStyle={styles.btnCounter}
        btnStyle={
          route.name == 'TicketProductsScreen'
            ? {...styles.btnCounter, ...styles.btnCounterTicket}
            : styles.btnCounter
        }
        txtStyle={{
          fontSize: 28,
        }}
        onPress={() => {}}
      />
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
  btnCounter: {
    position: 'absolute',
    backgroundColor: GlobalColors.alert.warning,
    padding: 0,
    height: 48,
    width: 48,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    left: '45%',
    right: '45%',
    flex: 0,
    top: -25,
    zIndex: 9999,
  },
  btnCounterTicket: {
    top: -2,
    zIndex: 0,
    borderRadius: 0,
    borderBottomLeftRadius: 64,
    borderBottomRightRadius: 64,
  },
});

export default ProgressBarComponent;
