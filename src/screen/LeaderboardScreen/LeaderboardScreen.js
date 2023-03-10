import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Leaderboard from 'react-native-leaderboard';


const LeaderboardScreen = () => {
    const [data, handleState] = useState([
        { userName: 'Joe', score: 52 },
        { userName: 'Jenny', score: 120 },
        { userName: 'Alfred', score: 29 },
        { userName: 'Hannah', score: 0 },
        { userName: 'Kate', score: 19 },
        { userName: 'Michael', score: 22 },
    ]
    );

    const [increment, handleIncrement] = useState(0);
    return (
        <SafeAreaView>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>{"\n\nLeaderboard\n\n"}</Text>
            <Leaderboard
                data={data}
                sortBy='score'
                labelBy='userName' />
            <TextInput
                style={{
                    height: 40, width: 100, borderWidth: 1, padding: 5,
                    margin: 10, alignSelf: 'center',
                    color: 'black', placeholderTextColor: 'black'
                }}
                editable
                placeholder='Enter Hours'
                onChangeText={(text) => handleIncrement(parseInt(text))} />
            <Button
                title='Submit'
                style={{
                    height: 40, width: 300, borderWidth: 1, padding: 5,
                    margin: 10, alignSelf: 'center',
                    color: 'black',
                }}
                onPress={() => { var temp = data.slice(); temp[2].score += increment; handleState(temp) }}
            >

            </Button>

        </SafeAreaView>
    );
};

export default LeaderboardScreen;