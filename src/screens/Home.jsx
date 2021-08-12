import React, { useState, useContext, useEffect } from 'react'
import {View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { VideoContext } from "../contexts/VideoProvider";
import { measures, colors } from "../constants";
import AlbumListItem from "../components/AlbumsListItem";

const Home = ({ navigation }) => {
    const {
        albums
    } = useContext(VideoContext)

    const renderItem = (item) => {
        return <AlbumListItem {...item.item} navigation={navigation} />
    }

    const ListEmptyComponent = () => {
        return <View style={ss.Loading}>
            <ActivityIndicator size={44} color={colors["black-50"]} />
        </View>
    }

    return (
        <View
            style={ss.screen}
        >
            <FlatList
                data={albums}
                renderItem={renderItem}
                ListEmptyComponent={ListEmptyComponent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Home

const ss = StyleSheet.create({
    screen: {
        width: '100%',
        height: measures["screen-height"],
        alignItems: 'center',
        justifyContent: 'center',
    },

    Loading: {
        width: measures["screen-width"],
        height: measures["screen-height"],
        alignItems: 'center',
        justifyContent: 'center',
    }
})