import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    ScrollView, 
    Modal,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../Colors";
import styles from "./HomeScreenStyles"

const STORAGE_KEY = "@folders";

const HomeScreen = ({ setTapPressed }) => {
    const [modal, setModal] = useState(false);
    const [ nameModal, setNameModal ] = useState(false);
    const [ fileModal, setFileModal ] = useState(false);
    const [ name, setName ] = useState("");
    const [ folders, setFolders ] = useState({});
    useEffect(() => {
        loadFolders();
    }, []);

    const toggleModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const namefolder = () => {
        setNameModal(true);
    };
    const closenameModal = () => {
        setNameModal(false);
        setName("");
    };

    const pressedQ = () => setTapPressed(true);
    const pressedW = () => setTapPressed(false);

    const folderModal = () => setFileModal(true);
    const closeFolderModal = () => setFileModal(false);

    const onChangeText = (payload) => setName(payload);

    const saveFolders = async(toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };

    const loadFolders = async() => {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        const loadedFolders = JSON.parse(s);
        setFolders(loadedFolders || {});
    };

    const addFolder = async() => {
        const folderName = name === "" ? "제목 없음" : name; // 기본값 설정
        const newFolders = {
            ...folders,
            [Date.now()]: { name: folderName }, // 객체 구조 확인
        };
            setFolders(newFolders);
            await saveFolders(newFolders);
            setName("");
        };

    const deleteFolder = (key) => {
        Alert.alert("폴더 삭제", "폴더를 삭제하시겠습니까?", [
            { text: "취소"},
            {
                text: "삭제",
                style: "destructive",
                onPress: () => {
                    const newFolders = {...folders};
                    delete newFolders[key];
                    setFolders(newFolders);
                    saveFolders(newFolders);
                },
            },
        ]);
    };

    const changeName = (key) => {
        if (name === "") {
            return;
        }
        const newFolders = {...folders};
        newFolders[key].name = name;
        setFolders(newFolders);
        saveFolders(newFolders);
        setName("");
    };

    return (
        <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
            <Text style={styles.headerText}>문제 생성</Text>
            <TouchableOpacity onPress={toggleModal}>
                <View 
                style={styles.addButton}>
                <AntDesign name="addfile" size={30} style={styles.addIcon} />
                </View> 
            </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.row}>
                {Object.keys(folders).map((key) => (
                    <View
                        key={key} 
                        flexDirection="column" 
                        justifyContent= "center"
                        alignItems="center">
                    <TouchableOpacity>
                        <Ionicons name="folder" size={100} style={styles.folderIcon}/> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={folderModal}>
                        <View flexDirection="row">
                            <Text style={styles.folderName}>
                                {folders[key] && typeof folders[key].name === 'string' ? folders[key].name : "폴더 이름 없음"}
                            </Text>
                            <Entypo name="chevron-small-down" size={24} color={theme.TextColor} />
                        </View>
                    </TouchableOpacity>
                    <Modal
                    visible={fileModal}
                    transparent={true}
                    animationType="slide">
                        <KeyboardAvoidingView
                        style={styles.modalContainer}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={styles.modal}>
                            <View style={styles.folderModalScreen}>
                                <TextInput
                                onChangeText={onChangeText}
                                onSubmitEditing={() => changeName(key)}
                                returnKeyType="done"
                                value = {name}
                                placeholder={folders[key]?.name || "폴더 이름"}
                                style={styles.changeNameinput}
                                />
                                <TouchableOpacity
                                style={styles.modalButton}
                                >
                                <Text 
                                style={{...styles.modalText, 
                                color: theme.TextColor,
                                fontSize: 24,
                                fontWeight: "600",
                                textAlign: "center"}}>문제 다시보기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={styles.modalButton}
                                >
                                <Text 
                                style={{...styles.modalText, 
                                color: theme.TextColor,
                                fontSize: 24,
                                fontWeight: "600",
                                textAlign: "center"}}>오답률 확인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={{...styles.modalButton, backgroundColor:theme.wrongSign}}
                                onPress={() => deleteFolder(key)}
                                >
                                <Text 
                                style={{...styles.modalText, 
                                color: theme.bg,
                                fontSize: 24,
                                fontWeight: "600",
                                textAlign: "center"}}>폴더 삭제</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{...styles.folderModalScreen, paddingVertical: 3}}>
                                <TouchableOpacity
                                style={{...styles.modalButton, backgroundColor:theme.bg}}
                                onPress={closeFolderModal}
                                >
                                <Text 
                                style={{...styles.modalText, 
                                color: theme.TextColor,
                                fontSize: 24,
                                fontWeight: "600",
                                textAlign: "center"}}>완료</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>
                    </View>
                ))}
                <Modal 
                    visible={modal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modal}>
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                                closeModal();
                                namefolder();
                            }}>
                            <AntDesign name="addfolder" size={24} color="white" />  
                            <Text style={styles.modalText}>
                                폴더 생성
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalItem} onPress={() => {}}>
                            <AntDesign name="upload" size={24} color="white" />
                            <Text style={styles.modalText}>
                                파일 불러오기
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <AntDesign name="closesquare" size={24} color="white" />
                            <Text style={{...styles.modalText, textAlign:"center"}}>
                                취소
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    visible={nameModal}
                    transparent={true}
                    animationType="slide"
                >
                    <KeyboardAvoidingView
                        style={styles.modalContainer}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={styles.modal}>
                            <View style={styles.modalscreen}>
                            <View flexDirection= "row">
                            <AntDesign name="addfolder" size={40} color={theme.TextColor} />
                            <Text style={{...styles.modalText, fontSize:35, color: theme.TextColor}}>새로운 폴더</Text>
                            </View>
                            <TextInput
                                onChangeText={onChangeText}
                                returnKeyType="done"
                                value = {name}
                                placeholder="제목 없음"
                                style={styles.input}
                            />
                            <View flexDirection="row">
                                <TouchableOpacity 
                                    style={styles.Button} 
                                    onPress={() => {
                                        closenameModal();
                                        addFolder();
                                }}>
                                    <Text style={{color:theme.bg, fontSize:20, textAlign: "center"}}>확인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{...styles.Button, backgroundColor:theme.wrongSign}} 
                                    onPress={closenameModal}>   
                                    <Text style={{color:theme.bg, fontSize:20, textAlign: "center"}}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        </ScrollView>
        <View style={styles.bottom}>
            <TouchableOpacity onPress={pressedQ}>
                <View style={styles.tabButton}>
                    <MaterialCommunityIcons
                    name="application-edit"
                    size={30} 
                    style={styles.tabIcon} />
                    <Text style={{fontSize: 20, color:"black"}}>문제 생성</Text>
                </View>   
            </TouchableOpacity>
            <View style={styles.verticalSeparator} />
            <TouchableOpacity 
            onPress={pressedW}>   
                <View style={styles.tabButton}>
                    <MaterialCommunityIcons 
                    name="notebook-check-outline" 
                    size={24} 
                    style={{...styles.tabIcon, color:theme.TextColor}} />
                    <Text style={{color: theme.TextColor}}>오답 노트</Text>
                </View>
            </TouchableOpacity>
        </View>
        </View>
    );
};

export default HomeScreen;