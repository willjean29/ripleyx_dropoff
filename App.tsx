import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from 'navigation/StackNavigation';
import AppState from 'context/app/AppState';
import {LogBox, StatusBar} from 'react-native';

// Ignore log notification by message:
// LogBox.ignoreLogs(['Warning: ...']);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <AppState>
      <StatusBar hidden />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
