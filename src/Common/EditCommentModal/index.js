import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../../Common";


const EditCommentModal = ({ value, onPressUpdateComment, onPressCancelEditComment }) => {
    const [comment, setComment] = useState('');
    useEffect(() => {
        setComment(value)
    }, [])



    return (
        <Modal animationType="fade" transparent={true} visible={true} >
            <View style={styles.modalView}>
                <View style={styles.verifyContainer}>
                    <Text style={styles.title}>Modify your comment</Text>
                    <View style={styles.codeInput}>
                        <TextInput value={comment} onChangeText={(text) => setComment(text)} />
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onPressCancelEditComment} style={{ marginRight: 5, flex: 1, justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10, backgroundColor: '#ccc' }}>
                            <Text style={{ color: '#FFF' }}>{'CANCEL'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressUpdateComment(comment)} style={{ marginLeft: 5, flex: 1, justifyContent: 'center', alignItems: 'center', height: 40, marginVertical: 10, backgroundColor: '#2979FF' }}>
                            <Text style={{ color: '#FFF' }}>{'UPDATE'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 19,
    },
    gradientBtn: {
        width: 160,
        height: 50,
    },
    buttonContainer: {
        flex: 1, flexDirection: 'row'
    },
    modalView: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 20,
        flex: 1,
        // alignSelf: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    codeInput: {
        // marginVertical: 30,
        borderWidth: .5,
        width: '100%'
    },
    btnTextStyle: {
        marginTop: 5
    },
    verifyContainer: {
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        borderRadius: 5,
        // borderColor: Colors.BLUE
    },
    iconContainer: { height: '35%' }
})

export default EditCommentModal;