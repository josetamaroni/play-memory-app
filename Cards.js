import React from 'react';
import { Pressable, Text, StyleSheet} from 'react-native';

export default function Cards({onPress, isTurnedOver, children}) {
    return ( 
        <Pressable 
            onPress={onPress}
            style={isTurnedOver ? stylesCard.cardUp : stylesCard.cardDown}>
            {
                (isTurnedOver)
                ? (<Text style={stylesCard.textCards}>{children}</Text>)
                :(<Text style={stylesCard.textDown}>?</Text>)
            }
        </Pressable>
     );
}

const stylesCard = StyleSheet.create({
    cardUp: {
        width: 80,
        height: 80,
        margin: 10,
        borderWidth: 6,
        borderColor: "#334155",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: "#1e293b"
    },
    cardDown: {
        width: 80,
        height: 80,
        margin: 10,
        borderWidth: 6,
        borderColor: "#334155",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: "#1e293b"
    },
    textCards: {
        fontSize: 19,
        textAlign: 'center',
        color: "#fffa",
    },
    textDown: {
        fontSize: 45,
        color: "#334155"
    }
})