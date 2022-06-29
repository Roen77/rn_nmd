import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font));
export default function App() {
    const [ready, setReady] = useState(false);
    const onFinish = () => setReady(true);
    const startLoading = async () => {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
    };

    if (!ready) {
        return (
            <AppLoading
                startAsync={startLoading}
                onFinish={onFinish}
                onError={console.error}
            />
        );
    }
    return (
        //수동으로 하지 않고 이렇게 테마를 주어 다크모드를 설정할수 있음
        <NavigationContainer>
            <Stack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
