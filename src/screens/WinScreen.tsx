import { View, Text, StyleSheet, Button } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1, //caly ekran
        justifyContent: 'center', //wszystko do srodka 
        alignItems: 'center',   //srodkowanie w pionie
        paddingBottom: 120.0, // odstep od dolu
    }
});

export default function WinScreen({ navigation, route }: any) {
    const { winner, winnerDarts, winnerPoints } = route.params
    return (
        <View style={styles.container}>
            <Text>Meczycho wygrał {winner}</Text>
            <Text>W {winnerDarts} rzutach</Text>
            <Text>Średnia na rzut {((winnerPoints / winnerDarts) * 3).toFixed(2)}</Text>
            <Button
                title="Go back"
                onPress={() => { navigation.navigate("Main"); }}
            />
        </View>
    );
}

