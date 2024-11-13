import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    },
    menu: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#334155',
        borderRadius: 25
    },
    titleMenu:{
        color: '#334155',
        fontSize: 30,
        fontWeight: '900',
        paddingBottom: 10
    },
    subTitleMenu: {
        fontSize: 20,
        color: '#334155',
        fontWeight: 900,
        padding: 5
    }
});