import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Title, Text, Button, Chip, Snackbar, Portal} from "react-native-paper";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import valuesToPercentage, {today} from "../../utilities";
import FeedbackScreen from '../FeedbackScreen';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

const screenWidth = Dimensions.get("window").width;

function GoalScreen() {

    const [target, setTarget] = React.useState(2);
    const [targetReach, setTargetReach] = React.useState(false);
    const [hour, setHour] = React.useState(0);
    const [percentage, setPercentage] = React.useState(valuesToPercentage(target, hour));
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

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

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Title>CS 3510</Title>
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
                            <View style={{alignItems: 'center', transform: [{ rotate: "-45deg"}],}}>
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
                    <View style={styles.buttons}>
                        <Button mode="contained" onPress={() => addHour(0.25)}>
                            + 15 mins
                        </Button>
                        <Button mode="contained" onPress={() => addHour(0.5)}>
                            + 30 mins
                        </Button>
                        <Button mode="contained" onPress={() => addHour(1)}>
                            + 1 hour
                        </Button>
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
        flexDirection: 'column',
        alignItems: 'center',
        height: ScreenHeight - 700,
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