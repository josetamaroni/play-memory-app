import { useEffect, useState } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { shuffle } from './shuffle';
import { styles } from './styles';
import Cards from './Cards';
import { Menu } from './Menu';

const cards = [
  ["👀 Eyes","👃🏻 Nose"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry","😀 Smile"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry","😀 Smile","👟 Shoes"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry","😀 Smile","👑 Crown","🐶 Dog"],
  ["👀 Eyes","👃🏻 Nose","👄 Mouth","👂🏻 Ears","🦷 Teeth","👤 Head","😡 Angry","😀 Smile","🐮 Cow","🐭 Mouse","🐴 Horse"]
]

// npx expo start

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1962050593705179~1102530117';

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
    setScore(score + 1)
    setSelectedCards([...selectedCards,index]);
  }

  const didPlayerWin = () => matchedCards.length === board.length;

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        {/* <Text style={styles.title}>{ didPlayerWin() ? 'Congratulations 🎉' : 'Memory' }</Text> */}
        <Text style={styles.title}>Memory Game</Text>
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
        { didPlayerWin() && <Menu level={level} setLevel={setLevel} score={score} setScore={setScore} setMatchedCards={setMatchedCards} setSelectedCards={setSelectedCards} setBoard={setBoard} cards={cards} shuffle={shuffle}/> }
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />      
    </>
  );
}