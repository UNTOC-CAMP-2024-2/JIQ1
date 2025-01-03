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
import styles from "./SignupScreenStyles";

const SignupScreen = ({ navigation }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkpassword, setCheckPassword] = useState("");

    const onChangeID = (payload) => setId(payload);
    const onChangePassword = (payload) => setPassword(payload);
    const onChangeCheckPassword = (payload) => setCheckPassword(payload);

    const isPasswordMatch = password === checkpassword && password.length > 0;

    return (
        <View style = {styles.container}>
        <StatusBar barStyle = "dark-content"/>
        
        {/* 헤더 */}
        <View style = {styles.header}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="black" marginRight="10"/>
        </TouchableOpacity>
        <Text style = {styles.headerText}>회원가입</Text>
        </View>

        {/* 회원가입 화면 */}
        <KeyboardAvoidingView 
        style = {styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
        <View style={styles.screen}>
        <View style={styles.signupSection}>
        {/* ID 입력 */}
        <View style={styles.idContainer}>
            <ImageBackground 
            source={require('../images/sign_up_ID.png')} 
            style={styles.idImage}
            resizeMode="contain"
            >
                <TextInput 
                onChangeText={onChangeID}
                style={styles.inputID} 
                value={id}
                placeholder="아이디"
                placeholderTextColor={'gray'}
                />
            </ImageBackground>
            <TouchableOpacity style={styles.idButton}>
            <Image 
            source={require('../images/중복 확인 버튼.png')}
            resizeMode="contain"/>
            </TouchableOpacity>
        </View>
        {/* PW 입력 */}
        <View style={styles.pwContainer}>
            <ImageBackground 
            source={require('../images/sign_up_PW.png')} 
            style={styles.pwImage}
            resizeMode="contain"
            >
                <TextInput 
                onChangeText={onChangePassword}
                style={styles.inputPW} 
                value={password}
                placeholder="비밀번호"
                placeholderTextColor={'gray'}
                />
            </ImageBackground>
        </View>
        {/* PW 확인 */}
        <View style={styles.pwcheckContainer}>
            <ImageBackground 
            source={require('../images/sign_up_PWcheck.png')} 
            style={styles.pwCheckImage}
            resizeMode="contain"
            >
                <TextInput 
                onChangeText={onChangeCheckPassword}
                style={styles.inputPWcheck} 
                value={checkpassword}
                placeholder="비밀번호 확인"
                placeholderTextColor={'gray'}
                />
            </ImageBackground>
            {isPasswordMatch ? (
                <Feather
                name="check-circle"
                size={40}
                color="#32AE3A"
                style={styles.checkIcon}/>
            ):(
                <Feather 
                name="x-circle" 
                size={40}
                color={theme.wrongSign}
                style = {styles.checkIcon} />)}
        </View>
        </View> {/*signupSection*/}
        </View>
        
        <View style={styles.signUpPlace}>
        <TouchableOpacity style = {styles.Button}>
        <Image 
        source = {require('../images/계정 생성 버튼.png')}
        style = {{marginVertical: 5,}}/>
        </TouchableOpacity>
        </View> {/*signUpPlace*/}
        </KeyboardAvoidingView>
        </View> //container
    );
};

export default SignupScreen;