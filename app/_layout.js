import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { overrideTextFontFamily } from "@/assets/fonts/globalFont";
import { UserProvider } from "@/contexts/UserContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Light": require("@/assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("@/assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      overrideTextFontFamily();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}
