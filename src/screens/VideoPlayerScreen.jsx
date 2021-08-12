import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native'
import { colors, HumanizeMillis } from '../constants'
import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
    Octicons
} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import {AVPlaybackStatusToSet} from "expo-av/build/Video";

// Orientation values
//         2
//      ______
//      |    |
//  3   |    |   4
//      |    |
//      |____|
//
//        1
//
// Object {
//     "orientation": 4,
// }


const VideoPlayerScreen = ({ route, navigation }) => {
    const [videoContainerWidth, setVideoContainerWidth] = useState('100%')
    const [videoContainerHeight, setVideoContainerHeight] = useState(250)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [playBackObj, setPlayBackObj] = useState(null)

    const [pos, setpos] = useState(null)

    const {
        filename,
        uri,
        width,
        height,
        duration
    } = route.params.video

    ScreenOrientation.addOrientationChangeListener((e) => {
        if(e.orientationInfo.orientation === 1 || e.orientationInfo.orientation === 2) {
            setVideoContainerWidth('100%')
            setVideoContainerHeight(250)
        } else {
            setVideoContainerWidth('100%')
            setVideoContainerHeight('100%')
        }
    })

    const handlePlayPause = () => {
        setIsPlaying(oldState => !oldState)
    }

    const toggleOverlay = () => {
        setIsOverlayVisible(visibility => !visibility)
    }

    const toggleMute = () => {
        setIsMuted(oldState => !oldState)
    }

    const toggleLooping = () => {
        setIsLooping(oldState => !oldState)
    }

    const forward = async () => {
        let currPos = playBackObj.positionMillis
        setpos(currPos + 10000)
    }

    const backward = async () => {
        let currPos = playBackObj.positionMillis
        if(currPos <= 10000) {
            setpos(0)
            return
        }
        setpos(currPos - 10000)
    }

    const onLoad = (playback) => {
        setPlayBackObj(playback)
    }


    return (
        <View style={ss.PlayerScreen}>

            <Pressable
                style={[ ss.videoContainer, {
                    width: videoContainerWidth,
                    height: videoContainerHeight,
                }]}
                onPress={toggleOverlay}
            >
                <Video
                    source={{ uri: uri }}
                    shouldPlay={isPlaying}
                    resizeMode={'contain'}
                    useNativeControls={false}
                    isLooping={isLooping}
                    shouldCorrectPitch={true}
                    isMuted={isMuted}
                    progressUpdateIntervalMillis={500}
                    style={{ width: '100%', height: '100%' }}
                    onPlaybackStatusUpdate={status => setPlayBackObj(() => status)}
                    onLoad={p => onLoad(p)}
                    positionMillis={pos}
                />
                <View style={[ ss.overlay, { marginLeft: isOverlayVisible ? '100%' : 0 }]}>
                    <View style={ss.overlayHeader}>
                        <Text style={ss.title} numberOfLines={1}>Dawn Of War_(1080P)_1.mp4</Text>
                    </View>

                    <View style={ss.overlayBody}>
                        <AntDesign
                            name={'doubleleft'}
                            color={'white'}
                            size={33}
                            onPress={backward}
                        />

                        <Ionicons
                            name={isPlaying ? 'ios-pause-sharp' : 'ios-play-sharp' }
                            color={'white'}
                            size={33}
                            onPress={handlePlayPause}
                        />

                        <AntDesign
                            name={'doubleright'}
                            color={'white'}
                            size={33}
                            onPress={forward}
                        />
                    </View>

                    <View style={ss.overlayFooter}>
                        <View style={ss.footerTime}>
                            <Text style={{ color: '#fff' }}>{playBackObj !== null ? (HumanizeMillis(playBackObj.positionMillis)) : '00:00'}</Text>
                            <Text style={{ color: '#fff' }}>{HumanizeMillis(duration * 1000)}</Text>
                        </View>
                        <View>
                            <Slider
                                minimumTrackTintColor={"#fff"}
                                maximumTrackTintColor={"rgba(255, 255, 255, 0.5)"}
                                minimumValue={0}
                                maximumValue={1}
                                value={playBackObj !== null ? (playBackObj.positionMillis / playBackObj.durationMillis) : 0}
                                thumbTintColor={"orange"}
                            />
                        </View>
                        <View style={ss.footerIcons}>
                            <MaterialCommunityIcons
                                name={isLooping ? 'repeat-off' : 'repeat'}
                                size={22}
                                color={isLooping ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'}
                                onPress={toggleLooping}
                            />

                            <Octicons
                                name={isMuted ? 'unmute' : 'mute'}
                                size={22}
                                color={'white'}
                                onPress={toggleMute}
                            />
                        </View>
                    </View>

                </View>
            </Pressable>
        </View>
    );
}

export default VideoPlayerScreen

const ss = StyleSheet.create({
    PlayerScreen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#000',
        alignItems: 'center',
    },

    videoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors["black-50"],
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        justifyContent: 'space-between',
    },

    overlayHeader: {},

    overlayBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
    },

    overlayFooter: {},

    footerTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    footerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    title: {
        color: '#fff',
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
    },
})

// Playback Object
// Object {
//     "androidImplementation": "SimpleExoPlayer",
//         "didJustFinish": false,
//         "durationMillis": 201969,
//         "isBuffering": false,
//         "isLoaded": true,
//         "isLooping": false,
//         "isMuted": true,
//         "isPlaying": false,
//         "playableDurationMillis": 116169,
//         "positionMillis": 88018,
//         "progressUpdateIntervalMillis": 1000,
//         "rate": 1,
//         "shouldCorrectPitch": true,
//         "shouldPlay": false,
//         "uri": "/storage/emulated/0/snaptube/download/SnapTube Video/Imagine Dragons - Whatever It Takes (Lyrics _ Lyric Video)(720P_HD)_1.mp4",
//         "volume": 1,
// }
