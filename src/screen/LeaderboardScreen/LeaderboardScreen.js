import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Leaderboard from 'react-native-leaderboard';
import { Logs } from 'expo'
import { DataStore } from '@aws-amplify/datastore';
import { Classes, Usernames } from '../../models';


Logs.enableExpoCliLogging()

const LeaderboardScreen = () => {
    
    const [user, handleUser] = useState("initializing");
    const [data, handleState] = useState([]);
    const [dataChanged, handleDataChanged] = useState(0);

    function dataStoreToLeaderboard(scoreList) {
        var resultArray = [];
        for(let j = 0; j < scoreList.length; j++) {
            resultArray.push({userName: scoreList[j]['userName'], score: scoreList[j]['score']});
        }
        return resultArray;
    }

    useEffect( () => {
        const pullData = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
        }
        pullData();
    }, [])

    useEffect(() => {
        const subscription = DataStore.observeQuery(Classes).subscribe(snapshot => {
            const { items, isSynced } = snapshot;
            let userInList = false;
            let scores = {};
            let scoreList = []
            for (let i = 0; i < items.length; i ++) {
                if (items[i]['username'] === user) {
                    userInList = true;
                }
                if (scores.hasOwnProperty(items[i].username)) {
                    scores[items[i].username]['score'] += items[i]['progress'] 
                } else {
                    scores[items[i].username] = {userName: items[i].username, score: items[i].progress}
                }
            }
            for (let i in scores) {
                scoreList.push(scores[i])
            }
            let results = dataStoreToLeaderboard(scoreList)

            if (userInList == false && user != null && user != 'initializing') {
                const push = async () => {
                    await DataStore.save(new Usernames({
                        "username": user,
                    }))
                }
                push()
            }

            handleState(results)
            handleDataChanged(dataChanged + 1)
        })
    }, [user])
    useEffect( () => {
        const subscription = DataStore.observeQuery(Usernames).subscribe(snapshot => {
            const { items, isSynced } = snapshot;
            newData = data.slice()
            for (let i = 0; i < items.length; i++) {
                let found = false
                for (let j = 0; j < data.length; j++) {
                    if (data[j]['userName'] === items[i]['username']) {
                        found = true;
                        break
                    }
                }
                if (found == false) {
                    newData.push({userName: items[i]['username'], score: 0})
                }
            }
            handleState(newData)
        })
    }, [dataChanged])

    return (
        <SafeAreaView>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>{"\n\nLeaderboard\n\n"}</Text>
            {(data == null || data.length == 0) ? <ActivityIndicator size="large"/> :
            <Leaderboard
                data={data}
                sortBy='score'
                labelBy='userName' />
            }
        </SafeAreaView>
    );
};

export default LeaderboardScreen;