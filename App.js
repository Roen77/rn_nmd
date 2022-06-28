import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await new Promise((reslove) => setTimeout(reslove, 10000));
  };
  if (!ready) {
    return (
      <AppLoading
        //먼저 시작
        startAsync={startLoading}
        //  startAsync 후 호출
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
