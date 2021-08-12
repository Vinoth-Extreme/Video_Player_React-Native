import React, { useLayoutEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import VideoListItem from '../components/VideoListItem'

const Videos = ({ route, navigation }) => {
    const {
        id,
        title,
        type,
        assetCount,
        videos
    } = route.params.album

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    }, [navigation])

    const renderItem = (video) => {
        // console.log(video)
        return <VideoListItem navigation={navigation} {...video.item} />
    }

    const keyExtractor = (item, index) => index

    return (
        <FlatList
            data={videos}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    )
}

export default Videos