import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Loader from '../screens/Loader'
import Home from '../screens/Home'
import VideoPlayerScreen from '../screens/VideoPlayerScreen'
import Videos from '../screens/Videos'

const Stack = createStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Loader'}
            >
                <Stack.Screen
                    name={'Loader'}
                    component={Loader}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={'Home'}
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={'Videos'}
                    component={Videos}
                    options={{
                        headerShown: true,
                    }}
                />

                <Stack.Screen
                    name={'Player'}
                    component={VideoPlayerScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router