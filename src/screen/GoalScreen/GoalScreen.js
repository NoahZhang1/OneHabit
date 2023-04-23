import React, { useState, useEffect, useInsertionEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Title, Text, Button, Chip, Snackbar, Portal, Menu, Divider, Provider } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import valuesToPercentage, { today } from "../../utilities";
import FeedbackScreen from '../FeedbackScreen';
import { Classes } from '../../models';
import { Auth } from 'aws-amplify';
import { Logs } from 'expo'
import { DataStore } from '@aws-amplify/datastore';

Logs.enableExpoCliLogging()
const screenWidth = Dimensions.get("window").width;

function GoalScreen() {

    const [target, setTarget] = React.useState(2);
    const [targetReach, setTargetReach] = React.useState(false);
    const [hour, setHour] = React.useState(0);
    const [percentage, setPercentage] = React.useState(valuesToPercentage(target, hour));
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

    const [menuVisible, setMenuVisible] = React.useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const [user, handleUser] = useState('');
    const [classes, setClasses] = useState([]);
    const [activeClass, setActiveClass] = useState([{ className: 'Loading Classes', goal: '0 Hours' }]);
    const addHour = (amount) => {
        if (amount) {
            //update database
        }
        if (valuesToPercentage(target, hour + amount) >= 100) setTargetReach(true);

        // Move this to useEffect after connect to the database
        setHour(hour + amount);
        setPercentage(valuesToPercentage(target, hour + amount));
    }

    React.useEffect(() => {
        const getUser = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
            
        }
        getUser()
        
    }, []);

    // Show the congrat message
    React.useEffect(() => {
        if (targetReach === true) {
            onToggleTargetSnackBar();
        }
    }, [targetReach])

    useEffect(() => {
        console.log('Goal Screen vars')
        console.log(user)
        console.log(classes)
        const pullData = async () => {
            var classData = await DataStore.query(Classes, (c) => c.username.eq(user));
            setClasses(classData)
        }
        if (user != null && classes.length == 0) {
            console.log('user null or class false')
            console.log(classes)
            pullData()
        }
        if (classes != null && classes.length > 0) {
            console.log('class null or 0')
            console.log(classes)
            console.log(activeClass)
              
        }
    }, [user, classes])
    useEffect(( )=> {
        console.log('activeClass')
        console.log(activeClass.className)
        setTarget(activeClass['goal'])
        setHour(activeClass['progress']) 
    }, [activeClass])
    return (
        <Provider>
            <View style={styles.container}>
                <Title>Today</Title>
                <View style={styles.content}>
                    {(classes == null || classes.length == 0) ? <ActivityIndicator size="large"/> :
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={<View style={styles.buttons}><Button style="text-align:center" mode='elevated'
                                onPress={openMenu}>Select Class</Button></View>}
                                anchorPosition='bottom'>
                            {classes.map(i => {
                                return (
                                    <Menu.Item onPress={() => {setActiveClass(i)}} title={i.className}/>
                
                                )})}
                            
                        </Menu>
}
                    <Title>{activeClass.className}</Title>
                    <AnimatedCircularProgress
                        style={styles.progress}
                        size={245}
                        width={32}
                        rotation={0.25}
                        arcSweepAngle={360}
                        fill={percentage}
                        tintColor="#F7BC00"
                        backgroundColor="#A44B10"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        childrenContainerStyle={styles.circle}
                        children={
                            () => (
                                <View style={{ alignItems: 'center', transform: [{ rotate: "-45deg" }], }}>
                                    <Title>
                                        {hour} hr
                                    </Title>
                                    <Text>
                                        / {target}
                                    </Text>
                                </View>
                            )
                        }
                    />
                    <View style={styles.addContainer}>
                        {/* <Title style={{marginHorizontal: 70}}>+ Add more hours</Title> */}
                        <View style={styles.buttons}>
                            <Button mode="contained" onPress={() => addHour(1)}>
                                + 1 hour
                            </Button>

                            {/* <Button mode="contained" onPress={() => 
                                navigation.navigate('FeedbackScreen', {
                                    paramKey: parseInt(hour),
                                })
                                }>
                                get feedback
                            </Button> */}
                        </View>
                    </View>
                </View>
                <Snackbar
                    visible={targetSnackVisible}
                    duration={4000}
                    onDismiss={onDismissTargetSnackBar}
                    action={{
                        label: 'Yay!',
                        onPress: () => onDismissTargetSnackBar()
                    }}>Great job reaching your goal today! 🎉
                </Snackbar>
            </View>
        </Provider>
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
        flexGrow: 0.45,
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
        textAlign:'center'
    },
    circle: {
        width: 181,
        height: 181,
        borderRadius: 120,
        backgroundColor: '#FFEEDE',
        transform: [{ rotate: "45deg" }],
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10.00,
        elevation: 10,
    },
    progress: {
        width: 264,
        height: 264,
        marginBottom: 10,
        borderRadius: 300,
        overflow: 'hidden',
    }
});

export default GoalScreen;