import React, { useState, useContext } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { VideoContext } from "../contexts/VideoProvider";
import {colors, measures} from "../constants";

const AlbumListItem = (props) => {
    const {
        id,
        title,
        videos,
        assetCount,
        type,
        navigation
    } = props

    return (
        <Pressable
            style={ss.container}
            android_ripple={{
                color: 'rgba(0, 0, 0, 0.5)',
                borderless: false,
                radius: 1000,
            }}
            onPress={() => {
                    const { navigation, ...album } = props
                    navigation.navigate('Videos', {
                        album
                    }
                )}}
        >
            <View style={ss.topLine}>
                <Text style={ss.title}>{title}</Text>
                <Text>Options</Text>
            </View>

            <View style={ss.bottomLine}>
                <Text style={ss.count}>Videos ({videos.length})</Text>
            </View>
        </Pressable>
    )
}

export default AlbumListItem

const ss = StyleSheet.create({
    container: {
        width: measures["screen-width"] - 50,
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginVertical: 20,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-between'
    },

    topLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 40,
        lineHeight: 50,
        color: colors["purple-100"]
    },

    count: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        lineHeight: 30,
        color: colors["black-50"]
    },
})

// Object {
//     "index": 4,
//     "item": Object {
//          "assetCount" : 14,
//          "id" : "-1366619224",
//          "title" : "Restored",
//          "type" : null,
//          "videos" : Array []
//     }
// }