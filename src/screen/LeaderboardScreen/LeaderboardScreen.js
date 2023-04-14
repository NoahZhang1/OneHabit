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
    
    const [user, handleUser] = useState(null);
    const [index, handleIndex] = useState(-1);
    const [currentItem, handleCurrentItem] = useState(null);
    // console.log('test')
    const [data, handleState] = useState([
        { userName: 'Loading User...', score: 0 }
    ]
    );

    function pushChange(currentItem, currentScore) {
        console.log('push')
        const pushData = async () => {
            console.log(currentItem)
            await DataStore.save(ProductivityScore.copyOf(currentItem, item => {
                item.id = currentItem.id,
                item.userName = user,
                item.score = currentScore
            }));
            console.log('pushed')
        }
        pushData()
    }

    function dataStoreToLeaderboard(scoreList, user) {
        // console.log('test')
        // console.log(scoreList)

        var resultArray = [];
        var returnIndex = -1;
        var returnCurrentItem = null;
        for(let j = 0; j < scoreList.length; j++) {
            // console.log(scoreList[j])
            resultArray.push({userName: scoreList[j]['userName'], score: scoreList[j]['score']});
            // console.log(user)
            if (scoreList[j]['userName'] === user) {
                //console.log('found user')
                returnIndex = j;
                returnCurrentItem = scoreList[j]
            }
        }
        // console.log('resultArray')
        // console.log(resultArray)
        // console.log(returnIndex)
        // console.log(returnCurrentItem)
        return [resultArray, returnIndex, returnCurrentItem];
    }

    useEffect( () => {
        const pullData = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
            //console.log('user updated')
            const models = await DataStore.query(ProductivityScore);
            // console.log('DATA Downloaded')
            // console.log(models);
            let [results, returnIndex, returnCurrentItem] = dataStoreToLeaderboard(models, temp["username"])
            // console.log("leaderboard vars")
            // console.log([results, returnIndex, returnCurrentItem])
            handleIndex(returnIndex);
            handleCurrentItem(returnCurrentItem);
            handleState(results)
        }
        pullData();
    }, [])

    useEffect( () => {
        // console.log("updated Values:")
        // console.log(user);
        // console.log(index);
        // console.log(currentItem);
        // console.log(data);
    });
    
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
                onPress={() => { var temp = data.slice(); console.log('press'); console.log(temp);console.log(index); temp[index].score += increment; 
                    handleState(temp); pushChange(currentItem, temp[index].score)}}
            >

            </Button>

        </SafeAreaView>
    );
};

export default LeaderboardScreen;