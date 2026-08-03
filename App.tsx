import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native'; //nawigacja 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen'; //importowanie ekranu glownego
import GameScreen from './src/screens/GameScreen'; //importowanie ekranu gry
import WinScreen from './src/screens/WinScreen'; //importowanie ekranu wygranej

const Stack = createNativeStackNavigator();


export default function App() { //glowna funkcja aplikacji
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Win" component={WinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
