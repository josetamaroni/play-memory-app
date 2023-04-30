import React from 'react';
import { Pressable, Text, StyleSheet} from 'react-native';

export default function Cards({onPress, isTurnedOver, children}) {
    return ( 
        <Pressable 
            onPress={onPress}
            style={isTurnedOver ? stylesCard.cardUp : stylesCard.cardDown}>
            {
                (isTurnedOver)
                ? (<Text style={stylesCard.text}>{children}</Text>)
                :(<Text style={stylesCard.textDown}>?</Text>)
            }
        </Pressable>
     );
}

const stylesCard = StyleSheet.create({
    cardUp: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        borderColor: "#334155",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: "#1e293b"
    },
    cardDown: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 10,
        borderColor: "#334155",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: "#1e293b"
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        // fontSize: 46,
        // color: "#334155",
        color: "#fffa",

    },
    textDown: {
        fontSize: 46,
        color: "#334155"
    }
})