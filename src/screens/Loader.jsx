import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, measures, fontSizes, fontFamilies } from '../constants.jsx'
import { Svg, Circle } from 'react-native-svg'
import {VideoContext} from "../contexts/VideoProvider";

const Loader = ({ navigation }) => {
    const {
        hasPermission
    } = useContext(VideoContext)

    if(hasPermission) {
        navigation.replace('Home')
    }

    return (
        <View style={ss.screen}>
            <View
                style={StyleSheet.absoluteFill}
            >
                <Svg
                    height={'100%'}
                    width={'100%'}
                >
                    <Circle
                        cx={measures["screen-width"] + (measures["screen-width"]/10)}
                        cy={measures["screen-height"]/3.55}
                        fill={colors["purple-100"]}
                        r={measures["screen-width"] * 1.2}
                    />
                </Svg>
            </View>

            <View style={ss.bannerContainer}>
                <View style={ss.upperTitleContainer}>
                    <Text style={ss.title}>Vudio</Text>
                    <Text style={ss.subtitle}>The Video Player</Text>
                </View>
                <View style={ss.lowerTitleContainer}>
                    <Text style={ss.subtitle}>From</Text>
                    <Text style={ss.title}>CSoft</Text>
                </View>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    screen: {
        width: measures["screen-width"],
        height: measures["screen-height"],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors["white-100"]
    },

    svgBG: {
        width: measures["screen-width"],
        height: measures["screen-height"],
        backgroundColor: 'red'
    },

    bannerContainer: {
        width: measures["screen-width"]/1.2,
        height: measures["screen-height"]/1.9,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    upperTitleContainer: {
        alignItems: 'center',
    },

    lowerTitleContainer: {
        alignItems: 'center',
    },

    title: {
        fontSize: fontSizes.size1,
        color: '#fff',
        fontFamily: 'Jomhuria-Regular',
    },

    subtitle: {
        fontSize: fontSizes.size2,
        color: '#fff',
        fontFamily: 'Jomhuria-Regular',
    }
})

export default Loader