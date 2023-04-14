import React from 'react';
import { View, Text, Button } from 'react-native';
import { Auth } from 'aws-amplify';

// write an empty screen for setting screen and add a button to navigate to it
const SettingScreen = () => {


    const signOut = () => {
        Amplify.DataStore.clear()
        Auth.signOut();
    };

    return (


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
    );
}

export default SettingScreen;