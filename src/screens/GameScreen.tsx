import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';

export default function GameScreen() {
    const players = ['Gracz 1', 'Gracz 2', 'Gracz 3'];
    const [throws, setThrows] = useState<number[]>([]);
    const [lastTurnThrows, setLastTurnThrows] = useState<number[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [scores, setScores] = useState<number[]>(Array(players.length).fill(501));  //dla kazdego gracza 501 punktow na start
    const [roundSums, setRoundSums] = useState<number[]>(Array(players.length).fill(0)); //pamiec sumy na poczatku 0
    const [historySums, setHistorySums] = useState<number[]>(Array(players.length).fill(0)); //pamiec sumy z wczesniejszej tury

    const handleAddThrow = (points: number) => {
    if (throws.length < 3) {
      const newThrows = [...throws, points];
      setThrows(newThrows);

      const newScores = [...scores];
      newScores[activePlayerIndex] = newScores[activePlayerIndex] - points;
      setScores(newScores);

      const currentSum = newThrows.reduce((total, currentThrow) => total + currentThrow, 0); 
      const updatedRoundSums = [...roundSums];
      updatedRoundSums[activePlayerIndex] = currentSum;
      setRoundSums(updatedRoundSums);

      if (newThrows.length === 3) {
      setLastTurnThrows(newThrows); 

      setTimeout(() => {
        setThrows([]);
        const isLastPlayer = activePlayerIndex === players.length - 1;
        const nextPlayer = isLastPlayer ? 0 : activePlayerIndex + 1;
        if (nextPlayer === 0){
          setHistorySums([...roundSums]);
          setRoundSums(Array(players.length).fill(0));
        }
        setActivePlayerIndex(nextPlayer);
      }, 500);
    }
  }
  };
    
  const handleBackspace = () => {
  if (throws.length > 0) {
    setThrows(throws.slice(0, -1));

    const pointsToRemove = throws[throws.length - 1];

    const newScores = [...scores];
    newScores[activePlayerIndex] = newScores[activePlayerIndex] + pointsToRemove;
    setScores(newScores);

    const updatedRoundSums = [...roundSums];
    updatedRoundSums[activePlayerIndex] = updatedRoundSums[activePlayerIndex] - pointsToRemove;
    setRoundSums(updatedRoundSums);
    

  } else {
    const isFirstPlayer = activePlayerIndex === 0;
    const previousPlayer = isFirstPlayer ? players.length - 1 : activePlayerIndex - 1;
    
    const pointsToRemove = lastTurnThrows[lastTurnThrows.length - 1];

    const newScores = [...scores];
    newScores[previousPlayer] = newScores[previousPlayer] + pointsToRemove;
    setScores(newScores);

    const workingSums = isFirstPlayer ? [...historySums] : [...roundSums];
    workingSums[previousPlayer] = workingSums[previousPlayer] - pointsToRemove;
    setRoundSums(workingSums);

    setActivePlayerIndex(previousPlayer);
    setThrows(lastTurnThrows.slice(0, -1));
    setLastTurnThrows([]);
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: '#1e1e1e' }}>
      
      <ScrollView>
        {players.map((player, index) => {                //MAPA
        const isThisPlayerActive = index === activePlayerIndex;

  return (
    <PlayerCard 
      key={index}
      name={player} 
      score={scores[index]}  //przekazujemy akutalny wynik konkretnego gracza
      currentThrows={isThisPlayerActive ? throws : []}  //pokazujemy aktualne rzuty tylko dla aktywnego gracza
      isActive={isThisPlayerActive}  //podswietlamy aktywnego gracza
      sum={roundSums[index]}
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