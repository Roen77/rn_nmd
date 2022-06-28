import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset, useAssets } from "expo-asset";

export default function App() {
  //로딩과정에서 뭔갈하고싶다면 훅말고.. 전의 방법을..
  const [assets] = useAssets([require("./wallpaperbetter.jpg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
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
