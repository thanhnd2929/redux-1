import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ModalComp = (props) => {
  return (
    <Modal
    visible={props.visible}
    transparent={true}
    animationType='fade'
    onRequestClose={props.onRequestClose}
>
    <View style={styles.modalOverlay}>
        <View style={styles.modalContainer} >
            <Text style={styles.modalTitle}>{props.modalTitle}</Text>

       
            {props.children}
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={props.onClosePress} style={[styles.button, { backgroundColor: '#FD7278' }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onSavePress} style={[styles.button, { backgroundColor: 'lightblue' }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default ModalComp

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        elevation: 5,
        shadowColor: 'black',
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FD7278'
    },
    txtStatus: {
        marginHorizontal: 10,
        fontSize: 20,
        color: 'black'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10
    }
})