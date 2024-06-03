import { StrictMode } from 'react';

import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Route } from './Route';
import LoginScreen from '../presentation/login/LoginScreen';
import HomeScreen from '../presentation/home/HomeScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import ViewModelProvider from './ViewModelProvider';
import AppBar from '../presentation/_components/appbar/AppBar';

const Stack = createNativeStackNavigator<Route>();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    "primary": "rgb(88, 112, 134)",
  }
}

const App = function(): React.JSX.Element {
  return (
    <StrictMode>
      <RootSiblingParent>
        <PaperProvider theme={Theme}>
          <NavigationContainer>
              <ViewModelProvider>
                <Stack.Navigator 
                  screenOptions={{
                    header: (props) => <AppBar {...props}/>,
                  }}
                  initialRouteName="Login" >
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
                </ViewModelProvider>
          </NavigationContainer>
        </PaperProvider>
      </RootSiblingParent>
    </StrictMode>
  )
};

export default App