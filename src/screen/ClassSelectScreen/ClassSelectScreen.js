import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal, TextInput} from "react-native-paper";
import valuesToPercentage, {today} from "../../utilities";
import Alert from 'react-native';

const screenWidth = Dimensions.get("window").width;

function GoalScreen({navigation}) {

    const [target, setTarget] = React.useState(2);
    const [targetReach, setTargetReach] = React.useState(false);
    const [hour, setHour] = React.useState(0);
    const [percentage, setPercentage] = React.useState(valuesToPercentage(target, hour));
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);
    const [classTime, setText] = React.useState(true);

    // Study Goals in hours, set database as well
    const [inputVal, setInputVal] = React.useState("NaN");

    const addHour = (amount) => {
        if (amount) {
            //update database
        }
        if(valuesToPercentage(target, hour + amount) >= 100) setTargetReach(true);
        
        // Move this to useEffect after connect to the database
        setHour(hour + amount);
        setPercentage(valuesToPercentage(target, hour + amount));
    }

    React.useEffect(() => {
        // fetch from database
    }, []);

    // Show the congrat message
    React.useEffect(() => {
        if (targetReach===true) {
            onToggleTargetSnackBar();
        }
    }, [targetReach])

    // const showAlert = () => {
    //     Alert.alert(
    //         'Alert Title',
    //         'My Alert Msg',
    //         [
    //             {
    //                 text: 'Great'
    //             }
    //         ]
    //     );
    //     alert("alert");
    // }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Title style="text-align:left">Add Study Hours Goal</Title>
                <Title style={{fontSize:16, textAlign:'center', paddingLeft:20, paddingRight:20}}>How many hours would you like to study for each class this week?</Title>
                    {classTime ? (<View style={styles.addContainer}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>CS 3510</Text>
                    <TextInput
                        returnKeyType='done'
                        keyboardType='decimal-pad'
                        placeholder='in hours'
                        onChangeText={text => setInputVal(text)}
                    /><View style={styles.buttons}>
                        <Button mode="contained"
                            onPress={() =>
                                [
                                //     navigation.navigate('Goals', {
                                //     paramKey: parseInt(inputVal),
                                // }),
                                onToggleTargetSnackBar()
                                // alert("Your study goals have been set!")
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
                }}>Your study goals have been set!
                {/* // visible={targetSnackVisible}
                // duration={2500}
                // onDismiss={onDismissTargetSnackBar}
                // action={{
                //     label: 'Yay!',
                //     onPress: () => onDismissTargetSnackBar()
                // }}>Great job reaching your goal today! 🎉 */}
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
    circle: {
        width: 181,
        height: 181,
        borderRadius: 120,
        backgroundColor: '#FFEEDE',
        transform: [{ rotate: "45deg"}],
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