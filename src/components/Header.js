import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Flag from './Flag'

const Header = props =>
    <View style = {styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity style={styles.flagButton} onPress={props.openSelection}>
                    <Flag bigger/>
                </TouchableOpacity>
                <Text style={styles.label}>= {props.flagsLeft}</Text>
            </View>
        <TouchableOpacity onPress={props.newGame} style={styles.button}>
            <Text style={styles.text}>New Game</Text>
        </TouchableOpacity>    
    </View> 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },
    button: {
        backgroundColor: '#222',
        padding: 10,

    },
    text: {
        fontSize: 20,
        color: '#ddd'
    },
    flagContainer: {
        flexDirection: 'row'
    },
    flagButton: {
        marginTop: 7,
        marginRight: 3,
        minWidth: 30,
    },
    label: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#222'
    }
})
export default Header;