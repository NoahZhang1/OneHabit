import React, { useState } from "react";
import {
    Alert,
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView
} from 'react-native';
import Logo from '../../../assets/Logo.png';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from "@react-navigation/native";

import { Auth } from "aws-amplify";


const SigninScreen = ({ route }) => {

    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    // const navigation = useNavigation();

    const onSignInPressed = async data => {

        console.log(data.username)
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
            // console.log(response);
            // Alert.alert('password correct!');
            // navigation.navigate('HomeScreen');

        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const onForgotPasswordPressed = () => {
        console.warn("forgot password");
    };

    const onSignInGoogle = () => {
        console.warn("google");
        //123124312
    };

    const onJoinasGuest = () => {
        // console.warn("Apple");
        // navigation.navigate("HomeScreen")
    };

    const onSignUpPress = () => {
        console.warn("signup");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password should be minimum 3 characters long',
                        },
                    }}
                />

                <CustomButton
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />

                <CustomButton
                    text="Join as a guest"
                    onPress={onJoinasGuest}
                    bgColor="#e3e3e3"
                    fgColor="#363636"
                    type="TERTIARY"
                />


                <CustomButton
                    text="Sign In with Google"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                    type="TERTIARY"
                />

                <CustomButton
                    text="Forgot Password?"
                    onPress={onForgotPasswordPressed} type="TERTIARY"
                />

                <CustomButton
                    text="Don't have an account?"
                    onPress={onSignUpPress}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    root: {
        alignItems: 'center',
        padding: 40,
    },

    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },

});

export default SigninScreen;

