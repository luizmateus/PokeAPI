import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Home from './src/screens/Home';
import Pokemon from './src/screens/Pokemon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#3266AF" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3266AF',
          },
          headerTintColor: '#FFCC00',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          options={{ headerTitle: 'Pókemon' }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerTitle: 'Pókemon' }}
          name="Pokemon"
          component={Pokemon}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
