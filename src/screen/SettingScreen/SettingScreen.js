import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Button } from "react-native-paper";
import { Auth } from 'aws-amplify';
// import { Amplify } from 'aws-amplify';
import { DataStore } from 'aws-amplify';

// write an empty screen for setting screen and add a button to navigate to it

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SettingScreen = () => {


    const signOut = () => {
        DataStore.clear()
        Auth.signOut();
    };

    return (


        // <View style={{ flex: 1 }}>
        //     <Button mode='contained'
        //         onPress={signOut}
        //         title='Sign Out'
        //         style={styles.buttons}>
        //         Sign out
        //     </Button>
        // </View>

        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.buttons}>
                    <Button mode='contained'
                        onPress={signOut}
                        labelStyle={{width: 150, height: 50, fontSize: 30, paddingTop: 20}}
                        >
                            Sign Out
                    </Button>   
                </View>
            </View>
        </View>
    );
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
    buttons: {
            flexDirection: 'row',
            alignItems: 'center',
            width: screenWidth - 100,
            alignContent: 'space-between',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            paddingTop: screenHeight - 550,
    }
});

export default SettingScreen;