import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';

export default function GameScreen() {
    const players = ['Gracz 1', 'Gracz 2'];
    const [throws, setThrows] = useState<number[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0); // 0 to Gracz 1, 1 to Gracz 2. Na start rzuca Gracz 1.

    const handleAddThrow = (points: number) => {
    if (throws.length < 3) {
      setThrows([...throws, points]);
    }
  };

  const handleBackspace = () => {
    setThrows(throws.slice(0, -1));
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#1e1e1e' }}>
      
      <ScrollView>
        {players.map((player, index) => {
  // Sprawdzamy, czy indeks tej karty to indeks aktywnego gracza
  const isThisPlayerActive = index === activePlayerIndex;

  return (
    <PlayerCard 
      key={index}
      name={player} 
      score={501} 
      // WARUNEK ? JEŚLI PRAWDA : JEŚLI FAŁSZ
      currentThrows={isThisPlayerActive ? throws : []} 
      isActive={isThisPlayerActive} 
    />
  );
})}
      </ScrollView>

      {<View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#ebe7e7' }}>
            
            <TouchableOpacity 
                onPress={() => handleAddThrow(20)} 
                style={{ padding: 15, backgroundColor: 'orange', borderRadius: 8 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Rzuć 20</Text>
            </TouchableOpacity>
    
            
            <TouchableOpacity 
                onPress={() => handleAddThrow(5)} 
                style={{ padding: 15, backgroundColor: 'orange', borderRadius: 8 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Rzuć 5</Text>
            </TouchableOpacity>
    
            
            <TouchableOpacity 
                onPress={handleBackspace} 
                style={{ padding: 15, backgroundColor: 'red', borderRadius: 8 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cofnij</Text>
            </TouchableOpacity>
    
        </View>}

    </View>
  );
}