import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset } from "expo-asset";

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
  const loadImages = (assets) =>
    assets.map((asset) => {
      if (typeof asset === "string") {
        return Image.prefetch(asset);
      } else {
        return Asset.loadAsync(asset);
      }
    });
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    //font를 preload
    // await Font.loadAsync(Ionicons.font);
    // const [{ localUri }] = await Asset.loadAsync(
    //   require("./wallpaperbetter.jpg")
    // );
    // await Image.prefetch("https://en.pimg.jp/047/504/268/1/47504268.jpg");

    //아래처럼하면 여러개 폰트 preload
    const fonts = loadFonts([Ionicons.font]);
    const assets = loadImages([
      require("./wallpaperbetter.jpg"),
      "https://en.pimg.jp/047/504/268/1/47504268.jpg",
    ]);

    await Promise.all([...fonts, ...assets]);
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
