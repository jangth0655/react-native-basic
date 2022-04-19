import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

export default function App() {
  const [ready, setReady] = useState(false);
  const fonts = [Ionicons.font];
  const assets = [`https://reactnative.dev/img/oss_logo.png`];
  const preLoadFont = (fonts) => fonts.map((font) => Font.loadAsync(font));

  const preLoadImage = (images) =>
    images.map((image) => {
      if (typeof images === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.loadAsync(image);
      }
    });

  const assetsAll = async () =>
    await Promise.all([...preLoadFont(fonts), ...preLoadImage(assets)]);

  useEffect(() => {
    assetsAll();
  }, []);

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
