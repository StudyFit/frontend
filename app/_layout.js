import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { UserProvider } from "@/contexts/UserContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
  });

  useEffect(() => {
    console.log("📌 fontsLoaded 상태:", fontsLoaded);
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      try {
        await SplashScreen.hideAsync();
        console.log("✅ 폰트 로딩 완료 → 스플래시 숨김");
      } catch (e) {
        console.warn("❌ SplashScreen.hideAsync 실패:", e);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("⏳ 아직 폰트 로딩 안됨 → 화면 렌더링 중단");
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </SafeAreaView>
  );
}
