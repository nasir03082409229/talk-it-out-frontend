import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native'
import GiphyModal from 'react-native-giphy-modal'
import Image from 'react-native-fast-image'

const App = () => {
    // ref
    const [url, setURL] = useState('')
    const giphyModalRef = useRef(null)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    giphyModalRef.current.show()
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Open Giphy Modal</Text>
            </TouchableOpacity>
            {url ? <Image
                resizeMode='contain'
                style={{ width: 200, height: 200, borderWidth: 1 }}
                source={{ uri: url }} /> : null}

            <GiphyModal
                ref={giphyModalRef}
                giphyApiKey={'8vpN8mMZcalln4d8DhkOrgNB4CBQOXey'}
                onSelectGif={(gifDetail) => {
                    setURL(gifDetail.images.original.url)

                }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#512DA8',
        fontSize: 18,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})

export default App