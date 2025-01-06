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
import styles from "./FindPWScreenStyles";

const FindPWScreen = ({ navigation }) => {
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
        <Text style = {styles.headerText}>비밀번호 찾기</Text>
        </View>

        {/* 비밀번호 찾기기 화면 */}
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
            source={require('../images/비밀번호 찾기 버튼.png')}
            resizeMode="contain"/>
            </TouchableOpacity>
        </View>
        {/* PW 출력력 */}
        <View style={styles.pwContainer}>
                <Text style={styles.inputPW}>회원님의 비밀번호는 </Text>
        </View>
        </View> {/*signupSection*/}
        </View>
        </KeyboardAvoidingView>
        </View> //container
    );
};

export default FindPWScreen;