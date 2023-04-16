import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { Title, Text, Button, Chip, Snackbar, Portal, TextInput, Divider } from "react-native-paper";
import { Logs } from 'expo'
import { DataStore } from '@aws-amplify/datastore';
import { Classes } from '../../models';
import { Auth } from 'aws-amplify';

Logs.enableExpoCliLogging()
const screenWidth = Dimensions.get("window").width;

function ClassSelectScreen({ navigation }) {

    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

    const [classes, setClasses] = useState([{ className: 'Loading Classes', goal: '0 Hours' }]);
    const [user, handleUser] = useState('');
    const [newClass, addClass] = useState(null);
    const [newGoal, addGoal] = useState(null);


    function pushData(classData, goalData) {
        console.log('push')
        const pushChange = async () => {
            console.log(classData)
            await DataStore.save(new Classes({
                "username": user,
                "className": classData,
                "goal": goalData,
                "progress": 0
            }));
            console.log('pushed')
        }
        pushChange()
    }
    useEffect(() => {
        const getUser = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
            console.log(user)
        }

        getUser();
    }, []);
    useEffect(() => {
        const pullData = async () => {
            var classData = await DataStore.query(Classes, (c) => c.username.eq(user));
            console.log(classData)
            console.log("CLASS DATA")
            setClasses(classData)
        }
        pullData()
    }, [user])

    //logging
    useEffect(() => {
        console.log("Changed Log")
        console.log(user);
        console.log(classes)
        console.log("End Changed Log")
    }, [classes, user])



    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Title style="text-align:left">Set Your Study Hours</Title>
                <Title style={{ fontSize: 16, textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>How many hours would you like to study for each class this week?</Title>
                {true ? (<View style={styles.addContainer}>
                    <TextInput
                        returnKeyType='done'
                        keyboardType='text'
                        placeholder='Class'
                        onChangeText={a => addClass(a)}
                    />
                    <TextInput
                        returnKeyType='done'
                        keyboardType='decimal-pad'
                        placeholder='Goal (hours)'
                        onChangeText={a => addGoal(parseInt(a))}
                    />
                    
                    <View style={styles.buttons}>
                        <Button mode="contained"
                            onPress={() =>
                                {
                                    
                                    if (!newClass || !newGoal) {
                                        console.log('one input not entered')
                                    } else {
                                        if (classes.map(a => {return a['className']}).indexOf(newClass) != -1) {
                                            console.log('duplicate');
                                        } else {
                                            console.log('test1')
                                            let temp = classes.slice()
                                            temp.push({ className: newClass, goal: newGoal })
                                            console.log(temp)
                                            console.log(temp)
                                            setClasses(temp)
                                            pushData(newClass, newGoal)
                                            console.log('test2')
                                            onToggleTargetSnackBar()
                                            console.log('test3')
                                        }
                                    }
                                    
                                    
                                }
                            }>Submit</Button>
                    </View></View>) : <Text style={{ fontWeight: 'bold' }}>Class Time Submitted!</Text>}

                <Title style="text-align:left">Current Classes</Title>
                <View style={styles.content}>
                    {classes.map(a => {
                        return (
                            <View style={styles.addContainer}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{a.className}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{a.goal}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <Snackbar
                visible={targetSnackVisible}
                duration={3500}
                onDismiss={onDismissTargetSnackBar}
                action={{
                    label: 'OK',
                    onPress: () => onDismissTargetSnackBar()
                }}>Your study goal has been set!
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    addContainer: {
        flex: 1,
        flexGrow: 0.25,
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth,
        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth - 100,
        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },


});

export default ClassSelectScreen;