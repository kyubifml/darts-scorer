import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
=======
import { NavigationContainer } from '@react-navigation/native'; //nawigacja 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen'; //importowanie ekranu glownego
import GameScreen from './src/screens/GameScreen'; //importowanie ekranu gry


const Stack = createNativeStackNavigator(); 


export default function App() { //glowna funkcja aplikacji
  return (
    <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="Game" component={GameScreen} />
  </Stack.Navigator>
</NavigationContainer>
  )
>>>>>>> 1de9272 (GameScreen, logika tur, etykiety graczy)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
