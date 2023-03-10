import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screen/SignInScreen';
import HomeScreen from '../screen/HomeScreen';
import LeaderboardScreen from '../screen/LeaderboardScreen';



const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignInScreen">
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;