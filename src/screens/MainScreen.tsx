import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';


const styles = StyleSheet.create({
  container: {
    flex: 1, //caly ekran
    justifyContent: 'center', //wszystko do dolu 
    alignItems: 'center',   //srodkowanie w pionie
    paddingBottom: 120.0, // odstep od dolu
    backgroundColor: '#1e1e1e'
  }
});

export default function MainScreen({ navigation }: any) {
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['', '', '', '']);
  const [startingScore, setStartingScore] = useState(501);
  const [sets, setSets] = useState(1);
  const [legs, setLegs] = useState(3);
  const [checkIn, setCheckIn] = useState<'straight' | 'double' | 'master'>('straight');

  const handleNameChange = (text: string, index: number) => {
    const updated = [...names];
    updated[index] = text;
    setNames(updated)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, backgroundColor: '#1e1e1e' }}>
        <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
          Liczba graczy:
        </Text>
        {[1, 2, 3, 4].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => setPlayerCount(n)}
            style={{
              padding: 12,
              backgroundColor: playerCount === n ? 'orange' : '#333',
              borderRadius: 8,
              marginHorizontal: 4,
            }}
          >
            <Text style={{ color: 'white' }}>{n}</Text>
          </TouchableOpacity>
        ))}


        <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
          Punkty:
        </Text>
        {[101, 201, 301, 401, 501, 601, 701, 801, 901, 1001].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => setStartingScore(n)}
            style={{
              padding: 12,
              backgroundColor: startingScore === n ? 'orange' : '#333',
              borderRadius: 8,
              marginHorizontal: 4,
            }}
          >
            <Text style={{ color: 'white' }}>{n}</Text>
          </TouchableOpacity>
        ))}

      </View>
      <View style={{ flex: 1, alignItems: 'center', paddingVertical: 15, backgroundColor: '#1e1e1e' }}>
        <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
          Nazwy
        </Text>
      </View>
      {names.slice(0, playerCount).map((name, index) => {
        return (<TextInput
          key={index}
          value={name}
          onChangeText={(text) => handleNameChange(text, index)}
          placeholder={`Gracz ${index + 1}`}
        />);

      })}
      <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
        Sety:
      </Text>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <TouchableOpacity
          key={n}
          onPress={() => setSets(n)}
          style={{
            padding: 12,
            backgroundColor: sets === n ? 'orange' : '#333',
            borderRadius: 8,
            marginHorizontal: 4,
          }}
        >
          <Text style={{ color: 'white' }}>{n}</Text>
        </TouchableOpacity>
      ))}
      <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
        Legi:
      </Text>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <TouchableOpacity
          key={n}
          onPress={() => setLegs(n)}
          style={{
            padding: 12,
            backgroundColor: legs === n ? 'orange' : '#333',
            borderRadius: 8,
            marginHorizontal: 4,
          }}
        >
          <Text style={{ color: 'white' }}>{n}</Text>
        </TouchableOpacity>
      ))}
      <Text style={{ color: 'gray', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
        Punkty:
      </Text>
      {['straight', 'double', 'master'].map((n) => (
        <TouchableOpacity
          key={n}
          onPress={() => setCheckIn(n as 'straight' | 'double' | 'master')}
          style={{
            padding: 12,
            backgroundColor: checkIn === n ? 'orange' : '#333',
            borderRadius: 8,
            marginHorizontal: 4,
          }}
        >
          <Text style={{ color: 'white' }}>{n}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

