import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cards from './Cards';

const cards = [
  ["👀 Eyes","👃🏻 Nose"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry","😀 Smile"]
]

// npx expo start
export default function App() {

  const [level,setLevel] = useState(0);
  const [board,setBoard] = useState(()=> shuffle([...cards[level],...cards[level]]));
  const [selectedCards,setSelectedCards] = useState([]);
  const [matchedCards,setMatchedCards] = useState([]);
  const [score,setScore] = useState(0);

  useEffect(() => {
    if(selectedCards.length < 2) return;
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards,...selectedCards]);
      setSelectedCards([]);
    }else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards])

  const handleTapCard = (index) => {
    if( selectedCards.length >= 2 || selectedCards.includes(index)) return; 
    setSelectedCards([...selectedCards,index]);
    setScore(score + 1)
  }

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setLevel(0);
    setBoard(shuffle([...cards[0],...cards[0]]));
  }
  const nextLevel = () => {
    let levelAux = ( level === cards.length-1 ) ? 0 : level+1;
    setLevel(levelAux);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setBoard(shuffle([...cards[levelAux],...cards[levelAux]]));
  }

  const prevLevel = () => {
    let levelAux = ( level === 0 ) ? 0 : level-1;
    setLevel(levelAux);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setBoard(shuffle([...cards[levelAux],...cards[levelAux]]));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>{ didPlayerWin() ? 'Congratulations 🎉' : 'Memory' }</Text>
      <Text style={styles.subtitle}>Level: { level+1 } Score: {score}</Text>
      <View style={styles.board}>
        {
          board.map((card, index) => {
            const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index);
            return <Cards
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={()=> handleTapCard(index)}
            >{card}</Cards>
          })
        }
      </View>
      { didPlayerWin() && <Button title='Reset' onPress={ resetGame }/> }
      { didPlayerWin() && (<View style={styles.containerBtn}><View style={styles.btn}><Button title='Previous Level' onPress={prevLevel} /></View><View style={styles.btn}><Button title='Next Level' onPress={nextLevel} /></View></View>) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // marginHorizontal: 60
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900'
  },
  subtitle:{
    fontSize: 20,
    color: '#FFFFFF'
  },
  containerBtn: {
    flexDirection: 'row'
  },
  btn: {
    margin: 5
  }
});

// Funcion para desordenar las cartas y duplicarlas
function shuffle(array) {
  for(let i = array.length -1; i>0; i--){
    const randomIndex = Math.floor(Math.random()*(i+1));
    [array[i], array[randomIndex]] = [array[randomIndex],array[i]];
  }
  return array;
}