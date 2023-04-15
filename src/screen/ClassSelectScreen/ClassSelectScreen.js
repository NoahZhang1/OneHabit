import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal, TextInput} from "react-native-paper";
import { Logs } from 'expo'
import { DataStore } from '@aws-amplify/datastore';
import { Classes } from '../../models';


Logs.enableExpoCliLogging()
const screenWidth = Dimensions.get("window").width;

function GoalScreen({navigation}) {

    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);



    React.useEffect(() => {
        // fetch from database
    }, []);

    // Show the congrat message
    React.useEffect(() => {
        if (targetReach===true) {
            onToggleTargetSnackBar();
        }
    }, [targetReach])



    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Title style="text-align:left">Set Your Study Hours</Title>
                <Title style={{fontSize:16, textAlign:'center', paddingLeft:20, paddingRight:20}}>How many hours would you like to study for each class this week?</Title>
                    {true ? (<View style={styles.addContainer}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>CS 3510</Text>
                    <TextInput
                        returnKeyType='done'
                        keyboardType='decimal-pad'
                        placeholder='in hours'
                        onChangeText={console.log('a')}
                    /><View style={styles.buttons}>
                        <Button mode="contained"
                            onPress={() =>
                                [
                                onToggleTargetSnackBar()
                                
                            ]
                            }>Submit</Button>
                    </View></View>) : <Text style={{fontWeight:'bold'}}>Class Time Submitted!</Text>}
                    
                
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
        width: screenWidth-100,
        alignContent: 'space-between',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    
  
});

export default GoalScreen;