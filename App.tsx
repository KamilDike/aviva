import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

export default function App(): JSX.Element | null {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView
      onLayout={() => {
        void onLayoutRootView();
      }}
    >
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
