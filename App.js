import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import PlainLoader from "./src/screens/PlainLoader";
import Loader from './src/screens/Loader'
import * as Font from 'expo-font'
import Router from './src/routers/Router'
import VideoProvider from "./src/contexts/VideoProvider";

const App = () => {
    const [dataloaded, setdataloaded] = useState(false)

    const loadfonts = () => {
        Font.loadAsync({
            'Jomhuria-Regular': require('./assets/fonts/Jomhuria-Regular.ttf')
        }).then(() => {
            setdataloaded(true)
        })
    }

    useEffect(() => {
        loadfonts()
    }, [])

    if(!dataloaded) {
        return (
            <PlainLoader />
        );
    }

    return (
        <View style={ss.container}>
            <StatusBar
                hidden={true}
            />
            <VideoProvider>
                <Router />
            </VideoProvider>
        </View>
    )
}

export default App;

const ss = StyleSheet.create({
    container: {
        flex: 1,
    }
});