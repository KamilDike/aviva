import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import NavigationCore from "./src/navigation/NavigationCore";

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
      style={{ flex: 1 }}
      onLayout={() => {
        void onLayoutRootView();
      }}
    >
      <NavigationCore />
    </SafeAreaView>
  );
}
