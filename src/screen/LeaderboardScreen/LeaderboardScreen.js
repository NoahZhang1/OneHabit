import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Leaderboard from 'react-native-leaderboard';
import { Logs } from 'expo'
import { DataStore } from '@aws-amplify/datastore';
import { ProductivityScore } from '../../models';

Logs.enableExpoCliLogging()

const LeaderboardScreen = () => {
    
    let user = null;
    let currentItem = null;
    console.log('test')
    const [data, handleState] = useState([
        { userName: 'Loading User...', score: 20 }
    ]
    );

    function pushChange(currentItem, currentScore) {
        const pushData = async () => {
            await DataStore.save(ProductivityScore.copyOf(currentItem, item => {
                userName = user,
                score = currentScore
            }));
        }
    }
    function dataStoreToLeaderboard(scoreList) {
        console.log('test')
        console.log(scoreList)
        var resultArray = [];
        for(let j = 0; j < scoreList.length; j++) {
            console.log(scoreList[j])
            resultArray.push({userName: scoreList[j]['userName'], score: scoreList[j]['score']});
        }
        return resultArray;
    }

    useEffect( () => {
        const pullData = async () => {
            user = await Auth.currentAuthenticatedUser();  
            const models = await DataStore.query(ProductivityScore);
            console.log(models);
            console.log(dataStoreToLeaderboard(models))
            handleState(dataStoreToLeaderboard(models))
            console.log(data)
        }
        pullData();
    }, [])
    
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