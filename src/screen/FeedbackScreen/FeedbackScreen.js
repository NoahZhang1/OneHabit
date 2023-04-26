import React, { useState, useEffect, useInsertionEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { Button, Chip, Snackbar, Menu, Provider } from "react-native-paper";
import { Slider } from 'react-native-elements';
import { Classes } from '../../models';
import { Auth, Hub } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
function FeedbackScreen({ route }) {

    const colors = ['#F5CECE', '#FFE3D5', '#FFF5D1', '#F0FAEA', '#D4E9C6'];
    const labels = ['way too little', 'slightly less', 'about right', 'a little too much', 'way too much'];
    const faces = [require("./pics/lazy.png"),
    require("./pics/chilling.png"),
    require("./pics/happy.png"),
    require("./pics/working_hard.png"),
    require("./pics/stressed.png")];
    const suggestions = ["Based on your feedback, it looks like you could benefit from adding some extra study time for this subject. Consider adding an additional 1 hour of study time each week for this subject to help improve your understanding and retention.",
        "You're on the right track with your study habits, but you could benefit from a little extra focus on this subject. Try adding 30 minutes of study time each week for this subject to help improve your performance.",
        "Your study habits are balanced and effective, but there's always room for improvement. Consider setting specific study goals for each subject or trying out new study techniques to help boost your learning.",
        "It looks like you may be overloading on this subject, which can lead to burnout and decreased performance. Try reducing your study time for this subject by 30 minutes each week to help maintain a healthy balance.",
        "You're dedicating a lot of time to this subject, but it may be more effective to alternate your study time between this subject and another. Consider reducing your study time for this subject by 1 hour each week and using that time to focus on another subject."]
    const [rate, setRate] = React.useState(2);
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const [user, handleUser] = useState('');
    const [classes, setClasses] = useState([]);
    const [activeClass, setActiveClass] = useState([]);
    const [classSelect, setClassSelect] = useState('Select Class')
    const [updatedPost, setUpdatedPost] = useState(0);
    const hourChanges = [1, 0.5, 0, -0.5, -1]

    useEffect(() => {
        const getUser = async () => {
            var temp = await Auth.currentUserInfo();
            handleUser(temp["username"])
        }
        getUser()
    }, []);

    useEffect(() => {
        const pullData = async () => {
            var classData = await DataStore.query(Classes, (c) => c.username.eq(user));
            const subscription = DataStore.observeQuery(Classes, (c) => c.username.eq(user)).subscribe(snapshot => {
                const { items, isSynced } = snapshot;
                setClasses(items)
            })
        }
        pullData()
    }, [user, updatedPost])

    function push(currentClass, goalAdjustment) {
        if (currentClass.className !== undefined) {
            const push = async () => {
                var newClass = Classes.copyOf(currentClass, item => {
                    item.username = user,
                        item.className = currentClass.className,
                        item.progress = currentClass.progress,
                        item['goal'] = ((currentClass['goal'] + goalAdjustment >= 0 ? currentClass['goal'] + goalAdjustment: 0))
                })
                await DataStore.save(newClass)
            }
            push()
            onToggleTargetSnackBar();
            setUpdatedPost(updatedPost + 1)
        } else {
            Alert.alert("Please select a class to adjust your study goal.");
        }
    }

    useEffect(() => {
        for(let i = 0; i < classes.length; i++) {
            if (classes[i].className === activeClass.className) {
                setActiveClass(classes[i])
            }
        }
        
    }, [classes]);

    return ([
        <Provider>
            <View style={{
                ...styles.container,
                backgroundColor: colors[rate]
            }}>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<View style={styles.buttons}><Button style="text-align:center" mode='elevated'
                        onPress={() => openMenu()}>{classSelect}</Button></View>}
                    anchorPosition='top'
                >
                    {classes.map(i => {
                        return (
                            <Menu.Item onPress={() => { setActiveClass(i); closeMenu(); setClassSelect(i.className); }} title={i.className} />

                        )
                    })}

                </Menu>
                <Image
                    style={styles.smiley}
                    source={faces[rate]}
                />

                <Text style={{ fontSize: 16, paddingLeft: 20, paddingRight: 20, paddingBottom: 10 }}>
                    How do your study goals compare to where they should be?
                </Text>

                {!!labels[rate] && (
                    <Text style={{ fontSize: 20 }}>
                        {labels[rate]}
                    </Text> // set the label
                )}
                <Slider
                    style={styles.slider}
                    value={rate}
                    onValueChange={value => setRate(value)}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    thumbTintColor={colors[rate]}
                    thumbStyle={styles.sliderThumb}
                    minimumTrackTintColor="#666"
                    maximumTrackTintColor="#666"
                />

                <Text style={{ textAlign: 'center', fontSize: 30 }}>Study Suggestions</Text>
                <Text style={{ margin: 5, paddingLeft: 15, paddingRight: 15 }}>      {suggestions[rate]} </Text>


                <View style={styles.buttons}>
                    <Button mode="contained" style={{ minHeight: 30 }} onPress={() => push(activeClass, hourChanges[rate])}>
                        Submit
                    </Button>
                </View>
                <Snackbar
                    visible={targetSnackVisible}
                    duration={4000}
                    onDismiss={onDismissTargetSnackBar}
                    action={{
                        label: 'Yay!',
                        onPress: () => onDismissTargetSnackBar()
                    }}>Great job! Your change has been saved. 🎉
                </Snackbar>
            </View>
        </Provider>
    ]);
};

export default FeedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 5
    },
    smiley: {
        width: 100,
        height: 100,
        margin: 5
    },
    slider: {
        width: '80%',
        marginBottom: 20,
    },
    sliderThumb: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#666'
    },
    buttons: {
        flexDirection: 'column',
        alignItems: 'center',

        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',

    },
});