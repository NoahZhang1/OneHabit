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
import { ScreenHeight } from 'react-native-elements/dist/helpers';

Logs.enableExpoCliLogging()
const screenWidth = Dimensions.get("window").width;

function GoalScreen() {

    const [target, setTarget] = React.useState(2);
    const [targetReach, setTargetReach] = React.useState(false);
    const [hour, setHour] = React.useState(0);
    const [percentage, setPercentage] = React.useState(25);
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

    const [menuVisible, setMenuVisible] = React.useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const [user, handleUser] = useState('');
    const [classes, setClasses] = useState([]);
    const [activeClass, setActiveClass] = useState([]);
    const [classSelect, setClassSelect] = useState('Select Class');
    const [updatedPost, setUpdatedPost] = useState(0);

    const addHour = (amount) => {
        if (activeClass.length == 0 || !amount) {
            console.log('error out')
            console.log(activeClass.length)
            console.log(!amount)
            return
        }

        if (valuesToPercentage(target, hour + amount) >= 100) {
            setHour(target)
            setPercentage(100)
            console.log('percentage reached')
            console.log(valuesToPercentage(target, hour + amount))
            setTargetReach(true);
            pushData(activeClass, target)
        } else {
            console.log('push active class')
            console.log(activeClass)
            pushData(activeClass, activeClass['progress'] + amount)

        }
    }

    React.useEffect(() => {
        const getUser = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
            
        }
        console.log(target)
        console.log(hour)
        console.log(percentage)
        getUser()
        
    }, []);

    useEffect(() => {
        console.log('pulling data')
        const pullData = async () => {
            var classData = await DataStore.query(Classes, (c) => c.username.eq(user));
            const subscription = DataStore.observeQuery(Classes, (c) => c.username.eq(user)).subscribe(snapshot => {
                const { items, isSynced } = snapshot;
                setClasses(items)
            })
            
        }
        pullData()
        
    }, [user, updatedPost])

    // Show the congrat message
    React.useEffect(() => {
        if (targetReach === true) {
            onToggleTargetSnackBar();
        }
    }, [targetReach])

    React.useEffect(() => {
        console.log('setting active class')
        console.log(classes)
        for(let i = 0; i < classes.length; i++) {
            console.log(classes[i])
            if (classes[i].className === classSelect) {
                console.log('new active')
                console.log(classes[i])
                setActiveClass(classes[i])
            }
        }
    }, [classes])

    useEffect(( )=> {
        console.log('activeClass')
        console.log(activeClass)
        console.log(activeClass['className'])
        console.log(activeClass)
        if (typeof activeClass['goal'] !== 'undefined') {
            console.log('test goal set')
            console.log(activeClass)
            setTarget(activeClass['goal'])
            setHour(activeClass['progress']) 
            setPercentage(valuesToPercentage(activeClass['goal'], activeClass['progress']));
        } else {
            setTarget(5)
            setHour(1)
            setPercentage(20)
        }
        
    }, [activeClass])

    function pushData(currentClass, updatedProgress) {
        console.log('push')
        const push = async () => {
            // console.log(currentClass)
            // console.log(updatedProgress)
            var newClass = Classes.copyOf(currentClass, item => {
                item.username = user,
                item.className = currentClass.className,
                item.progress = updatedProgress,
                item.goal = currentClass.goal
            })
            // console.log(newClass)
            await DataStore.save(newClass)
        }
        push()
        // console.log('pushed')
        setUpdatedPost(updatedPost + 1)
    }

    useEffect(() => {
        console.log('percentage')
        console.log(percentage)
        console.log(target)
        console.log(hour)
    }, [target, hour, percentage, classes])
    // REMOVING VIEW BRINGS BACK PROGRESS?
    return (
        <Provider>
            <View style={styles.container}>
                
                <View style={styles.content}>
                    {(classes == null || classes.length == 0) ? <ActivityIndicator size="large"/> :
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={<View style={styles.buttons}><Button style="text-align:center" mode='elevated'
                                onPress={openMenu}>{classSelect}</Button></View>}
                                anchorPosition='bottom'>
                            {classes.map(i => {
                                return (
                                    <Menu.Item onPress={() => {setActiveClass(i); closeMenu(); setClassSelect(i.className)}} title={i.className}/>
                
                                )})}
                            
                        </Menu>
                    }
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
                    
                        {/* <Title style={{marginHorizontal: 70}}>+ Add more hours</Title> */}
                        <View style={styles.buttons}>
                            <Button mode="contained" onPress={() =>{ addHour(0.25)}}>
                                + 15 mins
                            </Button>
                            <Button mode="contained" onPress={() => { addHour(0.5)}}>
                                + 30 mins
                            </Button>
                            <Button mode="contained" onPress={() => addHour(1)}>
                                + 1 hour
                            </Button>
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
        marginTop: 100,
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
        marginTop:20
    }
});

export default GoalScreen;