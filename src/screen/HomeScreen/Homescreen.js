import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { Calendar, CalendarList, Agenda, calendarTheme, AgendaEntry } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from '../SettingScreen';

function HomeScreen() {

    const navigation = useNavigation();

    const [isEvent, setIsEvent] = useState(false);

    const toggleIsEvent = () => {
        setIsEvent(value => !value);
    };


    useEffect(() => {
        if (isEvent === true) {
            navigation.navigate('LeaderboardScreen');
        } else {
            // navigation.navigate('Homescreen')
        }
    }, [isEvent]);

    // return (

    //     <SafeAreaView style={styles.container}>
    //         <Agenda
    //             selected='2023-03-08'
    //             items={{
    //                 '2023-03-09': [{ name: 'CS 1332 PLUS session', type: 'event' }, { name: 'President Talk', type: 'event' }, { name: 'CRC Meditation Session', type: 'goal' }],
    //                 '2023-03-08': [{ name: 'PHYS 2212 Studio', type: 'event' }]
    //             }}
    //             renderItem={(item, isFirst) => (
    //                 <TouchableOpacity style={styles.item} onPress={() => { toggleIsEvent(); }}>
    //                     <Text style={styles.itemText} >{item.name}</Text>
    //                 </TouchableOpacity>
    //             )}

    //             renderEmptyDate={() => (

    //                 <TouchableOpacity style={styles.item}>
    //                     <Text>This is empty date!</Text>
    //                 </TouchableOpacity>
    //             )}
    //         />
    //     </SafeAreaView>
    // );


    return ([

        <SafeAreaView style={styles.container}>
            <Agenda
                selected='2023-03-08'
                items={{
                    '2023-03-09': [{ name: 'CS 1332 PLUS session', type: 'event' }, { name: 'President Talk', type: 'event' }, { name: 'CRC Meditation Session', type: 'goal' }],
                    '2023-03-08': [{ name: 'PHYS 2212 Studio', type: 'event' }]
                }}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item} onPress={() => { toggleIsEvent(); }}>
                        <Text style={styles.itemText} >{item.name}</Text>
                    </TouchableOpacity>
                )}

                renderEmptyDate={() => (

                    <TouchableOpacity style={styles.item}>
                        <Text>This is empty date!</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>,
    ]
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});