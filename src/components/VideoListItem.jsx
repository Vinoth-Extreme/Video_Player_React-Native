import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native'
import {measures} from "../constants";

const VideoListItem = (props) => {
    const { navigation, ...videoProps } = props
    const {
        filename,
        uri,
        id,
        albumId,
        width,
        height,
        duration,
    } = videoProps

    return (
        <Pressable
            style={ss.container}
            onPress={() => navigation.navigate('Player', {
                video: videoProps
            })}
        >
            <View style={ss.LeftCol}>
                <View style={ss.img}>
                    <Text>V</Text>
                </View>
            </View>

            <View style={ss.rightCol}>
                <Text numOfLines={1}>{filename}</Text>
                <Text>{duration * 1000} millis</Text>
            </View>
        </Pressable>
    )
}

export default VideoListItem

const ss = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 20,
    },

    LeftCol: {
        height: '100%',
        paddingHorizontal: 10,
        marginVertical: 20,
    },

    img: {
        width: 100,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rightCol: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})