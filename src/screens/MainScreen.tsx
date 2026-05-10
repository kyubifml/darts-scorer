import { View, Text, StyleSheet, Button } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1, //caly ekran
        justifyContent: 'center', //wszystko do dolu 
        alignItems: 'center',   //srodkowanie w pionie
        paddingBottom: 120.0, // odstep od dolu
    }
});

export default function MainScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Main screen skurwiele</Text>
      <Button
        title="Play game"
        onPress={() => {navigation.navigate('Game');}} 
      />
    </View>
  );
}

