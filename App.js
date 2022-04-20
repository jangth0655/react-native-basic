import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { Text, Image } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { lightThemes, DarkThemes } from "./styled";

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

  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    assetsAll();
  }, []);

  return (
    <ThemeProvider theme={isDark ? DarkThemes : lightThemes}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
