import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppContext} from 'context/app/AppContext';
import HomeScreen from 'screens/HomeScreen';
import ErrorScreen from 'screens/ErrorScreen';
import LoadingScreen from 'screens/LoadingScreen';
import DemoScreen from 'screens/DemoScreen';
import TicketProductsScreen from 'screens/TicketProductsScreen';
import PrinterScreen from 'screens/PrinterScreen';
import ExampleScreen from 'screens/ExampleScreen';
import KeyBoardTicketScreen from 'screens/KeyBoardTicketScreen';
export type StackParamList = {
  DemoScreen: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  ErrorScreen: undefined;
  TicketProductsScreen: undefined;
  PrinterScreen: undefined;
  ExampleScreen: undefined;
  KeyBoardTicketScreen: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

const Stack = createStackNavigator<StackParamList>();

interface StackNavigationProps {}

const StackNavigation: React.FC<StackNavigationProps> = () => {
  const {
    appState: {isLoading, ticketInfo, error, printer, keyboard},
  } = useContext(AppContext);

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {ticketInfo == null ? (
        <>
          {/* no hay un ticket activo */}
          {keyboard && (
            <Stack.Screen
              name="KeyBoardTicketScreen"
              component={KeyBoardTicketScreen}
            />
          )}
          {error && <Stack.Screen name="ErrorScreen" component={ErrorScreen} />}
          {/* <Stack.Screen name="ExampleScreen" component={ExampleScreen} /> */}
          {/* <Stack.Screen
            name="KeyBoardTicketScreen"
            component={KeyBoardTicketScreen}
          /> */}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      ) : (
        <>
          {/* hay un ticket activo */}
          {printer && (
            <Stack.Screen name="PrinterScreen" component={PrinterScreen} />
          )}
          <Stack.Screen
            name="TicketProductsScreen"
            component={TicketProductsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
