import React, {useRef} from 'react';
import {Animated} from 'react-native';

const useAnimationScale = (time: number) => {
  const scale = useRef(new Animated.Value(0)).current;

  const animation = useRef(
    Animated.timing(scale, {
      toValue: 100,
      duration: 1000 * time,
      useNativeDriver: true,
    }),
  ).current;

  const scaleInterpolate = scale.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
  });

  const scaleX = (callback?: Function) => {
    animation.start(({finished}) => {
      if (finished) {
        callback && callback();
      }
    });
  };

  return {scaleInterpolate, animation, scaleX};
};

export default useAnimationScale;
