import React from 'react';
import {View, StyleSheet, Text, Image} from "react-native";
import {Button, Chip, Snackbar} from "react-native-paper";
import { Slider } from 'react-native-elements';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

function FeedbackScreen({route}) {

    const colors = ['#F5CECE', '#FFE3D5', '#FFF5D1', '#F0FAEA', '#D4E9C6'];
    const labels = ['way too little', 'slightly less', 'about right', 'a little too much', 'way too much'];
    const faces  = [require("./pics/lazy.png"), 
        require("./pics/chilling.png"), 
        require("./pics/happy.png"), 
        require("./pics/working_hard.png"), 
        require("./pics/stressed.png")];
    const suggestions = ["Based on your feedback, it looks like you could benefit from adding some extra study time for [subject]. Consider adding an additional 30 minutes of study time each day for this subject to help improve your understanding and retention.",
        "You're on the right track with your study habits, but you could benefit from a little extra focus on [subject]. Try adding 15 minutes of study time each day for this subject to help improve your performance.",
        "Your study habits are balanced and effective, but there's always room for improvement. Consider setting specific study goals for each subject or trying out new study techniques to help boost your learning.",
        "It looks like you may be overloading on [subject], which can lead to burnout and decreased performance. Try reducing your study time for this subject by 15 minutes each day to help maintain a healthy balance.",
        "You're dedicating a lot of time to [subject], but it may be more effective to alternate your study time between this subject and another. Consider reducing your study time for this subject by 30 minutes each day and using that time to focus on another subject."]
    const [rate, setRate] = React.useState(0);
    const [targetSnackVisible, setTargetSnackVisible] = React.useState(false);
    const onToggleTargetSnackBar = () => setTargetSnackVisible(true);
    const onDismissTargetSnackBar = () => setTargetSnackVisible(false);

    const submitChange = () => {
        // add database change here: modify the goal hours

        onToggleTargetSnackBar();
    }

    return ([
        <View style={{
            ...styles.container,
            backgroundColor:colors[rate]
        }}>
            <Image
                style={styles.smiley}
                source={faces[rate]}
            />

            <Text style={{fontSize:16, paddingLeft: 20, paddingRight: 20, paddingBottom: 25}}>
                How do your study goals compare to where they should be?
            </Text>

            {!!labels[rate] && (
                <Text style={{fontSize:20}}>
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

            <Text style={{textAlign: 'center', fontSize: 30}}>Study Suggestions</Text>
            <Text style={{margin: 5, paddingLeft: 15, paddingRight: 15}}>      {suggestions[rate]} </Text>

            
            <View style={styles.buttons}>
                <Button mode="contained" onPress={() => submitChange()}>
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
    ]);
};

export default FeedbackScreen;

const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title:{
            fontWeight: 'bold', 
            marginVertical: 10
        },
        smiley:{
            width: 100, 
            height: 100, 
            margin: 100
        },
        slider:{
            width: '80%',
            marginBottom: 50,
        },
        sliderThumb:{
            borderRadius: 5, 
            borderWidth: 1, 
            borderColor: '#666'
        },
        buttons: {
            flexDirection: 'column',
            alignItems: 'center',
            height: ScreenHeight - 700,
            alignContent: 'space-between',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
        }, 
});