import { Redirect } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { RouterName } from "@/components";
import { View } from "react-native";

export default function Home() {
  const { loading, isLoggedIn } = useUser(); // 로그인 상태 가져오기

  if (loading) return <View></View>;
  else
    return (
      <Redirect
        href={!isLoggedIn ? RouterName.loginPage : RouterName.TodaysLessonTab}
      />
    );
}
