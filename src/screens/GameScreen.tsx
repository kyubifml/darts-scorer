import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { act, useState } from 'react';
import PlayerCard from '../components/ui/PlayerCard';

const PLAYERS = ['Gracz 1', 'Gracz 2', 'Gracz 3'];
const STARTING_SCORE = 60;
const BUTTON_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 0]; 
interface GameSnapshot {
  scores: number[];
  activePlayerIndex: number;
  legs: number[];
  sets: number[];
  matchDarts: number[];
  matchPoints: number[];
  roundThrows: number[][];
  roundSums: number[];
}

export default function GameScreen() {
    const [roundThrows, setRoundThrows] = useState<number[][]>(Array.from({ length: PLAYERS.length }, () => [])); 
    //const [historyThrows, setHistoryThrows] = useState<number[][]>(Array.from({ length: PLAYERS.length }, () => []));

    const [activePlayerIndex, setActivePlayerIndex] = useState(0);

    const [scores, setScores] = useState<number[]>(Array(PLAYERS.length).fill(STARTING_SCORE));  //dla kazdego gracza STARTING_SCORE punktow na start
    //const [historyScores, setHistoryScores] = useState<number[]>(Array(PLAYERS.length).fill(STARTING_SCORE)); // ale to bez znaczenia w zasadzie bo po 1 ruchu i tak przypisze wartosc scores

    const [roundSums, setRoundSums] = useState<number[]>(Array(PLAYERS.length).fill(0)); //pamiec sumy na poczatku 0
    //const [historySums, setHistorySums] = useState<number[]>(Array(PLAYERS.length).fill(0)); //pamiec sumy z wczesniejszej tury

    //const [winner, setWinner] = useState<string | null>(null);
    const [historyStack, setHistoryStack] = useState<GameSnapshot[]>([]);

    const [legs, setLegs] = useState<number[]>(Array(PLAYERS.length).fill(0)); 
    const [sets, setSets] = useState<number[]>(Array(PLAYERS.length).fill(0)); 

    const [matchPoints, setMatchPoints] = useState<number[]>(Array(PLAYERS.length).fill(0));
    const [matchDarts, setMatchDarts] = useState<number[]>(Array(PLAYERS.length).fill(0));
    const [multiplier, setMultiplier] = useState(1);

    const handleAddThrow = (points: number) => {
    if (roundThrows[activePlayerIndex].length < 3) { //liczba rzutow

      const currentSnapshot = {
        scores: [...scores],
        activePlayerIndex: activePlayerIndex,
        legs: [...legs],
        sets: [...sets],
        matchDarts: [...matchDarts],
        matchPoints: [...matchPoints],
        roundThrows: roundThrows.map(arr => [...arr]),
        roundSums: [...roundSums],
      };
      setHistoryStack([...historyStack, currentSnapshot]);
      const actualPoints = points * multiplier;
      setMultiplier(1);

      const newMatchPoints = [...matchPoints];
      newMatchPoints[activePlayerIndex] += actualPoints;
      setMatchPoints(newMatchPoints);

      const newMatchDarts = [...matchDarts];
      newMatchDarts[activePlayerIndex] +=1;
      setMatchDarts(newMatchDarts);

      const updatedRoundThrows=[...roundThrows];
      updatedRoundThrows[activePlayerIndex] = [...updatedRoundThrows[activePlayerIndex],actualPoints];
      setRoundThrows(updatedRoundThrows);

      const newScores = [...scores];
      newScores[activePlayerIndex] -= actualPoints;
      if (newScores[activePlayerIndex] === 0 && multiplier === 2) {
          setScores(newScores);
          const newLegs = [...legs];
          newLegs[activePlayerIndex] += 1;
          setLegs(newLegs);
          setRoundSums(Array(PLAYERS.length).fill(0));
          setRoundThrows(Array.from({ length: PLAYERS.length }, () => []));
          setScores(Array(PLAYERS.length).fill(STARTING_SCORE));
          
            if(newLegs[activePlayerIndex] === 3){
              const newSets = [...sets];
              newSets[activePlayerIndex] +=1;
              setSets(newSets);
              setLegs(Array(PLAYERS.length).fill(0));
            }
          return;
      }
      else if(newScores[activePlayerIndex] === 1 || newScores[activePlayerIndex] < 0 ||(newScores[activePlayerIndex] === 0 && multiplier !== 2) ){
          const revertedScores = [...scores];
          revertedScores[activePlayerIndex] = scores[activePlayerIndex] + roundSums[activePlayerIndex];
          setScores(revertedScores);
          
          setTimeout(() => {
          const resetSums = [...roundSums];
          resetSums[activePlayerIndex] = 0;
          
          const resetThrows = [...updatedRoundThrows];
          resetThrows[activePlayerIndex] = [];

          const isLastPlayer = activePlayerIndex === PLAYERS.length - 1;
          const nextPlayer = isLastPlayer ? 0 : activePlayerIndex + 1;

        if (nextPlayer === 0){
          setRoundSums(Array(PLAYERS.length).fill(0));
          setRoundThrows(Array.from({ length: PLAYERS.length }, () => []));
        }
        else{
          setRoundSums(resetSums);
          setRoundThrows(resetThrows);
        }
        setActivePlayerIndex(nextPlayer);
      }, 500);
      }
      else{  
    setScores(newScores);

    const currentSum = updatedRoundThrows[activePlayerIndex].reduce((total, currentThrow) => total + currentThrow, 0); 
    const updatedRoundSums = [...roundSums];
    updatedRoundSums[activePlayerIndex] = currentSum;
    setRoundSums(updatedRoundSums);

      if (updatedRoundThrows[activePlayerIndex].length === 3) {
      
        setTimeout(() => {
        const isLastPlayer = activePlayerIndex === PLAYERS.length - 1;
        const nextPlayer = isLastPlayer ? 0 : activePlayerIndex + 1;

        if (nextPlayer === 0){
          setRoundSums(Array(PLAYERS.length).fill(0));
          setRoundThrows(Array.from({ length: PLAYERS.length }, () => []));
        }
        setActivePlayerIndex(nextPlayer);
      }, 100);
    }
  }     
  }
  };
    
  const handleBackspace = () => {
 if(historyStack.length === 0){
      return;
    }
    else{
      const lastSnapshot = historyStack[historyStack.length - 1];
      const newSnapshot = historyStack.slice(0, -1);
      setHistoryStack(newSnapshot);

      setScores(lastSnapshot.scores);
      setActivePlayerIndex(lastSnapshot.activePlayerIndex);
      setLegs(lastSnapshot.legs);
      setSets(lastSnapshot.sets);
      setMatchDarts(lastSnapshot.matchDarts);
      setMatchPoints(lastSnapshot.matchPoints);
      setRoundSums(lastSnapshot.roundSums);
      setRoundThrows(lastSnapshot.roundThrows);
    }
};

  return (
    <View style={{ flex: 1, backgroundColor: '#1e1e1e' }}>
      
      <ScrollView>
        {PLAYERS.map((player, index) => {                //MAPA
        const isThisPlayerActive = index === activePlayerIndex;

  return (
    <PlayerCard 
      key={index}
      name={player} 
      score={scores[index]}  //przekazujemy akutalny wynik konkretnego gracza
      currentThrows= {roundThrows[index]}  //pokazujemy aktualne rzuty tylko dla aktywnego gracza
      isActive={isThisPlayerActive}  //podswietlamy aktywnego gracza
      sum={roundSums[index]}
      leg={legs[index]}
      set={sets[index]}
      matchPoints={matchPoints[index]}
      matchDarts={matchDarts[index]}
    />
  );
})}
      </ScrollView>
      
      <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-around', padding: 20, backgroundColor: '#ebe7e7' }}>
            {BUTTON_VALUES.map((points) =>{
              if (multiplier === 3 && points == 25){
                return null;
              }
              return(
              <TouchableOpacity
                key={points}
                onPress={() => handleAddThrow(points)} 
                style={{margin: 1, padding: 15, backgroundColor: 'orange', borderRadius: 8 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{points}</Text>
            </TouchableOpacity>
          );
        })
          }
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ebe7e7', paddingBottom: 15 }}>
          
          <TouchableOpacity 
              onPress={() => setMultiplier(multiplier === 2 ? 1 : 2)} 
              style={{ marginHorizontal: 10, padding: 15, backgroundColor: multiplier === 2 ? '#4ade80' : 'gray', borderRadius: 8, minWidth: 100, alignItems: 'center' }}
          >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>DOUBLE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              onPress={() => setMultiplier(multiplier === 3 ? 1 : 3)} 
              style={{ marginHorizontal: 10, padding: 15, backgroundColor: multiplier === 3 ? '#4ade80' : 'gray', borderRadius: 8, minWidth: 100, alignItems: 'center' }}
          >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>TREBLE</Text>
          </TouchableOpacity>
      </View>
            <TouchableOpacity 
                onPress={handleBackspace} 
                style={{ padding: 15, backgroundColor: 'red', borderRadius: 8 }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cofnij</Text>
            </TouchableOpacity>
    
        </View>

    </View>
  );
}