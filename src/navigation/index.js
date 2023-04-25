import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screen/SignInScreen';
import LeaderboardScreen from '../screen/LeaderboardScreen';
import SettingScreen from '../screen/SettingScreen';
import GoalScreen from '../screen/GoalScreen';
import ClassSelectScreen from '../screen/ClassSelectScreen';
import FeedbackScreen from '../screen/FeedbackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Auth, Hub } from 'aws-amplify';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const Navigation = () => {


    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
            console.log("authenuser")
            setUser(authUser);
        } catch (e) {
            setUser(null);
            console.log("failed user")
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = data => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);


    if (user === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }


    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Tab.Screen name="Classes" component={ClassSelectScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="book-variant" color={color} size={size} />
                            ),
                        }} />
                        <Tab.Screen name="Goals" component={GoalScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="flag-checkered" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name="Feedback" component={FeedbackScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="comment-quote" color={color} size={size} />
                            ),
                        }} />
                        <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="medal" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name="Sign Out" component={SettingScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="cog" color={color} size={size} />
                            ),
                        }}/>
                    </>
                    // <Stack.Screen name="SignIn" component={SignInScreen} />
                    // <Stack.Screen name="Home" component={Homescreen} />
                    // <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
                ) : (
                    <>
                        <Tab.Screen name="Sign In" component={SignInScreen} />
                        {/* <Stack.Screen name="Home" component={Homescreen} /> */}
                        {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
                        {/* <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} /> */}
                        {/* <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen name="NewPassword" component={NewPasswordScreen} /> */}
                    </>
                )}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;