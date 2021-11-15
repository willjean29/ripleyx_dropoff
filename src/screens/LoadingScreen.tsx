import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GlobalColors, GlobalFont} from 'theme/GlobalThemes';
import {Circle} from 'react-native-animated-spinkit';
import {StackParamList} from 'navigation/StackNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {AppContext} from 'context/app/AppContext';
interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = ({}) => {
  const {
    appState: {messageLoading},
  } = useContext(AppContext);
  return (
    <View style={styles.containerLoading}>
      <Circle color={GlobalColors.alert.warning} size={192} />
      <Text style={styles.txtTitle}>{messageLoading}</Text>
      <Text style={styles.txtMessage}>Un momento por favor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    backgroundColor: GlobalColors.text.secondary_dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    color: GlobalColors.text.negative,
    fontSize: 48,
    fontFamily: GlobalFont[600],
    marginVertical: 48,
  },
  txtMessage: {
    color: GlobalColors.text.negative,
    fontSize: 36,
    fontFamily: GlobalFont[400],
  },
});

export default LoadingScreen;
