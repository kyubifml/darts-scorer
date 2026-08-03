import { View, Text, StyleSheet } from 'react-native';

interface PlayerCardProps {
  name: string;
  score: number;
  currentThrows: number[];
  isActive: boolean;
  sum: number;
  leg: number;
  set: number;
  matchPoints: number;
  matchDarts: number;
}

export default function PlayerCard({ name, score, currentThrows, isActive, sum, leg, set, matchDarts, matchPoints }: PlayerCardProps) {
  const average = matchDarts === 0 ? 0 : (matchPoints / matchDarts) * 3;
  return (
    <View style={[
      styles.playerCard,
      {
        borderLeftWidth: 8,
        borderLeftColor: isActive ? '#4ade80' : 'transparent'
      }
    ]}>

      <View style={styles.leftColumn}>
        <Text style={styles.points}>{score}</Text>
        <Text style={styles.playerName}>{name}</Text>
      </View>

      <View style={styles.middleColumn}>
        <View style={styles.inputsRow}>
          {[0, 1, 2].map((index) => (
            <View key={index} style={styles.input}>
              <Text style={styles.throwText}>
                {currentThrows[index]}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.sum}>{sum}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.rightColumnContainings}>Średnia: {average.toFixed(2)}</Text>
        <Text style={styles.rightColumnContainings}>Sety: {set} Legi: {leg}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  playerCard: {
    height: 110,
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleColumn: {
    flex: 1.5,
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  points: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  sum: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 40,
    height: 40,
    marginHorizontal: 5,
    // Dodano wyśrodkowanie tekstu wewnątrz kwadratu w pionie
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  throwText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  rightColumnContainings: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  }
});