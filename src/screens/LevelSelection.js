import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';

export default props =>
    <Modal onRequestClose={props.onCancel}
        visible={props.isVisible} animationType='slide'
        transparent={true}>
        <View style={styles.frame}>
            <View style={styles.container}>
                <Text style={styles.title}>Select level</Text>
                <TouchableOpacity style={[styles.button, styles.bgEasy]} 
                onPress={() => props.levelSelect(0.1)}>
                    <Text style={styles.label}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.bgMedium]} 
                onPress={() => props.levelSelect(0.2)}>
                    <Text style={styles.label}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.bgHard]} 
                onPress={() => props.levelSelect(0.3)}>
                    <Text style={styles.label}>Hard</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
    },  
    bgEasy: {
        backgroundColor: '#3f5',
    },
    bgMedium: {
        backgroundColor: '#db1',
    },
    bgHard: {
        backgroundColor: '#c11',
    },
    label: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        color: '#222',
        fontSize: 40,
        fontWeight: 'bold',
    },
})