import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { Calendar, CalendarList, Agenda, calendarTheme, AgendaEntry } from 'react-native-calendars';

const HomeScreen = () => {


    // const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    // const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    // const workout = { key: 'workout', color: 'green' };
    // const selected_date = '2023-03-08'
    return (

        <SafeAreaView style={styles.container}>
            <Agenda
                selected='2023-03-08'
                // selected = selected_date
                items={{
                    '2023-03-09': [{ name: 'CS 1332 PLUS session' }, { name: 'President Talk' }, { name: 'CRC Meditation Session' }],
                    '2023-03-08': [{ name: 'PHYS 2212 Studio' }]
                }}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}

                renderEmptyDate={() => (

                    <TouchableOpacity style={styles.item}>
                        <Text>This is empty date!</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
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