import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    ScrollView, 
    Modal,
    KeyboardAvoidingView,
    StyleSheet, 
    Platform
} from "react-native";
import { theme } from "../Colors";
import styles from './WrongNoteStyles';

const WrongNote = ({ setTapPressed }) => {
    const pressedQ = () => {
        setTapPressed(true);
    };

    const pressedW = () => {
        setTapPressed(false);
    };

    return (
        <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
            <Text style={styles.headerText}>오답 노트</Text>
        </View>
        <View style={styles.separator} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* 채워야됨 */}
        </ScrollView>
        <View style={styles.bottom}>
            <TouchableOpacity onPress={pressedQ}>
            <View style={styles.tabButton}>
                <MaterialCommunityIcons
                name="application-edit-outline"
                size={24} 
                style={{...styles.tabIcon, color:theme.TextColor}} />
                <Text style={{color: theme.TextColor}}>문제 생성</Text>
            </View>  
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={pressedW}>   
                <View style={styles.tabButton}>
                    <MaterialCommunityIcons 
                    name="notebook-check" 
                    size={30} 
                    style={styles.tabIcon} />
                    <Text style={{fontSize: 20, color:"black"}}>오답 노트</Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    );
};

export default WrongNote;