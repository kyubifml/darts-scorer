import { View, Text, StyleSheet, Button } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings screen skurwielu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //caly ekran
        justifyContent: 'center', //wszystko do dolu 
        alignItems: 'center',   //srodkowanie w pionie
        paddingBottom: 120.0, // odstep od dolu
    }
});