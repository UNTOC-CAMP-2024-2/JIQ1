import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    ScrollView, 
    Modal,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Alert,
    ImageBackground,
    Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../Colors";
import styles from "./SigninScreenStyles";

const SigninScreen = ({ navigation }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onChangeID = (payload) => setId(payload);
    const onChangePassword = (payload) => setPassword(payload);


    return (
        <View style = {styles.container}>
        <StatusBar barStyle = "dark-content"/>
        <View style = {styles.screen}>
        <View style = {styles.loginSection}>
        <KeyboardAvoidingView 
        style = {styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
            <View style={styles.inputContainer}>
            {/* ID 입력 */}
            <View style={styles.idContainer}>
                <ImageBackground 
                source={require('../images/sign_in_ID.png')} 
                style={styles.image}
                resizeMode="contain"
                >
                    <TextInput 
                    onChangeText={onChangeID}
                    style={styles.input} 
                    value={id}
                    placeholder="ID"
                    placeholderTextColor={'gray'}
                    />
                </ImageBackground>
            </View>
            {/* PW 입력 */}
            <View style={styles.pwContainer}>
                <ImageBackground 
                source={require('../images/sign_in_PW.png')} 
                style={styles.image}
                resizeMode="contain"
                >
                    <TextInput 
                    onChangeText={onChangePassword}
                    style={styles.input}
                    value={password}
                    placeholder="PW"
                    placeholderTextColor={'gray'}
                    />
                </ImageBackground>
            </View>
            <TouchableOpacity
            style ={{marginTop: 5}}>
            <Image
            source={require('../images/로그인 버튼.png')}></Image>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            <View 
            style={{flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 5}}>
            <Text 
            style={{color: "gray",
                    fontSize: 16,
                    textAlign: "right",
                    marginTop: 0,}}>
                비밀번호를 잊으셨나요?
            </Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate('FindPW')}>
                <Text 
                style={{color: "#4448BB",
                        fontSize: 16,
                        textAlign: "right",
                        marginTop: 0,
                        marginHorizontal: 6,
                }}>
                    비밀번호 찾기
                </Text>
            </TouchableOpacity>
            </View> {/*findPassword*/}
        </View> {/*inputPlace*/}
        <View style={styles.signUpPlace}>
        <Text 
        style={{color: "gray",
                fontSize: 16,
                textAlign: "center",
                marginVertical: 5,
                marginHorizontal: 6,
        }}>
            계정이 없으신가요?
        </Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Signup')}>
        <Image 
        source = {require('../images/회원가입 버튼.png')}
        style = {{marginVertical: 5,}}/>
        </TouchableOpacity>
        </View> {/*signUpPlace*/}
        </View> {/*screen*/}
        </View> //container
    );
};

export default SigninScreen;