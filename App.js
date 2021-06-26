import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import { Video } from 'expo-av'

const { width, height } = Dimensions.get('window')

const App = () => {
    const videoRef = useRef(null)
    const [video, setVideo] = useState(null)
    const [isplaying, setisplaying] = useState(false)

    useEffect(() => {
        getVideos()
    }, [])

    const getVideos = async () => {
        await MediaLibrary.requestPermissionsAsync()
        await MediaLibrary.getAssetsAsync({
            mediaType: 'video',
        })
            .then(res => setVideo(res.assets[1]))
            .catch(e => console.log("Erro: ", e))
    }

    if(video !== null) {
        console.log(video)
    }

    const playPause = () => {
        setisplaying(old => !old)
    }

    return (
        <View style={ss.screen}>
            { video !== null ? (
                <View styles={ss.videoContainer}>
                    <View style={ss.playerScreen}>
                        <Video
                            ref={videoRef}
                            isLooping
                            source={{ uri: video.uri }}
                            shouldPlay={isplaying}
                            useNativeControls={true}
                            resizeMode={"contain"}
                            style={ss.video}
                        />
                    </View>
                    <Button
                        title={isplaying ? "Pause" : "play"}
                        onPress = {playPause}
                    />
                </View>
            ) : (
                <View>
                    <Text>No video</Text>
                </View>
            )}
        </View>
    )
}

const ss = StyleSheet.create({
    screen: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    },

    videoContainer: {
        width,
        height: 300,

    },

    playerScreen: {
        width,
        height: 200
    },

    video: {
        width: 320,
        height: 200,
    }
});

export default App;

// Needed form of the video object
// Object {
//         "creationTime": 1614860594263,
//         "duration": 93.422,
//         "filename": "VID_20210304_175139.mp4",
//         "height": 480,
//         "id": "304852",
//         "uri": "file:///storage/emulated/0/DCIM/Camera/VID_20210304_175139.mp4",
// },