import React from 'react';
<<<<<<< HEAD:src/screen/HomeScreen/Homescreen.js
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
=======
import { View, Text, Button } from 'react-native';
>>>>>>> b4dc50ebf5b3e6c8880d182e7dcf65945e83d6b6:src/screen/SettingScreen/SettingScreen.js
import { Auth } from 'aws-amplify';
import { Calendar, CalendarList, Agenda, calendarTheme, AgendaEntry } from 'react-native-calendars';

// write an empty screen for setting screen and add a button to navigate to it
const SettingScreen = () => {


    const signOut = () => {
        Auth.signOut();
    };


    // const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    // const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    // const workout = { key: 'workout', color: 'green' };
    // const selected_date = '2023-03-08'
    return (

<<<<<<< HEAD:src/screen/HomeScreen/Homescreen.js
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
=======

        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, alignSelf: 'center' }}>Home, sweet home</Text>
            <Text
                onPress={signOut}
                style={{
                    width: '100%',
                    textAlign: 'center',
                    color: 'red',
                    marginTop: 'auto',
                    marginVertical: 20,
                    fontSize: 20,
                }}>
                Sign out
            </Text>
        </View>
>>>>>>> b4dc50ebf5b3e6c8880d182e7dcf65945e83d6b6:src/screen/SettingScreen/SettingScreen.js
    );
}

<<<<<<< HEAD:src/screen/HomeScreen/Homescreen.js
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
=======
export default SettingScreen;
>>>>>>> b4dc50ebf5b3e6c8880d182e7dcf65945e83d6b6:src/screen/SettingScreen/SettingScreen.js
