import React from 'react'
import { View, ActivityIndicator } from "react-native";
import { measures, colors } from '../constants'

const PlainLoader = () => {
    return (
        <View style={{
            width: measures["screen-width"],
            height: measures["screen-height"],
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator
                size={33}
                color={colors["purple-100"]}
            />
        </View>
    )
}

export default PlainLoader