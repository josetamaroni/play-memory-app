import React from 'react';
import { Button, Text, View } from 'react-native';
import { styles } from './styles';
import { shuffle } from './shuffle';

export const Menu = ({level,setLevel,score,setScore,setMatchedCards,setSelectedCards,setBoard,cards}) => {
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
        <View style={ styles.menu}>
            <Text style={styles.titleMenu}>Congratulations 🎉</Text>
            <Text style={styles.subTitleMenu}>Level: {level+1} Score: {score}</Text>
            <Button title='Reset' onPress={ resetGame }/>
            <View style={styles.containerBtn}><View style={styles.btn}><Button title='Previous Level' onPress={prevLevel} /></View><View style={styles.btn}><Button title='Next Level' onPress={nextLevel} /></View></View>
        </View>
    )
}
